"use client";

import { memo } from "react";
import { MapPin, Star } from "lucide-react";
import BaseCardShell from "@/components/shared/cards/BaseCardShell";
import { faDigits, buildHotelUrl } from "@/lib/api/hotels";
import { AMENITY_CONFIG } from "@/lib/hotel-config";
import type { Hotel } from "@/types/hotel";

interface Props {
  hotel: Hotel;
  showPrice?: boolean;
}

const HotelGridCard = memo(function HotelGridCard({ hotel, showPrice = false }: Props) {
  const images =
    hotel.gallery && hotel.gallery.length > 0
      ? hotel.gallery.slice(0, 5)
      : hotel.image
      ? [hotel.image]
      : [];

  const amenities = Array.isArray(hotel.amenities) ? hotel.amenities : [];
  const visibleAmenities = amenities.slice(0, 3).map((k) => AMENITY_CONFIG[k]).filter(Boolean);

  return (
    <BaseCardShell
      id={hotel.id}
      title={hotel.title}
      href={buildHotelUrl(hotel)}
      images={images}
      favoriteSource="hotels"
      favoriteData={{
        title: hotel.title,
        image: images[0] || hotel.image,
        url: buildHotelUrl(hotel),
      }}
      featured={hotel.featured}
      variant="grid"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-extrabold text-sm text-text-strong line-clamp-1 group-hover:text-primary transition-colors">
            {hotel.title}
          </h3>
          {hotel.title_en && (
            <p className="text-[10px] text-text-subtle mt-0.5 line-clamp-1" dir="ltr">
              {hotel.title_en}
            </p>
          )}
        </div>
        {hotel.rating > 0 && (
          <div className="px-1.5 py-0.5 rounded-sm bg-success text-white text-[11px] font-extrabold shadow-sm shrink-0">
            {faDigits(hotel.rating.toFixed(1))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-2 mb-3 min-w-0">
        <div className="flex items-center gap-1 min-w-0 flex-1">
          <MapPin className="w-3 h-3 shrink-0 text-primary" />
          <span className="text-[11px] text-text-muted line-clamp-1">{hotel.address}</span>
        </div>
        {hotel.stars > 0 && (
          <div className="flex gap-0.5 shrink-0">
            {[...Array(Math.min(hotel.stars, 5))].map((_, i) => (
              <Star key={i} className="w-2.5 h-2.5 fill-warning text-warning" />
            ))}
          </div>
        )}
      </div>

      <div className="flex items-center gap-1.5 min-w-0">
        {visibleAmenities.length > 0 ? (
          visibleAmenities.map((amenity, i) => {
            const Icon = amenity.icon;
            return (
              <div key={i} className="flex items-center gap-1 shrink-0" title={amenity.label}>
                <div className="w-6 h-6 rounded bg-primary-lightest flex items-center justify-center">
                  <Icon className="w-3 h-3 text-primary" />
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-[10px] text-text-subtle">مشاهده جزئیات</div>
        )}
        {amenities.length > 3 && (
          <span className="text-[10px] text-text-subtle font-bold whitespace-nowrap">
            +{faDigits(amenities.length - 3)}
          </span>
        )}
      </div>
    </BaseCardShell>
  );
});

export default HotelGridCard;