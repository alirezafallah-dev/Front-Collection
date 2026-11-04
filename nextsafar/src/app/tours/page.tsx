import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Backpack, MapPin, Calendar, Users } from "lucide-react";
import toursData from "@/data/tours.json";
import { faDigits } from "@/lib/api/hotels";

export const metadata: Metadata = {
  title: "تورهای مسافرتی | سفر بعدی",
  description: "بهترین تورهای داخلی و خارجی با قیمت مناسب",
};

export default function ToursPage() {
  const tours = toursData.tours || [];

  return (
    <div className="ns-container py-8 md:py-12">
      {/* هدر */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-tour/10 flex items-center justify-center">
            <Backpack className="w-6 h-6 text-tour" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-text-strong">
              تورهای مسافرتی
            </h1>
            <p className="text-sm text-text-muted">
              {faDigits(tours.length)} تور داخلی و خارجی
            </p>
          </div>
        </div>
      </div>

      {/* لیست تورها */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
        {tours.map((tour) => (
          <Link
            key={tour.id}
            href={`/tours/${tour.slug}`}
            className="group bg-white rounded-[10px] md:rounded-lg border border-border hover:border-tour hover:shadow-card-hover transition-all duration-300 overflow-hidden"
          >
            {/* تصویر */}
            <div className="relative aspect-[4/3] bg-bg-sec overflow-hidden">
              {tour.image ? (
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-tour/20 to-primary/10">
                  <Backpack className="w-12 h-12 text-tour/40" />
                </div>
              )}
              {/* بج قیمت */}
              <div className="absolute top-3 end-3 px-3 py-1.5 rounded-lg bg-white/95 backdrop-blur shadow-md">
                <span className="text-sm font-black text-tour">
                  {faDigits(tour.price.toLocaleString())} تومان
                </span>
              </div>
            </div>

            {/* محتوا */}
            <div className="p-4">
              <h2 className="font-bold text-sm md:text-base text-text-strong group-hover:text-tour transition line-clamp-1 mb-2">
                {tour.title}
              </h2>
              
              <div className="space-y-1.5">
                <p className="flex items-center gap-1.5 text-xs text-text-muted">
                  <MapPin className="w-3.5 h-3.5 text-tour" />
                  {tour.destination_city}، {tour.destination_country}
                </p>
                <p className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Calendar className="w-3.5 h-3.5 text-tour" />
                  {faDigits(tour.duration_days)} روزه
                </p>
                <p className="flex items-center gap-1.5 text-xs text-text-muted">
                  <Users className="w-3.5 h-3.5 text-tour" />
                  {tour.price_unit}
                </p>
              </div>

              {/* دکمه مشاهده */}
              <div className="mt-4 pt-3 border-t border-divider">
                <span className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-tour/10 text-tour text-xs font-bold group-hover:bg-tour group-hover:text-white transition">
                  مشاهده تور
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* حالت خالی */}
      {tours.length === 0 && (
        <div className="text-center py-16">
          <Backpack className="w-16 h-16 text-text-subtle mx-auto mb-4" />
          <h2 className="text-lg font-bold text-text-strong mb-2">توری یافت نشد</h2>
          <p className="text-sm text-text-muted">به زودی تورهای جدید اضافه می‌شوند</p>
        </div>
      )}
    </div>
  );
}