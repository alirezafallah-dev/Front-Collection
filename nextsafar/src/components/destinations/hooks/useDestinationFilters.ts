// src/components/destinations/hooks/useDestinationFilters.ts
"use client";

import { useState, useMemo, useCallback } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import type { Destination } from "@/types/destination";
import type { DestinationFiltersState, SortKey, ViewMode } from "../constants";
import { DEFAULT_FILTERS } from "../constants";

// ═══ ترتیب مرتب‌سازی ═══
const PRICE_ORDER: Record<string, number> = {
  "رایگان": 0,
  "ارزان": 1,
  "متوسط": 2,
  "گران": 3,
};

const DURATION_ORDER: Record<string, number> = {
  "نیم روز": 0,
  "یک روز کامل": 1,
  "۲-۳ روز": 2,
  "یک هفته": 3,
};

// ═══ تابع مرتب‌سازی ═══
function sortDestinations(destinations: Destination[], sortBy: SortKey): Destination[] {
  return [...destinations].sort((a, b) => {
    switch (sortBy) {
      case "rating":
        return b.rating - a.rating;
      case "reviews":
        return b.reviews - a.reviews;
      case "price_asc":
        return (PRICE_ORDER[a.price_level] ?? 2) - (PRICE_ORDER[b.price_level] ?? 2);
      case "price_desc":
        return (PRICE_ORDER[b.price_level] ?? 2) - (PRICE_ORDER[a.price_level] ?? 2);
      case "duration_asc":
        return (DURATION_ORDER[a.duration] ?? 1) - (DURATION_ORDER[b.duration] ?? 1);
      case "duration_desc":
        return (DURATION_ORDER[b.duration] ?? 1) - (DURATION_ORDER[a.duration] ?? 1);
      default:
        return 0;
    }
  });
}

export function useDestinationFilters(destinations: Destination[]) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  // ═══ Initial Filters from URL ═══
  const initialFilters: DestinationFiltersState = useMemo(() => {
    const search = searchParams.get("q") || "";

    const typesParam = searchParams.get("types");
    const types = typesParam ? typesParam.split(",").filter(Boolean) : [];

    const activitiesParam = searchParams.get("activities");
    const activities = activitiesParam ? activitiesParam.split(",").filter(Boolean) : [];
    
    const durationsParam = searchParams.get("durations");
    const durations = durationsParam ? durationsParam.split(",").filter(Boolean) : [];
    
    const seasonsParam = searchParams.get("seasons");
    const seasons = seasonsParam ? seasonsParam.split(",").filter(Boolean) : [];
    
    const minRating = parseInt(searchParams.get("rating") || "0");

    return {
      search,
      types,
      activities,
      durations,
      seasons,
      minRating: isNaN(minRating) ? 0 : minRating,
    };
  }, [searchParams]);

  const [filters, setFiltersState] = useState<DestinationFiltersState>(initialFilters);
  
  const [sortBy, setSortBy] = useState<SortKey>(
    (searchParams.get("sort") as SortKey) || "rating"
  );
  
  const [view, setView] = useState<ViewMode>(
    (searchParams.get("view") as ViewMode) || "grid"
  );

  // ═══ URL Sync ═══
  const syncToURL = useCallback(
    (newFilters: DestinationFiltersState, newSort: SortKey, newView: ViewMode) => {
      const params = new URLSearchParams(searchParams.toString());

      if (newFilters.search) params.set("q", newFilters.search);
      else params.delete("q");

      if (newFilters.types.length > 0)
        params.set("types", newFilters.types.join(","));
      else params.delete("types");

      if (newFilters.activities.length > 0)
        params.set("activities", newFilters.activities.join(","));
      else params.delete("activities");

      if (newFilters.durations.length > 0)
        params.set("durations", newFilters.durations.join(","));
      else params.delete("durations");

      if (newFilters.seasons.length > 0)
        params.set("seasons", newFilters.seasons.join(","));
      else params.delete("seasons");

      if (newFilters.minRating > 0)
        params.set("rating", String(newFilters.minRating));
      else params.delete("rating");

      params.set("sort", newSort);
      params.set("view", newView);

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, router, pathname]
  );

  const setFilters = useCallback(
    (newFilters: DestinationFiltersState) => {
      setFiltersState(newFilters);
      syncToURL(newFilters, sortBy, view);
    },
    [sortBy, view, syncToURL]
  );

  const handleSortChange = useCallback(
    (newSort: SortKey) => {
      setSortBy(newSort);
      syncToURL(filters, newSort, view);
    },
    [filters, view, syncToURL]
  );

  const handleViewChange = useCallback(
    (newView: ViewMode) => {
      setView(newView);
      syncToURL(filters, sortBy, newView);
    },
    [filters, sortBy, syncToURL]
  );

  // ═══ Filtered & Sorted Destinations ═══
  const filteredDestinations = useMemo(() => {
    let result = [...destinations];

    // Search
    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(
        (d) =>
          d.title.toLowerCase().includes(q) ||
          d.title_en?.toLowerCase().includes(q) ||
          d.description.toLowerCase().includes(q) ||
          d.address.toLowerCase().includes(q)
      );
    }

    // Type
    if (filters.types.length > 0) {
      result = result.filter((d) => filters.types.includes(d.type));
    }

    // Activities
    if (filters.activities.length > 0) {
      result = result.filter((d) =>
        filters.activities.some((a) => d.activities?.includes(a))
      );
    }

    // Duration
    if (filters.durations.length > 0) {
      result = result.filter((d) => filters.durations.includes(d.duration));
    }

    // Season
    if (filters.seasons.length > 0) {
      result = result.filter((d) =>
        filters.seasons.some((s) => d.best_season?.includes(s))
      );
    }

    // Min Rating
    if (filters.minRating > 0) {
      result = result.filter((d) => d.rating >= filters.minRating);
    }

    return sortDestinations(result, sortBy);
  }, [destinations, filters, sortBy]);

  // ═══ Active Filters Count ═══
  const activeCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    count += filters.types.length;
    count += filters.activities.length;
    count += filters.durations.length;
    count += filters.seasons.length;
    if (filters.minRating > 0) count++;
    return count;
  }, [filters]);

  return {
    filters,
    setFilters,
    sortBy,
    handleSortChange,
    view,
    handleViewChange,
    filteredDestinations,
    activeCount,
  };
}