"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Star, ChevronRight, ChevronLeft, Quote, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const testimonials = [
  {
    id: 1,
    name: "علی محمدی",
    role: "تور ۷ روزه مسکو",
    rating: 5,
    text: "سفر رویایی به مسکو بود! خدمات عالی، هتل بی‌نظیر، راهنمای فارسی‌زبان حرفه‌ای و برنامه‌ریزی دقیق. حتماً دوباره با طوفان پرشین سفر می‌کنم.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
    tourType: "روسیه",
    flag: "🇷🇺",
  },
  {
    id: 2,
    name: "فاطمه رضایی",
    role: "تور ۵ روزه بانکوک + پاتایا",
    rating: 5,
    text: "بهترین تجربه سفرم به تایلند بود. چارتر ماهان با قیمت فوق‌العاده، هتل ساحلی عالی و گشت‌های جذاب. تیم پشتیبانی ۲۴ ساعته هم کمک بزرگی بود.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
    tourType: "تایلند",
    flag: "🇹🇭",
  },
  {
    id: 3,
    name: "رضا کریمی",
    role: "تور ۴ روزه استانبول",
    rating: 5,
    text: "از لحظه رزرو تا بازگشت، همه چیز حرفه‌ای و دقیق بود. تور کشتی بسفور فوق‌العاده بود و هتل ویو دریا داشت. قیمت نسبت به بقیه آژانس‌ها خیلی مناسب‌تر بود.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80",
    tourType: "ترکیه",
    flag: "🇹🇷",
  },
  {
    id: 4,
    name: "مریم حسینی",
    role: "تور ۶ روزه پوکت",
    rating: 5,
    text: "تور پوکت طوفان پرشین واقعاً فراتر از انتظاراتم بود. قایق‌سواری بین جزایر، غواصی و رستوران‌های ساحلی همه عالی بودند. سفر ماه عسلی رویایی!",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
    tourType: "تایلند",
    flag: "🇹🇭",
  },
  {
    id: 5,
    name: "امیر صادقی",
    role: "تور ۵ روزه سن‌پترزبورگ",
    rating: 5,
    text: "موزه آرمیتاژ، کاخ زمستانی و کانال‌های سن‌پترزبورگ با راهنمای متخصص فارسی‌زبان تجربه‌ای فراموش‌نشدنی بود. طوفان پرشین بهترین انتخاب بود.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
    tourType: "روسیه",
    flag: "🇷🇺",
  },
  {
    id: 6,
    name: "زهرا احمدی",
    role: "تور ۵ روزه استانبول + کاپادوکیا",
    rating: 5,
    text: "بالن‌سواری در کاپادوکیا یکی از بهترین تجربه‌های زندگیم بود. سازماندهی عالی، هتل‌های لوکس و ترانسفر راحت. ممنون از تیم حرفه‌ای طوفان پرشین!",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&q=80",
    tourType: "ترکیه",
    flag: "🇹🇷",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <Star
          key={i}
          className={cn(
            "w-3 h-3 md:w-4 md:h-4",
            i < rating ? "text-yellow-400 fill-yellow-400" : "text-slate-300"
          )}
        />
      ))}
    </div>
  );
}

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const next = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIsAutoPlaying(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goTo = (index: number) => {
    setIsAutoPlaying(false);
    setActiveIndex(index);
  };

  return (
    <section className="w-full bg-gradient-to-b from-white to-slate-50 py-8 md:py-20">
      <div className="container-brand px-4">
        {/* Header */}
        <div className="mb-6 md:mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 text-[10px] md:text-xs font-bold mb-2 md:mb-3">
            <Award className="w-3 h-3 md:w-3.5 md:h-3.5" />
            نظرات مسافران
          </div>
          <h2 className="text-xl md:text-3xl font-black text-navy-900 mb-2">
            بیش از <span className="text-brand-600">۵۰۰,۰۰۰</span> مسافر راضی
          </h2>
          <p className="text-xs md:text-base text-slate-500 max-w-2xl mx-auto">
            تجربه‌های واقعی مسافران طوفان پرشین
          </p>

          {/* Stats - فشرده در موبایل */}
          <div className="flex items-center justify-center gap-4 md:gap-8 mt-4 md:mt-6">
            <div className="text-center">
              <div className="text-xl md:text-3xl font-black text-navy-900">۴.۹</div>
              <StarRating rating={5} />
              <div className="text-[10px] md:text-xs text-slate-500 mt-1">میانگین امتیاز</div>
            </div>
            <div className="w-px h-10 md:h-12 bg-slate-200" />
            <div className="text-center">
              <div className="text-xl md:text-3xl font-black text-navy-900">۹۸٪</div>
              <div className="text-[10px] md:text-xs text-slate-500 mt-1">رضایت مشتریان</div>
            </div>
            <div className="w-px h-10 md:h-12 bg-slate-200 hidden md:block" />
            <div className="text-center hidden md:block">
              <div className="text-2xl md:text-3xl font-black text-navy-900">۱۰+</div>
              <div className="text-xs text-slate-500 mt-1">سال تجربه</div>
            </div>
          </div>
        </div>

        {/* Desktop: 3 کارت */}
        <div className="hidden md:grid md:grid-cols-3 gap-6">
          {testimonials.slice(0, 3).map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>

        {/* Mobile: Carousel - ارتفاع responsive */}
        <div className="md:hidden">
          <div className="relative min-h-[250px] sm:min-h-[280px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={testimonial.id}
                className={cn(
                  "absolute inset-0 transition-all duration-500",
                  index === activeIndex
                    ? "opacity-100 translate-x-0"
                    : index < activeIndex
                    ? "opacity-0 -translate-x-full"
                    : "opacity-0 translate-x-full"
                )}
              >
                <TestimonialCard testimonial={testimonial} compact />
              </div>
            ))}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={prev}
              className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-navy-900 hover:bg-brand-50 hover:border-brand-300 transition-all shadow-sm"
              aria-label="قبلی"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goTo(index)}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    index === activeIndex
                      ? "w-6 bg-brand-500"
                      : "w-1.5 bg-slate-300 hover:bg-slate-400"
                  )}
                  aria-label={`نظر ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-9 h-9 rounded-full bg-white border border-slate-200 flex items-center justify-center text-navy-900 hover:bg-brand-50 hover:border-brand-300 transition-all shadow-sm"
              aria-label="بعدی"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-6 md:mt-10 text-center">
          <p className="text-xs md:text-sm text-slate-500 mb-3">
            شما هم با طوفان پرشین سفر کردید؟
          </p>
          <a
            href="/reviews/new"
            className="inline-flex items-center gap-2 px-5 md:px-6 py-2.5 md:py-3 rounded-xl bg-white border-2 border-brand-500 text-brand-600 font-bold text-xs md:text-sm hover:bg-brand-500 hover:text-white transition-all"
          >
            <Star className="w-3.5 h-3.5 md:w-4 md:h-4" />
            <span>ثبت نظر خود</span>
          </a>
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ 
  testimonial, 
  compact = false 
}: { 
  testimonial: typeof testimonials[0]; 
  compact?: boolean;
}) {
  if (compact) {
    // Mobile: کارت فشرده
    return (
      <div className="relative bg-white rounded-2xl p-4 border border-slate-100 shadow-sm h-full">
        {/* Quote Icon - کوچک */}
        <div className="absolute top-3 left-3 text-brand-500/20">
          <Quote className="w-8 h-8" fill="currentColor" />
        </div>

        {/* Rating */}
        <div className="mb-2">
          <StarRating rating={testimonial.rating} />
        </div>

        {/* Text - فشرده */}
        <p className="text-xs text-slate-700 leading-relaxed mb-3 line-clamp-3">
          "{testimonial.text}"
        </p>

        {/* Divider */}
        <div className="h-px bg-slate-100 mb-3" />

        {/* Author */}
        <div className="flex items-center gap-2">
          <div className="relative w-9 h-9 rounded-full overflow-hidden ring-2 ring-brand-100 flex-shrink-0">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              sizes="36px"
              className="object-cover"
            />
          </div>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-xs text-navy-900 flex items-center gap-1">
              {testimonial.name}
              <span className="text-sm">{testimonial.flag}</span>
            </div>
            <div className="text-[10px] text-slate-500 truncate">
              {testimonial.role}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop: کارت کامل
  return (
    <div className="relative bg-white rounded-2xl p-6 md:p-7 border border-slate-100 shadow-sm hover:shadow-xl transition-shadow">
      <div className="absolute top-6 left-6 text-brand-500/20">
        <Quote className="w-12 h-12" fill="currentColor" />
      </div>

      <div className="mb-4">
        <StarRating rating={testimonial.rating} />
      </div>

      <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-6 min-h-[80px]">
        "{testimonial.text}"
      </p>

      <div className="h-px bg-slate-100 mb-5" />

      <div className="flex items-center gap-3">
        <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-brand-100 flex-shrink-0">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            sizes="48px"
            className="object-cover"
          />
        </div>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-navy-900 text-sm flex items-center gap-1">
            {testimonial.name}
            <span>{testimonial.flag}</span>
          </div>
          <div className="text-xs text-slate-500 truncate">
            {testimonial.role}
          </div>
        </div>
        <div className="text-[10px] font-bold px-2 py-1 rounded-md bg-brand-50 text-brand-600 whitespace-nowrap">
          {testimonial.tourType}
        </div>
      </div>
    </div>
  );
}