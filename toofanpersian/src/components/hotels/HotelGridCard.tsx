"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Heart, Waves, Utensils, Sparkles, Wifi, Car, Coffee, Dumbbell, Building2, ChevronLeft, ChevronRight } from "lucide-react";

const iconMap: Record<string, any> = {
  Waves, Utensils, Sparkles, Wifi, Car, Coffee, Dumbbell, Building2,
};

interface Hotel {
  id: string;
  name: string;
  location: string;
  flag: string;
  rating: number;
  reviewCount: string;
  stars: 4 | 5;
  image: string;
  gallery?: string[];
  amenities: { label: string; icon: string }[];
  tags: string[];
  neighborhood: string;
}

interface HotelGridCardProps {
  hotel: Hotel;
  showNeighborhood?: boolean;
}

export default function HotelGridCard({ 
  hotel, 
  showNeighborhood = true 
}: HotelGridCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef<number>(0);

  const images = hotel.gallery && hotel.gallery.length > 0 
    ? hotel.gallery.slice(0, 5) 
    : [hotel.image];

  const nextImage = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  // Touch events برای swipe در موبایل
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    // حداقل 50px swipe
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        // Swipe به چپ (در RTL) = عکس بعدی
        nextImage();
      } else {
        // Swipe به راست (در RTL) = عکس قبلی
        prevImage();
      }
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
      {/* Image Gallery */}
      <div 
        className="relative h-48 md:h-56 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* Current Image */}
        <Image
          src={images[currentImageIndex]}
          alt={hotel.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-opacity duration-300"
        />

        {/* Navigation Arrows - فقط دسکتاپ و فقط وقتی بیشتر از 1 عکس داریم */}
        {images.length > 1 && (
          <>
            {/* دکمه عکس قبلی - سمت راست (در RTL) */}
            <button
              type="button"
              onClick={prevImage}
              className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm items-center justify-center text-navy-900 hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-lg z-10"
              aria-label="عکس قبلی"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            {/* دکمه عکس بعدی - سمت چپ (در RTL) */}
            <button
              type="button"
              onClick={nextImage}
              className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm items-center justify-center text-navy-900 hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-lg z-10"
              aria-label="عکس بعدی"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Image Counter - پایین وسط */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold z-10">
            {currentImageIndex + 1} / {images.length}
          </div>
        )}

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setIsFavorite(!isFavorite);
          }}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full backdrop-blur-sm flex items-center justify-center transition-all shadow-lg z-10 ${
            isFavorite
              ? "bg-red-500 text-white"
              : "bg-white/95 text-slate-600 hover:text-red-500"
          }`}
          aria-label="افزودن به علاقه‌مندی"
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-white" : ""}`} />
        </button>

        {/* Tags */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {hotel.tags.slice(0, 2).map((tag, i) => (
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
      <div className="p-4 md:p-5 flex flex-col flex-1">
        {/* Name + Flag */}
        <div className="flex items-start gap-2 mb-2">
          <span className="text-lg flex-shrink-0">{hotel.flag}</span>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm md:text-base font-bold text-navy-900 truncate group-hover:text-brand-600 transition-colors">
              {hotel.name}
            </h3>
            <div className="flex items-center gap-1 text-[11px] text-slate-500 mt-0.5">
              <MapPin className="w-3 h-3 flex-shrink-0" />
              <span className="truncate">{hotel.location}</span>
            </div>
          </div>
        </div>

        {/* Neighborhood */}
        {showNeighborhood && (
          <div className="text-[11px] text-slate-500 mb-3">
            <span className="font-medium text-slate-700">محله:</span> {hotel.neighborhood}
          </div>
        )}

        {/* Star Rating */}
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <Sparkles
                key={i}
                className={`w-3 h-3 ${
                  i < Math.floor(hotel.rating)
                    ? "text-yellow-400 fill-yellow-400"
                    : "text-slate-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs font-bold text-slate-700">{hotel.rating}</span>
          <span className="text-[10px] text-slate-400">({hotel.reviewCount} نظر)</span>
        </div>

        {/* Amenities */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          {hotel.amenities.slice(0, 4).map((amenity, i) => {
            const Icon = iconMap[amenity.icon] || Sparkles;
            return (
              <div key={i} className="flex items-center gap-1.5 text-[11px] text-slate-600">
                <Icon className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                <span className="truncate">{amenity.label}</span>
              </div>
            );
          })}
        </div>

        {/* CTA */}
        <Link
          href={`/hotels/${hotel.id}`}
          className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100"
        >
          <span className="text-[11px] text-slate-500">
            هتل {hotel.stars} ستاره
          </span>
          <div className="flex items-center gap-1 text-xs font-bold text-brand-600 group-hover:gap-2 transition-all">
            <span>مشاهده</span>
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          </div>
        </Link>
      </div>
    </div>
  );
}