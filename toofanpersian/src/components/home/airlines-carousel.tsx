"use client";

import { useEffect, useState } from "react";
import { AIRLINES } from "@/lib/mock/airlines";
import Image from "next/image";

export function AirlinesCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 6;
  const totalSlides = Math.ceil(AIRLINES.length / itemsPerView);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 4000);
    return () => clearInterval(interval);
  }, [totalSlides]);

  const startIndex = currentIndex * itemsPerView;
  const visibleAirlines = AIRLINES.slice(startIndex, startIndex + itemsPerView);

  return (
    <section className="bg-surface py-14">
      <div className="container-brand">
        {/* Header */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-black text-navy-900 lg:text-3xl">
            ایرلاین‌های همکار ما
          </h2>
          <p className="mt-2 text-muted">
            همکاری با معتبرترین ایرلاین‌های داخلی و خارجی
          </p>
        </div>

        {/* Airlines Grid */}
        <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-6">
          {visibleAirlines.map((airline) => (
            <div
              key={airline.code}
              className="group flex h-24 items-center justify-center rounded-xl bg-white p-6 shadow-card transition hover:shadow-search"
            >
              <div className="relative h-12 w-full">
                <Image
                  src={airline.logo}
                  alt={airline.name}
                  fill
                  className="object-contain grayscale transition group-hover:grayscale-0"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Dots Indicator */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {Array.from({ length: totalSlides }).map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all ${
                currentIndex === index
                  ? "w-8 bg-brand-500"
                  : "w-2 bg-line hover:bg-navy-300"
              }`}
              aria-label={`اسلاید ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}