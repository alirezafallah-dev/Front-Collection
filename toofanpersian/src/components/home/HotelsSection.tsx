import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Star, MapPin, Wifi, Utensils, Waves, Sparkles, Coffee, Car } from "lucide-react";

const hotels = [
  {
    id: "four-seasons-bosphorus",
    name: "Four Seasons Bosphorus",
    location: "استانبول، ترکیه",
    flag: "🇹🇷",
    rating: 4.8,
    reviewCount: "۱,۲۳۴",
    stars: 5,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&q=80",
    amenities: [
      { icon: Waves, label: "ویو دریا" },
      { icon: Utensils, label: "رستوران" },
      { icon: Sparkles, label: "اسپا" },
      { icon: Wifi, label: "وای‌فای" },
    ],
    tags: ["لوکس", "ویو بسفور"],
  },
  {
    id: "lotte-hotel-stpetersburg",
    name: "Lotte Hotel St. Petersburg",
    location: "سن‌پترزبورگ، روسیه",
    flag: "🇷🇺",
    rating: 4.7,
    reviewCount: "۸۹۲",
    stars: 5,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&q=80",
    amenities: [
      { icon: Car, label: "پارکینگ" },
      { icon: Utensils, label: "رستوران" },
      { icon: Sparkles, label: "اسپا" },
      { icon: Wifi, label: "وای‌فای" },
    ],
    tags: ["لوکس", "مرکز شهر"],
  },
  {
    id: "mandarin-oriental-bangkok",
    name: "Mandarin Oriental Bangkok",
    location: "بانکوک، تایلند",
    flag: "🇹🇭",
    rating: 4.9,
    reviewCount: "۱,۵۶۷",
    stars: 5,
    image: "https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=800&q=80",
    amenities: [
      { icon: Waves, label: "استخر" },
      { icon: Utensils, label: "رستوران" },
      { icon: Sparkles, label: "اسپا" },
      { icon: Coffee, label: "کافه" },
    ],
    tags: ["لوکس", "ساحلی"],
  },
  {
    id: "radisson-royal-moscow",
    name: "Radisson Royal Hotel Moscow",
    location: "مسکو، روسیه",
    flag: "🇷🇺",
    rating: 4.6,
    reviewCount: "۱,۰۲۳",
    stars: 5,
    image: "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=800&q=80",
    amenities: [
      { icon: Car, label: "پارکینگ" },
      { icon: Utensils, label: "رستوران" },
      { icon: Sparkles, label: "اسپا" },
      { icon: Wifi, label: "وای‌فای" },
    ],
    tags: ["لوکس", "تاریخی"],
  },
  {
    id: "banyan-tree-phuket",
    name: "Banyan Tree Phuket",
    location: "پوکت، تایلند",
    flag: "🇹🇭",
    rating: 4.8,
    reviewCount: "۹۴۵",
    stars: 5,
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?w=800&q=80",
    amenities: [
      { icon: Waves, label: "ساحل اختصاصی" },
      { icon: Utensils, label: "رستوران" },
      { icon: Sparkles, label: "اسپا" },
      { icon: Wifi, label: "وای‌فای" },
    ],
    tags: ["ساحلی", "لوکس"],
  },
  {
    id: "shangri-la-bosphorus",
    name: "Shangri-La Bosphorus",
    location: "استانبول، ترکیه",
    flag: "🇹🇷",
    rating: 4.7,
    reviewCount: "۱,۱۵۶",
    stars: 5,
    image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800&q=80",
    amenities: [
      { icon: Waves, label: "ویو دریا" },
      { icon: Utensils, label: "رستوران" },
      { icon: Sparkles, label: "اسپا" },
      { icon: Wifi, label: "وای‌فای" },
    ],
    tags: ["لوکس", "ویو بسفور"],
  },
];

function StarRating({ rating, count }: { rating: number; count: string }) {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-3.5 h-3.5 ${
              i < Math.floor(rating)
                ? "text-yellow-400 fill-yellow-400"
                : "text-slate-300"
            }`}
          />
        ))}
      </div>
      <span className="text-xs font-bold text-slate-700">{rating}</span>
      <span className="text-xs text-slate-400">({count} نظر)</span>
    </div>
  );
}

export default function HotelsSection() {
  return (
    <section className="w-full bg-slate-50 py-12 md:py-20">
      <div className="container-brand px-4">
        {/* Header */}
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold mb-3">
              <Star className="w-3.5 h-3.5 fill-brand-600" />
              هتل‌های برتر
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-navy-900 mb-2">
              هتل‌های محبوب و لوکس
            </h2>
            <p className="text-sm md:text-base text-slate-500">
              معرفی بهترین هتل‌های ۵ ستاره روسیه، تایلند و ترکیه
            </p>
          </div>
          <Link
            href="/hotels"
            className="hidden md:flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors"
          >
            <span>مشاهده همه هتل‌ها</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Hotels Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {hotels.map((hotel) => (
            <Link
              key={hotel.id}
              href={`/hotels/${hotel.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <Image
                  src={hotel.image}
                  alt={hotel.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm text-navy-900 text-xs font-black px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                  <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                  <span>{hotel.rating}</span>
                </div>

                {/* Tags */}
                <div className="absolute top-3 left-3 flex flex-col gap-1">
                  {hotel.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="bg-navy-900/80 backdrop-blur-sm text-white text-[10px] font-bold px-2.5 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-5">
                {/* Name + Flag */}
                <div className="flex items-start gap-2 mb-2">
                  <span className="text-lg flex-shrink-0">{hotel.flag}</span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm md:text-base font-bold text-navy-900 truncate">
                      {hotel.name}
                    </h3>
                    <div className="flex items-center gap-1 text-xs text-slate-500 mt-0.5">
                      <MapPin className="w-3 h-3 flex-shrink-0" />
                      <span className="truncate">{hotel.location}</span>
                    </div>
                  </div>
                </div>

                {/* Star Rating */}
                <div className="mb-3">
                  <StarRating rating={hotel.rating} count={hotel.reviewCount} />
                </div>

                {/* Amenities */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {hotel.amenities.map((amenity, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs text-slate-600">
                      <amenity.icon className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                      <span className="truncate">{amenity.label}</span>
                    </div>
                  ))}
                </div>

                {/* CTA - بدون قیمت */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <span className="text-xs text-slate-500">
                    هتل ۵ ستاره
                  </span>

                  <div className="flex items-center gap-1 text-xs font-bold text-brand-600 group-hover:gap-2 transition-all">
                    <span>مشاهده جزئیات</span>
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 flex justify-center md:hidden">
          <Link
            href="/hotels"
            className="flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors"
          >
            <span>مشاهده همه هتل‌ها</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}