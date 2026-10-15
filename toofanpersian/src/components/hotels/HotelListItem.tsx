"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, MapPin, Heart, Waves, Utensils, Sparkles, Wifi, Car, Coffee, ChevronLeft, ChevronRight } from "lucide-react";

const iconMap: Record<string, any> = {
  Waves, Utensils, Sparkles, Wifi, Car, Coffee,
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

interface HotelListItemProps {
  hotel: Hotel;
}

export default function HotelListItem({ hotel }: HotelListItemProps) {
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

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
  };

  return (
    <div className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl transition-all duration-300 flex flex-row h-36 sm:h-44 lg:h-52">
      {/* Image */}
      <div 
        className="relative w-36 sm:w-44 lg:w-64 flex-shrink-0 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[currentImageIndex]}
          alt={hotel.name}
          fill
          sizes="(max-width: 640px) 144px, (max-width: 1024px) 176px, 256px"
          className="object-cover transition-opacity duration-300"
        />

        {/* Navigation Arrows - فقط دسکتاپ */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={prevImage}
              className="hidden sm:flex absolute right-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm items-center justify-center text-navy-900 hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-md z-10"
              aria-label="عکس قبلی"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={nextImage}
              className="hidden sm:flex absolute left-1 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 backdrop-blur-sm items-center justify-center text-navy-900 hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-md z-10"
              aria-label="عکس بعدی"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
          </>
        )}

        {/* Image Counter - پایین وسط */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[9px] font-bold z-10">
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
          className={`absolute top-2 right-2 w-8 h-8 rounded-full backdrop-blur-sm flex items-center justify-center transition-all shadow-md ${
            isFavorite
              ? "bg-red-500 text-white"
              : "bg-white/95 text-slate-600 hover:text-red-500"
          }`}
          aria-label="افزودن به علاقه‌مندی"
        >
          <Heart className={`w-3.5 h-3.5 ${isFavorite ? "fill-white" : ""}`} />
        </button>
      </div>

      {/* Content */}
      <Link
        href={`/hotels/${hotel.id}`}
        className="flex-1 p-3 sm:p-4 lg:p-5 flex flex-col justify-between min-w-0"
      >
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-base flex-shrink-0">{hotel.flag}</span>
            <h3 className="text-sm lg:text-base font-bold text-navy-900 truncate group-hover:text-brand-600 transition-colors">
              {hotel.name}
            </h3>
          </div>

          <div className="flex items-center gap-1 text-[11px] lg:text-xs text-slate-500 mb-1.5">
            <MapPin className="w-3 h-3 flex-shrink-0" />
            <span className="truncate">{hotel.location} • {hotel.neighborhood}</span>
          </div>

          <div className="flex flex-wrap gap-1 mb-2">
            {hotel.tags.slice(0, 2).map((tag, i) => (
              <span
                key={i}
                className="bg-slate-100 text-slate-700 text-[10px] font-bold px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2 lg:gap-3 text-[11px] lg:text-xs text-slate-500">
            {hotel.amenities.slice(0, 3).map((amenity, i) => {
              const Icon = iconMap[amenity.icon] || Sparkles;
              return (
                <div key={i} className="flex items-center gap-0.5 lg:gap-1">
                  <Icon className="w-3 h-3 lg:w-3.5 lg:h-3.5 text-brand-500" />
                  <span className="hidden sm:inline">{amenity.label}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-1 text-xs lg:text-sm font-bold text-brand-600 group-hover:gap-2 transition-all flex-shrink-0">
            <span>جزئیات</span>
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>
      </Link>
    </div>
  );
}