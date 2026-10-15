"use client";

import { useState, useRef, useEffect } from "react";
import { MapPin, Star, X, SlidersHorizontal, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const countries = [
  { id: "all", label: "همه مقاصد", flag: "🌍" },
  { id: "turkey", label: "ترکیه", flag: "🇹🇷" },
  { id: "thailand", label: "تایلند", flag: "🇹🇭" },
  { id: "russia", label: "روسیه", flag: "🇷🇺" },
];

const starOptions = [
  { id: "all", label: "همه ستاره‌ها" },
  { id: "5", label: "۵ ستاره" },
  { id: "4", label: "۴ ستاره" },
];

const amenityOptions = [
  { id: "pool", label: "استخر", icon: "💦" },
  { id: "spa", label: "اسپا", icon: "💆" },
  { id: "wifi", label: "وای‌فای", icon: "📶" },
  { id: "restaurant", label: "رستوران", icon: "🍽️" },
  { id: "parking", label: "پارکینگ", icon: "🅿️" },
  { id: "seaview", label: "ویو دریا", icon: "🌊" },
  { id: "gym", label: "باشگاه", icon: "🏋️" },
  { id: "family", label: "خانوادگی", icon: "👨‍👩‍👧" },
];

export interface FiltersState {
  country: string;
  stars: string;
  amenities: string[];
  sort: string;
}

interface MobileFilterChipsProps {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  filteredCount: number;
  totalCount: number;
}

export default function MobileFilterChips({
  filters,
  onChange,
  filteredCount,
  totalCount,
}: MobileFilterChipsProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // بستن dropdown با کلیک بیرون
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    if (openDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [openDropdown]);

  const toggleAmenity = (id: string) => {
    const newAmenities = filters.amenities.includes(id)
      ? filters.amenities.filter((a) => a !== id)
      : [...filters.amenities, id];
    onChange({ ...filters, amenities: newAmenities });
  };

  const removeFilter = (type: "country" | "stars" | "amenity", value?: string) => {
    if (type === "country") {
      onChange({ ...filters, country: "all" });
    } else if (type === "stars") {
      onChange({ ...filters, stars: "all" });
    } else if (type === "amenity" && value) {
      onChange({
        ...filters,
        amenities: filters.amenities.filter((a) => a !== value),
      });
    }
  };

  const clearAll = () => {
    onChange({
      country: "all",
      stars: "all",
      amenities: [],
      sort: filters.sort,
    });
  };

  // محاسبه فیلترهای فعال
  const activeFilters = [];
  if (filters.country !== "all") {
    const country = countries.find((c) => c.id === filters.country);
    activeFilters.push({
      type: "country" as const,
      label: `${country?.flag} ${country?.label}`,
      value: filters.country,
    });
  }
  if (filters.stars !== "all") {
    const star = starOptions.find((s) => s.id === filters.stars);
    activeFilters.push({
      type: "stars" as const,
      label: star?.label || "",
      value: filters.stars,
    });
  }
  filters.amenities.forEach((amenityId) => {
    const amenity = amenityOptions.find((a) => a.id === amenityId);
    if (amenity) {
      activeFilters.push({
        type: "amenity" as const,
        label: `${amenity.icon} ${amenity.label}`,
        value: amenityId,
      });
    }
  });

  return (
    <div className="lg:hidden sticky top-16 z-30 bg-white border-b border-slate-200 shadow-sm">
      {/* Main Chips Row */}
      <div className="px-4 py-3">
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          {/* مقصد Chip */}
          <div className="relative flex-shrink-0" ref={openDropdown === "country" ? dropdownRef : null}>
            <button
              onClick={() => setOpenDropdown(openDropdown === "country" ? null : "country")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-bold transition-all whitespace-nowrap",
                filters.country !== "all"
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-slate-200 bg-white text-slate-700"
              )}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>
                {filters.country === "all"
                  ? "مقصد"
                  : countries.find((c) => c.id === filters.country)?.label}
              </span>
            </button>

            {openDropdown === "country" && (
              <div className="absolute top-full right-0 mt-2 w-48 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden">
                {countries.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => {
                      onChange({ ...filters, country: c.id });
                      setOpenDropdown(null);
                    }}
                    className={cn(
                      "w-full flex items-center gap-2 px-3 py-2.5 text-sm hover:bg-slate-50 transition-colors",
                      filters.country === c.id && "bg-brand-50 text-brand-700"
                    )}
                  >
                    <span>{c.flag}</span>
                    <span className="flex-1 text-right">{c.label}</span>
                    {filters.country === c.id && (
                      <Check className="w-4 h-4 text-brand-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ستاره Chip */}
          <div className="relative flex-shrink-0" ref={openDropdown === "stars" ? dropdownRef : null}>
            <button
              onClick={() => setOpenDropdown(openDropdown === "stars" ? null : "stars")}
              className={cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-bold transition-all whitespace-nowrap",
                filters.stars !== "all"
                  ? "border-brand-500 bg-brand-50 text-brand-700"
                  : "border-slate-200 bg-white text-slate-700"
              )}
            >
              <Star className="w-3.5 h-3.5" />
              <span>
                {filters.stars === "all"
                  ? "ستاره"
                  : starOptions.find((s) => s.id === filters.stars)?.label}
              </span>
            </button>

            {openDropdown === "stars" && (
              <div className="absolute top-full right-0 mt-2 w-40 bg-white rounded-xl border border-slate-200 shadow-xl z-50 overflow-hidden">
                {starOptions.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      onChange({ ...filters, stars: s.id });
                      setOpenDropdown(null);
                    }}
                    className={cn(
                      "w-full flex items-center justify-between px-3 py-2.5 text-sm hover:bg-slate-50 transition-colors",
                      filters.stars === s.id && "bg-brand-50 text-brand-700"
                    )}
                  >
                    <span>{s.label}</span>
                    {filters.stars === s.id && (
                      <Check className="w-4 h-4 text-brand-600" />
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Amenities Quick Chips */}
          {amenityOptions.slice(0, 4).map((amenity) => {
            const isActive = filters.amenities.includes(amenity.id);
            return (
              <button
                key={amenity.id}
                onClick={() => toggleAmenity(amenity.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-bold transition-all whitespace-nowrap flex-shrink-0",
                  isActive
                    ? "border-brand-500 bg-brand-50 text-brand-700"
                    : "border-slate-200 bg-white text-slate-700"
                )}
              >
                <span>{amenity.icon}</span>
                <span>{amenity.label}</span>
              </button>
            );
          })}

          {/* Counter Chip */}
          <div className="flex-shrink-0 px-3 py-2 rounded-full bg-slate-100 text-xs font-bold text-slate-600 whitespace-nowrap">
            {filteredCount} از {totalCount}
          </div>
        </div>
      </div>

      {/* Active Filters Row */}
      {activeFilters.length > 0 && (
        <div className="px-4 pb-3 flex items-center gap-2 overflow-x-auto scrollbar-hide" style={{ scrollbarWidth: "none" }}>
          <span className="text-[11px] text-slate-500 flex-shrink-0">فیلترها:</span>
          {activeFilters.map((filter, i) => (
            <button
              key={i}
              onClick={() => removeFilter(filter.type, filter.value)}
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-100 text-brand-700 text-[11px] font-bold whitespace-nowrap flex-shrink-0"
            >
              <span>{filter.label}</span>
              <X className="w-3 h-3" />
            </button>
          ))}
          <button
            onClick={clearAll}
            className="text-[11px] font-bold text-red-500 whitespace-nowrap flex-shrink-0"
          >
            پاک کردن همه
          </button>
        </div>
      )}
    </div>
  );
}