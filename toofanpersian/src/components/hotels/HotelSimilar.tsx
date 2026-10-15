"use client";

import { Hotel } from "@/lib/data/hotels";

interface HotelSimilarProps {
  hotels: Hotel[];
  currentHotelId: string;
}

export default function HotelSimilar({ hotels, currentHotelId }: HotelSimilarProps) {
  const similar = hotels
    .filter((h) => h.id !== currentHotelId)
    .slice(0, 3);

  if (similar.length === 0) return null;

  return (
    <section className="py-10 md:py-14 bg-slate-50">
      <div className="container-brand px-4">
        <div className="mb-6">
          <h2 className="text-xl md:text-2xl font-black text-navy-900 mb-2">
            هتل‌های مشابه
          </h2>
          <p className="text-sm text-slate-500">
            شاید این هتل‌ها هم براتون جالب باشه
          </p>
        </div>


      </div>
    </section>
  );
}