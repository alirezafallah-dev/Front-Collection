"use client";

import { memo, useRef, useEffect } from "react";
import { MapPin, Clock, DollarSign, ArrowLeft } from "lucide-react";
import BaseCardShell from "@/components/shared/cards/BaseCardShell";
import { faDigits } from "@/lib/api/hotels";
import type { Destination } from "@/types/destination";

const HOVER_DELAY = 500;

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
  onHover?: (key: string | null) => void;
}

const DestinationListItem = memo(function DestinationListItem({ destination, onHover }: Props) {
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringRef = useRef(false);

  const images =
    destination.gallery && destination.gallery.length > 0
      ? destination.gallery.slice(0, 5)
      : destination.image
      ? [destination.image]
      : [];

  const activities = destination.activities || [];
  const visibleActivities = activities.slice(0, 3);
  const typeColor = TYPE_COLORS[destination.type] || "bg-gray-100 text-gray-800 border-gray-200";
  const href = `/destinations/${destination.country}/${destination.city}/${destination.slug}`;

  const handleMouseEnter = () => {
    isHoveringRef.current = true;
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      if (isHoveringRef.current) onHover?.(`dest-${destination.id}`);
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
        variant="list"
        topBadge={
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold border ${typeColor}`}>
            {destination.type}
          </span>
        }
      >
        <div className="min-w-0">
          {/* Title & Rating */}
          <div className="flex items-start justify-between gap-2 mb-1">
            <div className="min-w-0 flex-1">
              <h3 className="font-extrabold text-sm sm:text-base lg:text-lg text-text-strong line-clamp-1 group-hover:text-primary transition-colors">
                {destination.title}
              </h3>
              {destination.title_en && (
                <p className="text-[10px] sm:text-xs text-text-subtle mt-0.5 line-clamp-1" dir="ltr">
                  {destination.title_en}
                </p>
              )}
            </div>
            {destination.rating > 0 && (
              <div className="flex items-center gap-1 shrink-0">
                <div className="hidden md:flex items-center gap-1">
                  <span className="text-[11px] font-bold text-text-muted">
                    {destination.reviews ? `${faDigits(destination.reviews)} نظر` : "عالی"}
                  </span>
                </div>
                <div className="px-1.5 py-0.5 rounded-sm bg-success text-white text-[11px] sm:text-xs font-extrabold shadow-sm">
                  {faDigits(destination.rating.toFixed(1))}
                </div>
              </div>
            )}
          </div>

          {/* Address */}
          <div className="flex items-center gap-2 mb-1.5 min-w-0">
            <div className="flex items-center gap-1 min-w-0 flex-1">
              <MapPin className="w-3 h-3 shrink-0 text-primary" />
              <span className="text-[11px] sm:text-xs text-text-muted line-clamp-1">{destination.address}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-border/60 min-w-0">
          <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1 overflow-hidden">
            {visibleActivities.length > 0 ? (
              visibleActivities.map((activity, i) => (
                <div key={i} className="flex items-center gap-1 shrink-0">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 rounded-md bg-primary-lightest flex items-center justify-center">
                    <span className="text-[8px] sm:text-[9px] lg:text-[10px] font-bold text-primary">
                      {activity.slice(0, 2)}
                    </span>
                  </div>
                  <span className="hidden xl:inline text-[10px] lg:text-[11px] text-text-muted font-medium whitespace-nowrap">
                    {activity}
                  </span>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-1 text-[11px] text-text-subtle">
                <span>مشاهده جزئیات</span>
              </div>
            )}
            {activities.length > 3 && (
              <span className="hidden sm:inline text-[10px] text-text-subtle font-bold whitespace-nowrap">
                +{faDigits(activities.length - 3)}
              </span>
            )}
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:flex items-center gap-1 text-[10px] text-text-muted">
              <Clock className="w-3 h-3" />
              <span>{destination.duration}</span>
            </div>
            <div className="hidden sm:flex items-center gap-1 text-[10px] text-text-muted">
              <DollarSign className="w-3 h-3" />
              <span>{destination.price_level}</span>
            </div>
          </div>

          <div className="flex items-center gap-1 text-[11px] sm:text-xs font-extrabold text-primary group-hover:gap-2 transition-all shrink-0 whitespace-nowrap">
            <span className="hidden sm:inline">جزئیات</span>
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
          </div>
        </div>
      </BaseCardShell>
    </div>
  );
});

export default DestinationListItem;