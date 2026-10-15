"use client";

import { Star, MapPin, Clock, Check } from "lucide-react";
import { Hotel } from "@/lib/data/hotels";
import { cn } from "@/lib/utils";

interface HotelMobileInfoProps {
  hotel: Hotel;
}

export default function HotelMobileInfo({ hotel }: HotelMobileInfoProps) {
  const ratingLabel = 
    hotel.rating >= 4.8 ? "فوق‌العاده" :
    hotel.rating >= 4.5 ? "عالی" :
    hotel.rating >= 4.0 ? "خیلی خوب" : "خوب";

  return (
    <div className="lg:hidden bg-white rounded-2xl border border-slate-100 p-4 space-y-4">
      {/* Title + Location */}
      <div>
        <div className="flex items-start gap-2 mb-2">
          <span className="text-2xl">{hotel.flag}</span>
          <div className="flex-1 min-w-0">
            <h2 className="text-lg font-black text-navy-900 leading-tight">
              {hotel.name}
            </h2>
            <div className="flex items-center gap-1 text-xs text-slate-500 mt-1">
              <MapPin className="w-3 h-3 text-brand-500 flex-shrink-0" />
              <span className="truncate">{hotel.location} • {hotel.neighborhood}</span>
            </div>
          </div>
        </div>

        {/* Rating Row */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-0.5">
            {[...Array(hotel.stars)].map((_, i) => (
              <Star key={i} className="w-3.5 h-3.5 text-brand-500 fill-brand-500" />
            ))}
          </div>
          <div className="w-px h-4 bg-slate-200" />
          <div className="flex items-center gap-1.5">
            <div className="w-7 h-7 rounded-md bg-brand-500 flex items-center justify-center">
              <span className="text-xs font-black text-white">{hotel.rating}</span>
            </div>
            <div>
              <div className="text-xs font-black text-navy-900">{ratingLabel}</div>
              <div className="text-[10px] text-slate-500">{hotel.reviewCount} نظر</div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Info Grid */}
      <div className="grid grid-cols-4 gap-2 pt-3 border-t border-slate-100">
        <div className="text-center p-2 rounded-lg bg-slate-50">
          <Clock className="w-4 h-4 text-brand-600 mx-auto mb-1" />
          <div className="text-[9px] text-slate-500 mb-0.5">Check-in</div>
          <div className="text-[11px] font-black text-navy-900">{hotel.checkIn}</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-slate-50">
          <Clock className="w-4 h-4 text-brand-600 mx-auto mb-1" />
          <div className="text-[9px] text-slate-500 mb-0.5">Check-out</div>
          <div className="text-[11px] font-black text-navy-900">{hotel.checkOut}</div>
        </div>
        <div className="text-center p-2 rounded-lg bg-slate-50 col-span-2">
          <MapPin className="w-4 h-4 text-brand-600 mx-auto mb-1" />
          <div className="text-[9px] text-slate-500 mb-0.5">فاصله تا مرکز</div>
          <div className="text-[11px] font-black text-navy-900">{hotel.distanceToCenter}</div>
        </div>
      </div>

      {/* Highlights */}
      <div className="space-y-1.5">
        {hotel.highlights.slice(0, 3).map((h, i) => (
          <div key={i} className="flex items-center gap-2 text-xs text-slate-700">
            <div className="w-4 h-4 rounded-full bg-brand-50 flex items-center justify-center flex-shrink-0">
              <Check className="w-2.5 h-2.5 text-brand-600" />
            </div>
            <span>{h}</span>
          </div>
        ))}
      </div>
    </div>
  );
}