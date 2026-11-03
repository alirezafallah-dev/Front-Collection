// src/components/shared/hero/presets.ts
import {
  BookOpen,
  MapPin,
  Star,
  Filter,
  Compass,
  Calendar,
  Camera,
  Utensils,
  Coffee,
  DollarSign,
  Users,
  Globe,
  Plane,
  Clock,
  Shield,
  Sparkles,
} from "lucide-react";
import type { CategoryFeature } from "./CategoryHeroInfo";

// ═══════════════════════════════════════════════════════════
// 🏨 ویژگی‌های هتل
// ═══════════════════════════════════════════════════════════
export const HOTEL_FEATURES: CategoryFeature[] = [
  {
    icon: BookOpen,
    title: "اطلاعات جامع",
    description: "مشخصات کامل، امکانات و تصاویر واقعی",
  },
  {
    icon: MapPin,
    title: "موقعیت دقیق",
    description: "مشاهده روی نقشه با جزئیات کامل",
  },
  {
    icon: Star,
    title: "امتیاز مهمانان",
    description: "نظرات و امتیازهای واقعی مسافران",
  },
  {
    icon: Filter,
    title: "فیلتر پیشرفته",
    description: "یافتن هتل مناسب با معیارهای شما",
  },
];

export const HOTEL_HERO_INFO_PROPS = {
  badge: "سفر بعدی ایرانیان",
  title: "راهنمای جامع هتل‌های داخلی و خارجی",
  description:
    "اطلاعات کامل صدها هتل در سراسر جهان را بررسی کنید، موقعیت دقیق آن‌ها را روی نقشه ببینید، امتیاز و نظرات مهمانان را مطالعه کنید و بهترین گزینه را برای سفر خود پیدا کنید.",
  features: HOTEL_FEATURES,
};

// ═══════════════════════════════════════════════════════════
// 🌍 ویژگی‌های مقاصد گردشگری
// ═══════════════════════════════════════════════════════════
export const DESTINATION_FEATURES: CategoryFeature[] = [
  {
    icon: Compass,
    title: "کشف مقاصد",
    description: "صدها جاذبه طبیعی، تاریخی و تفریحی در سراسر جهان",
  },
  {
    icon: MapPin,
    title: "موقعیت دقیق",
    description: "مشاهده جاذبه‌های اطراف روی نقشه تعاملی",
  },
  {
    icon: Star,
    title: "تجربه مسافران",
    description: "نظرات و امتیازهای واقعی بازدیدکنندگان",
  },
  {
    icon: Calendar,
    title: "بهترین زمان بازدید",
    description: "فصل مناسب، ساعت کاری و مدت پیشنهادی",
  },
];

export const DESTINATION_HERO_INFO_PROPS = {
  badge: "سفر بعدی ایرانیان",
  title: "راهنمای جامع مقاصد گردشگری ایران و جهان",
  description:
    "زیباترین جاذبه‌های طبیعی، تاریخی و تفریحی را کشف کنید، بهترین زمان بازدید را بشناسید، نظرات مسافران را بخوانید و سفری فراموش‌نشدنی را برنامه‌ریزی کنید.",
  features: DESTINATION_FEATURES,
};

// ═══════════════════════════════════════════════════════════
// 🍽️ ویژگی‌های رستوران (برای آینده)
// ═══════════════════════════════════════════════════════════
export const RESTAURANT_FEATURES: CategoryFeature[] = [
  {
    icon: Utensils,
    title: "منوی متنوع",
    description: "غذاهای ایرانی و بین‌المللی با کیفیت بالا",
  },
  {
    icon: MapPin,
    title: "نزدیک شما",
    description: "بهترین رستوران‌های اطراف محل شما",
  },
  {
    icon: Star,
    title: "نظرات مشتریان",
    description: "تجربه واقعی مشتریان و امتیاز آن‌ها",
  },
  {
    icon: DollarSign,
    title: "قیمت مناسب",
    description: "مقایسه قیمت و انتخاب بهترین گزینه",
  },
];

export const RESTAURANT_HERO_INFO_PROPS = {
  badge: "سفر بعدی ایرانیان",
  title: "راهنمای جامع رستوران‌های ایران و جهان",
  description:
    "بهترین رستوران‌های شهر خود را کشف کنید، منو و قیمت‌ها را مقایسه کنید، نظرات مشتریان را بخوانید و لذت یک غذای خوب را تجربه کنید.",
  features: RESTAURANT_FEATURES,
};

// ═══════════════════════════════════════════════════════════
// 📖 ویژگی‌های راهنمای سفر (برای آینده)
// ═══════════════════════════════════════════════════════════
export const GUIDE_FEATURES: CategoryFeature[] = [
  {
    icon: BookOpen,
    title: "مقالات جامع",
    description: "راهنمای کامل سفر به هر مقصد",
  },
  {
    icon: Camera,
    title: "تصاویر الهام‌بخش",
    description: "گالری تصاویر زیبا از سراسر جهان",
  },
  {
    icon: Users,
    title: "تجربه مسافران",
    description: "نکات و ترفندهای واقعی از مسافران",
  },
  {
    icon: Clock,
    title: "برنامه‌ریزی آسان",
    description: "پیشنهاد برنامه سفر روز به روز",
  },
];

export const GUIDE_HERO_INFO_PROPS = {
  badge: "سفر بعدی ایرانیان",
  title: "راهنمای جامع سفر به سراسر جهان",
  description:
    "با مقالات تخصصی و تجربیات مسافران، بهترین سفر زندگی خود را برنامه‌ریزی کنید و از هر لحظه آن لذت ببرید.",
  features: GUIDE_FEATURES,
};

// ═══════════════════════════════════════════════════════════
// ✈️ ویژگی‌های فرودگاه (برای آینده)
// ═══════════════════════════════════════════════════════════
export const AIRPORT_FEATURES: CategoryFeature[] = [
  {
    icon: Plane,
    title: "اطلاعات پرواز",
    description: "وضعیت لحظه‌ای پروازها و ترمینال‌ها",
  },
  {
    icon: MapPin,
    title: "نقشه فرودگاه",
    description: "راهنمای کامل ترمینال‌ها و خدمات",
  },
  {
    icon: Globe,
    title: "پروازهای جهانی",
    description: "مسیرهای پروازی داخلی و بین‌المللی",
  },
  {
    icon: Shield,
    title: "خدمات امنیتی",
    description: "اطلاعات کامل گمرک و امنیت",
  },
];

export const AIRPORT_HERO_INFO_PROPS = {
  badge: "سفر بعدی ایرانیان",
  title: "راهنمای جامع فرودگاه‌های ایران و جهان",
  description:
    "تمام اطلاعات مورد نیاز برای سفر هوایی خود را در یکجا داشته باشید، از وضعیت پروازها تا خدمات و امکانات فرودگاه.",
  features: AIRPORT_FEATURES,
};

// ═══════════════════════════════════════════════════════════
// 🖼️ تصاویر ثابت برای هر دسته‌بندی
// ═══════════════════════════════════════════════════════════
export const CATEGORY_HERO_IMAGES = {
  hotels: "/images/hero/Hotel.png",
  destinations: "/images/hero/Travel-Destinations.png", // می‌توانید تغییر دهید
  restaurants: "/images/hero/Restaurants.png", // برای آینده
  guides: "/images/hero/Travel-Guide.png", // برای آینده
  airports: "/images/hero/Airport.png", // برای آینده
} as const;

// ═══════════════════════════════════════════════════════════
// 🎯 Helper Functions برای تولید Props داینامیک
// ═══════════════════════════════════════════════════════════

/**
 * ساخت props مخصوص صفحه کشور
 */
export function getCountryHeroInfoProps(
  countryName: string,
  hotelCount: number,
  cityCount: number
) {
  return {
    ...HOTEL_HERO_INFO_PROPS,
    title: `هتل‌های ${countryName}؛ راهنمای جامع اقامت`,
    description: `${hotelCount} هتل معتبر در ${cityCount} شهر مختلف ${countryName} را بررسی کنید، موقعیت دقیق روی نقشه ببینید و بهترین گزینه را برای سفر خود پیدا کنید.`,
  };
}

/**
 * ساخت props مخصوص صفحه شهر
 */
export function getCityHeroInfoProps(
  cityName: string,
  countryName: string,
  hotelCount: number
) {
  return {
    ...HOTEL_HERO_INFO_PROPS,
    title: `بهترین هتل‌های ${cityName}`,
    description: `${hotelCount} هتل برتر در ${cityName}، ${countryName}. با فیلترهای پیشرفته، نقشه تعاملی و نظرات واقعی مسافران، هتل ایده‌آل خود را انتخاب کنید.`,
  };
}

// ═══════════════════════════════════════════════════════════
// 🌍 Helper Functions برای مقاصد گردشگری
// ═══════════════════════════════════════════════════════════

/**
 * ساخت props مخصوص صفحه کشور مقاصد
 */
export function getDestinationCountryHeroInfoProps(
  countryName: string,
  destinationCount: number,
  cityCount: number
) {
  return {
    ...DESTINATION_HERO_INFO_PROPS,
    title: `مقاصد گردشگری ${countryName}؛ راهنمای جامع سفر`,
    description: `${destinationCount} مقصد گردشگری در ${cityCount} شهر مختلف ${countryName} را کشف کنید، جاذبه‌های طبیعی و تاریخی را بشناسید و سفری فراموش‌نشدنی را برنامه‌ریزی کنید.`,
  };
}

/**
 * ساخت props مخصوص صفحه شهر مقاصد
 */
export function getDestinationCityHeroInfoProps(
  cityName: string,
  countryName: string,
  destinationCount: number
) {
  return {
    ...DESTINATION_HERO_INFO_PROPS,
    title: `بهترین مقاصد گردشگری ${cityName}`,
    description: `${destinationCount} جاذبه برتر در ${cityName}، ${countryName}. با نقشه تعاملی، نظرات واقعی مسافران و اطلاعات کامل، بهترین مقاصد را برای بازدید انتخاب کنید.`,
  };
}