"use client";

import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { faDigits } from "@/lib/api/hotels";
import toursData from "@/data/tours.json";
import type { Destination, Tour } from "@/types/destination";
import Image from "next/image";

interface Props {
  destination: Destination;
}

export default function RelatedTours({ destination }: Props) {
  const relatedTours = (toursData.tours as Tour[]).filter((t) => {
    // اولویت ۱: تورهای مرتبط مستقیم
    if (t.related_destinations?.includes(destination.slug)) return true;
    // اولویت ۲: تورهای همان شهر
    if (t.destination_city === destination.city && t.destination_country === destination.country) return true;
    // اولویت ۳: تورهای همان کشور
    if (t.destination_country === destination.country) return true;
    return false;
  }).slice(0, 4);

  if (relatedTours.length === 0) return null;

  return (
    <section className="mt-8 md:mt-12">
      <div className="flex items-center justify-between gap-3 mb-5 md:mb-6">
        <div className="min-w-0">
          <h2 className="ns-section-title !mb-1">تورهای مرتبط</h2>
          <p className="text-xs md:text-sm text-text-muted">
            تورهای پیشنهادی مرتبط با {destination.title}
          </p>
        </div>
        <Link
          href="/tours"
          className="flex items-center gap-1.5 shrink-0 whitespace-nowrap px-3 py-1.5 md:px-4 md:py-2 rounded-[10px] md:rounded-md border border-border bg-white text-[11px] md:text-xs font-bold text-text-muted hover:border-primary hover:text-primary-dark hover:bg-primary-lightest/30 transition"
        >
          مشاهده همه
          <ArrowLeft className="w-3.5 h-3.5 shrink-0" />
        </Link>
      </div>

      {/* موبایل: carousel */}
      <div className="md:hidden">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 snap-x snap-mandatory">
          {relatedTours.map((tour) => (
            <Link
              key={tour.id}
              href={`/tours/${tour.slug}`}
              className="group shrink-0 w-[260px] snap-start rounded-[10px] overflow-hidden border border-border hover:border-primary-light hover:shadow-card-hover transition-all duration-500"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                  sizes="260px"
                />
                <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-primary text-white text-[10px] font-bold">
                  {tour.category}
                </div>
              </div>
              <div className="p-3">
                <h3 className="text-xs font-extrabold text-text-strong line-clamp-2 mb-2 min-h-[2.5em]">
                  {tour.title}
                </h3>
                <div className="flex items-center gap-3 text-[10px] text-text-muted mb-2">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{faDigits(tour.duration_days)} روز</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{tour.difficulty}</span>
                  </div>
                </div>
                <div className="flex items-baseline gap-1 pt-2 border-t border-border/50">
                  <span className="text-base font-black text-primary">
                    {faDigits(tour.price.toLocaleString())}
                  </span>
                  <span className="text-[10px] text-text-muted">{tour.price_unit}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* دسکتاپ: grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {relatedTours.map((tour) => (
          <Link
            key={tour.id}
            href={`/tours/${tour.slug}`}
            className="group rounded-[10px] overflow-hidden border border-border hover:border-primary-light hover:shadow-card-hover transition-all duration-500"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={tour.image}
                alt={tour.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-primary text-white text-[10px] font-bold">
                {tour.category}
              </div>
              {tour.featured && (
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-warning text-white text-[10px] font-bold">
                  ویژه
                </div>
              )}
            </div>
            <div className="p-3">
              <h3 className="text-xs font-extrabold text-text-strong line-clamp-2 mb-2 min-h-[2.5em]">
                {tour.title}
              </h3>
              <div className="flex items-center gap-3 text-[10px] text-text-muted mb-2">
                <div className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{faDigits(tour.duration_days)} روز</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{tour.difficulty}</span>
                </div>
              </div>
              <div className="flex items-baseline gap-1 pt-2 border-t border-border/50">
                <span className="text-base font-black text-primary">
                  {faDigits(tour.price.toLocaleString())}
                </span>
                <span className="text-[10px] text-text-muted">{tour.price_unit}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}