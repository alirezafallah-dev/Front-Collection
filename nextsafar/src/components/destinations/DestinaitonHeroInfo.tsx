// src/components/destinations/DestinationHeroInfo.tsx
"use client";

import { Compass, MapPin, Star, Calendar, Camera, Sun } from "lucide-react";

const features = [
  {
    icon: Compass,
    title: "کشف مقاصد",
    description: "صدها جاذبه طبیعی، تاریخی و تفریحی در سراسر جهان",
  },
  {
    icon: MapPin,
    title: "موقعیت دقیق",
    description: "مشاهده جاذبه‌های اطراف روی نقشه تعاملی",
  },
  {
    icon: Star,
    title: "تجربه مسافران",
    description: "نظرات و امتیازهای واقعی بازدیدکنندگان",
  },
  {
    icon: Calendar,
    title: "بهترین زمان بازدید",
    description: "فصل مناسب، ساعت کاری و مدت پیشنهادی",
  },
];

export default function DestinationHeroInfo() {
  return (
    <section className="ns-container pb-8">
      {/* ═══ عنوان اصلی ═══ */}
      <div className="text-center mb-8 md:mb-10">
        <div className="inline-flex items-center gap-2 mb-3">
          <div className="h-px w-8 bg-primary" />
          <span className="text-xs md:text-sm font-bold text-primary tracking-wide">
            سفر بعدی ایرانیان
          </span>
          <div className="h-px w-8 bg-primary" />
        </div>
        
        <h2 className="text-2xl md:text-4xl font-extrabold text-text-strong mb-3 md:mb-4 leading-tight">
          راهنمای جامع مقاصد گردشگری ایران و جهان
        </h2>
        
        <p className="text-sm md:text-lg text-text-muted max-w-2xl mx-auto leading-relaxed">
          زیباترین جاذبه‌های طبیعی، تاریخی و تفریحی را کشف کنید، بهترین زمان بازدید را بشناسید،
          نظرات مسافران را بخوانید و سفری فراموش‌نشدنی را برنامه‌ریزی کنید.
        </p>
      </div>

      {/* ═══ Grid ویژگی‌ها ═══ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <div
              key={feature.title}
              className="group relative bg-white rounded-xl md:rounded-xl border border-border p-4 md:p-6 hover:border-primary/40 hover:shadow-lg transition-all duration-300"
            >
              {/* آیکون */}
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-lg md:rounded-xl bg-primary-lightest flex items-center justify-center mb-3 md:mb-4 group-hover:scale-110 transition-transform">
                <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary" />
              </div>

              {/* عنوان */}
              <h3 className="text-sm md:text-base font-extrabold text-text-strong mb-1.5 md:mb-2">
                {feature.title}
              </h3>

              {/* توضیح */}
              <p className="text-xs md:text-sm text-text-muted leading-relaxed">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
