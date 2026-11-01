"use client";

import { useState, useRef, memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { faDigits } from "@/lib/api/hotels";
import { useFavorites } from "@/lib/favorites";

interface BaseCardShellProps {
  id: string;
  title: string;
  href: string;
  images: string[];
  favoriteSource: "hotels" | "destinations" | "tours";
  favoriteData: {
    title: string;
    image: string | null;
    url: string;
  };
  featured?: boolean;
  variant: "grid" | "list";
  children: React.ReactNode;
  topBadge?: React.ReactNode;
}

const BaseCardShell = memo(function BaseCardShell({
  id,
  title,
  href,
  images,
  favoriteSource,
  favoriteData,
  featured = false,
  variant = "grid",
  children,
  topBadge,
}: BaseCardShellProps) {
  const { has, toggle } = useFavorites();
  const isFavorite = has(`${favoriteSource}-${id}`);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const touchStartX = useRef<number>(0);

  const nextImage = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? prevImage() : nextImage();
    }
  };

  const currentImage = images[currentImageIndex] || null;

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggle(`${favoriteSource}-${id}`, favoriteData);
  };

  // ═══ Grid Variant ═══
  if (variant === "grid") {
    return (
      <article className="group bg-white rounded-[10px] md:rounded-lg border border-border hover:border-primary-light hover:shadow-card-hover transition-all duration-500 ease-out overflow-hidden cursor-pointer w-full">
        {/* Image Section */}
        <div
          className="relative aspect-[16/9] md:aspect-[4/3] overflow-hidden"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {currentImage ? (
            <Image
              src={currentImage}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              priority={currentImageIndex === 0}
            />
          ) : (
            <div className="w-full h-full bg-bg-sec flex items-center justify-center">
              <div className="flex flex-col items-center gap-1 text-text-subtle/40">
                <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
                </svg>
                <span className="text-[10px] font-bold">بدون تصویر</span>
              </div>
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={nextImage}
                className="hidden sm:flex absolute end-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/95 backdrop-blur items-center justify-center text-text-strong hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-md z-10"
                aria-label="عکس بعدی"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={prevImage}
                className="hidden sm:flex absolute start-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/95 backdrop-blur items-center justify-center text-text-strong hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-md z-10"
                aria-label="عکس قبلی"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </>
          )}

          {/* Image Counter */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur text-white text-[9px] font-bold z-10 tabular-nums">
              {faDigits(currentImageIndex + 1)} / {faDigits(images.length)}
            </div>
          )}

          {/* Favorite Button */}
          <button
            type="button"
            onClick={handleToggleFavorite}
            className={`absolute top-2 end-2 w-8 h-8 rounded-full backdrop-blur flex items-center justify-center transition-all shadow-md z-10 ${
              isFavorite
                ? "bg-danger text-white scale-110"
                : "bg-white/95 text-text-muted hover:text-danger"
            }`}
            aria-label={isFavorite ? "حذف از علاقه‌مندی" : "افزودن به علاقه‌مندی"}
          >
            <Heart className={`w-3.5 h-3.5 ${isFavorite ? "fill-white" : ""}`} />
          </button>

          {/* Top Badge (Type Badge) */}
          {topBadge && <div className="absolute top-2 start-2 z-10">{topBadge}</div>}

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-2 start-24 z-10">
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-warning text-white shadow-md">
                ویژه
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <Link href={href} className="block p-4">
          {children}
        </Link>
      </article>
    );
  }

  // ═══ List Variant ═══
  return (
    <article className="group relative bg-white rounded-lg overflow-hidden border border-border hover:border-primary/40 hover:shadow-card-hover transition-all duration-300 flex flex-row h-36 sm:h-44 lg:h-52 w-full cursor-pointer">
      {/* Image Section */}
      <div
        className="relative w-30 sm:w-36 md:w-44 lg:w-56 flex-shrink-0 overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {currentImage ? (
          <Image
            src={currentImage}
            alt={title}
            fill
            sizes="(max-width: 640px) 112px, (max-width: 768px) 144px, (max-width: 1024px) 176px, 224px"
            className="object-cover transition-all duration-500 group-hover:scale-105"
            priority={currentImageIndex === 0}
          />
        ) : (
          <div className="w-full h-full bg-bg-sec flex items-center justify-center">
            <div className="flex flex-col items-center gap-1 text-text-subtle/40">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z" />
              </svg>
              <span className="text-[10px] font-bold">بدون تصویر</span>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={nextImage}
              className="hidden sm:flex absolute end-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-sm bg-white/95 backdrop-blur items-center justify-center text-text-strong hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-md z-10"
              aria-label="عکس بعدی"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={prevImage}
              className="hidden sm:flex absolute start-2 top-1/2 -translate-y-1/2 w-7 h-7 rounded-sm bg-white/95 backdrop-blur items-center justify-center text-text-strong hover:bg-white transition-all opacity-0 group-hover:opacity-100 shadow-md z-10"
              aria-label="عکس قبلی"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full bg-black/70 backdrop-blur text-white text-[9px] font-bold z-10 tabular-nums">
            {faDigits(currentImageIndex + 1)} / {faDigits(images.length)}
          </div>
        )}

        {/* Favorite Button */}
        <button
          type="button"
          onClick={handleToggleFavorite}
          className={`absolute top-2 end-2 w-7 h-7 sm:w-8 sm:h-8 rounded-md backdrop-blur flex items-center justify-center transition-all shadow-md z-10 ${
            isFavorite
              ? "bg-danger text-white scale-110"
              : "bg-white/95 text-text-muted hover:text-danger"
          }`}
          aria-label={isFavorite ? "حذف از علاقه‌مندی" : "افزودن به علاقه‌مندی"}
        >
          <Heart className={`w-3 h-3 sm:w-3.5 sm:h-3.5 ${isFavorite ? "fill-white" : ""}`} />
        </button>

        {/* Top Badge */}
        {topBadge && <div className="absolute top-2 start-2 z-10">{topBadge}</div>}

        {/* Featured Badge */}
        {featured && (
          <div className="absolute bottom-2 start-2 z-10">
            <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-warning text-white shadow-md">
              ویژه
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <Link href={href} className="flex-1 p-2.5 sm:p-3 lg:p-4 flex flex-col justify-between min-w-0">
        {children}
      </Link>
    </article>
  );
});

export default BaseCardShell;