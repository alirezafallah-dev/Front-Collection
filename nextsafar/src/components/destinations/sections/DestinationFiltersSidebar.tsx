"use client";

import {
  Tag,
  Clock,
  Sun,
  Waves,
  Sparkles,
  Compass,
  Calendar,
  Flower2,
  Snowflake,
  Leaf,
  Umbrella,
  Hourglass,
} from "lucide-react";
import CategoryFiltersSidebar, {
  FilterConfig,
} from "@/components/shared/filters/CategoryFiltersSidebar";
import type { DestinationFiltersState } from "../constants";
import {
  TYPE_OPTIONS,
  ACTIVITY_OPTIONS,
  DURATION_OPTIONS,
  SEASON_OPTIONS,
  RATING_OPTIONS,
} from "../constants";

// ═══════════════════════════════════════════════════════════
// 🎨 آیکون‌های اختصاصی برای هر نوع مقصد
// ═══════════════════════════════════════════════════════════
const TYPE_ICONS: Record<string, any> = {
  "تاریخی": Compass,
  "طبیعی": Leaf,
  "مدرن": Tag,
  "فرهنگی": Tag,
  "مذهبی": Tag,
  "تفریحی": Waves,
};

const TYPE_OPTIONS_WITH_ICONS = TYPE_OPTIONS.map((opt) => ({
  ...opt,
  icon: TYPE_ICONS[opt.id] || Tag,
}));

// ═══════════════════════════════════════════════════════════
// 🎨 آیکون‌های اختصاصی برای فعالیت‌ها
// ═══════════════════════════════════════════════════════════
const ACTIVITY_ICONS: Record<string, any> = {
  عکاسی: Sparkles,
  "پیاده‌روی": Compass,
  خرید: Tag,
  "طبیعت‌گردی": Leaf,
  غذا: Waves,
  "کافه‌گردی": Waves,
  معماری: Tag,
  تاریخ: Compass,
  فرهنگ: Tag,
  مذهبی: Tag,
  شنا: Waves,
  غواصی: Waves,
  کوهنوردی: Compass,
  دوچرخه: Compass,
  ساحل: Sun,
};

const ACTIVITY_OPTIONS_WITH_ICONS = ACTIVITY_OPTIONS.map((opt) => ({
  ...opt,
  icon: ACTIVITY_ICONS[opt.id] || Tag,
}));

// ═══════════════════════════════════════════════════════════
// 🎨 آیکون‌های اختصاصی برای مدت بازدید
// ═══════════════════════════════════════════════════════════
const DURATION_ICONS: Record<string, any> = {
  "نیم روز": Hourglass,
  "یک روز کامل": Sun,
  "۲-۳ روز": Calendar,
  "یک هفته": Calendar,
};

const DURATION_OPTIONS_WITH_ICONS = DURATION_OPTIONS.map((opt) => ({
  ...opt,
  icon: DURATION_ICONS[opt.id] || Clock,
}));

// ═══════════════════════════════════════════════════════════
// 🎨 آیکون‌های اختصاصی برای فصل (جذاب‌ترین بخش!)
// ═══════════════════════════════════════════════════════════
const SEASON_ICONS: Record<string, any> = {
  "بهار": Flower2,
  "تابستان": Sun,
  "پاییز": Leaf,
  "زمستان": Snowflake,
  "تمام فصول": Umbrella,
};

const SEASON_OPTIONS_WITH_ICONS = SEASON_OPTIONS.map((opt) => ({
  ...opt,
  icon: SEASON_ICONS[opt.id] || Calendar,
}));

// ═══════════════════════════════════════════════════════════
// 🎯 Config فیلترهای مدرن مقصد - همه از type amenities
// ═══════════════════════════════════════════════════════════
const DESTINATION_FILTER_CONFIG: FilterConfig[] = [
  {
    type: "search",
    stateKey: "search",
    placeholder: "نام مقصد، شهر یا کشور...",
    label: "جستجوی مقصد",
  },
  {
    type: "amenities",
    stateKey: "types",
    title: "نوع مقصد",
    icon: <Tag className="w-3.5 h-3.5 text-primary" />,
    options: TYPE_OPTIONS_WITH_ICONS,
    columns: 2,
  },
  {
    type: "amenities",
    stateKey: "activities",
    title: "فعالیت‌ها",
    icon: <Waves className="w-3.5 h-3.5 text-primary" />,
    options: ACTIVITY_OPTIONS_WITH_ICONS,
    columns: 2,
  },
  {
    type: "amenities",
    stateKey: "durations",
    title: "مدت بازدید",
    icon: <Clock className="w-3.5 h-3.5 text-primary" />,
    options: DURATION_OPTIONS_WITH_ICONS,
    columns: 2,
  },
  {
    type: "amenities",
    stateKey: "seasons",
    title: "فصل مناسب سفر",
    icon: <Calendar className="w-3.5 h-3.5 text-primary" />,
    options: SEASON_OPTIONS_WITH_ICONS,
    columns: 2,
  },
  {
    type: "rating",
    stateKey: "minRating",
    title: "امتیاز بازدیدکنندگان",
    icon: <Sparkles className="w-3.5 h-3.5 text-primary" />,
    options: RATING_OPTIONS,
  },
];

interface Props {
  filters: DestinationFiltersState;
  onChange: (f: DestinationFiltersState) => void;
  totalCount: number;
  filteredCount: number;
  compact?: boolean;
}

export default function DestinationFiltersSidebar({
  filters,
  onChange,
  totalCount,
  filteredCount,
  compact = false,
}: Props) {
  return (
    <CategoryFiltersSidebar
      filters={filters}
      onChange={onChange}
      filterConfig={DESTINATION_FILTER_CONFIG}
      totalCount={totalCount}
      filteredCount={filteredCount}
      compact={compact}
    />
  );
}