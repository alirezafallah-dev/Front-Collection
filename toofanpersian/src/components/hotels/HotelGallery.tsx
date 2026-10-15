"use client";

import { useState } from "react";
import Image from "next/image";
import { Camera, ChevronLeft, ChevronRight } from "lucide-react";
import PhotoModal from "./PhotoModal";

interface HotelGalleryProps {
  images: string[];
  hotelName: string;
}

export default function HotelGallery({ images, hotelName }: HotelGalleryProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [initialIndex, setInitialIndex] = useState(0);
  const [mobileIndex, setMobileIndex] = useState(0);

  const displayImages = images.slice(0, 5);
  const remainingCount = Math.max(0, images.length - 5);

  const openModal = (index: number) => {
    setInitialIndex(index);
    setModalOpen(true);
  };

  const nextMobile = () => {
    setMobileIndex((prev) => (prev + 1) % displayImages.length);
  };

  const prevMobile = () => {
    setMobileIndex((prev) => (prev - 1 + displayImages.length) % displayImages.length);
  };

  return (
    <>
      {/* Gallery Container */}
      <div className="w-full">
        {/* ═══════════════════════════════════════
            Desktop Layout - 1 large + 4 small
        ═══════════════════════════════════════ */}
        <div className="hidden md:grid md:grid-cols-4 md:grid-rows-2 gap-2 h-[440px] lg:h-[480px] rounded-2xl overflow-hidden">
          {/* Main Image */}
          <button
            onClick={() => openModal(0)}
            className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden"
          >
            <Image
              src={displayImages[0]}
              alt={`${hotelName} - عکس اصلی`}
              fill
              sizes="50vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              priority
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </button>

          {/* 4 Secondary Images */}
          {displayImages.slice(1, 5).map((img, i) => (
            <button
              key={i}
              onClick={() => openModal(i + 1)}
              className="relative group cursor-pointer overflow-hidden"
            >
              <Image
                src={img}
                alt={`${hotelName} - عکس ${i + 2}`}
                fill
                sizes="25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />

              {/* "Show all" overlay */}
              {i === 3 && remainingCount > 0 && (
                <div
                  className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    openModal(0);
                  }}
                >
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-navy-900 text-sm font-bold shadow-lg">
                    <Camera className="w-4 h-4" />
                    <span>نمایش همه {images.length} عکس</span>
                  </div>
                </div>
              )}
            </button>
          ))}
        </div>

        {/* ═══════════════════════════════════════
            Mobile Layout - Carousel با Swipe
        ═══════════════════════════════════════ */}
        <div className="md:hidden relative">
          {/* Carousel Container */}
          <div 
            className="relative w-full h-64 sm:h-80 rounded-2xl overflow-hidden"
            onTouchStart={(e) => {
              (window as any).__touchStartX = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              const startX = (window as any).__touchStartX || 0;
              const endX = e.changedTouches[0].clientX;
              const diff = startX - endX;
              if (Math.abs(diff) > 50) {
                if (diff > 0) nextMobile();
                else prevMobile();
              }
            }}
          >
            {/* Images */}
            {displayImages.map((img, i) => (
              <button
                key={i}
                onClick={() => openModal(i)}
                className={`absolute inset-0 w-full h-full transition-opacity duration-300 cursor-pointer ${
                  i === mobileIndex ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
              >
                <Image
                  src={img}
                  alt={`${hotelName} - عکس ${i + 1}`}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </button>
            ))}

            {/* Navigation Arrows */}
            {displayImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); prevMobile(); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-navy-900 shadow-lg z-10"
                  aria-label="عکس قبلی"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); nextMobile(); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-navy-900 shadow-lg z-10"
                  aria-label="عکس بعدی"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
              </>
            )}

            {/* Counter Badge */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-sm text-white text-xs font-bold shadow-lg z-10">
              <Camera className="w-3.5 h-3.5" />
              <span>{mobileIndex + 1} از {images.length}</span>
            </div>

            {/* View All Button */}
            <button
              onClick={(e) => { e.stopPropagation(); openModal(0); }}
              className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-sm text-navy-900 text-xs font-bold shadow-lg z-10"
            >
              <Camera className="w-3.5 h-3.5" />
              <span>همه عکس‌ها</span>
            </button>
          </div>

          {/* Dots Indicator */}
          {displayImages.length > 1 && (
            <div className="flex items-center justify-center gap-1.5 mt-3">
              {displayImages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setMobileIndex(i)}
                  className={`h-1.5 rounded-full transition-all ${
                    i === mobileIndex
                      ? "w-6 bg-brand-500"
                      : "w-1.5 bg-slate-300"
                  }`}
                  aria-label={`عکس ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Photo Modal */}
      <PhotoModal
        images={images}
        hotelName={hotelName}
        isOpen={modalOpen}
        initialIndex={initialIndex}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
}