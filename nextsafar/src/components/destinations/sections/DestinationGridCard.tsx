"use client";

import { memo } from "react";
import { MapPin, Clock, DollarSign } from "lucide-react";
import BaseCardShell from "@/components/shared/cards/BaseCardShell";
import { faDigits } from "@/lib/api/hotels";
import type { Destination } from "@/types/destination";

const TYPE_COLORS: Record<string, string> = {
  "تاریخی": "bg-amber-100 text-amber-800 border-amber-200",
  "طبیعی": "bg-emerald-100 text-emerald-800 border-emerald-200",
  "مدرن": "bg-blue-100 text-blue-800 border-blue-200",
  "فرهنگی": "bg-purple-100 text-purple-800 border-purple-200",
  "مذهبی": "bg-rose-100 text-rose-800 border-rose-200",
  "تفریحی": "bg-pink-100 text-pink-800 border-pink-200",
};

interface Props {
  destination: Destination;
}

const DestinationGridCard = memo(function DestinationGridCard({ destination }: Props) {
  const images =
    destination.gallery && destination.gallery.length > 0
      ? destination.gallery.slice(0, 5)
      : destination.image
      ? [destination.image]
      : [];

  const typeColor = TYPE_COLORS[destination.type] || "bg-gray-100 text-gray-800 border-gray-200";
  const href = `/destinations/${destination.country}/${destination.city}/${destination.slug}`;

  return (
    <BaseCardShell
      id={destination.id}
      title={destination.title}
      href={href}
      images={images}
      favoriteSource="destinations"
      favoriteData={{
        title: destination.title,
        image: images[0] || destination.image,
        url: href,
      }}
      featured={destination.featured}
      variant="grid"
      topBadge={
        <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${typeColor}`}>
          {destination.type}
        </span>
      }
    >
      {/* Title & Rating */}
      <div className="flex items-start justify-between gap-2 mb-2">
        <div className="min-w-0 flex-1">
          <h3 className="font-extrabold text-sm text-text-strong line-clamp-1 group-hover:text-primary transition-colors">
            {destination.title}
          </h3>
          {destination.title_en && (
            <p className="text-[10px] text-text-subtle mt-0.5 line-clamp-1" dir="ltr">
              {destination.title_en}
            </p>
          )}
        </div>
        {destination.rating > 0 && (
          <div className="px-1.5 py-0.5 rounded-md bg-success text-white text-[11px] font-extrabold shadow-sm shrink-0">
            {faDigits(destination.rating.toFixed(1))}
          </div>
        )}
      </div>

      {/* Address */}
      <div className="flex items-center gap-2 mb-3 min-w-0">
        <div className="flex items-center gap-1 min-w-0 flex-1">
          <MapPin className="w-3 h-3 shrink-0 text-primary" />
          <span className="text-[11px] text-text-muted line-clamp-1">{destination.address}</span>
        </div>
      </div>

      {/* Duration & Price */}
      <div className="flex items-center gap-2 mb-3">
        <div className="flex items-center gap-1 text-[10px] text-text-muted">
          <Clock className="w-3 h-3" />
          <span>{destination.duration}</span>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-text-muted">
          <DollarSign className="w-3 h-3" />
          <span>{destination.price_level}</span>
        </div>
      </div>

      {/* Activities */}
      <div className="flex items-center gap-1.5 min-w-0 flex-wrap">
        {destination.activities?.slice(0, 3).map((activity, i) => (
          <span key={i} className="px-2 py-0.5 rounded-md bg-bg-sec text-[10px] text-text-muted font-medium">
            {activity}
          </span>
        ))}
        {destination.activities && destination.activities.length > 3 && (
          <span className="text-[10px] text-text-subtle font-bold">
            +{faDigits(destination.activities.length - 3)}
          </span>
        )}
      </div>
    </BaseCardShell>
  );
});

export default DestinationGridCard;