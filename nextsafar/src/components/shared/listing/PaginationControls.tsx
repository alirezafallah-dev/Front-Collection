"use client";

import { ChevronDown, Eye, CheckCircle2 } from "lucide-react";
import { faDigits } from "@/lib/api/hotels";
import type { PaginationControlsProps } from "./types";

export default function PaginationControls({
  hasMore,
  visibleCount,
  totalCount,
  remainingCount,
  allShown,
  itemLabel,
  onLoadMore,
  onShowAll,
  onShowLess,
}: PaginationControlsProps) {
  const progressPercent = (visibleCount / totalCount) * 100;

  return (
    <div className="flex flex-col items-center gap-3 mt-8">
      {/* نوار پیشرفت */}
      <div className="w-full max-w-sm">
        <div className="flex items-center justify-between mb-1.5 text-[11px] text-text-muted">
          <span>
            {faDigits(visibleCount)} از {faDigits(totalCount)} {itemLabel}
          </span>
          <span>{Math.round(progressPercent)}٪</span>
        </div>
        <div className="h-1 bg-border rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-l from-primary to-primary-dark transition-all duration-500 rounded-full"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* دکمه‌ها */}
      <div className="flex items-center gap-2 flex-wrap justify-center">
        {/* دکمه مشاهده بیشتر */}
        {hasMore && (
          <button
            onClick={onLoadMore}
            className="flex items-center gap-2 px-5 py-2.5 rounded-[10px] md:rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-bold text-sm transition-all duration-500 ease-out cursor-pointer group hover:shadow-md"
          >
            <Eye className="w-4 h-4" />
            مشاهده بیشتر
            {remainingCount > 0 && (
              <span className="px-1.5 py-0.5 rounded-md bg-primary text-white text-[10px] font-bold">
                +{faDigits(Math.min(remainingCount, 10))}
              </span>
            )}
            <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
          </button>
        )}

        {/* دکمه نمایش همه */}
        {hasMore && remainingCount > 10 && (
          <button
            onClick={onShowAll}
            className="flex items-center gap-2 px-5 py-2.5 rounded-[10px] md:rounded-lg border border-border hover:border-primary-light bg-white hover:bg-bg-sec text-text-strong font-bold text-sm transition-all duration-500 ease-out cursor-pointer hover:shadow-md"
          >
            نمایش همه {faDigits(totalCount)} {itemLabel}
          </button>
        )}

        {/* دکمه نمایش کمتر */}
        {allShown && visibleCount > 12 && (
          <button
            onClick={onShowLess}
            className="flex items-center gap-2 px-5 py-2.5 rounded-[10px] md:rounded-lg bg-success/10 hover:bg-success/20 text-success font-bold text-sm transition-all cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            نمایش کمتر
          </button>
        )}
      </div>

      {/* پیام پایان */}
      {allShown && visibleCount > 12 && (
        <p className="text-xs text-text-muted text-center mt-1">
          تمام {itemLabel}‌ها نمایش داده شدند
        </p>
      )}
    </div>
  );
}