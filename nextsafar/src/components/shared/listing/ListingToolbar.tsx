"use client";

import { SlidersHorizontal, LayoutGrid, List, ChevronDown } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";
import { faDigits } from "@/lib/api/hotels";
import type { ListingToolbarProps, SortOption, SortOptionConfig } from "./types";

const DEFAULT_SORT_OPTIONS: SortOptionConfig[] = [
  { value: "recommended", label: "پیشنهادی" },
  { value: "rating", label: "بیشترین امتیاز" },
  { value: "reviews", label: "بیشترین نظرات" },
  { value: "price_low", label: "ارزان‌ترین" },
  { value: "price_high", label: "گران‌ترین" },
  { value: "name", label: "نام (الفبا)" },
];

export default function ListingToolbar({
  filteredCount,
  activeCount,
  totalCount,
  sortBy,
  view,
  onSortChange,
  onViewChange,
  onMobileFilterClick,
  sortOptions = DEFAULT_SORT_OPTIONS,
  showViewToggle = true,
  itemLabel = "مورد",
}: ListingToolbarProps) {
  const isMobile = useMediaQuery("(max-width: 1023px)");

  return (
    <div className="flex items-center justify-between gap-3 mb-5 md:mb-6 flex-wrap">
      {/* ═══ چپ: تعداد نتایج ═══ */}
      <div className="flex items-center gap-2">
        <h1 className="text-base md:text-lg font-extrabold text-text-strong">
          <span className="text-primary">{faDigits(filteredCount)}</span>{" "}
          <span className="text-text-strong">{itemLabel}</span>
          {activeCount !== undefined &&
            totalCount !== undefined &&
            activeCount > 0 && (
              <span className="text-text-muted text-xs font-normal mr-2">
                (از {faDigits(totalCount)})
              </span>
            )}
        </h1>
      </div>

      {/* ═══ راست: مرتب‌سازی + دکمه فیلتر موبایل + view toggle ═══ */}
      <div className="flex items-center gap-2">
        {/* مرتب‌سازی */}
        <div className="relative">
          <select
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value as SortOption)}
            className="appearance-none pe-8 ps-3 py-2.5 rounded-md border border-border bg-white text-xs font-bold text-text-strong hover:border-primary transition cursor-pointer focus:outline-none focus:border-primary"
          >
            {sortOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <ChevronDown className="w-4 h-4 text-text-muted absolute end-2 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>

        {/* View Toggle - فقط دسکتاپ */}
        {showViewToggle && !isMobile && (
          <div className="flex items-center rounded-md border border-border bg-white p-1">
            <button
              onClick={() => onViewChange("grid")}
              className={`p-1.5 rounded-sm transition ${
                view === "grid"
                  ? "bg-primary text-white"
                  : "text-text-muted hover:text-primary"
              }`}
              aria-label="نمایش گرید"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => onViewChange("list")}
              className={`p-1.5 rounded-sm transition ${
                view === "list"
                  ? "bg-primary text-white"
                  : "text-text-muted hover:text-primary"
              }`}
              aria-label="نمایش لیست"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* دکمه فیلتر موبایل */}
        {isMobile && onMobileFilterClick && (
          <button
            onClick={onMobileFilterClick}
            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-md border border-border bg-white text-xs font-bold text-text hover:border-primary hover:text-primary transition"
          >
            <SlidersHorizontal className="w-4 h-4" />
            فیلتر
          </button>
        )}
      </div>
    </div>
  );
}