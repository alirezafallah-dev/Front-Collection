"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Destination } from "@/types/destination";
import DestinationHeader from "./DestinationHeader";
import DestinationHeroGallery from "./DestinationHeroGallery";
import DestinationAbout from "./DestinationAbout";
import DestinationHighlights from "./DestinationHighlights";
import DestinationPolicies from "./DestinationPolicies";
import RelatedTours from "./RelatedTours";
import { WeatherWidget } from "@/components/shared/weather";
import FAQSection from "@/components/shared/sections/FAQSection";
import type { FAQItem } from "@/components/shared/sections/FAQSection";
import SimilarDestinations from "./SimilarDestinations";
import destinationsData from "@/data/destinations.json";

const TABS = [
  { id: "summary", label: "خلاصه" },
  { id: "highlights", label: "نکات برجسته" },
  { id: "policies", label: "اطلاعات کاربردی" },
];

const DESTINATION_FAQ_ITEMS: FAQItem[] = [
  { q: "بهترین زمان بازدید از این مقصد چه زمانی است؟", a: "بهترین زمان بازدید معمولاً بهار و پاییز است. برای اطلاعات دقیق‌تر به بخش اطلاعات کاربردی مراجعه کنید." },
  { q: "آیا این مقصد برای کودکان مناسب است؟", a: "بله، اکثر مقاصد ما خانوادگی هستند اما توصیه می‌کنیم قبل از سفر امکانات و محدودیت‌های سنی را بررسی کنید." },
  { q: "آیا راهنمای تور در دسترس است؟", a: "بله، در تورهای مرتبط می‌توانید راهنمای تور فارسی‌زبان را درخواست کنید." },
  { q: "چطور می‌توانم به این مقصد بروم؟", a: "توصیه می‌کنیم از تورهای پیشنهادی استفاده کنید یا با تیم پشتیبانی ما برای برنامه‌ریزی سفر تماس بگیرید." },
  { q: "آیا امکان خرید بلیط در محل وجود دارد؟", a: "بله، اما توصیه می‌کنیم بلیط را از قبل تهیه کنید تا از صف‌های طولانی جلوگیری شود." },
];

interface Props {
  destination: Destination;
}

export default function DestinationDetailPage({ destination }: Props) {
  const similarDestinations = (destinationsData.destinations as Destination[])
    .filter((d) =>
      d.id !== destination.id &&
      (d.city === destination.city || d.country === destination.country || d.type === destination.type)
    )
    .slice(0, 3);

  const images = destination.gallery && destination.gallery.length > 0
    ? destination.gallery
    : [destination.image];

  return (
    <div className="min-h-screen bg-white">
      <DestinationHeader destination={destination} />

      <div className="ns-container pb-24 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          <div className="min-w-0 space-y-6 md:space-y-0">
            <DestinationHeroGallery images={images} title={destination.title} />

            <div className="space-y-6 md:space-y-12 mt-4 md:mt-0">
              {/* تب‌ها */}
              <nav className="sticky top-[78px] md:top-[135px] z-30 bg-white/95 backdrop-blur border-b border-border">
                <div className="ns-container">
                  <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    {TABS.map((t, i) => (
                      <a
                        key={t.id}
                        href={`#${t.id}`}
                        className={`relative py-3 text-[13px] md:text-sm font-bold whitespace-nowrap transition shrink-0 ${
                          i === 0 ? "text-primary" : "text-text-muted hover:text-primary"
                        }`}
                      >
                        {t.label}
                        {i === 0 && (
                          <span className="absolute bottom-0 inset-x-0 h-0.5 bg-primary rounded-full" />
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </nav>

              <DestinationAbout destination={destination} />
              <DestinationHighlights destination={destination} />
              <DestinationPolicies destination={destination} />
            </div>

            {/* سایدبار موبایل - زیر اطلاعات کاربردی */}
            <div className="lg:hidden mt-6">
              <DestinationSidebar destination={destination} />
            </div>

            {/* آب و هوا */}
            <section className="mt-6 md:mt-12">
              <WeatherWidget
                lat={destination.coordinates.lat}
                lng={destination.coordinates.lng}
                cityName={destination.city}
                showForecast
              />
            </section>

            {/* FAQ */}
            <div className="mt-6 md:mt-12">
              <section>
                <div className="flex items-center justify-between gap-3 mb-5 md:mb-6">
                  <div className="min-w-0">
                    <h2 className="ns-section-title !mb-1">سؤالات متداول</h2>
                    <p className="text-xs md:text-sm text-text-muted">
                      پاسخ به رایج‌ترین پرسش‌های مسافران
                    </p>
                  </div>
                </div>
                <FAQSection
                  items={DESTINATION_FAQ_ITEMS}
                  supportText="سوال دیگه‌ای دارید؟ تیم پشتیبانی ما ۲۴ ساعته آماده پاسخگویی است"
                  supportPhone="+982191001234"
                  showNumbers
                />
              </section>
            </div>

            {/* تورهای مرتبط */}
            <RelatedTours destination={destination} />

            {/* مقاصد مشابه */}
            {similarDestinations.length > 0 && (
              <SimilarDestinations destinations={similarDestinations} />
            )}
          </div>

          {/* سایدبار دسکتاپ */}
          <aside className="hidden lg:block lg:sticky lg:top-[150px] lg:max-h-[calc(100vh-174px)] lg:overflow-y-auto scrollbar-hide">
            <DestinationSidebar destination={destination} />
          </aside>
        </div>
      </div>
    </div>
  );
}

function DestinationSidebar({ destination }: { destination: Destination }) {
  const FACTS = [
    { label: "نوع مقصد", value: destination.type },
    { label: "مدت بازدید", value: destination.duration },
    { label: "قیمت ورودی", value: destination.entrance_fee || "رایگان" },
    { label: "ساعت کاری", value: destination.opening_hours || "-" },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-white border border-border rounded-[10px] md:rounded-lg p-4 md:p-5 shadow-sm hover:shadow-card-hover transition-shadow duration-500 ease-out">
        <h3 className="text-sm md:text-base font-extrabold text-text-strong mb-3">
          اطلاعات کلیدی
        </h3>
        <div className="divide-y divide-border/60">
          {FACTS.map((f) => (
            <div key={f.label} className="flex items-start justify-between gap-3 py-2.5">
              <span className="text-[11px] md:text-xs text-text-muted shrink-0">{f.label}</span>
              <span className="text-[11px] md:text-xs font-bold text-text-strong text-end">{f.value}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-br from-primary to-primary-dark rounded-[10px] md:rounded-lg p-5 text-white shadow-lg">
        <h3 className="text-sm font-extrabold mb-2">نیاز به راهنمایی دارید؟</h3>
        <p className="text-[11px] text-white/80 mb-4 leading-6">
          کارشناسان ما آماده پاسخگویی به سوالات شما هستند
        </p>
        <a
          href="tel:+982191001234"
          className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-white text-primary text-xs font-bold hover:bg-white/95 transition"
        >
          تماس با پشتیبانی
        </a>
      </div>
    </div>
  );
}