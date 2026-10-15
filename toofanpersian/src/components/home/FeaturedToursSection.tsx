"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Plane, Hotel, Calendar, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const tours = [
  {
    id: "russia-moscow-7d",
    title: "تور ۷ روزه مسکو و سن‌پترزبورگ",
    destination: "روسیه",
    destinationFlag: "🇷🇺",
    duration: "۷ روز",
    hotel: "هتل ۴ ستاره",
    flightType: "پرواز چارتر ماهان",
    isCharter: true,
    oldPrice: "۳۲,۰۰۰,۰۰۰",
    newPrice: "۲۹,۰۰۰,۰۰۰",
    discount: "25",
    image: "https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=800&q=80",
  },
  {
    id: "russia-stpet-5d",
    title: "تور ۵ روزه سن‌پترزبورگ",
    destination: "روسیه",
    destinationFlag: "🇷🇺",
    duration: "۵ روز",
    hotel: "هتل ۴ ستاره",
    flightType: "پرواز مستقیم",
    isCharter: false,
    oldPrice: "۲۸,۰۰۰,۰۰۰",
    newPrice: "۲۴,۵۰۰,۰۰۰",
    discount: "12",
    image: "https://images.unsplash.com/photo-1556176357-a009bc965813?w=800&q=80",
  },
  {
    id: "thailand-bangkok-5d",
    title: "تور ۵ روزه بانکوک",
    destination: "تایلند",
    destinationFlag: "🇹🇭",
    duration: "۵ روز",
    hotel: "هتل ۵ ستاره",
    flightType: "پرواز چارتر ماهان",
    isCharter: true,
    oldPrice: "۳۰,۰۰۰,۰۰۰",
    newPrice: "۲۵,۰۰۰,۰۰۰",
    discount: "17",
    image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=80",
  },
  {
    id: "thailand-phuket-6d",
    title: "تور ۶ روزه پوکت",
    destination: "تایلند",
    destinationFlag: "🇹🇭",
    duration: "۶ روز",
    hotel: "هتل ساحلی ۵ ستاره",
    flightType: "پرواز چارتر ماهان",
    isCharter: true,
    oldPrice: "۳۵,۰۰۰,۰۰۰",
    newPrice: "۲۸,۰۰۰,۰۰۰",
    discount: "20",
    image: "https://images.unsplash.com/photo-1589394815804-963808570129?w=800&q=80",
  },
  {
    id: "istanbul-4d",
    title: "تور ۴ روزه استانبول",
    destination: "ترکیه",
    destinationFlag: "🇹🇷",
    duration: "۴ روز",
    hotel: "هتل ۴ ستاره",
    flightType: "پرواز ترکیش",
    isCharter: false,
    oldPrice: "۲۲,۰۰۰,۰۰۰",
    newPrice: "۱۸,۰۰۰,۰۰۰",
    discount: "18",
    image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&q=80",
  },
  {
    id: "istanbul-cappadocia-5d",
    title: "تور ۵ روزه استانبول + کاپادوکیا",
    destination: "ترکیه",
    destinationFlag: "🇹🇷",
    duration: "۵ روز",
    hotel: "هتل ۴ ستاره",
    flightType: "پرواز چارتر ماهان",
    isCharter: true,
    oldPrice: "۲۸,۰۰۰,۰۰۰",
    newPrice: "۲۳,۰۰۰,۰۰۰",
    discount: "18",
    image: "https://images.unsplash.com/photo-1641128324972-af32127e9c47?w=800&q=80",
  },
];

export default function FeaturedToursSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-slate-50 py-8 md:py-20">
      <div className="container-brand px-4">
        {/* Header */}
        <div className="mb-6 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 md:mb-3">
              <div className="w-6 md:w-8 h-0.5 bg-brand-500" />
              <span className="text-[10px] md:text-xs font-bold text-brand-600 uppercase tracking-wider">
                پیشنهادهای ویژه
              </span>
            </div>
            <h2 className="text-xl md:text-3xl font-black text-navy-900 mb-1 md:mb-2">
              تورهای پرطرفدار <span className="text-slate-400">با تخفیف</span>
            </h2>
            <p className="text-xs md:text-base text-slate-600">
              بهترین فرصت‌های سفر به روسیه، تایلند و ترکیه
            </p>
          </div>
          <Link
            href="/tours"
            className="hidden md:flex items-center gap-2 text-sm font-bold text-navy-900 hover:text-brand-600 transition-colors group"
          >
            <span>همه تورها</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Desktop: Grid Layout */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-5">
          {tours.map((tour) => (
            <TourCard key={tour.id} tour={tour} variant="vertical" />
          ))}
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="lg:hidden relative">
          {/* Scroll Container */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4 scrollbar-hide"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {tours.map((tour) => (
              <div
                key={tour.id}
                className="flex-shrink-0 w-[280px] snap-start"
              >
                <TourCard tour={tour} variant="horizontal" />
              </div>
            ))}
          </div>

          {/* Navigation Arrows (فقط تبلت) */}
          <button
            onClick={() => scroll("right")}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center text-navy-900 hover:bg-brand-500 hover:text-white transition-all z-10"
            aria-label="بعدی"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("left")}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center text-navy-900 hover:bg-brand-500 hover:text-white transition-all z-10"
            aria-label="قبلی"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 flex justify-center lg:hidden">
          <Link
            href="/tours"
            className="flex items-center gap-2 text-sm font-bold text-brand-600"
          >
            <span>مشاهده همه تورها</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════
// Tour Card Component
// ══════════════════════════════════════════════
interface Tour {
  id: string;
  title: string;
  destination: string;
  destinationFlag: string;
  duration: string;
  hotel: string;
  flightType: string;
  isCharter: boolean;
  oldPrice: string;
  newPrice: string;
  discount: string;
  image: string;
}

function TourCard({ tour, variant }: { tour: Tour; variant: "vertical" | "horizontal" }) {
  if (variant === "horizontal") {
    // Mobile: کارت افقی فشرده
    return (
      <Link
        href={`/tours/${tour.id}`}
        className="group block bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all h-full"
      >
        <div className="flex h-full">
          {/* Image */}
          <div className="relative w-28 flex-shrink-0 overflow-hidden">
            <Image
              src={tour.image}
              alt={tour.title}
              fill
              sizes="112px"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Discount Badge */}
            <div className="absolute top-2 right-2 bg-red-500 text-white text-[10px] font-black px-2 py-1 rounded-md shadow">
              {tour.discount}%
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-3 flex flex-col justify-between">
            {/* Header */}
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-sm">{tour.destinationFlag}</span>
                <span className="text-[10px] text-slate-500">{tour.destination}</span>
              </div>
              <h3 className="text-xs font-bold text-navy-900 line-clamp-2 leading-relaxed mb-2">
                {tour.title}
              </h3>
            </div>

            {/* Features */}
            <div className="space-y-1 mb-2">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <Calendar className="w-3 h-3 text-brand-500" />
                <span>{tour.duration}</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                <Hotel className="w-3 h-3 text-brand-500" />
                <span className="truncate">{tour.hotel}</span>
              </div>
              {tour.isCharter && (
                <div className="flex items-center gap-1.5 text-[10px] text-brand-600 font-bold">
                  <Plane className="w-3 h-3" />
                  <span>چارتر ماهان</span>
                </div>
              )}
            </div>

            {/* Price */}
            <div className="pt-2 border-t border-slate-100">
              <div className="text-[9px] text-slate-400 line-through">
                {tour.oldPrice}
              </div>
              <div className="text-sm font-black text-brand-600">
                {tour.newPrice} <span className="text-[9px]">ت</span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Desktop: کارت عمودی
  return (
    <Link
      href={`/tours/${tour.id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
    >
      {/* Image */}
      <div className="relative h-56 overflow-hidden">
        <Image
          src={tour.image}
          alt={tour.title}
          fill
          sizes="33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Discount Badge */}
        <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
          {tour.discount}% تخفیف
        </div>

        {/* Charter Badge */}
        {tour.isCharter && (
          <div className="absolute top-4 left-4 bg-navy-900/90 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
            <Plane className="w-3 h-3" />
            <span>چارتر ماهان</span>
          </div>
        )}

        {/* Flag Overlay */}
        <div className="absolute bottom-4 right-4 text-3xl drop-shadow-lg">
          {tour.destinationFlag}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title */}
        <h3 className="text-base font-bold text-navy-900 mb-3 line-clamp-2 leading-relaxed group-hover:text-brand-600 transition-colors">
          {tour.title}
        </h3>

        {/* Features */}
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Calendar className="w-4 h-4 text-brand-500 flex-shrink-0" />
            <span>{tour.duration}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Hotel className="w-4 h-4 text-brand-500 flex-shrink-0" />
            <span>{tour.hotel}</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600">
            <Plane className="w-4 h-4 text-brand-500 flex-shrink-0" />
            <span>{tour.flightType}</span>
          </div>
        </div>

        {/* Price + CTA - چسبیده به پایین */}
        <div className="mt-auto flex items-end justify-between pt-4 border-t border-slate-100">
          <div>
            <div className="text-xs text-slate-400 line-through mb-0.5">
              {tour.oldPrice} تومان
            </div>
            <div className="text-lg font-black text-brand-600">
              {tour.newPrice} <span className="text-[10px] font-bold">تومان</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-xs font-bold text-brand-600 group-hover:gap-2 transition-all">
            <span>رزرو</span>
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </Link>
  );
}