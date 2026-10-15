"use client";

import { Search, Star, RotateCcw, Waves, UtensilsCrossed, Wifi, Car, Dumbbell, Sparkles, Coffee, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

const starOptions = [5, 4, 3];

const amenityOptions = [
  { id: "pool", label: "استخر", icon: Waves },
  { id: "restaurant", label: "رستوران", icon: UtensilsCrossed },
  { id: "wifi", label: "وای‌فای", icon: Wifi },
  { id: "parking", label: "پارکینگ", icon: Car },
  { id: "gym", label: "باشگاه", icon: Dumbbell },
  { id: "spa", label: "اسپا", icon: Sparkles },
  { id: "breakfast", label: "صبحانه", icon: Coffee },
  { id: "seaview", label: "ویو دریا", icon: Waves },
];

const neighborhoods = [
  "بشیکتاش", "تکسیم", "سلطان احمد", "مرکز تاریخی",
  "بنگ راک", "لاگونا پوکت", "ناکلو", "آربات", "میدان سرخ",
];

export interface FiltersState {
  search: string;
  stars: number[];
  amenities: string[];
  neighborhood: string[];
}

interface HotelsFiltersProps {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  totalCount: number;
  filteredCount: number;
}

export default function HotelsFilters({
  filters,
  onChange,
  totalCount,
  filteredCount,
}: HotelsFiltersProps) {
  const toggleArrayFilter = (
    key: "stars" | "amenities" | "neighborhood",
    value: any
  ) => {
    onChange({
      ...filters,
      [key]: filters[key].includes(value)
        ? filters[key].filter((v: any) => v !== value)
        : [...filters[key], value],
    });
  };

  const resetFilters = () => {
    onChange({
      search: "",
      stars: [],
      amenities: [],
      neighborhood: [],
    });
  };

  const hasActiveFilters =
    filters.search !== "" ||
    filters.stars.length > 0 ||
    filters.amenities.length > 0 ||
    filters.neighborhood.length > 0;

  return (
    <aside className="hidden lg:block w-80 flex-shrink-0">
      {/* 🎯 Sticky - تا زمانی که parent اجازه بده */}
      <div className="sticky top-24 bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 pb-4 border-b border-slate-100">
          <div>
            <div className="text-xs text-slate-500">نتایج</div>
            <div className="text-lg font-black text-navy-900">
              {filteredCount}{" "}
              <span className="text-sm font-medium text-slate-400">
                از {totalCount}
              </span>
            </div>
          </div>
          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="flex items-center gap-1.5 text-xs font-bold text-red-500 hover:text-red-600"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>پاک کردن</span>
            </button>
          )}
        </div>

        <div className="space-y-6">
          {/* جستجو نام هتل */}
          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-navy-900 mb-3">
              <Search className="w-4 h-4 text-brand-500" />
              جستجوی هتل
            </label>
            <div className="relative">
              <input
                type="text"
                value={filters.search}
                onChange={(e) => onChange({ ...filters, search: e.target.value })}
                placeholder="نام هتل (فارسی یا انگلیسی)"
                className="w-full h-11 px-4 pr-10 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-brand-500 transition-colors"
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
            </div>
          </div>

          {/* ستاره هتل */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold text-navy-900 mb-3">
              <Star className="w-4 h-4 text-brand-500" />
              ستاره هتل
            </h3>
            <div className="flex gap-2">
              {starOptions.map((star) => {
                const isActive = filters.stars.includes(star);
                return (
                  <button
                    key={star}
                    onClick={() => toggleArrayFilter("stars", star)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-0.5 p-3 rounded-xl border-2 transition-all",
                      isActive
                        ? "border-brand-500 bg-brand-50"
                        : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    {[...Array(star)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-3.5 h-3.5",
                          isActive
                            ? "text-yellow-500 fill-yellow-500"
                            : "text-slate-300 fill-slate-300"
                        )}
                      />
                    ))}
                  </button>
                );
              })}
            </div>
          </div>

          {/* امکانات - 4 سطر 2 تایی */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold text-navy-900 mb-3">
              <Sparkles className="w-4 h-4 text-brand-500" />
              امکانات هتل
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {amenityOptions.map((amenity) => {
                const isActive = filters.amenities.includes(amenity.id);
                const Icon = amenity.icon;
                return (
                  <button
                    key={amenity.id}
                    onClick={() => toggleArrayFilter("amenities", amenity.id)}
                    className={cn(
                      "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all",
                      isActive
                        ? "border-brand-500 bg-brand-50"
                        : "border-slate-200 hover:border-slate-300"
                    )}
                  >
                    <div
                      className={cn(
                        "w-10 h-10 rounded-lg flex items-center justify-center transition-colors",
                        isActive
                          ? "bg-brand-500 text-white"
                          : "bg-slate-100 text-slate-500"
                      )}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-medium text-navy-900">
                      {amenity.label}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* مناطق */}
          <div>
            <h3 className="flex items-center gap-2 text-sm font-bold text-navy-900 mb-3">
              <MapPin className="w-4 h-4 text-brand-500" />
              مناطق و محله‌ها
            </h3>
            <div className="flex flex-wrap gap-2">
              {neighborhoods.map((n) => {
                const isActive = filters.neighborhood.includes(n);
                return (
                  <button
                    key={n}
                    onClick={() => toggleArrayFilter("neighborhood", n)}
                    className={cn(
                      "px-3 py-2 rounded-full border-2 text-xs font-bold transition-all",
                      isActive
                        ? "border-brand-500 bg-brand-50 text-brand-700"
                        : "border-slate-200 text-slate-600 hover:border-slate-300"
                    )}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}