import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MapPin, ChevronLeft, Building2 } from "lucide-react";
import DestinationsPage from "@/components/destinations/DestinationsPage";
import destinationsData from "@/data/destinations.json";
import categoriesData from "@/data/mock/destination-categories.json";
import { faDigits } from "@/lib/api/hotels";
import type { DestinationsData } from "@/types/destination";

interface Props {
  params: Promise<{ country: string }>;
}

export async function generateStaticParams() {
  const countryParams = categoriesData.countries.map((c) => ({ country: c.slug }));
  const destinationParams = destinationsData.destinations.map((d) => ({ country: d.slug }));
  return [...countryParams, ...destinationParams];
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { country: slug } = await params;

  const country = categoriesData.countries.find((c) => c.slug === slug);
  if (country) {
    const count = destinationsData.destinations.filter((d) => d.country === country.slug).length;
    return {
      title: `مقصدهای ${country.name} | سفر بعدی ایرانیان`,
      description: `لیست کامل ${count} مقصد گردشگری در ${country.name}`,
      openGraph: { title: `مقصدهای ${country.name}`, images: [country.image] },
    };
  }

  const destination = destinationsData.destinations.find((d) => d.slug === slug);
  if (destination) {
    return {
      title: `${destination.title} | سفر بعدی ایرانیان`,
      description: destination.description?.slice(0, 160),
      openGraph: { title: destination.title, images: [destination.image] },
    };
  }

  return { title: "یافت نشد" };
}

export default async function CountryOrDestinationPage({ params }: Props) {
  const { country: slug } = await params;

  const country = categoriesData.countries.find((c) => c.slug === slug);

  if (country) {
    const countryDestinations = destinationsData.destinations.filter((d) => d.country === country.slug);
    const countryCities = categoriesData.cities.filter((c) => {
      const countryInfo = categoriesData.countries.find((co) => co.id === c.countryId);
      return countryInfo?.slug === country.slug;
    });

    return (
      <div className="min-h-screen bg-white">
        <section className="pt-5 md:pt-0">
          <div className="ns-container">
            <div className="relative w-full aspect-[16/9] md:aspect-[2172/650] rounded-2xl md:rounded-none overflow-hidden">
              <Image
                src={country.image}
                alt={`مقصدهای ${country.name}`}
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
                    <Building2 className="w-3.5 h-3.5" />
                    <span>کشور</span>
                  </div>

                  <h1 className="text-2xl md:text-4xl lg:text-5xl font-black text-white drop-shadow-lg mb-3">
                    {country.name}
                  </h1>

                  <div className="flex items-center gap-4 flex-wrap">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/20">
                      <MapPin className="w-4 h-4 text-white" />
                      <span className="text-white text-xs md:text-sm font-bold">
                        {faDigits(countryDestinations.length)} مقصد
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/15 backdrop-blur-md border border-white/20">
                      <Building2 className="w-4 h-4 text-white" />
                      <span className="text-white text-xs md:text-sm font-bold">
                        {faDigits(countryCities.length)} شهر
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="ns-container py-8 md:py-12">
          <div className="mb-6">
            <h2 className="text-xl md:text-2xl font-black text-text-strong mb-2">
              شهرهای {country.name}
            </h2>
            <p className="text-sm text-text-muted">شهر مورد نظر خود را انتخاب کنید</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
            {countryCities.map((city) => {
              const cityDestinations = destinationsData.destinations.filter((d) => d.city === city.slug);

              return (
                <Link
                  key={city.id}
                  href={`/destinations/${country.slug}/${city.slug}`}
                  className="group relative aspect-[4/5] rounded-[10px] md:rounded-lg overflow-hidden border border-border hover:border-primary-light hover:shadow-card-hover transition-all duration-500 ease-out"
                >
                  <Image
                    src={city.image}
                    alt={city.name}
                    fill
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold">
                    <MapPin className="w-3 h-3" />
                    <span>{faDigits(cityDestinations.length)} مقصد</span>
                  </div>

                  <div className="absolute bottom-0 inset-x-0 p-4">
                    <h3 className="text-base md:text-lg font-black text-white mb-2 drop-shadow-lg">
                      {city.name}
                    </h3>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-white/80">مشاهده مقاصد</span>
                      <ChevronLeft className="w-4 h-4 text-white group-hover:text-primary-lightest group-hover:-translate-x-1 transition-all rtl:rotate-180" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {countryDestinations.length > 0 && (
          <DestinationsPage data={{ destinations: countryDestinations }} />
        )}
      </div>
    );
  }

  // Single destination page - for now just show all destinations
  // Will be replaced with single/[slug] page later
  const destination = destinationsData.destinations.find((d) => d.slug === slug);
  if (!destination) notFound();

  return <DestinationsPage data={{ destinations: [destination] }} />;
}