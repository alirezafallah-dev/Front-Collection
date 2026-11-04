import type { Metadata } from "next";
import Link from "next/link";
import { Search, MapPin, BedDouble, Backpack, Stamp, UtensilsCrossed, Plane, BookOpen, Newspaper } from "lucide-react";
import hotelsData from "@/data/hotels.json";
import destinationsData from "@/data/destinations.json";
import toursData from "@/data/tours.json";

interface Props {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  const { q } = await searchParams;
  return {
    title: q ? `جستجوی "${q}" | سفر بعدی` : "جستجو | سفر بعدی",
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const query = q.trim().toLowerCase();

  // جستجو در هتل‌ها
  const hotelResults = query
    ? hotelsData.hotels.filter(
        (h) =>
          h.title.toLowerCase().includes(query) ||
          h.title_en.toLowerCase().includes(query) ||
          h.city.toLowerCase().includes(query) ||
          h.country.toLowerCase().includes(query)
      ).slice(0, 6)
    : [];

  // جستجو در مقاصد
  const destinationResults = query
    ? destinationsData.destinations.filter(
        (d) =>
          d.title.toLowerCase().includes(query) ||
          d.title_en.toLowerCase().includes(query) ||
          d.city.toLowerCase().includes(query) ||
          d.country.toLowerCase().includes(query)
      ).slice(0, 6)
    : [];

  // جستجو در تورها
  const tourResults = query
    ? toursData.tours.filter(
        (t) =>
          t.title.toLowerCase().includes(query) ||
          t.destination_city.toLowerCase().includes(query) ||
          t.destination_country.toLowerCase().includes(query)
      ).slice(0, 6)
    : [];

  const totalResults = hotelResults.length + destinationResults.length + tourResults.length;

  return (
    <div className="ns-container py-8 md:py-12">
      {/* هدر جستجو */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Search className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-text-strong">
              {query ? `نتایج جستجو برای "${q}"` : "جستجو در سفر بعدی"}
            </h1>
            <p className="text-sm text-text-muted">
              {query ? `${totalResults} نتیجه یافت شد` : "عبارت مورد نظر خود را جستجو کنید"}
            </p>
          </div>
        </div>

        {/* فرم جستجو */}
        <form action="/search" method="GET" className="max-w-2xl">
          <div className="flex gap-2">
            <input
              type="text"
              name="q"
              defaultValue={q}
              placeholder="جستجوی هتل، مقصد، تور..."
              className="flex-1 px-4 py-3 rounded-lg border border-border bg-white text-sm outline-none focus:border-primary transition"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-primary text-white font-bold text-sm hover:bg-primary-dark transition"
            >
              جستجو
            </button>
          </div>
        </form>
      </div>

      {/* نتایج */}
      {query && totalResults === 0 && (
        <div className="text-center py-16">
          <Search className="w-16 h-16 text-text-subtle mx-auto mb-4" />
          <h2 className="text-lg font-bold text-text-strong mb-2">نتیجه‌ای یافت نشد</h2>
          <p className="text-sm text-text-muted">
            عبارت دیگری را امتحان کنید یا به دسته‌بندی‌ها مراجعه کنید
          </p>
        </div>
      )}

      <div className="space-y-10">
        {/* نتایج هتل‌ها */}
        {hotelResults.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-text-strong">
                <BedDouble className="w-5 h-5 text-primary" />
                هتل‌ها ({hotelResults.length})
              </h2>
              <Link href={`/hotels?q=${encodeURIComponent(q)}`} className="text-sm text-primary hover:underline">
                مشاهده همه
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {hotelResults.map((hotel) => (
                <Link
                  key={hotel.id}
                  href={`/hotels/${hotel.slug}`}
                  className="group bg-white rounded-lg border border-border hover:border-primary-light hover:shadow-card-hover transition-all overflow-hidden"
                >
                  <div className="relative aspect-[16/9] bg-bg-sec">
                    {hotel.image && (
                      <img src={hotel.image} alt={hotel.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-text-strong group-hover:text-primary transition line-clamp-1">
                      {hotel.title}
                    </h3>
                    <p className="flex items-center gap-1 text-xs text-text-muted mt-1">
                      <MapPin className="w-3 h-3" />
                      {hotel.city}، {hotel.country}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* نتایج مقاصد */}
        {destinationResults.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-text-strong">
                <MapPin className="w-5 h-5 text-primary" />
                مقاصد گردشگری ({destinationResults.length})
              </h2>
              <Link href={`/destinations?q=${encodeURIComponent(q)}`} className="text-sm text-primary hover:underline">
                مشاهده همه
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {destinationResults.map((dest) => (
                <Link
                  key={dest.id}
                  href={`/destinations/${dest.slug}`}
                  className="group bg-white rounded-lg border border-border hover:border-primary-light hover:shadow-card-hover transition-all overflow-hidden"
                >
                  <div className="relative aspect-[16/9] bg-bg-sec">
                    {dest.image && (
                      <img src={dest.image} alt={dest.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-text-strong group-hover:text-primary transition line-clamp-1">
                      {dest.title}
                    </h3>
                    <p className="flex items-center gap-1 text-xs text-text-muted mt-1">
                      <MapPin className="w-3 h-3" />
                      {dest.city}، {dest.country}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* نتایج تورها */}
        {tourResults.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="flex items-center gap-2 text-lg font-extrabold text-text-strong">
                <Backpack className="w-5 h-5 text-primary" />
                تورها ({tourResults.length})
              </h2>
              <Link href={`/tours?q=${encodeURIComponent(q)}`} className="text-sm text-primary hover:underline">
                مشاهده همه
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {tourResults.map((tour) => (
                <Link
                  key={tour.id}
                  href={`/tours/${tour.slug}`}
                  className="group bg-white rounded-lg border border-border hover:border-primary-light hover:shadow-card-hover transition-all overflow-hidden"
                >
                  <div className="relative aspect-[16/9] bg-bg-sec">
                    {tour.image && (
                      <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-sm text-text-strong group-hover:text-primary transition line-clamp-1">
                      {tour.title}
                    </h3>
                    <p className="flex items-center gap-1 text-xs text-text-muted mt-1">
                      <MapPin className="w-3 h-3" />
                      {tour.destination_city}، {tour.destination_country}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}