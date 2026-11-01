"use client";

import { useState, useMemo } from "react";
import type { Destination } from "@/types/destination";
import {
  DEFAULT_FILTERS,
  type DestinationFiltersState,
  type SortKey,
  type ViewMode,
} from "../constants";

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

export function useDestinationFilters(destinations: Destination[]) {
  const [filters, setFilters] = useState<DestinationFiltersState>(DEFAULT_FILTERS);
  const [sortBy, setSortBy] = useState<SortKey>("rating");
  const [view, setView] = useState<ViewMode>("grid");

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
        filters.activities.some((a) => d.activities.includes(a))
      );
    }

    // Price Level
    if (filters.priceLevels.length > 0) {
      result = result.filter((d) => filters.priceLevels.includes(d.price_level));
    }

    // Duration
    if (filters.durations.length > 0) {
      result = result.filter((d) => filters.durations.includes(d.duration));
    }

    // Season
    if (filters.seasons.length > 0) {
      result = result.filter((d) =>
        filters.seasons.some((s) => d.best_season.includes(s))
      );
    }

    // Min Rating
    if (filters.minRating > 0) {
      result = result.filter((d) => d.rating >= filters.minRating);
    }

    // Sort
    result.sort((a, b) => {
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

    return result;
  }, [destinations, filters, sortBy]);

  const activeCount = useMemo(() => {
    let count = 0;
    if (filters.search) count++;
    count += filters.types.length;
    count += filters.activities.length;
    count += filters.priceLevels.length;
    count += filters.durations.length;
    count += filters.seasons.length;
    if (filters.minRating > 0) count++;
    return count;
  }, [filters]);

  const handleSortChange = (key: SortKey) => setSortBy(key);
  const handleViewChange = (v: ViewMode) => setView(v);

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