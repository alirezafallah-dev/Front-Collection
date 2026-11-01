"use client";

import { RotateCcw, SlidersHorizontal } from "lucide-react";
import FilterSection from "./FilterSection";
import SearchFilter from "./SearchFilter";
import RatingFilter from "./RatingFilter";
import StarRatingFilter from "./StarRatingFilter";
import AmenitiesFilter from "./AmenitiesFilter";
import CheckboxGroupFilter from "./CheckboxGroupFilter";
import PriceRangeSlider from "./PriceRangeSlider";

// ═══════════════════════════════════════════════════════════
// تایپ‌های Config برای فیلترها
// ═══════════════════════════════════════════════════════════

export interface FilterOption {
  id: string;
  label: string;
  icon?: any;
}

export interface RatingOption {
  val: number;
  label: string;
}

export interface BaseFilterConfig {
  type: string;
  stateKey: string;
  title?: string;
  icon?: React.ReactNode;
  defaultOpen?: boolean;
}

export interface SearchFilterConfig extends BaseFilterConfig {
  type: "search";
  placeholder?: string;
  label?: string;
}

export interface CheckboxFilterConfig extends BaseFilterConfig {
  type: "checkbox";
  options: FilterOption[] | string[];
}

export interface RatingFilterConfig extends BaseFilterConfig {
  type: "rating";
  options: RatingOption[];
}

export interface StarRatingFilterConfig extends BaseFilterConfig {
  type: "stars";
  options: number[];
}

export interface AmenitiesFilterConfig extends BaseFilterConfig {
  type: "amenities";
  options: FilterOption[];
  columns?: 2 | 3;
}

export interface PriceRangeFilterConfig extends BaseFilterConfig {
  type: "price-range";
  min: number;
  max: number;
}

export type FilterConfig =
  | SearchFilterConfig
  | CheckboxFilterConfig
  | RatingFilterConfig
  | StarRatingFilterConfig
  | AmenitiesFilterConfig
  | PriceRangeFilterConfig;

// ═══════════════════════════════════════════════════════════
// کامپوننت مادر سایدبار فیلترها
// ═══════════════════════════════════════════════════════════

interface Props<TFilters> {
  filters: TFilters;
  onChange: (filters: TFilters) => void;
  filterConfig: FilterConfig[];
  totalCount?: number;
  filteredCount?: number;
  compact?: boolean;
}

export default function CategoryFiltersSidebar<TFilters extends Record<string, any>>({
  filters,
  onChange,
  filterConfig,
  compact = false,
}: Props<TFilters>) {
  
  // ✅ Guard برای جلوگیری از crash در صورت undefined بودن filters
  if (!filters) {
    return null;
  }
  
  // بررسی اینکه آیا فیلتری فعال است
  const hasActive = filterConfig.some((config) => {
    const value = filters[config.stateKey];
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "string") return value.length > 0;
    if (typeof value === "number") return value > 0;
    if (Array.isArray(value) && value.length === 2) {
      // Price range
      return value[0] > 0 || value[1] < 10000000;
    }
    return false;
  });


  // ریست کردن همه فیلترها
  const reset = () => {
    const resetFilters = { ...filters };
    filterConfig.forEach((config) => {
      const defaultValue = getDefaultValue(config);
      resetFilters[config.stateKey] = defaultValue;
    });
    onChange(resetFilters);
  };

  // مقدار پیش‌فرض برای هر نوع فیلتر
  const getDefaultValue = (config: FilterConfig): any => {
    switch (config.type) {
      case "search":
        return "";
      case "checkbox":
      case "stars":
      case "amenities":
        return [];
      case "rating":
        return 0;
      case "price-range":
        return [config.min, config.max];
      default:
        return null;
    }
  };

  // رندر کردن هر فیلتر بر اساس type
  const renderFilter = (config: FilterConfig) => {
    const { type, stateKey } = config;

    switch (type) {
      case "search":
        return (
          <SearchFilter
            value={filters[stateKey] || ""}
            onChange={(value) => onChange({ ...filters, [stateKey]: value })}
            placeholder={config.placeholder}
            label={config.label}
          />
        );

      case "checkbox":
        return (
          <FilterSection
            title={config.title}
            icon={config.icon}
            badge={filters[stateKey]?.length || undefined}
            defaultOpen={config.defaultOpen}
          >
            <CheckboxGroupFilter
              options={config.options}
              selected={filters[stateKey] || []}
              onChange={(selected) => onChange({ ...filters, [stateKey]: selected })}
            />
          </FilterSection>
        );

      case "rating":
        return (
          <FilterSection
            title={config.title}
            icon={config.icon}
            defaultOpen={config.defaultOpen}
          >
            <RatingFilter
              options={config.options}
              selected={filters[stateKey] || 0}
              onChange={(rating) => onChange({ ...filters, [stateKey]: rating })}
            />
          </FilterSection>
        );

      case "stars":
        return (
          <FilterSection
            title={config.title}
            icon={config.icon}
            badge={filters[stateKey]?.length || undefined}
            defaultOpen={config.defaultOpen}
          >
            <StarRatingFilter
              options={config.options}
              selected={filters[stateKey] || []}
              onChange={(stars) => onChange({ ...filters, [stateKey]: stars })}
            />
          </FilterSection>
        );

      case "amenities":
        return (
          <FilterSection
            title={config.title}
            icon={config.icon}
            badge={filters[stateKey]?.length || undefined}
            defaultOpen={config.defaultOpen}
          >
            <AmenitiesFilter
              options={config.options}
              selected={filters[stateKey] || []}
              onChange={(amenities) => onChange({ ...filters, [stateKey]: amenities })}
              columns={config.columns}
            />
          </FilterSection>
        );

      case "price-range":
        return (
          <FilterSection
            title={config.title}
            icon={config.icon}
            defaultOpen={config.defaultOpen}
          >
            <PriceRangeSlider
              min={config.min}
              max={config.max}
              value={filters[stateKey] || [config.min, config.max]}
              onChange={(range) => onChange({ ...filters, [stateKey]: range })}
            />
          </FilterSection>
        );

      default:
        return null;
    }
  };

  // محتوای داخلی فیلترها
  const filtersContent = (
    <>
      {compact && hasActive && (
        <div className="flex items-center justify-end mb-3 pb-3 border-b border-border">
          <button
            onClick={reset}
            className="flex items-center gap-1 text-[11px] font-bold text-danger hover:text-danger-dark transition cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>پاک کردن فیلترها</span>
          </button>
        </div>
      )}

      {filterConfig.map((config, index) => (
        <div key={index}>{renderFilter(config)}</div>
      ))}
    </>
  );

  // حالت فشرده برای موبایل
  if (compact) {
    return <div className="text-[13px]">{filtersContent}</div>;
  }

  // حالت عادی برای دسکتاپ
  return (
    <aside className="bg-white rounded-lg border border-border overflow-hidden shadow-card hover:shadow-card-hover transition-shadow duration-500 ease-out text-[13px]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-1.5">
          <SlidersHorizontal className="w-4 h-4 text-primary" />
          <span className="font-bold text-text-strong text-sm">فیلترها</span>
        </div>
        {hasActive && (
          <button
            onClick={reset}
            className="flex items-center gap-1 text-[11px] font-bold text-danger hover:text-danger-dark transition cursor-pointer"
          >
            <RotateCcw className="w-3 h-3" />
            <span>پاک کردن</span>
          </button>
        )}
      </div>
      {/* Body */}
      <div className="px-4 py-3">{filtersContent}</div>
    </aside>
  );
}