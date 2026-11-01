// ═══════════════════════════════════════════════════════════
// Base Card Shell
// ═══════════════════════════════════════════════════════════
export { default as BaseCardShell } from "./BaseCardShell";

// ═══════════════════════════════════════════════════════════
// Re-export کارت‌های هتل از مسیر جدید
// ═══════════════════════════════════════════════════════════
export { default as HotelGridCard } from "@/components/hotels/sections/HotelGridCard";
export { default as HotelListItem } from "@/components/hotels/sections/HotelListItem";

// ═══════════════════════════════════════════════════════════
// Re-export کارت‌های مقصد (بعد از ایجاد آنها)
// ═══════════════════════════════════════════════════════════
export { default as DestinationGridCard } from "@/components/destinations/sections/DestinationGridCard";
export { default as DestinationListItem } from "@/components/destinations/sections/DestinationListItem";

// ═══════════════════════════════════════════════════════════
// کارت‌های تور
// ═══════════════════════════════════════════════════════════
export { default as TourCard } from "./TourCard";
export { default as TourCategoryCard } from "./TourCategoryCard";
export { default as TourPackageCard } from "./TourPackageCard";

// ═══════════════════════════════════════════════════════════
// کارت‌های محتوا
// ═══════════════════════════════════════════════════════════
export { default as PostCard } from "./PostCard";
export { default as ArticleCard, FeaturedArticle, CompactArticle, NewsCard } from "./ArticleCard";

// ═══════════════════════════════════════════════════════════
// کارت‌های موجود قبلی
// ═══════════════════════════════════════════════════════════
export { default as StoryCard } from "./StoryCard";
export { default as VisaCard } from "./VisaCard";
export { default as CollectionCard } from "./CollectionCard";

// ═══════════════════════════════════════════════════════════
// Types & Utils
// ═══════════════════════════════════════════════════════════
export type {
  CardVariant,
  AccentColor,
  BadgeColor,
  HoverEffect,
  CardMeta,
  CardBadge,
  CardProps,
} from "./types";

export * from "./utils";