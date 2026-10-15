"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Grid3x3, 
  Download,
  Share2,
  Heart,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface PhotoModalProps {
  images: string[];
  hotelName: string;
  isOpen: boolean;
  initialIndex: number;
  onClose: () => void;
}

type ViewMode = "grid" | "single";

const aspectPatterns = [
  "aspect-[4/3]",
  "aspect-[3/4]",
  "aspect-[16/9]",
  "aspect-square",
  "aspect-[3/4]",
  "aspect-[4/3]",
  "aspect-[16/9]",
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[4/3]",
];

export default function PhotoModal({
  images,
  hotelName,
  isOpen,
  initialIndex,
  onClose,
}: PhotoModalProps) {
  const [view, setView] = useState<ViewMode>("grid");
  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isFavorite, setIsFavorite] = useState(false);
  const touchStartX = useRef<number>(0);

  useEffect(() => {
    if (isOpen) {
      setActiveIndex(initialIndex);
      setView(initialIndex === 0 ? "grid" : "single");
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen, initialIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (view === "single") {
          setView("grid");
        } else {
          onClose();
        }
      } else if (e.key === "ArrowLeft" && view === "single") {
        setActiveIndex((prev) => (prev + 1) % images.length);
      } else if (e.key === "ArrowRight" && view === "single") {
        setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, view, activeIndex, images.length, onClose]);

  const nextImage = () => {
    setActiveIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setActiveIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (view !== "single") return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextImage();
      else prevImage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-6 lg:p-10">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[1600px] h-[calc(100vh-16px)] md:h-[calc(100vh-48px)] lg:h-[calc(100vh-80px)] bg-white rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* ═══════════════════════════════════════
            HEADER - ساختار کامل
        ═══════════════════════════════════════ */}
        <div className="flex items-center justify-between px-4 md:px-6 py-3 md:py-4 border-b border-slate-100 bg-white flex-shrink-0 h-14 md:h-16">
          
          {/* ══ سمت راست (RTL اول) - Close + Actions ══ */}
          <div className="flex items-center gap-1 md:gap-2 flex-shrink-0">
            {/* دکمه بستن - همیشه نمایش داده میشه */}
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
              aria-label="بستن"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Action buttons - فقط در حالت single و دسکتاپ */}
            {view === "single" && (
              <>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center transition-all hidden md:flex",
                    isFavorite
                      ? "bg-red-50 text-red-500"
                      : "hover:bg-slate-100 text-slate-600"
                  )}
                  aria-label="ذخیره"
                >
                  <Heart className={cn("w-5 h-5", isFavorite && "fill-current")} />
                </button>
                <button
                  className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors hidden md:flex"
                  aria-label="اشتراک"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  className="w-10 h-10 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors hidden md:flex"
                  aria-label="دانلود"
                >
                  <Download className="w-5 h-5" />
                </button>
              </>
            )}
          </div>

          {/* ══ وسط - با flex grow برای پر کردن فضای بین دو طرف ══ */}
          <div className="flex-1 flex items-center justify-center px-4 min-w-0">
            {view === "single" ? (
              <div className="text-sm md:text-base font-black text-navy-900 whitespace-nowrap">
                <span className="text-brand-600">{activeIndex + 1}</span>
                <span className="text-slate-400 mx-1.5">از</span>
                <span>{images.length}</span>
              </div>
            ) : (
              <h2 className="text-sm md:text-lg font-black text-navy-900 truncate max-w-full">
                {hotelName}
              </h2>
            )}
          </div>

          {/* ══ سمت چپ (RTL آخر) - فقط دکمه بازگشت ══ */}
          <div className="flex items-center flex-shrink-0">
            {view === "single" ? (
              <>
                {/* Badge counter برای موبایل */}
                <div className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-xs font-bold text-slate-700 ml-2">
                  <span>{activeIndex + 1}/{images.length}</span>
                </div>

                {/* دکمه بازگشت به گالری - سمت چپ */}
                <button
                  onClick={() => setView("grid")}
                  className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4 text-navy-900" />
                  <span className="text-sm font-bold text-navy-900 hidden sm:inline">
                    بازگشت به گالری
                  </span>
                </button>
              </>
            ) : (
              /* Badge در حالت Grid */
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                <Grid3x3 className="w-3.5 h-3.5" />
                <span>{images.length} عکس</span>
              </div>
            )}
          </div>
        </div>

        {/* ═══════════════════════════════════════
            BODY
        ═══════════════════════════════════════ */}
        <div className="flex-1 overflow-hidden relative bg-slate-50">
          
          {/* ══ GRID VIEW ══ */}
          {view === "grid" && (
            <div className="h-full overflow-y-auto p-3 md:p-5 lg:p-6">
              <div className="columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-2 md:gap-3 space-y-2 md:space-y-3">
                {images.map((img, i) => {
                  const aspect = aspectPatterns[i % aspectPatterns.length];
                  return (
                    <button
                      key={i}
                      onClick={() => {
                        setActiveIndex(i);
                        setView("single");
                      }}
                      className={cn(
                        "relative block w-full overflow-hidden rounded-lg md:rounded-xl group cursor-pointer break-inside-avoid",
                        "hover:ring-2 hover:ring-brand-500 hover:ring-offset-2 hover:ring-offset-slate-50 transition-all",
                        aspect
                      )}
                    >
                      <Image
                        src={img}
                        alt={`${hotelName} - عکس ${i + 1}`}
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-xl">
                            <ChevronLeft className="w-6 h-6 text-navy-900" />
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-white text-[10px] font-bold">
                        {i + 1}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ══ SINGLE VIEW ══ */}
          {view === "single" && (
            <div 
              className="h-full flex items-center justify-center relative p-4 md:p-10"
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="relative w-full h-full flex items-center justify-center">
                <Image
                  key={activeIndex}
                  src={images[activeIndex]}
                  alt={`${hotelName} - عکس ${activeIndex + 1}`}
                  fill
                  sizes="100vw"
                  className="object-contain animate-in fade-in zoom-in-95 duration-300"
                  priority
                />
              </div>

              {/* Navigation Arrows - اصلاح شده برای RTL */}
              <button
                onClick={prevImage}
                className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/95 hover:bg-white backdrop-blur-sm shadow-xl flex items-center justify-center text-navy-900 transition-all hover:scale-110 z-10"
                aria-label="عکس قبلی"
              >
                <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
              </button>

              <button
                onClick={nextImage}
                className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 w-11 h-11 md:w-14 md:h-14 rounded-full bg-white/95 hover:bg-white backdrop-blur-sm shadow-xl flex items-center justify-center text-navy-900 transition-all hover:scale-110 z-10"
                aria-label="عکس بعدی"
              >
                <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
              </button>

              {/* Thumbnail Strip */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 max-w-[90%] md:max-w-5xl">
                <div 
                  className="flex gap-1.5 md:gap-2 overflow-x-auto px-2 py-2 rounded-2xl bg-black/40 backdrop-blur-md" 
                  style={{ scrollbarWidth: "none" }}
                >
                  {images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      className={cn(
                        "relative w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden flex-shrink-0 transition-all",
                        activeIndex === i
                          ? "ring-2 ring-white opacity-100 scale-105"
                          : "opacity-50 hover:opacity-80"
                      )}
                    >
                      <Image src={img} alt="" fill sizes="64px" className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}