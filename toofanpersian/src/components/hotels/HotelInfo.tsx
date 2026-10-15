"use client";

import { Star, MapPin, Share2, Heart, Award, Check, Clock } from "lucide-react";
import { Hotel } from "@/lib/data/hotels";
import HotelBreadcrumb from "./HotelBreadcrumb";
import { useState } from "react";

interface HotelInfoProps {
  hotel: Hotel;
}

export default function HotelInfo({ hotel }: HotelInfoProps) {
  const [isSaved, setIsSaved] = useState(false);

  const countrySlug = 
    hotel.country === "turkey" ? "istanbul" :
    hotel.country === "thailand" ? "thailand" : "russia";
  
  const city = hotel.location.split("،")[0];

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-7">
      {/* Breadcrumb */}
      <div className="mb-4">
        <HotelBreadcrumb
          country={hotel.country === "turkey" ? "ترکیه" : hotel.country === "thailand" ? "تایلند" : "روسیه"}
          countrySlug={countrySlug}
          city={city}
          hotelName={hotel.name}
        />
      </div>

      {/* Title + Meta */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <span className="text-2xl">{hotel.flag}</span>
            <h1 className="text-xl md:text-3xl font-black text-navy-900 leading-tight">
              {hotel.name}
            </h1>
            {hotel.featured && (
              <div className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-brand-50 text-brand-700 text-[10px] font-bold">
                <Award className="w-3 h-3" />
                <span>ویژه</span>
              </div>
            )}
          </div>
          
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-slate-600">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-brand-500" />
              <span>{hotel.location}</span>
              <span className="text-slate-300">•</span>
              <span className="font-medium text-navy-900">{hotel.neighborhood}</span>
            </div>
            <div className="flex items-center gap-1">
              {[...Array(hotel.stars)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-brand-500 fill-brand-500" />
              ))}
              <span className="text-xs text-slate-500 mr-1">
                هتل {hotel.stars} ستاره
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-5 border-t border-slate-100">
        {hotel.highlights.map((h, i) => (
          <div key={i} className="flex items-center gap-2.5 p-3 rounded-xl bg-slate-50 hover:bg-brand-50 transition-colors">
            <div className="w-6 h-6 rounded-md bg-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Check className="w-3.5 h-3.5 text-brand-600" />
            </div>
            <span className="text-sm text-navy-900 font-medium">{h}</span>
          </div>
        ))}
      </div>
    </div>
  );
}