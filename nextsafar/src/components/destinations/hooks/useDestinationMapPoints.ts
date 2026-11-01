"use client";

import { useMemo } from "react";
import type { Destination } from "@/types/destination";
import type { ListingMapPoint } from "@/components/shared/map";

const TYPE_TO_MAP_TYPE: Record<string, string> = {
  "تاریخی": "history",
  "طبیعی": "nature",
  "مدرن": "modern",
  "فرهنگی": "culture",
  "مذهبی": "religious",
  "تفریحی": "fun",
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
          type: TYPE_TO_MAP_TYPE[d.type] || "place",
          rating: d.rating,
        })),
    [destinations]
  );
}