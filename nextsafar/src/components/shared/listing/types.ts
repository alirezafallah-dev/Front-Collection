import type { ReactNode } from "react";

// ═══════════════════════════════════════════════════════════
// Types موجود (از قبل)
// ═══════════════════════════════════════════════════════════

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

// ═══════════════════════════════════════════════════════════
// Types جدید (برای Layout و Toolbar)
// ═══════════════════════════════════════════════════════════

export type SortOption =
  | "recommended"
  | "price_low"
  | "price_high"
  | "rating"
  | "stars"
  | "reviews"
  | "name"
  | "popular"
  | "price_asc"
  | "price_desc"
  | "duration_asc"
  | "duration_desc";

export interface SortOptionConfig {
  value: SortOption;
  label: string;
}

export interface ListingToolbarProps {
  filteredCount: number;
  activeCount?: number;
  totalCount?: number;
  sortBy: SortOption;
  view: ViewMode;
  onSortChange: (sort: SortOption) => void;
  onViewChange: (view: ViewMode) => void;
  onMobileFilterClick?: () => void;
  sortOptions?: SortOptionConfig[];
  showViewToggle?: boolean;
  itemLabel?: string;
}

export interface ListingLayoutProps {
  toolbar: ReactNode;
  mobileFilterChips?: ReactNode;
  mobileMap?: ReactNode;
  sidebar: ReactNode;
  results: ReactNode;
  mobileFilterSheet?: ReactNode;
  bottomSections?: ReactNode;
  className?: string;
}

export interface ListingFilter {
  id: string;
  label: string;
  type: "checkbox" | "radio" | "range" | "select";
  options?: Array<{ value: string; label: string; count?: number }>;
  min?: number;
  max?: number;
  defaultValue?: any;
}

export interface ListingFiltersState {
  [key: string]: any;
}