import type { ReactNode } from "react";

export type ViewMode = "grid" | "list";

export interface PaginationControlsProps {
  hasMore: boolean;
  visibleCount: number;
  totalCount: number;
  remainingCount: number;
  allShown: boolean;
  itemLabel: string;
  onLoadMore: () => void;
  onShowAll: () => void;
  onShowLess: () => void;
}

export interface EmptyStateProps {
  icon?: ReactNode;
  title?: string;
  message?: string;
}

export interface ListingResultsProps<T> {
  /** آرایه‌ای از آیتم‌ها */
  items: T[];
  /** حالت نمایش: grid یا list */
  view: ViewMode;
  /** تابع رندر کارت در حالت Grid */
  renderCard: (item: T, index: number) => ReactNode;
  /** تابع رندر کارت در حالت List (اختیاری - اگر نباشد از renderCard استفاده می‌شود) */
  renderListCard?: (item: T, index: number) => ReactNode;
  /** نام آیتم برای نمایش در pagination (مثل "هتل" یا "مقصد") */
  itemLabel: string;
  /** کلید منحصر به فرد برای هر آیتم */
  getKey: (item: T) => string | number;
  /** آیکون حالت خالی */
  emptyIcon?: ReactNode;
  /** عنوان حالت خالی */
  emptyTitle?: string;
  /** پیام حالت خالی */
  emptyMessage?: string;
  /** تعداد آیتم در هر صفحه برای حالت list (پیش‌فرض: 10) */
  listPageSize?: number;
  /** تعداد آیتم در هر صفحه برای حالت grid (پیش‌فرض: 12) */
  gridPageSize?: number;
  /** کلاس اضافی برای grid */
  gridClassName?: string;
  /** کلاس اضافی برای list */
  listClassName?: string;
}