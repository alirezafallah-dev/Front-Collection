// src/components/destinations/single/DestinationInfoSidebar.tsx
"use client";

import { MapPin, Clock, DollarSign, Sun, Phone, Globe } from "lucide-react";
import type { Destination } from "@/types/destination";
import ListingMap from "@/components/shared/map/ListingMap";

interface Props {
  destination: Destination;
  similarDestinations?: Destination[];
}

const FACTS = [
  { icon: MapPin, label: "نوع مقصد", valueKey: "type" },
  { icon: Clock, label: "مدت بازدید", valueKey: "duration" },
  { icon: DollarSign, label: "قیمت ورودی", valueKey: "entrance_fee", fallback: "رایگان" },
  { icon: Clock, label: "ساعت کاری", valueKey: "opening_hours", fallback: "-" },
  { icon: Sun, label: "بهترین فصل", valueKey: "best_season", isArray: true, fallback: "-" },
];

export default function DestinationInfoSidebar({
  destination,
  similarDestinations = [],
}: Props) {
  // ساخت نقاط نقشه: مقصد فعلی + مقاصد اطراف
  const mapPoints = [
    {
      key: destination.slug,
      lat: destination.coordinates.lat,
      lng: destination.coordinates.lng,
      title: destination.title,
      type: "destination" as const,
      image: destination.image,
      address: destination.address,
    },
    // اضافه کردن مقاصد اطراف (حداکثر 5 تا)
    ...similarDestinations.slice(0, 5).map((d) => ({
      key: d.slug,
      lat: d.coordinates.lat,
      lng: d.coordinates.lng,
      title: d.title,
      type: "destination" as const,
      image: d.image,
      address: d.address,
    })),
  ];

  // ✅ تابع کمکی برای دریافت مقدار فکت‌ها
  const getFactValue = (fact: typeof FACTS[number]): string => {
    const rawValue = (destination as any)[fact.valueKey];

    if (fact.isArray && Array.isArray(rawValue)) {
      return rawValue.length > 0 ? rawValue.join("، ") : fact.fallback || "-";
    }

    return rawValue || fact.fallback || "-";
  };

  return (
    <div className="space-y-4">
      {/* ═══ نقشه ═══ */}
      <div className="bg-white border border-border rounded-[10px] md:rounded-lg overflow-hidden shadow-sm hover:shadow-card-hover transition-shadow duration-500 ease-out">
        {mapPoints.length > 1 && (
          <div className="h-[180px]">
            <ListingMap
              points={mapPoints}
              activeKey={destination.slug}
              height={180}
              showFullscreenButton={true}
              className="rounded-none"
            />
          </div>
        )}
      </div>

      {/* ═══ اطلاعات کلیدی ═══ */}
      <div className="bg-white border border-border rounded-[10px] md:rounded-lg p-4 md:p-5 shadow-sm hover:shadow-card-hover transition-shadow duration-500 ease-out">
        <h3 className="text-sm md:text-base font-extrabold text-text-strong mb-3">
          اطلاعات کلیدی
        </h3>
        <div className="divide-y divide-border/60">
          {FACTS.map((f) => {
            const Icon = f.icon;
            return (
              <div
                key={f.label}
                className="flex items-start justify-between gap-3 py-2.5"
              >
                <div className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-[11px] md:text-xs text-text-muted">
                    {f.label}
                  </span>
                </div>
                <span className="text-[11px] md:text-xs font-bold text-text-strong text-end">
                  {getFactValue(f)}
                </span>
              </div>
            );
          })}

          {/* ═══ ردیف تماس (یکسان با BookingSidebar) ═══ */}
          <div className="flex items-start justify-between gap-3 py-2.5">
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary shrink-0" />
              <span className="text-[11px] md:text-xs text-text-muted">تماس</span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="tel:+982191001234"
                className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition"
                aria-label="تلفن"
              >
                <Phone className="w-4 h-4 text-primary" />
              </a>
              <a
                href="#"
                className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition"
                aria-label="وب‌سایت"
              >
                <Globe className="w-4 h-4 text-primary" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}