"use client";

import { memo, useRef, useEffect } from "react";
import { MapPin, Star, BadgeCheck, ArrowLeft, Users } from "lucide-react";
import BaseCardShell from "@/components/shared/cards/BaseCardShell";
import { faDigits, buildHotelUrl } from "@/lib/api/hotels";
import { AMENITY_CONFIG } from "@/lib/hotel-config";
import type { Hotel } from "@/types/hotel";

const HOVER_DELAY = 500;

interface Props {
  hotel: Hotel;
  onHover?: (key: string | null) => void;
  showPrice?: boolean;
}

const HotelListItem = memo(function HotelListItem({ hotel, onHover, showPrice = false }: Props) {
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringRef = useRef(false);

  const images =
    hotel.gallery && hotel.gallery.length > 0
      ? hotel.gallery.slice(0, 5)
      : hotel.image
      ? [hotel.image]
      : [];

  const amenities = Array.isArray(hotel.amenities) ? hotel.amenities : [];
  const visibleAmenities = amenities.slice(0, 4).map((key) => AMENITY_CONFIG[key]).filter(Boolean);

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      if (isHoveringRef.current) onHover?.(`hotel-${hotel.id}`);
    }, HOVER_DELAY);
  };

  const handleMouseLeave = () => {
    isHoveringRef.current = false;
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    onHover?.(null);
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    };
  }, []);

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <BaseCardShell
        id={hotel.id}
        title={hotel.title}
        href={buildHotelUrl(hotel)}
        images={images}
        favoriteSource="hotels"
        favoriteData={{
          source: "hotels",
          title: hotel.title,
          image: hotel.image,
          url: `/hotels/${hotel.slug}`,
        }}
        featured={hotel.featured}
        variant="list"
      >
        <div className="min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="min-w-0 flex-1">
              <h3 className="font-extrabold text-sm sm:text-base lg:text-lg text-text-strong line-clamp-1 group-hover:text-primary transition-colors">
                {hotel.title}
              </h3>
              {hotel.title_en && (
                <p className="text-[10px] sm:text-xs text-text-subtle mt-0.5 line-clamp-1" dir="ltr">
                  {hotel.title_en}
                </p>
              )}
            </div>
            {hotel.rating > 0 && (
              <div className="flex items-center gap-1 shrink-0">
                <div className="hidden md:flex items-center gap-1">
                  <BadgeCheck className="w-3.5 h-3.5 text-success" />
                  <span className="text-[11px] font-bold text-text-muted">
                    {hotel.reviews ? `${faDigits(hotel.reviews)} نظر` : "عالی"}
                  </span>
                </div>
                <div className="px-1.5 py-0.5 rounded-sm bg-success text-white text-[11px] sm:text-xs font-extrabold shadow-sm">
                  {faDigits(hotel.rating.toFixed(1))}
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 mb-1.5 min-w-0">
            <div className="flex items-center gap-1 min-w-0 flex-1">
              <MapPin className="w-3 h-3 shrink-0 text-primary" />
              <span className="text-[11px] sm:text-xs text-text-muted line-clamp-1">{hotel.address}</span>
            </div>
            {hotel.stars > 0 && (
              <div className="flex gap-0.5 shrink-0">
                {[...Array(Math.min(hotel.stars, 5))].map((_, i) => (
                  <Star key={i} className="w-2.5 h-2.5 fill-warning text-warning" />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-border/60 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1 overflow-hidden">
            {visibleAmenities.length > 0 ? (
              visibleAmenities.map((amenity, i) => {
                const Icon = amenity.icon;
                return (
                  <div key={i} className="flex items-center gap-1 shrink-0" title={amenity.label}>
                    <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-md bg-primary-lightest flex items-center justify-center">
                      <Icon className="w-2.5 h-2.5 sm:w-3 sm:h-3 lg:w-3.5 lg:h-3.5 text-primary" />
                    </div>
                    <span className="hidden xl:inline text-[10px] lg:text-[11px] text-text-muted font-medium whitespace-nowrap">
                      {amenity.label}
                    </span>
                  </div>
                );
              })
            ) : (
              <div className="flex items-center gap-1 text-[11px] text-text-subtle">
                <Users className="w-3.5 h-3.5" />
                <span>مشاهده جزئیات</span>
              </div>
            )}
            {amenities.length > 4 && (
              <span className="hidden sm:inline text-[10px] text-text-subtle font-bold whitespace-nowrap">
                +{faDigits(amenities.length - 4)}
              </span>
            )}
          </div>

          {showPrice && hotel.price_per_night && hotel.price_per_night > 0 && (
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-xs sm:text-sm font-black text-primary">
                {faDigits(hotel.price_per_night.toLocaleString())}
              </span>
              <span className="text-[10px] text-text-muted">تومان</span>
            </div>
          )}

          <div className="flex items-center gap-1 text-[11px] sm:text-xs font-extrabold text-primary group-hover:gap-2 transition-all shrink-0 whitespace-nowrap">
            <span className="hidden sm:inline">جزئیات</span>
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>
      </BaseCardShell>
    </div>
  );
});

export default HotelListItem;