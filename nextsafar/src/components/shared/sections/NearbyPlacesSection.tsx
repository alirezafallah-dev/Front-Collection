"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { MapPin, Plane, Landmark, Navigation, Coffee, ShoppingBag, Map as MapIcon } from "lucide-react";
import type { ListingMapPoint, PlaceType } from "@/components/shared/map/types";
import ListingMap from "@/components/shared/map/ListingMap";
import MapModal from "@/components/shared/map/MapModal";
import { getNearbyForPost } from "@/lib/api/map";
import { faDigits } from "@/lib/api/hotels";

const ICON_MAP: Record<PlaceType, any> = {
  hotel: MapPin,
  airport: Plane,
  attraction: Landmark,
  destination: MapPin,
  restaurant: Coffee,
  hospital: Landmark,
  center: ShoppingBag,
};

const COLOR_MAP: Record<PlaceType, string> = {
  hotel: "bg-primary/10 text-primary",
  airport: "bg-primary/10 text-primary",
  attraction: "bg-primary/10 text-primary",
  destination: "bg-primary/10 text-primary",
  restaurant: "bg-primary/10 text-primary",
  hospital: "bg-primary/10 text-primary",
  center: "bg-primary/10 text-primary",
};

const TYPE_LABELS: Record<PlaceType, string> = {
  hotel: "هتل",
  airport: "فرودگاه",
  attraction: "جاذبه",
  destination: "مقصد",
  restaurant: "رستوران",
  hospital: "بیمارستان",
  center: "مرکز خرید",
};

interface FallbackPlace {
  key: string;
  title: string;
  type: PlaceType;
  distance: string;
  offset?: { lat: number; lng: number };
}

interface Props {
  postType: "hotel" | "destination" | "restaurant";
  slug: string;
  currentPlaceKey: string;
  coordinates: { lat: number; lng: number };
  radius?: number;
  title?: string;
  subtitle?: string;
  fallbackPlaces?: FallbackPlace[];
}

// ✅ Helper validation
const isValidCoordinate = (coord: { lat: number; lng: number } | undefined | null): boolean => {
  return (
    coord !== null &&
    coord !== undefined &&
    typeof coord.lat === "number" &&
    typeof coord.lng === "number" &&
    !isNaN(coord.lat) &&
    !isNaN(coord.lng) &&
    isFinite(coord.lat) &&
    isFinite(coord.lng) &&
    coord.lat !== 0 &&
    coord.lng !== 0
  );
};

export default function NearbyPlacesSection({
  postType,
  slug,
  currentPlaceKey,
  coordinates,
  radius = 5,
  title = "موقعیت و جاذبه‌های اطراف",
  subtitle = "مکان‌های نزدیک و فاصله آن‌ها",
  fallbackPlaces = [],
}: Props) {
  const [places, setPlaces] = useState<ListingMapPoint[]>([]);
  const [activeKey, setActiveKey] = useState<string>(currentPlaceKey);
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(true);

  // ✅ استفاده از ref برای جلوگیری از loop
  const hasFetchedRef = useRef(false);
  const slugRef = useRef(slug);

  // ✅ بررسی اینکه مختصات معتبر است
  const hasValidCoords = useMemo(() => isValidCoordinate(coordinates), [coordinates]);

  // ✅ ساخت fallback places یکبار با useMemo
  const builtFallbackPlaces = useMemo<ListingMapPoint[]>(() => {
    if (!hasValidCoords || fallbackPlaces.length === 0) return [];

    const currentPlace: ListingMapPoint = {
      key: currentPlaceKey,
      lat: coordinates.lat,
      lng: coordinates.lng,
      title: "مکان فعلی",
      type: postType,
      address: "اینجا هستید",
    };

    const nearbyPlaces: ListingMapPoint[] = fallbackPlaces.map((place) => ({
      key: place.key,
      lat: coordinates.lat + (place.offset?.lat || 0),
      lng: coordinates.lng + (place.offset?.lng || 0),
      title: place.title,
      type: place.type,
      address: place.distance,
    }));

    return [currentPlace, ...nearbyPlaces];
  }, [hasValidCoords, coordinates, currentPlaceKey, postType, fallbackPlaces]);

  useEffect(() => {
    // ✅ جلوگیری از fetch تکراری
    if (hasFetchedRef.current && slugRef.current === slug) return;

    if (!hasValidCoords) {
      setLoading(false);
      return;
    }

    let cancelled = false;

    async function fetchPlaces() {
      setLoading(true);
      try {
        const res = await getNearbyForPost({ postType, slug, radius });

        if (cancelled) return;

        if (res && res.places && res.places.length > 0 && res.has_center) {
          // استفاده از داده‌های API
          const currentPlace: ListingMapPoint = {
            key: currentPlaceKey,
            lat: coordinates.lat,
            lng: coordinates.lng,
            title: "مکان فعلی",
            type: postType,
            address: "اینجا هستید",
          };
          setPlaces([currentPlace, ...res.places]);
        } else {
          // استفاده از fallback
          setPlaces(builtFallbackPlaces);
        }
      } catch (error) {
        console.error("Error fetching nearby places:", error);
        if (!cancelled) {
          setPlaces(builtFallbackPlaces);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
          hasFetchedRef.current = true;
          slugRef.current = slug;
        }
      }
    }

    fetchPlaces();

    return () => {
      cancelled = true;
    };
  }, [postType, slug, radius, currentPlaceKey, coordinates, builtFallbackPlaces, hasValidCoords]);

  // Update activeKey if currentPlaceKey changes
  useEffect(() => {
    setActiveKey(currentPlaceKey);
  }, [currentPlaceKey]);

  if (loading) {
    return (
      <section id="nearby">
        <div className="flex items-center justify-between gap-3 mb-5 md:mb-6">
          <h2 className="ns-section-title !mb-1">{title}</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 rounded-[10px] md:rounded-lg border border-border bg-white p-4 md:p-5 animate-pulse">
          <div className="h-[320px] bg-bg-sec rounded-lg" />
          <div className="h-[220px] sm:h-[260px] lg:h-[320px] bg-bg-sec rounded-[10px] md:rounded-lg" />
        </div>
      </section>
    );
  }

  if (places.length <= 1 || !hasValidCoords) {
    // اگر فقط مکان فعلی بود یا مختصات نامعتبر بود، نمایش نده
    return null;
  }

  return (
    <section id="nearby">
      <div className="flex items-center justify-between gap-3 mb-5 md:mb-6">
        <div className="min-w-0">
          <h2 className="ns-section-title !mb-1">{title}</h2>
          <p className="text-xs md:text-sm text-text-muted">{subtitle}</p>
        </div>
        <span className="flex items-center gap-1.5 shrink-0 px-3 py-1.5 rounded-lg bg-primary/10 text-primary text-[11px] md:text-xs font-bold whitespace-nowrap">
          <MapPin className="w-3.5 h-3.5" />
          {faDigits(places.length)} مکان
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-4 rounded-[10px] md:rounded-lg border border-border bg-white p-4 md:p-5">
        <div className="rounded-lg bg-bg-sec/50 p-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-[320px] overflow-y-auto pe-1">
            {places.map((place) => {
              const Icon = ICON_MAP[place.type] || MapPin;
              const color = COLOR_MAP[place.type] || "bg-primary/10 text-primary";
              const isActive = place.key === activeKey;
              const isCurrent = place.key === currentPlaceKey;

              return (
                <button
                  key={place.key}
                  onClick={() => setActiveKey(place.key)}
                  className={`flex items-start gap-2.5 p-2.5 rounded-[10px] md:rounded-lg border text-start transition-all duration-500 ease-out ${
                    isActive
                      ? "border-primary-light bg-white shadow-card-hover ring-2 ring-primary/15"
                      : "border-border bg-white hover:border-primary-light hover:shadow-card-hover"
                  }`}
                >
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center shrink-0 ${color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-1.5">
                      <div className="text-[11px] md:text-xs font-bold text-text-strong line-clamp-1">
                        {isCurrent ? "مکان فعلی شما" : place.title}
                      </div>
                      {isCurrent && (
                        <span className="px-1.5 py-0.5 rounded-md bg-primary/10 text-primary text-[8px] font-black shrink-0">
                          فعلی
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1 mt-1 text-[10px] md:text-[11px] text-text-muted">
                      {!isCurrent && place.address && (
                        <>
                          <Navigation className="w-3 h-3 shrink-0 text-primary" />
                          <span>{place.address}</span>
                          <span className="text-text-subtle">•</span>
                        </>
                      )}
                      <span>{TYPE_LABELS[place.type]}</span>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        <div className="relative isolate z-0 h-[220px] sm:h-[260px] lg:h-[320px] rounded-[10px] md:rounded-lg overflow-hidden border border-border/60">
          <ListingMap
            points={places}
            activeKey={activeKey}
            height={320}
            onPointClick={setActiveKey}
            showFullscreenButton={false}
            className="rounded-lg"
          />
          <button
            onClick={() => setOpenModal(true)}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 z-[500]
            inline-flex items-center gap-1.5
            px-4 py-2 rounded-[10px] md:rounded-lg
            bg-white border border-border/60
            text-[11px] md:text-xs font-bold text-text-strong
            hover:border-primary hover:text-primary
            shadow-md hover:shadow-lg
            transition-all duration-200"
          >
            <MapIcon className="w-3.5 h-3.5 text-primary" />
            نقشه اطراف در تمام صفحه
          </button>
        </div>
      </div>

      <MapModal
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
        points={places}
        onPointClick={setActiveKey}
        title={title}
        itemLabel="مکان"
      />
    </section>
  );
}