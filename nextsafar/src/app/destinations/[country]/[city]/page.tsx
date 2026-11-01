import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationsPage from "@/components/destinations/DestinationsPage";
import DestinationHero from "@/components/destinations/DestinationHero";
import destinationsData from "@/data/destinations.json";
import categoriesData from "@/data/mock/destination-categories.json";
import type { DestinationsData } from "@/types/destination";
import Image from "next/image";
import { MapPin, Building2 } from "lucide-react";
import { faDigits } from "@/lib/api/hotels";

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

  const city = categoriesData.cities.find((c) => c.slug === citySlug && c.countryId === country.id);
  if (!city) return { title: "شهر یافت نشد" };

  const count = destinationsData.destinations.filter((d) => d.city === city.slug).length;

  return {
    title: `مقصدهای ${city.name}، ${country.name} | سفر بعدی ایرانیان`,
    description: `لیست کامل ${count} مقصد گردشگری در ${city.name}`,
    openGraph: {
      title: `مقصدهای ${city.name}`,
      description: `${count} مقصد در ${city.name}، ${country.name}`,
      images: [city.image],
    },
  };
}

export default async function CityPage({ params }: Props) {
  const { country: countrySlug, city: citySlug } = await params;

  const country = categoriesData.countries.find((c) => c.slug === countrySlug);
  if (!country) notFound();

  const city = categoriesData.cities.find((c) => c.slug === citySlug && c.countryId === country.id);
  if (!city) notFound();

  const cityDestinations = destinationsData.destinations.filter((d) => d.city === city.slug);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero شهر */}
      <section className="pt-5 md:pt-0">
        <div className="ns-container">
          <div className="relative w-full aspect-[16/9] md:aspect-[2172/650] rounded-2xl md:rounded-none overflow-hidden">
            <Image
              src={city.image}
              alt={`مقصدهای ${city.name}`}
              fill
              sizes="(max-width: 1280px) 100vw, 1280px"
              quality={85}
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/10" />

            <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-8 lg:p-10">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[11px] md:text-xs font-bold mb-3">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>شهر</span>
                </div>

                <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white drop-shadow-lg mb-3">
                  {city.name}
                </h1>

                <p className="text-sm md:text-base text-white/90 mb-4 drop-shadow-md">
                  بهترین مقاصد گردشگری {city.name} در {country.name}
                </p>

                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/20">
                    <MapPin className="w-4 h-4 text-white" />
                    <span className="text-white text-xs md:text-sm font-bold">
                      {faDigits(cityDestinations.length)} مقصد
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/20">
                    <Building2 className="w-4 h-4 text-white" />
                    <span className="text-white text-xs md:text-sm font-bold">
                      {country.name}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <DestinationsPage data={{ destinations: cityDestinations }} />
    </div>
  );
}