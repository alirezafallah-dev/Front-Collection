// src/app/destinations/[country]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationsPage from "@/components/destinations/DestinationsPage";
import DestinationDetailPage from "@/components/destinations/single/DestinationDetailPage";
import {
  CategoryHero,
  CategoryHeroInfo,
  getDestinationCountryHeroInfoProps,
} from "@/components/shared/hero";
import destinationsData from "@/data/destinations.json";
import categoriesData from "@/data/mock/destination-categories.json";
import type { DestinationsData } from "@/types/destination";
import type { Destination } from "@/types/destination";

interface Props {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  const countryParams = categoriesData.countries.map((c) => ({
    country: c.slug,
  }));
  const destinationParams = destinationsData.destinations.map((d) => ({
    country: d.slug,
  }));
  return [...countryParams, ...destinationParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug } = await params;

  // اول country را چک کن
  const country = categoriesData.countries.find((c) => c.slug === slug);
  if (country) {
    const count = destinationsData.destinations.filter(
      (d) => d.country === country.slug
    ).length;
    const cityCount = categoriesData.cities.filter((c) => {
      const countryInfo = categoriesData.countries.find((co) => co.id === c.countryId);
      return countryInfo?.slug === country.slug;
    }).length;

    return {
      title: `مقاصد گردشگری ${country.name} | سفر بعدی ایرانیان`,
      description: `لیست کامل ${count} مقصد گردشگری در ${country.name} و ${cityCount} شهر مختلف.`,
      openGraph: {
        title: `مقاصد گردشگری ${country.name}`,
        description: `${count} مقصد در ${country.name}`,
        images: [country.image],
      },
    };
  }

  // اگر country نبود، destination را چک کن
  const destination = destinationsData.destinations.find((d) => d.slug === slug);
  if (destination) {
    return {
      title: `${destination.title} | سفر بعدی ایرانیان`,
      description: destination.description?.slice(0, 160),
      openGraph: {
        title: destination.title,
        description: destination.description?.slice(0, 160),
        images: [destination.image],
      },
    };
  }

  return { title: "یافت نشد" };
}

export default async function CountryOrDestinationPage({ params }: Props) {
  const { country: slug } = await params;

  /* ═══════════════════════════════════════════
     مرحله ۱: بررسی country
  ═══════════════════════════════════════════ */
  const country = categoriesData.countries.find((c) => c.slug === slug);

  if (country) {
    const countryDestinations = destinationsData.destinations.filter(
      (d) => d.country === country.slug
    );
    const countryCities = categoriesData.cities.filter((c) => {
      const countryInfo = categoriesData.countries.find((co) => co.id === c.countryId);
      return countryInfo?.slug === country.slug;
    });

    const data: DestinationsData = { destinations: countryDestinations };

    // ✅ Props داینامیک مخصوص کشور مقاصد
    const heroInfoProps = getDestinationCountryHeroInfoProps(
      country.name,
      countryDestinations.length,
      countryCities.length
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
          alt={`مقاصد گردشگری ${country.name}`}
          srTitle={`مقاصد گردشگری ${country.name} - بهترین جاذبه‌های ${country.name}`}
        />

        {/* ═══ ۲. سکشن فقط عنوان و توضیح (بدون 4 کارت) ═══ */}
        <CategoryHeroInfo {...heroInfoProps} showFeatures={false} />

        {/* ═══ ۳. لیست مقاصد ═══ */}
        <DestinationsPage data={data} />
      </>
    );
  }

  /* ═══════════════════════════════════════════
     مرحله ۲: بررسی destination slug
  ═══════════════════════════════════════════ */
  const destination = destinationsData.destinations.find(
    (d) => d.slug === slug
  ) as Destination | undefined;

  if (destination) {
    return <DestinationDetailPage destination={destination} />;
  }

  notFound();
}