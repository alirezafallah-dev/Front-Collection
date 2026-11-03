// src/app/destinations/page.tsx
import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import DestinationsPage from "@/components/destinations/DestinationsPage";
import DestinationCategoriesSection from "@/components/destinations/DestinationCategoriesSection";
import {
  CategoryHero,
  CategoryHeroInfo,
  DESTINATION_HERO_INFO_PROPS,
  CATEGORY_HERO_IMAGES,
} from "@/components/shared/hero";
import destinationsData from "@/data/destinations.json";
import categoriesData from "@/data/mock/destination-categories.json";
import type { DestinationsData } from "@/types/destination";

// ═══════════════════════════════════════════════════════════
// 🎯 Metadata (SEO)
// ═══════════════════════════════════════════════════════════
export const metadata: Metadata = {
  title: "راهنمای جامع مقاصد گردشگری | سفر بعدی ایرانیان",
  description: "زیباترین جاذبه‌های طبیعی، تاریخی و تفریحی ایران و جهان",
  openGraph: {
    title: "راهنمای جامع مقاصد گردشگری | سفر بعدی ایرانیان",
    description: "کشف مقاصد گردشگری، موقعیت دقیق روی نقشه و نظرات مسافران",
    images: [CATEGORY_HERO_IMAGES.destinations],
  },
};

// ═══════════════════════════════════════════════════════════
// 💾 کش داده‌ها (1 ساعت)
// ═══════════════════════════════════════════════════════════
const getDestinationsData = unstable_cache(
  async (): Promise<DestinationsData> => destinationsData as DestinationsData,
  ["destinations-data"],
  { revalidate: 3600, tags: ["destinations"] }
);

// ═══════════════════════════════════════════════════════════
// 🌍 صفحه اصلی مقاصد گردشگری
// ═══════════════════════════════════════════════════════════
export default async function DestinationsRoute() {
  const data = await getDestinationsData();

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
        href={CATEGORY_HERO_IMAGES.destinations}
        fetchPriority="high"
      />

      {/* ═══ JSON-LD Structured Data (SEO) ═══ */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: data.destinations.slice(0, 10).map((dest, index) => ({
              "@type": "TouristAttraction",
              position: index + 1,
              name: dest.title,
              image: dest.image,
              address: {
                "@type": "PostalAddress",
                streetAddress: dest.address,
                addressCountry: dest.country,
                addressLocality: dest.city,
              },
              aggregateRating: dest.rating
                ? {
                    "@type": "AggregateRating",
                    ratingValue: dest.rating,
                    reviewCount: dest.reviews || 0,
                  }
                : undefined,
            })),
          }),
        }}
      />

      {/* ═══ بنر ثابت مقاصد ═══ */}
      <CategoryHero
        image={CATEGORY_HERO_IMAGES.destinations}
        alt="مقاصد گردشگری ایران و جهان"
        srTitle="راهنمای جامع مقاصد گردشگری ایران و جهان - سفر بعدی ایرانیان"
      />

      {/* ═══ سکشن اطلاعات و ویژگی‌ها ═══ */}
      <CategoryHeroInfo {...DESTINATION_HERO_INFO_PROPS} />

      {/* ═══ دسته‌بندی سه‌سطحی (منطقه / کشور / شهر) ═══ */}
      <DestinationCategoriesSection
        title="دسته‌بندی مقاصد"
        subtitle="منطقه، کشور و شهر مورد نظر خود را انتخاب کنید"
        regions={categoriesData.regions}
        countries={categoriesData.countries}
        cities={categoriesData.cities}
        videoSrc="/videos/destination-intro.mp4"
        videoPoster="/images/categories/destination-poster.jpg"
        basePathByLevel={{
          country: "/destinations",
          city: "",
        }}
      />

      {/* ═══ لیست مقاصد با فیلتر و مرتب‌سازی ═══ */}
      <DestinationsPage data={data} />
    </>
  );
}