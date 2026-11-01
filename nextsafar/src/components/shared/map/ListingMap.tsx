"use client";

import { useEffect, useRef, useState, useCallback, memo } from "react";
import { MapPin } from "lucide-react";
import { loadLeaflet, waitForSize } from "@/lib/map-loader";
import { getMapConfig } from "@/lib/api/map";
import {
  addTiles,
  makeMarkerIcon,
  makeActiveMarkerIcon,
  colorOf,
} from "@/components/map/map-icons";
import type { ListingMapPoint } from "./types";
import MapControls from "./MapControls";
import MapModal from "./MapModal";
import MapLoading from "./MapLoading";

const HOVER_ZOOM_LEVEL = 15;
const MIN_ZOOM_FOR_MARKERS = 10;
const DEFAULT_CENTER = { lat: 35.6892, lng: 51.389 };

// ✅ Utility validation
function isValidPoint(p: ListingMapPoint | null | undefined): p is ListingMapPoint & { lat: number; lng: number } {
  return (
    !!p &&
    typeof p.lat === "number" &&
    typeof p.lng === "number" &&
    !isNaN(p.lat) &&
    !isNaN(p.lng) &&
    isFinite(p.lat) &&
    isFinite(p.lng) &&
    p.lat !== 0 &&
    p.lng !== 0
  );
}

// ✅ Safe view change - استفاده از setView به جای flyTo
function safeSetView(map: any, lat: number, lng: number, zoom: number) {
  if (!map || map._removed) return;
  try {
    if (typeof lat !== "number" || typeof lng !== "number" || isNaN(lat) || isNaN(lng) || !isFinite(lat) || !isFinite(lng)) {
      return;
    }

    const maxZoom = typeof map.getMaxZoom === 'function' ? map.getMaxZoom() : 18;
    const targetZoom = Math.min(zoom, maxZoom);

    map.setView([lat, lng], targetZoom, {
      animate: true,
      duration: 0.5,
    });
  } catch (err) {
    // اگر با انیمیشن ارور داد، بدون انیمیشن امتحان کن
    try {
      map.setView([lat, lng], zoom, { animate: false });
    } catch (err2) {}
  }
}

interface ListingMapProps {
  points: ListingMapPoint[];
  activeKey?: string | null;
  height?: number;
  onPointClick?: (key: string) => void;
  onPointHover?: (key: string | null) => void;
  className?: string;
  showFullscreenButton?: boolean;
}

const ListingMap = memo(function ListingMap({
  points,
  activeKey = null,
  height = 600,
  onPointClick,
  onPointHover,
  className = "",
  showFullscreenButton = true,
}: ListingMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<any>(null);
  const markersRef = useRef<Map<string, any>>(new Map());
  const [isLoaded, setIsLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentZoom, setCurrentZoom] = useState(0);
  const prevActiveKeyRef = useRef<string | null>(null);
  const viewChangeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getValidPoints = useCallback(() => {
    return points.filter(isValidPoint);
  }, [points]);

  const handlePointClick = useCallback(
    (key: string) => onPointClick?.(key),
    [onPointClick]
  );

  const handlePointHover = useCallback(
    (key: string | null) => onPointHover?.(key),
    [onPointHover]
  );

  /* ═══ راه‌اندازی نقشه اصلی ═══ */
  useEffect(() => {
    let cancelled = false;
    let map: any = null;

    const initMap = async () => {
      try {
        const [L, cfg] = await Promise.all([loadLeaflet(), getMapConfig()]);
        if (cancelled || !mapRef.current) return;

        await waitForSize(mapRef.current);
        if (cancelled || !mapRef.current) return;

        map = L.map(mapRef.current, {
          zoomControl: false,
          attributionControl: false,
        });

        addTiles(L, map, cfg);
        mapInstance.current = map;

        map.on("zoomend", () => {
          try {
            setCurrentZoom(map.getZoom());
          } catch (e) {}
        });

        const validPts = getValidPoints();

        if (validPts.length > 0) {
          try {
            const latLngs = validPts.map((p) => L.latLng(p.lat, p.lng));
            const bounds = L.latLngBounds(latLngs);
            map.fitBounds(bounds, { padding: [50, 50], maxZoom: 11 });
            setCurrentZoom(map.getZoom());
          } catch (err) {
            map.setView([DEFAULT_CENTER.lat, DEFAULT_CENTER.lng], 5);
          }
        } else {
          map.setView([DEFAULT_CENTER.lat, DEFAULT_CENTER.lng], 5);
        }

        setIsLoaded(true);
      } catch (err) {
        console.error("[ListingMap] Init error:", err);
      }
    };

    initMap();

    return () => {
      cancelled = true;
      if (map) {
        try {
          map.remove();
        } catch (e) {}
        map = null;
      }
      mapInstance.current = null;
      markersRef.current.clear();
    };
  }, [getValidPoints]);

  /* ═══ مدیریت مارکرها ═══ */
  useEffect(() => {
    if (!isLoaded || !mapInstance.current) return;
    const L = (window as any).L;
    if (!L) return;
    const map = mapInstance.current;

    markersRef.current.forEach((m) => {
      try {
        m.remove();
      } catch (err) {}
    });
    markersRef.current.clear();

    if (currentZoom < MIN_ZOOM_FOR_MARKERS) return;

    const validPts = getValidPoints();
    validPts.forEach((point) => {
      try {
        const latLng = L.latLng(point.lat, point.lng);
        const isActive = point.key === activeKey;
        const icon = isActive
          ? makeActiveMarkerIcon(L, colorOf(point.type), point.type, point.locationType || "")
          : makeMarkerIcon(L, colorOf(point.type), point.type, point.locationType || "");

        const marker = L.marker(latLng, { icon })
          .addTo(map)
          .on("click", () => handlePointClick(point.key))
          .on("mouseover", () => handlePointHover(point.key))
          .on("mouseout", () => handlePointHover(null));

        markersRef.current.set(point.key, marker);
      } catch (err) {
        console.warn("[ListingMap] Error creating marker:", point.key, err);
      }
    });
  }, [points, isLoaded, activeKey, currentZoom, handlePointClick, handlePointHover, getValidPoints]);

  /* ═══ هایلایت و زوم هنگام هاور - VERSION SAFE ═══ */
  useEffect(() => {
    if (!isLoaded || !mapInstance.current) return;
    const map = mapInstance.current;
    const L = (window as any).L;
    if (!L) return;

    if (activeKey === prevActiveKeyRef.current) return;
    prevActiveKeyRef.current = activeKey;

    // ✅ لغو تایمر قبلی بلافاصله
    if (viewChangeTimeoutRef.current) {
      clearTimeout(viewChangeTimeoutRef.current);
      viewChangeTimeoutRef.current = null;
    }

    if (activeKey) {
      const point = points.find((p) => p.key === activeKey);
      if (!isValidPoint(point)) return;

      const targetLat = point.lat;
      const targetLng = point.lng;

      // تغییر آیکون مارکر
      const marker = markersRef.current.get(activeKey);
      if (marker) {
        try {
          marker.setIcon(
            makeActiveMarkerIcon(L, colorOf(point.type), point.type, point.locationType || "")
          );
        } catch (err) {}
      }

      // ✅ استفاده از setView به جای flyTo
      viewChangeTimeoutRef.current = setTimeout(() => {
        if (!mapInstance.current || mapInstance.current._removed) return;
        safeSetView(mapInstance.current, targetLat, targetLng, HOVER_ZOOM_LEVEL);
        viewChangeTimeoutRef.current = null;
      }, 400);
    } else {
      // برگشت آیکون‌ها
      markersRef.current.forEach((marker, key) => {
        const point = points.find((p) => p.key === key);
        if (isValidPoint(point)) {
          try {
            marker.setIcon(
              makeMarkerIcon(L, colorOf(point.type), point.type, point.locationType || "")
            );
          } catch (err) {}
        }
      });
    }
  }, [activeKey, isLoaded, points]);

  // پاک کردن تایمر هنگام unmount
  useEffect(() => {
    return () => {
      if (viewChangeTimeoutRef.current) {
        clearTimeout(viewChangeTimeoutRef.current);
      }
    };
  }, []);

  /* ═══ کنترل‌ها ═══ */
  const handleZoomIn = () => {
    try {
      mapInstance.current?.zoomIn();
    } catch (err) {}
  };

  const handleZoomOut = () => {
    try {
      mapInstance.current?.zoomOut();
    } catch (err) {}
  };

  const handleLocate = () => {
    if (!mapInstance.current) return;
    const L = (window as any).L;
    if (!L || !navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        try {
          const { latitude, longitude } = pos.coords;
          if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) return;
          safeSetView(mapInstance.current, latitude, longitude, 13);
          L.marker([latitude, longitude], {
            icon: makeMarkerIcon(L, "#ef4444", "center", ""),
          })
            .addTo(mapInstance.current)
            .bindPopup("موقعیت شما")
            .openPopup();
        } catch (err) {
          console.error("[ListingMap] Locate error:", err);
        }
      },
      () => alert("دسترسی به موقعیت مکانی رد شد")
    );
  };

  const handleResetView = () => {
    if (!mapInstance.current) return;
    const L = (window as any).L;
    if (!L) return;
    const validPts = getValidPoints();
    if (validPts.length === 0) return;

    try {
      const latLngs = validPts.map((p) => L.latLng(p.lat, p.lng));
      const bounds = L.latLngBounds(latLngs);
      mapInstance.current.fitBounds(bounds, {
        padding: [50, 50],
        maxZoom: 11,
        animate: true,
        duration: 0.8,
      });
    } catch (err) {
      console.warn("[ListingMap] ResetView error:", err);
    }
  };

  const compact = height < 250;
  const validPointsCount = getValidPoints().length;

  if (validPointsCount === 0) {
    return (
      <div className={`${className} flex items-center justify-center`} style={{ height }}>
        <div className="text-center text-text-muted">
          <MapPin className="w-12 h-12 mx-auto mb-3 opacity-30" />
          <p className="text-sm">مختصات معتبری برای نمایش روی نقشه وجود ندارد</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={`relative ${className}`} style={{ height }}>
        <div ref={mapRef} className="w-full h-full rounded-md bg-bg-sec" />
        {!isLoaded && <MapLoading />}
        {isLoaded && (
          <MapControls
            onResetView={handleResetView}
            onLocate={handleLocate}
            onZoomIn={handleZoomIn}
            onZoomOut={handleZoomOut}
            compact={compact}
          />
        )}
        {isLoaded && showFullscreenButton && (
          <button
            type="button"
            onClick={() => setIsFullscreen(true)}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[500]
              inline-flex items-center gap-1.5
              px-4 py-2 rounded-md
              bg-white border border-border/60
              text-[11px] font-bold text-text-strong
              hover:border-primary hover:text-primary
              shadow-md hover:shadow-lg
              transition-all duration-200"
            >
            <MapPin className="w-3.5 h-3.5 text-primary" />
            نمایش روی نقشه
          </button>
        )}
      </div>

      <MapModal
        isOpen={isFullscreen}
        onClose={() => setIsFullscreen(false)}
        points={points}
        onPointClick={handlePointClick}
      />
    </>
  );
});

export default ListingMap;