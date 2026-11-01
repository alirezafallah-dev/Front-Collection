"use client";

import { useState } from "react";
import Link from "next/link";
import { Heart, Share2, ChevronLeft, MapPin, Star, Home, Clock, DollarSign } from "lucide-react";
import { useFavorites } from "@/lib/favorites";
import { faDigits } from "@/lib/api/hotels";
import type { Destination } from "@/types/destination";

interface Props {
  destination: Destination;
}

export default function DestinationHeader({ destination }: Props) {
  const { has, toggle } = useFavorites();
  const isFavorite = has(`destination-${destination.id}`);

  const breadcrumbItems = [
    { label: "خانه", href: "/", icon: Home },
    { label: "مقصدها", href: "/destinations" },
    { label: destination.country, href: `/destinations/${destination.country}` },
    { label: destination.city, href: `/destinations/${destination.country}/${destination.city}` },
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: destination.title, url: window.location.href });
      } catch {}
    } else {
      await navigator.clipboard.writeText(window.location.href);
      alert("لینک کپی شد");
    }
  };

  return (
    <header className="bg-white">
      <div className="ns-container pt-6 md:pt-8 pb-4 md:pb-4">
        {/* بردکرامپ */}
        <nav
          aria-label="مسیر"
          className="w-full flex items-center justify-between flex-wrap gap-2 mb-5 md:mb-6 px-4 md:px-5 py-2.5 md:py-3 rounded-[10px] md:rounded-lg bg-gradient-to-l from-primary/5 via-bg-sec/50 to-bg-sec/80 border border-border/60 shadow-sm"
        >
          <div className="flex items-center flex-wrap gap-1.5 md:gap-2 min-w-0">
            {breadcrumbItems.map((item, i) => {
              const Icon = item.icon;
              const isLast = i === breadcrumbItems.length - 1;
              return (
                <div key={item.href} className="flex items-center gap-1.5 md:gap-2 min-w-0">
                  {i > 0 && (
                    <span className="text-text-subtle/40 shrink-0">
                      <ChevronLeft className="w-2.5 h-2.5 md:w-3 md:h-3" />
                    </span>
                  )}
                  {isLast ? (
                    <span className="inline-flex items-center gap-1.5 px-2 md:px-2.5 py-0.5 md:py-1 rounded-md bg-primary/10 border border-primary/20 text-[11px] md:text-xs font-bold text-primary truncate max-w-[160px] md:max-w-none">
                      {item.label}
                    </span>
                  ) : (
                    <Link
                      href={item.href}
                      className="inline-flex items-center gap-1 md:gap-1.5 px-1.5 md:px-2 py-0.5 md:py-1 rounded-md text-[11px] md:text-xs font-medium text-text-muted hover:text-primary hover:bg-primary/5 transition shrink-0"
                    >
                      {Icon && <Icon className="w-3 h-3 md:w-3.5 md:h-3.5 text-primary" />}
                      <span className="hidden sm:inline">{item.label}</span>
                      <span className="sm:hidden">{item.label.split(" ")[0]}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </nav>

        {/* اطلاعات اصلی */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-4 lg:gap-6 items-start">
          <div className="min-w-0 space-y-3">
            <h1 className="text-lg md:text-2xl lg:text-3xl font-extrabold text-text-strong leading-tight tracking-tight">
              {destination.title}
            </h1>

            {destination.title_en && (
              <p className="text-[11px] md:text-sm text-text-muted" dir="ltr" style={{ fontStyle: "italic" }}>
                {destination.title_en}
              </p>
            )}

            <div className="flex items-center justify-between gap-2 flex-wrap">
              <div className="flex items-center gap-2 md:gap-3 flex-wrap">
                <span className={`px-2 py-0.5 rounded-md text-[10px] md:text-xs font-bold border ${
                  destination.type === "تاریخی" ? "bg-amber-100 text-amber-800 border-amber-200" :
                  destination.type === "طبیعی" ? "bg-emerald-100 text-emerald-800 border-emerald-200" :
                  destination.type === "مدرن" ? "bg-blue-100 text-blue-800 border-blue-200" :
                  destination.type === "فرهنگی" ? "bg-purple-100 text-purple-800 border-purple-200" :
                  destination.type === "مذهبی" ? "bg-rose-100 text-rose-800 border-rose-200" :
                  "bg-pink-100 text-pink-800 border-pink-200"
                }`}>
                  {destination.type}
                </span>

                {destination.rating > 0 && (
                  <div className="inline-flex items-center gap-1 md:gap-1.5">
                    <span className="px-1.5 py-0.5 md:px-2 md:py-1 rounded-md bg-success/10 border border-success/20 text-[11px] md:text-sm font-black text-success leading-none">
                      {faDigits(destination.rating.toFixed(1))}
                    </span>
                    <span className="text-[10px] md:text-xs font-bold text-success">عالی</span>
                    <span className="text-[9px] md:text-[11px] text-text-muted">
                      ({faDigits(destination.reviews.toLocaleString())} نظر)
                    </span>
                  </div>
                )}

                <div className="inline-flex items-center gap-1 text-[10px] md:text-xs text-text-muted">
                  <Clock className="w-3 h-3" />
                  <span>{destination.duration}</span>
                </div>

                <div className="inline-flex items-center gap-1 text-[10px] md:text-xs text-text-muted">
                  <DollarSign className="w-3 h-3" />
                  <span>{destination.price_level}</span>
                </div>
              </div>

              <div className="inline-flex items-center gap-1 md:gap-1.5 text-[11px] md:text-sm text-text-muted">
                <span dir="ltr" className="truncate max-w-[120px] md:max-w-none">
                  {destination.address}
                </span>
                <MapPin className="w-3 h-3 md:w-4 md:h-4 text-primary shrink-0" />
              </div>
            </div>
          </div>

          <div className="hidden lg:flex items-center gap-2 justify-end shrink-0">
            <button
              onClick={() => toggle(`destination-${destination.id}`, {
                source: "destinations",
                title: destination.title,
                image: destination.image,
                url: `/destinations/${destination.country}/${destination.city}/${destination.slug}`,
              })}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-[10px] lg:rounded-lg text-xs font-bold transition-all ${
                isFavorite
                  ? "bg-danger text-white shadow-md hover:bg-danger-dark"
                  : "border border-border text-text hover:border-danger-light hover:text-danger hover:bg-danger/5"
              }`}
            >
              <Heart className={`w-4 h-4 ${isFavorite ? "fill-white" : ""}`} />
              {isFavorite ? "ذخیره شده" : "ذخیره"}
            </button>

            <button
              onClick={handleShare}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-[10px] lg:rounded-lg border border-border text-xs font-bold text-text hover:border-primary-light hover:text-primary hover:bg-primary-lightest/30 transition-all"
            >
              <Share2 className="w-4 h-4" />
              اشتراک‌گذاری
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}