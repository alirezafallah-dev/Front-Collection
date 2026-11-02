// src/app/hotels/[country]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HotelsPage from "@/components/hotels/HotelsPage";
import HotelDetailPage from "@/components/hotels/single/HotelDetailPage";
import {
  CategoryHero,
  CategoryHeroInfo,
  getCountryHeroInfoProps,
} from "@/components/shared/hero";
import hotelsData from "@/data/hotels.json";
import type { HotelsData, Hotel } from "@/types/hotel";

interface Props {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  const countryParams = hotelsData.countries.map((c) => ({
    country: c.slug,
  }));
  const hotelParams = hotelsData.hotels.map((h) => ({
    country: h.slug,
  }));
  return [...countryParams, ...hotelParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug } = await params;

  const country = hotelsData.countries.find((c) => c.slug === slug);
  if (country) {
    const hotelCount = hotelsData.hotels.filter(
      (h) => h.country === country.id
    ).length;

    return {
      title: `هتل‌های ${country.name} | سفر بعدی ایرانیان`,
      description: `لیست کامل ${hotelCount} هتل در ${country.name} و شهرهای مختلف آن.`,
      openGraph: {
        title: `هتل‌های ${country.name}`,
        description: `${hotelCount} هتل در ${country.name}`,
        images: [country.image],
      },
    };
  }

  const hotel = hotelsData.hotels.find((h) => h.slug === slug);
  if (hotel) {
    const country = hotelsData.countries.find((c) => c.id === hotel.country);
    const city = country?.cities.find((c) => c.id === hotel.city);
    return {
      title: `${hotel.title} | ${city?.name || ""} ${country?.name || ""}`,
      description: hotel.description?.slice(0, 160),
      openGraph: {
        title: hotel.title,
        description: hotel.description?.slice(0, 160),
        images: [hotel.image],
      },
    };
  }

  return { title: "یافت نشد" };
}

export default async function CountryOrHotelPage({ params }: Props) {
  const { country: slug } = await params;

  /* ═══════════════════════════════════════════
     مرحله ۱: بررسی country
  ═══════════════════════════════════════════ */
  const country = hotelsData.countries.find((c) => c.slug === slug);

  if (country) {
    const countryHotels = hotelsData.hotels.filter(
      (h) => h.country === country.id
    );

    const data: HotelsData = { hotels: countryHotels };

    // ✅ Props داینامیک مخصوص کشور
    const heroInfoProps = getCountryHeroInfoProps(
      country.name,
      countryHotels.length,
      country.cities.length
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
          href={country.image}
          fetchPriority="high"
        />

        {/* ═══ ۱. بنر با عکس خود کشور ═══ */}
        <CategoryHero
          image={country.image}
          alt={`هتل‌های ${country.name} - رزرو آنلاین`}
          srTitle={`هتل‌های ${country.name} - رزرو آنلاین بهترین هتل‌های ${country.name}`}
        />

        {/* ═══ ۲. سکشن فقط عنوان و توضیح (بدون 4 کارت) ═══ */}
        <CategoryHeroInfo {...heroInfoProps} showFeatures={false} />

        {/* ═══ ۳. لیست هتل‌ها ═══ */}
        <HotelsPage data={data} />
      </>
    );
  }

  /* ═══════════════════════════════════════════
     مرحله ۲: بررسی hotel slug
  ═══════════════════════════════════════════ */
  const hotel = hotelsData.hotels.find((h) => h.slug === slug) as
    | Hotel
    | undefined;

  if (hotel) {
    return <HotelDetailPage hotel={hotel} />;
  }

  notFound();
}