"use client";

import { Star, Waves, Users, Sparkles, Wifi, Car, Dumbbell, Utensils, Coffee } from "lucide-react";
import CategoryFiltersSidebar, { FilterConfig } from "@/components/shared/filters/CategoryFiltersSidebar";
import type { HotelFiltersState } from "../constants";

// ═══ آپشن‌های فیلتر هتل ═══
const STAR_OPTIONS = [5, 4, 3];

const AMENITY_OPTIONS = [
  { id: "wifi", label: "وای‌فای", icon: Wifi },
  { id: "pool", label: "استخر", icon: Waves },
  { id: "parking", label: "پارکینگ", icon: Car },
  { id: "gym", label: "باشگاه", icon: Dumbbell },
  { id: "spa", label: "اسپا", icon: Sparkles },
  { id: "restaurant", label: "رستوران", icon: Utensils },
  { id: "breakfast", label: "صبحانه", icon: Coffee },
  { id: "beach", label: "ساحل", icon: Waves },
];

const RATING_OPTIONS = [
  { val: 9, label: "عالی ۹+" },
  { val: 8, label: "خیلی خوب ۸+" },
  { val: 7, label: "خوب ۷+" },
];

// ═══ Config فیلترهای هتل ═══
const HOTEL_FILTER_CONFIG: FilterConfig[] = [
  {
    type: "search",
    stateKey: "search",
    placeholder: "نام هتل...",
    label: "جستجوی هتل",
  },
  {
    type: "stars",
    stateKey: "stars",
    title: "ستاره هتل",
    icon: <Star className="w-3.5 h-3.5" />,
    options: STAR_OPTIONS,
  },
  {
    type: "rating",
    stateKey: "minRating",
    title: "امتیاز مهمان",
    icon: <Sparkles className="w-3.5 h-3.5" />,
    options: RATING_OPTIONS,
  },
  {
    type: "amenities",
    stateKey: "amenities",
    title: "امکانات",
    icon: <Waves className="w-3.5 h-3.5" />,
    options: AMENITY_OPTIONS,
  },
  {
    type: "checkbox",
    stateKey: "accommodationTypes",
    title: "نوع اقامت",
    icon: <Users className="w-3.5 h-3.5" />,
    options: ["هتل", "هتل آپارتمان", "اقامتگاه بوم‌گردی", "ویلا"],
    defaultOpen: false,
  },
];

// ═══ Props ═══
interface Props {
  filters: HotelFiltersState;
  onChange: (f: HotelFiltersState) => void;
  totalCount: number;
  filteredCount: number;
  priceMax: number;
  compact?: boolean;
}

export default function HotelFiltersSidebar({
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
      filterConfig={HOTEL_FILTER_CONFIG}
      totalCount={totalCount}
      filteredCount={filteredCount}
      compact={compact}
    />
  );
}