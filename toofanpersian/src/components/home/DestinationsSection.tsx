import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Clock } from "lucide-react";

const destinations = [
  {
    id: "russia",
    name: "روسیه",
    flag: "🇷🇺",
    cities: ["مسکو", "سن‌پترزبورگ"],
    price: "۲۹,۰۰۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&q=80",
    description: "سفر به سرزمین تزارها با معماری خیره‌کننده",
    duration: "۵ تا ۱۰ روز",
    bestTime: "خرداد تا شهریور",
  },
  {
    id: "thailand",
    name: "تایلند",
    flag: "🇹🇭",
    cities: ["بانکوک", "پاتایا", "پوکت"],
    price: "۲۵,۰۰۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
    description: "بهشت گرمسیری با سواحل بکر و فرهنگ غنی",
    duration: "۵ تا ۷ روز",
    bestTime: "آبان تا فروردین",
  },
  {
    id: "istanbul",
    name: "استانبول",
    flag: "🇹🇷",
    cities: ["استانبول", "کاپادوکیا", "آنتالیا"],
    price: "۱۸,۰۰۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
    description: "تلاقی دو قاره با تاریخ هزاران ساله",
    duration: "۴ تا ۷ روز",
    bestTime: "بهار و پاییز",
  },
];

export default function DestinationsSection() {
  return (
    <section className="w-full bg-white py-8 md:py-20">
      <div className="container-brand px-4">
        {/* Header - Editorial Style */}
        <div className="mb-6 md:mb-14">
          <div className="flex items-end justify-between gap-4 mb-3 md:mb-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 md:mb-3">
                <div className="w-6 md:w-8 h-0.5 bg-brand-500" />
                <span className="text-[10px] md:text-xs font-bold text-brand-600 uppercase tracking-wider">
                  مقاصد تخصصی
                </span>
              </div>
              <h2 className="text-xl md:text-4xl font-black text-navy-900 leading-tight">
                مقاصد محبوب <span className="text-slate-400 hidden md:inline">طوفان پرشین</span>
              </h2>
            </div>
            <Link
              href="/destinations"
              className="hidden md:flex items-center gap-2 text-sm font-bold text-navy-900 hover:text-brand-600 transition-colors group"
            >
              <span>همه مقاصد</span>
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            </Link>
          </div>
          <p className="text-xs md:text-base text-slate-600 max-w-2xl">
            سفر به رویایی‌ترین مقاصد جهان با خدمات اختصاصی
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href={`/destinations/${dest.id}`}
              className="group relative block overflow-hidden rounded-2xl bg-navy-900 aspect-[5/4] md:aspect-[3/4]"
            >
              {/* Background Image */}
              <Image
                src={dest.image}
                alt={`تور ${dest.name}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />

              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Content */}
              <div className="relative h-full flex flex-col justify-between p-4 md:p-8">
                {/* Top: Flag */}
                <div className="flex items-start justify-between">
                  <span className="text-3xl md:text-4xl drop-shadow-lg">{dest.flag}</span>
                </div>

                {/* Bottom: Info */}
                <div className="text-white">
                  {/* Name */}
                  <h3 className="text-xl md:text-3xl font-black mb-1 md:mb-2 leading-tight">
                    {dest.name}
                  </h3>

                  {/* Description - Hidden on mobile */}
                  <p className="hidden md:block text-sm text-white/85 mb-4 line-clamp-2">
                    {dest.description}
                  </p>

                  {/* Cities */}
                  <div className="flex items-center gap-1.5 text-[10px] md:text-xs text-white/80 mb-2 md:mb-4">
                    <MapPin className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                    <span className="truncate">{dest.cities.join(" • ")}</span>
                  </div>

                  {/* Meta Info - فشرده در موبایل */}
                  <div className="flex items-center gap-2 md:gap-4 text-[10px] md:text-xs text-white/80 mb-3 md:mb-5">
                    <div className="flex items-center gap-1 md:gap-1.5">
                      <Clock className="w-3 h-3 md:w-3.5 md:h-3.5 flex-shrink-0" />
                      <span className="whitespace-nowrap">{dest.duration}</span>
                    </div>
                    <span className="text-white/50 hidden md:inline">•</span>
                    <span className="hidden md:inline whitespace-nowrap">بهترین زمان: {dest.bestTime}</span>
                  </div>

                  {/* CTA + Price */}
                  <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-white/20">
                    <div className="flex items-center gap-1.5 md:gap-2 text-xs md:text-sm font-bold text-brand-400 group-hover:gap-3 transition-all">
                      <span>مشاهده تورها</span>
                      <ArrowLeft className="w-3.5 h-3.5 md:w-4 md:h-4 group-hover:-translate-x-1 transition-transform" />
                    </div>
                    <div className="text-left">
                      <div className="text-[9px] md:text-[10px] text-white/60 mb-0.5">شروع از</div>
                      <div className="text-xs md:text-sm font-black text-white whitespace-nowrap">
                        {dest.price} <span className="text-[10px] md:text-xs font-medium">ت</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Corner Decoration - Desktop Only */}
              <div className="hidden md:block absolute top-0 left-0 w-24 h-24 overflow-hidden">
                <div className="absolute -top-12 -left-12 w-24 h-24 bg-brand-500 rotate-45 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-5 flex justify-center md:hidden">
          <Link
            href="/destinations"
            className="flex items-center gap-2 text-sm font-bold text-brand-600"
          >
            <span>مشاهده همه مقاصد</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}