// src/app/hotels/[country]/[city]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HotelsPage from "@/components/hotels/HotelsPage";
import {
  CategoryHero,
  CategoryHeroInfo,
  getCityHeroInfoProps,
} from "@/components/shared/hero";
import hotelsData from "@/data/hotels.json";
import type { HotelsData } from "@/types/hotel";

interface Props {
  params: Promise<{ country: string; city: string }>;
}

export async function generateStaticParams() {
  const params: { country: string; city: string }[] = [];
  hotelsData.countries.forEach((country) => {
    country.cities.forEach((city) => {
      params.push({ country: country.slug, city: city.slug });
    });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: countrySlug, city: citySlug } = await params;

  const country = hotelsData.countries.find((c) => c.slug === countrySlug);
  if (!country) return { title: "کشور یافت نشد" };

  const city = country.cities.find((c) => c.slug === citySlug);
  if (!city) return { title: "شهر یافت نشد" };

  const hotelCount = hotelsData.hotels.filter(
    (h) => h.city === city.id
  ).length;

  return {
    title: `هتل‌های ${city.name}، ${country.name} | سفر بعدی ایرانیان`,
    description: `لیست کامل ${hotelCount} هتل در ${city.name}.`,
    openGraph: {
      title: `هتل‌های ${city.name}`,
      description: `${hotelCount} هتل در ${city.name}، ${country.name}`,
      images: [city.image],
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { country: countrySlug, city: citySlug } = await params;

  const country = hotelsData.countries.find((c) => c.slug === countrySlug);
  if (!country) notFound();

  const city = country.cities.find((c) => c.slug === citySlug);
  if (!city) notFound();

  const cityHotels = hotelsData.hotels.filter((h) => h.city === city.id);
  const data: HotelsData = { hotels: cityHotels };

  // ✅ Props داینامیک مخصوص شهر
  const heroInfoProps = getCityHeroInfoProps(
    city.name,
    country.name,
    cityHotels.length
  );

  return (
    <>
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
        href={city.image}
        fetchPriority="high"
      />

      {/* ═══ ۱. بنر با عکس خود شهر ═══ */}
      <CategoryHero
        image={city.image}
        alt={`هتل‌های ${city.name} - رزرو آنلاین`}
        srTitle={`هتل‌های ${city.name} - رزرو آنلاین بهترین هتل‌های ${city.name} در ${country.name}`}
      />

      {/* ═══ ۲. سکشن فقط عنوان و توضیح (بدون 4 کارت) ═══ */}
      <CategoryHeroInfo {...heroInfoProps} showFeatures={false} />

      {/* ═══ ۳. لیست هتل‌ها ═══ */}
      <HotelsPage data={data} />
    </>
  );
}