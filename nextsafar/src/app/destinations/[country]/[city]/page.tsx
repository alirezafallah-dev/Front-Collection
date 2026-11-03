// src/app/destinations/[country]/[city]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationsPage from "@/components/destinations/DestinationsPage";
import {
  CategoryHero,
  CategoryHeroInfo,
  getDestinationCityHeroInfoProps,
} from "@/components/shared/hero";
import destinationsData from "@/data/destinations.json";
import categoriesData from "@/data/mock/destination-categories.json";
import type { DestinationsData } from "@/types/destination";

interface Props {
  params: Promise<{ country: string; city: string }>;
}

export async function generateStaticParams() {
  const params: { country: string; city: string }[] = [];
  categoriesData.countries.forEach((country) => {
    categoriesData.cities
      .filter((c) => c.countryId === country.id)
      .forEach((city) => {
        params.push({ country: country.slug, city: city.slug });
      });
  });
  return params;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: countrySlug, city: citySlug } = await params;

  const country = categoriesData.countries.find((c) => c.slug === countrySlug);
  if (!country) return { title: "کشور یافت نشد" };

  const city = categoriesData.cities.find(
    (c) => c.slug === citySlug && c.countryId === country.id
  );
  if (!city) return { title: "شهر یافت نشد" };

  const count = destinationsData.destinations.filter(
    (d) => d.city === city.slug
  ).length;

  return {
    title: `مقاصد گردشگری ${city.name}، ${country.name} | سفر بعدی ایرانیان`,
    description: `لیست کامل ${count} مقصد گردشگری در ${city.name}. بهترین جاذبه‌های طبیعی و تاریخی.`,
    openGraph: {
      title: `مقاصد گردشگری ${city.name}`,
      description: `${count} مقصد در ${city.name}، ${country.name}`,
      images: [city.image],
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { country: countrySlug, city: citySlug } = await params;

  const country = categoriesData.countries.find((c) => c.slug === countrySlug);
  if (!country) notFound();

  const city = categoriesData.cities.find(
    (c) => c.slug === citySlug && c.countryId === country.id
  );
  if (!city) notFound();

  const cityDestinations = destinationsData.destinations.filter(
    (d) => d.city === city.slug
  );

  const data: DestinationsData = { destinations: cityDestinations };

  // ✅ Props داینامیک مخصوص شهر مقاصد
  const heroInfoProps = getDestinationCityHeroInfoProps(
    city.name,
    country.name,
    cityDestinations.length
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
        alt={`مقاصد گردشگری ${city.name}`}
        srTitle={`مقاصد گردشگری ${city.name} - بهترین جاذبه‌های ${city.name} در ${country.name}`}
      />

      {/* ═══ ۲. سکشن فقط عنوان و توضیح (بدون 4 کارت) ═══ */}
      <CategoryHeroInfo {...heroInfoProps} showFeatures={false} />

      {/* ═══ ۳. لیست مقاصد ═══ */}
      <DestinationsPage data={data} />
    </>
  );
} 