// src/app/hotels/page.tsx
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import HotelsPage from "@/components/hotels/HotelsPage";
import HotelCategoriesSection from "@/components/hotels/HotelCategoriesSection";
import {
  CategoryHero,
  CategoryHeroInfo,
  HOTEL_HERO_INFO_PROPS,
  CATEGORY_HERO_IMAGES,
} from "@/components/shared/hero";
import hotelsData from "@/data/hotels.json";
import categoriesData from "@/data/mock/hotel-categories.json";
import type { HotelsData } from "@/types/hotel";

// ═══════════════════════════════════════════════════════════
// 🎯 Metadata (SEO)
// ═══════════════════════════════════════════════════════════
export const metadata: Metadata = {
  title: "راهنمای جامع هتل‌ها | سفر بعدی ایرانیان",
  description: "اطلاعات کامل صدها هتل در سراسر جهان.",
  openGraph: {
    title: "راهنمای جامع هتل‌ها | سفر بعدی ایرانیان",
    description: "اطلاعات کامل هتل‌های داخلی و خارجی با موقعیت دقیق روی نقشه",
    images: [CATEGORY_HERO_IMAGES.hotels],
  },
};

// ═══════════════════════════════════════════════════════════
// 💾 کش داده‌ها (1 ساعت)
// ═══════════════════════════════════════════════════════════
const getHotelsData = unstable_cache(
  async (): Promise<HotelsData> => hotelsData as HotelsData,
  ["hotels-data"],
  { revalidate: 3600, tags: ["hotels"] }
);

// ═══════════════════════════════════════════════════════════
// 🏨 صفحه اصلی هتل‌ها
// ═══════════════════════════════════════════════════════════
export default async function HotelsRoute() {
  const data = await getHotelsData();

  return (
    <>
      {/* ═══ Preloads برای بهبود LCP ═══ */}
      <link
        rel="preload"
        href="/fonts/IRANSansX-Bold.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="image"
        href={CATEGORY_HERO_IMAGES.hotels}
        fetchPriority="high"
      />

      {/* ═══ JSON-LD Structured Data (SEO) ═══ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: data.hotels.slice(0, 10).map((hotel, index) => ({
              "@type": "Hotel",
              position: index + 1,
              name: hotel.title,
              image: hotel.image,
              address: { "@type": "PostalAddress", streetAddress: hotel.address },
              starRating: { "@type": "Rating", ratingValue: hotel.stars },
              aggregateRating: hotel.rating
                ? {
                    "@type": "AggregateRating",
                    ratingValue: hotel.rating,
                    reviewCount: hotel.reviews || 0,
                  }
                : undefined,
            })),
          }),
        }}
      />

      {/* ═══ بنر ثابت هتل‌ها ═══ */}
      <CategoryHero
        image={CATEGORY_HERO_IMAGES.hotels}
        alt="هتل‌های لوکس و باکیفیت در سراسر جهان"
        srTitle="رزرو هتل در بهترین مقاصد داخلی و خارجی - سفر بعدی ایرانیان"
      />

      {/* ═══ سکشن اطلاعات و ویژگی‌ها ═══ */}
      <CategoryHeroInfo {...HOTEL_HERO_INFO_PROPS} />

      {/* ═══ دسته‌بندی سه‌سطحی (منطقه / کشور / شهر) ═══ */}
      <HotelCategoriesSection
        title="دسته‌بندی هتل‌ها"
        subtitle="منطقه، کشور و شهر مورد نظر خود را انتخاب کنید"
        regions={categoriesData.regions}
        countries={categoriesData.countries}
        cities={categoriesData.cities}
        videoSrc="/videos/hotel-intro.mp4"
        videoPoster="/images/categories/video-poster.jpg"
        basePathByLevel={{
          country: "/hotels",
        }}
      />

      {/* ═══ لیست هتل‌ها با فیلتر و مرتب‌سازی ═══ */}
      <HotelsPage data={data} />
    </>
  );
}