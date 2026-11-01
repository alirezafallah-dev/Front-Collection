export const VIEW_MODES = ["grid", "list"] as const;
export type ViewMode = (typeof VIEW_MODES)[number];

export const SORT_OPTIONS = [
  { key: "rating", label: "بیشترین امتیاز" },
  { key: "reviews", label: "بیشترین بازدید" },
  { key: "price_asc", label: "ارزان‌ترین" },
  { key: "price_desc", label: "گران‌ترین" },
  { key: "duration_asc", label: "کوتاه‌ترین بازدید" },
  { key: "duration_desc", label: "طولانی‌ترین بازدید" },
] as const;

export type SortKey = (typeof SORT_OPTIONS)[number]["key"];

export interface DestinationFiltersState {
  search: string;
  types: string[];
  activities: string[];
  priceLevels: string[];
  durations: string[];
  seasons: string[];
  minRating: number;
}

export const DEFAULT_FILTERS: DestinationFiltersState = {
  search: "",
  types: [],
  activities: [],
  priceLevels: [],
  durations: [],
  seasons: [],
  minRating: 0,
};

export const TYPE_OPTIONS = [
  { id: "تاریخی", label: "تاریخی" },
  { id: "طبیعی", label: "طبیعی" },
  { id: "مدرن", label: "مدرن" },
  { id: "فرهنگی", label: "فرهنگی" },
  { id: "مذهبی", label: "مذهبی" },
  { id: "تفریحی", label: "تفریحی" },
];

export const ACTIVITY_OPTIONS = [
  { id: "عکاسی", label: "عکاسی" },
  { id: "پیاده‌روی", label: "پیاده‌روی" },
  { id: "خرید", label: "خرید" },
  { id: "طبیعت‌گردی", label: "طبیعت‌گردی" },
  { id: "غذا", label: "غذا و رستوران" },
  { id: "کافه", label: "کافه‌گردی" },
  { id: "معماری", label: "معماری" },
  { id: "تاریخ", label: "تاریخ" },
  { id: "فرهنگ", label: "فرهنگ" },
  { id: "مذهبی", label: "مذهبی" },
  { id: "شنا", label: "شنا" },
  { id: "غواصی", label: "غواصی" },
  { id: "کوهنوردی", label: "کوهنوردی" },
  { id: "دوچرخه", label: "دوچرخه‌سواری" },
  { id: "ساحل", label: "ساحل" },
];

export const PRICE_LEVEL_OPTIONS = [
  { id: "رایگان", label: "رایگان" },
  { id: "ارزان", label: "ارزان" },
  { id: "متوسط", label: "متوسط" },
  { id: "گران", label: "گران" },
];

export const DURATION_OPTIONS = [
  { id: "نیم روز", label: "نیم روز (۲-۴ ساعت)" },
  { id: "یک روز کامل", label: "یک روز کامل" },
  { id: "۲-۳ روز", label: "۲ تا ۳ روز" },
  { id: "یک هفته", label: "یک هفته" },
];

export const SEASON_OPTIONS = [
  { id: "بهار", label: "بهار" },
  { id: "تابستان", label: "تابستان" },
  { id: "پاییز", label: "پاییز" },
  { id: "زمستان", label: "زمستان" },
  { id: "تمام فصول", label: "تمام فصول" },
];

export const RATING_OPTIONS = [
  { val: 9, label: "عالی ۹+" },
  { val: 8, label: "خیلی خوب ۸+" },
  { val: 7, label: "خوب ۷+" },
];