"use client";

import { useEffect, useState } from "react";
import { X, SlidersHorizontal, RotateCcw, Search, Star, Sparkles, Waves, UtensilsCrossed, Wifi, Car, Dumbbell, Coffee, MapPin } from "lucide-react";
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

interface MobileFilterSheetProps {
  filters: FiltersState;
  onChange: (filters: FiltersState) => void;
  filteredCount: number;
  totalCount: number;
}

export default function MobileFilterSheet({
  filters,
  onChange,
  filteredCount,
  totalCount,
}: MobileFilterSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempFilters, setTempFilters] = useState<FiltersState>(filters);

  useEffect(() => {
    if (isOpen) {
      setTempFilters(filters);
    }
  }, [isOpen, filters]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const toggleArrayFilter = (
    key: "stars" | "amenities" | "neighborhood",
    value: any
  ) => {
    setTempFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v: any) => v !== value)
        : [...prev[key], value],
    }));
  };

  const clearAll = () => {
    setTempFilters({ search: "", stars: [], amenities: [], neighborhood: [] });
  };

  const applyFilters = () => {
    onChange(tempFilters);
    setIsOpen(false);
  };

  const activeCount =
    (filters.search !== "" ? 1 : 0) +
    filters.stars.length +
    filters.amenities.length +
    filters.neighborhood.length;

  return (
    <>
      {/* Trigger Button */}
      <div className="lg:hidden sticky top-16 z-30 bg-white border-b border-slate-200 shadow-sm">
        <div className="px-4 py-3 flex items-center gap-3">
          <button
            onClick={() => setIsOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 h-11 rounded-xl bg-navy-900 hover:bg-navy-800 text-white font-bold text-sm transition-colors"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>فیلترها</span>
            {activeCount > 0 && (
              <span className="min-w-[20px] h-5 px-1.5 rounded-full bg-brand-500 text-white text-[10px] font-black flex items-center justify-center">
                {activeCount}
              </span>
            )}
          </button>
          <div className="flex items-center gap-1.5 text-xs text-slate-600">
            <span className="font-black text-navy-900">{filteredCount}</span>
            <span>از {totalCount} هتل</span>
          </div>
        </div>
      </div>

      {/* Bottom Sheet */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-navy-900/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 max-h-[92vh] bg-white rounded-t-3xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-5 h-5 text-brand-500" />
                <h2 className="text-lg font-black text-navy-900">فیلترها</h2>
                {activeCount > 0 && (
                  <span className="px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 text-[10px] font-black">
                    {activeCount} فعال
                  </span>
                )}
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center"
              >
                <X className="w-5 h-5 text-slate-600" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-6">
              {/* جستجو */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-navy-900 mb-3">
                  <Search className="w-4 h-4 text-brand-500" />
                  جستجوی هتل
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={tempFilters.search}
                    onChange={(e) =>
                      setTempFilters({ ...tempFilters, search: e.target.value })
                    }
                    placeholder="نام هتل (فارسی یا انگلیسی)"
                    className="w-full h-11 px-4 pr-10 rounded-xl border-2 border-slate-200 text-sm outline-none focus:border-brand-500 transition-colors"
                  />
                  <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>

              {/* ستاره */}
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-navy-900 mb-3">
                  <Star className="w-4 h-4 text-brand-500" />
                  ستاره هتل
                </h3>
                <div className="flex gap-2">
                  {starOptions.map((star) => {
                    const isActive = tempFilters.stars.includes(star);
                    return (
                      <button
                        key={star}
                        onClick={() => toggleArrayFilter("stars", star)}
                        className={cn(
                          "flex-1 flex items-center justify-center gap-0.5 p-3 rounded-xl border-2 transition-all",
                          isActive
                            ? "border-brand-500 bg-brand-50"
                            : "border-slate-200"
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

              {/* امکانات */}
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-navy-900 mb-3">
                  <Sparkles className="w-4 h-4 text-brand-500" />
                  امکانات هتل
                </h3>
                <div className="grid grid-cols-2 gap-2">
                  {amenityOptions.map((amenity) => {
                    const isActive = tempFilters.amenities.includes(amenity.id);
                    const Icon = amenity.icon;
                    return (
                      <button
                        key={amenity.id}
                        onClick={() => toggleArrayFilter("amenities", amenity.id)}
                        className={cn(
                          "flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all",
                          isActive
                            ? "border-brand-500 bg-brand-50"
                            : "border-slate-200"
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
                    const isActive = tempFilters.neighborhood.includes(n);
                    return (
                      <button
                        key={n}
                        onClick={() => toggleArrayFilter("neighborhood", n)}
                        className={cn(
                          "px-3 py-2 rounded-full border-2 text-xs font-bold transition-all",
                          isActive
                            ? "border-brand-500 bg-brand-50 text-brand-700"
                            : "border-slate-200 text-slate-600"
                        )}
                      >
                        {n}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-slate-200 p-4 bg-white space-y-2">
              <div className="text-center text-xs text-slate-500 mb-2">
                <span className="font-black text-navy-900">{filteredCount}</span> هتل یافت شد
              </div>
              <div className="flex gap-2">
                <button
                  onClick={clearAll}
                  className="flex items-center justify-center gap-1.5 h-12 px-4 rounded-xl border-2 border-slate-200 text-slate-700 font-bold text-sm hover:bg-slate-50 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>پاک کردن</span>
                </button>
                <button
                  onClick={applyFilters}
                  className="flex-1 h-12 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm shadow-lg shadow-brand-500/30 transition-all"
                >
                  نمایش {filteredCount} هتل
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}