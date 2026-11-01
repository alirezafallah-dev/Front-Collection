"use client";

import { Tag, Clock, Sun, Waves, Sparkles } from "lucide-react";
import CategoryFiltersSidebar, { FilterConfig } from "@/components/shared/filters/CategoryFiltersSidebar";
import type { DestinationFiltersState } from "../constants";
import {
  TYPE_OPTIONS,
  ACTIVITY_OPTIONS,
  PRICE_LEVEL_OPTIONS,
  DURATION_OPTIONS,
  SEASON_OPTIONS,
  RATING_OPTIONS,
} from "../constants";

const DESTINATION_FILTER_CONFIG: FilterConfig[] = [
  {
    type: "search",
    stateKey: "search",
    placeholder: "نام مقصد...",
    label: "جستجوی مقصد",
  },
  {
    type: "checkbox",
    stateKey: "types",
    title: "نوع مقصد",
    icon: <Tag className="w-3.5 h-3.5" />,
    options: TYPE_OPTIONS,
  },
  {
    type: "checkbox",
    stateKey: "activities",
    title: "فعالیت‌ها",
    icon: <Waves className="w-3.5 h-3.5" />,
    options: ACTIVITY_OPTIONS,
  },
  {
    type: "checkbox",
    stateKey: "priceLevels",
    title: "سطح قیمت",
    icon: <Tag className="w-3.5 h-3.5" />,
    options: PRICE_LEVEL_OPTIONS,
  },
  {
    type: "checkbox",
    stateKey: "durations",
    title: "مدت بازدید",
    icon: <Clock className="w-3.5 h-3.5" />,
    options: DURATION_OPTIONS,
    defaultOpen: false,
  },
  {
    type: "checkbox",
    stateKey: "seasons",
    title: "فصل مناسب",
    icon: <Sun className="w-3.5 h-3.5" />,
    options: SEASON_OPTIONS,
    defaultOpen: false,
  },
  {
    type: "rating",
    stateKey: "minRating",
    title: "امتیاز بازدیدکنندگان",
    icon: <Sparkles className="w-3.5 h-3.5" />,
    options: RATING_OPTIONS,
  },
];

interface Props {
  filters: DestinationFiltersState;
  onChange: (f: DestinationFiltersState) => void;
  totalCount: number;
  filteredCount: number;
  compact?: boolean;
}

export default function DestinationFiltersSidebar({
  filters,
  onChange,
  totalCount,
  filteredCount,
  compact = false,
}: Props) {
  return (
    <CategoryFiltersSidebar
      filters={filters}
      onChange={onChange}
      filterConfig={DESTINATION_FILTER_CONFIG}
      totalCount={totalCount}
      filteredCount={filteredCount}
      compact={compact}
    />
  );
}