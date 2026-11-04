"use client";

import { useMemo } from "react";
import type { Destination } from "@/types/destination";
import type { ListingMapPoint } from "@/components/shared/map";

// نگاشت نوع مقصد به PlaceType معتبر
// همه مقاصد به‌عنوان "attraction" (جاذبه) شناخته می‌شوند
const TYPE_TO_MAP_TYPE: Record<string, "attraction"> = {
  "تاریخی": "attraction",
  "طبیعی": "attraction",
  "مدرن": "attraction",
  "فرهنگی": "attraction",
  "مذهبی": "attraction",
  "تفریحی": "attraction",
};

export function useDestinationMapPoints(destinations: Destination[]): ListingMapPoint[] {
  return useMemo(
    () =>
      destinations
        .filter((d) => d.coordinates && typeof d.coordinates.lat === "number" && typeof d.coordinates.lng === "number")
        .map((d) => ({
          key: `dest-${d.id}`,
          lat: d.coordinates.lat,
          lng: d.coordinates.lng,
          title: d.title,
          type: TYPE_TO_MAP_TYPE[d.type] || "destination",
          rating: d.rating,
        })),
    [destinations]
  );
}