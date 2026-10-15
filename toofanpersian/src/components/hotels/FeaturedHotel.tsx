import Link from "next/link";
import Image from "next/image";
import { Star, MapPin, Award, Check, ArrowLeft, Sparkles } from "lucide-react";
import { Hotel } from "@/lib/data/hotels";

interface FeaturedHotelProps {
  hotel: Hotel;
}

export default function FeaturedHotel({ hotel }: FeaturedHotelProps) {
  return (
    <section className="py-6 md:py-10 bg-white">
      <div className="container-brand px-4">
        {/* Header */}
        <div className="mb-4 md:mb-6 flex items-center gap-3">
          <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <Award className="w-4 h-4 md:w-5 md:h-5 text-white" />
          </div>
          <div>
            <div className="text-[10px] md:text-xs font-bold text-brand-600 uppercase tracking-wider">
              پیشنهاد ویژه
            </div>
            <h2 className="text-base md:text-xl font-black text-navy-900">
              هتل منتخب طوفان پرشین
            </h2>
          </div>
        </div>

        {/* Featured Card - ارتفاع کنترل شده */}
        <Link
          href={`/hotels/${hotel.id}`}
          className="group relative block overflow-hidden rounded-2xl bg-navy-900 h-[320px] sm:h-[360px] md:h-[400px]"
        >
          {/* Background Image */}
          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 1200px"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-black/30 md:from-black/80 md:via-black/40 md:to-black/20" />

          {/* Featured Badge */}
          <div className="absolute top-3 right-3 md:top-4 md:right-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-brand-500 text-white text-[10px] md:text-[11px] font-black shadow-lg">
            <Sparkles className="w-3 h-3" />
            <span>انتخاب ویژه</span>
          </div>

          {/* Content */}
          <div className="relative h-full flex flex-col justify-end p-4 md:p-6 lg:p-8">
            {/* Main Info */}
            <div className="text-white">
              {/* Flag + Name + Location در یک خط */}
              <div className="flex items-center gap-2.5 mb-2">
                <span className="text-2xl md:text-3xl drop-shadow-lg">{hotel.flag}</span>
                <div className="min-w-0">
                  <h3 className="text-lg md:text-2xl lg:text-3xl font-black leading-tight truncate">
                    {hotel.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-[11px] md:text-xs text-white/70 mt-0.5">
                    <MapPin className="w-3 h-3 flex-shrink-0" />
                    <span className="truncate">{hotel.location} • {hotel.neighborhood}</span>
                  </div>
                </div>
              </div>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-3.5 h-3.5 ${
                        i < Math.floor(hotel.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-white/30"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs md:text-sm font-black">{hotel.rating}</span>
                <span className="text-[10px] md:text-xs text-white/60">
                  ({hotel.reviewCount} نظر)
                </span>
              </div>

              {/* Description - فقط دسکتاپ، 1 خط */}
              <p className="hidden md:block text-sm text-white/75 mb-3 line-clamp-1 leading-relaxed max-w-xl">
                {hotel.description}
              </p>

              {/* Highlights - فقط 3 تا */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {hotel.highlights.slice(0, 3).map((highlight, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/15"
                  >
                    <Check className="w-3 h-3 text-brand-400 flex-shrink-0" />
                    <span className="text-[11px] md:text-xs text-white/90 whitespace-nowrap">
                      {highlight}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA + Meta */}
              <div className="flex items-center justify-between pt-3 border-t border-white/20">
                <div className="flex items-center gap-2 text-xs md:text-sm font-bold text-brand-400 group-hover:gap-3 transition-all">
                  <span>مشاهده جزئیات</span>
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                </div>
                <div className="text-[10px] md:text-xs text-white/60">
                  هتل {hotel.stars} ستاره • {hotel.distanceToCenter}
                </div>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}