"use client";

import { X, Tag, Waves, Clock, Calendar, Sparkles } from "lucide-react";
import type { DestinationFiltersState } from "../constants";
import {
  TYPE_OPTIONS,
  ACTIVITY_OPTIONS,
  DURATION_OPTIONS,
  SEASON_OPTIONS,
} from "../constants";
import { faDigits } from "@/lib/api/hotels";

interface Props {
  filters: DestinationFiltersState;
  onFiltersChange: (filters: DestinationFiltersState) => void;
}

// ═══ آیکون‌ها برای هر نوع فیلتر ═══
const FILTER_ICONS = {
  types: Tag,
  activities: Waves,
  durations: Clock,
  seasons: Calendar,
};

// ═══ رنگ‌های مخصوص هر فیلتر ═══
const FILTER_COLORS = {
  types: "bg-amber-50 text-amber-700 border-amber-200 hover:bg-amber-100",
  activities: "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100",
  durations: "bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100",
  seasons: "bg-emerald-50 text-emerald-700 border-emerald-200 hover:bg-emerald-100",
};

const LABEL_MAPS = {
  types: TYPE_OPTIONS,
  activities: ACTIVITY_OPTIONS,
  durations: DURATION_OPTIONS,
  seasons: SEASON_OPTIONS,
};

export default function MobileDestinationFilterChips({
  filters,
  onFiltersChange,
}: Props) {
  const activeChips: Array<{
    key: string;
    label: string;
    filterType: keyof typeof LABEL_MAPS;
    value: string;
    Icon: any;
    colorClass: string;
  }> = [];

  // جستجو
  if (filters.search) {
    activeChips.push({
      key: "search",
      label: `جستجو: ${filters.search}`,
      filterType: "types",
      value: "search",
      Icon: Sparkles,
      colorClass: "bg-primary/10 text-primary border-primary/20 hover:bg-primary/20",
    });
  }

  // فیلترهای آرایه‌ای
  (Object.keys(LABEL_MAPS) as Array<keyof typeof LABEL_MAPS>).forEach((key) => {
    const selectedValues = filters[key] as string[];
    const options = LABEL_MAPS[key];
    const Icon = FILTER_ICONS[key];
    const colorClass = FILTER_COLORS[key];

    selectedValues.forEach((value) => {
      const option = options.find((opt) => opt.id === value);
      if (option) {
        activeChips.push({
          key: `${key}-${value}`,
          label: option.label,
          filterType: key,
          value,
          Icon,
          colorClass,
        });
      }
    });
  });

  // امتیاز
  if (filters.minRating > 0) {
    activeChips.push({
      key: "minRating",
      label: `${faDigits(filters.minRating)}+ ⭐`,
      filterType: "types",
      value: "minRating",
      Icon: Sparkles,
      colorClass: "bg-yellow-50 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
    });
  }

  if (activeChips.length === 0) return null;

  const removeChip = (chip: typeof activeChips[0]) => {
    if (chip.key === "search") {
      onFiltersChange({ ...filters, search: "" });
      return;
    }
    if (chip.key === "minRating") {
      onFiltersChange({ ...filters, minRating: 0 });
      return;
    }
    const currentArray = filters[chip.filterType] as string[];
    onFiltersChange({
      ...filters,
      [chip.filterType]: currentArray.filter((v) => v !== chip.value),
    });
  };

  const clearAll = () => {
    onFiltersChange({
      search: "",
      types: [],
      activities: [],
      durations: [],
      seasons: [],
      minRating: 0,
    });
  };

  return (
    <div className="mb-4 -mx-4 px-4 overflow-x-auto scrollbar-hide">
      <div className="flex items-center gap-2 min-w-max pb-2">
        {activeChips.map((chip) => {
          const Icon = chip.Icon;
          return (
            <button
              key={chip.key}
              onClick={() => removeChip(chip)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all border shrink-0 group ${chip.colorClass}`}
            >
              <Icon className="w-3 h-3" />
              <span>{chip.label}</span>
              <X className="w-3 h-3 group-hover:scale-125 transition-transform" />
            </button>
          );
        })}

        {activeChips.length > 1 && (
          <button
            onClick={clearAll}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-white border border-border hover:border-danger hover:text-danger text-xs font-bold text-text-muted transition-all shrink-0"
          >
            <X className="w-3 h-3" />
            پاک کردن همه
          </button>
        )}
      </div>
    </div>
  );
}