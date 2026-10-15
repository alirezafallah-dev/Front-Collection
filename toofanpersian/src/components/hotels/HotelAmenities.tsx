"use client";

import { useState } from "react";
import {
  Waves, UtensilsCrossed, Wifi, Car, Dumbbell, Sparkles,
  Coffee, Clock, Dog, Wind, Wine, Tv, Bath, ChevronDown,
  Check, Home,
} from "lucide-react";
import { Hotel } from "@/lib/data/hotels";
import { cn } from "@/lib/utils";

const amenityCategories = [
  {
    id: "outdoor",
    title: "فضای باز و تفریحات",
    icon: Waves,
    items: [
      { id: "pool", label: "استخر", icon: Waves },
      { id: "seaview", label: "ویو دریا", icon: Waves },
      { id: "beach", label: "دسترسی به ساحل", icon: Waves },
    ],
  },
  {
    id: "wellness",
    title: "سلامت و تندرستی",
    icon: Sparkles,
    items: [
      { id: "spa", label: "اسپا و ماساژ", icon: Sparkles },
      { id: "gym", label: "باشگاه ورزشی", icon: Dumbbell },
      { id: "sauna", label: "سونا و جکوزی", icon: Bath },
    ],
  },
  {
    id: "food",
    title: "غذا و نوشیدنی",
    icon: UtensilsCrossed,
    items: [
      { id: "restaurant", label: "رستوران", icon: UtensilsCrossed },
      { id: "breakfast", label: "صبحانه", icon: Coffee },
      { id: "cafe", label: "کافه", icon: Coffee },
      { id: "bar", label: "بار و لانژ", icon: Wine },
    ],
  },
  {
    id: "services",
    title: "خدمات هتل",
    icon: Clock,
    items: [
      { id: "reception", label: "پذیرش ۲۴ ساعته", icon: Clock },
      { id: "wifi", label: "وای‌فای رایگان", icon: Wifi },
      { id: "parking", label: "پارکینگ", icon: Car },
      { id: "pets", label: "پذیرش حیوانات", icon: Dog },
    ],
  },
  {
    id: "room",
    title: "امکانات اتاق",
    icon: Home,
    items: [
      { id: "ac", label: "تهویه مطبوع", icon: Wind },
      { id: "tv", label: "تلویزیون", icon: Tv },
      { id: "minibar", label: "مینی‌بار", icon: Wine },
      { id: "bath", label: "حمام لوکس", icon: Bath },
    ],
  },
];

interface HotelAmenitiesProps {
  hotel: Hotel;
}

export default function HotelAmenities({ hotel }: HotelAmenitiesProps) {
  const [showAll, setShowAll] = useState(false);

  const hotelAmenityIds = hotel.amenities.map((a) => {
    const key = a.icon.toLowerCase();
    if (key === "utensils") return "restaurant";
    if (key === "waves") {
      return a.label.includes("ویو") ? "seaview" : 
             a.label.includes("استخر") ? "pool" :
             a.label.includes("ساحل") ? "beach" : "pool";
    }
    if (key === "sparkles") return "spa";
    if (key === "wifi") return "wifi";
    if (key === "car") return "parking";
    if (key === "dumbbell") return "gym";
    if (key === "coffee") return a.label.includes("کافه") ? "cafe" : "breakfast";
    return key;
  });

  const hasAmenity = (id: string) => hotelAmenityIds.includes(id);

  const activeCategories = amenityCategories.filter(cat =>
    cat.items.some(item => hasAmenity(item.id))
  );

  const allActiveAmenities = amenityCategories.flatMap(cat =>
    cat.items.filter(item => hasAmenity(item.id))
  );

  const visibleCategories = showAll ? activeCategories : activeCategories.slice(0, 3);

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 md:p-7">
      {/* Header */}
      <div className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h2 className="text-lg md:text-xl font-black text-navy-900 mb-1">
            امکانات هتل
          </h2>
          <p className="text-sm text-slate-500">
            {allActiveAmenities.length} امکان ویژه
          </p>
        </div>
      </div>

      {/* Quick Summary - Top 6 Amenities */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-2 mb-6 pb-6 border-b border-slate-100">
        {allActiveAmenities.slice(0, 6).map((amenity, i) => {
          const Icon = amenity.icon;
          return (
            <div
              key={i}
              className="flex flex-col items-center gap-2 p-3 rounded-xl bg-slate-50 hover:bg-brand-50 transition-colors group"
            >
              <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-shadow">
                <Icon className="w-5 h-5 text-brand-600" />
              </div>
              <span className="text-[11px] font-bold text-navy-900 text-center leading-tight">
                {amenity.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Categorized Amenities */}
      <div className="space-y-5">
        {visibleCategories.map((category) => {
          const Icon = category.icon;
          return (
            <div key={category.id}>
              {/* Category Header */}
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-navy-900 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-white" />
                </div>
                <h3 className="text-sm font-black text-navy-900">
                  {category.title}
                </h3>
                <div className="flex-1 h-px bg-slate-100" />
              </div>

              {/* Items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {category.items.filter(item => hasAmenity(item.id)).map((item) => {
                  const ItemIcon = item.icon;
                  return (
                    <div
                      key={item.id}
                      className="flex items-center gap-2.5 p-2.5 rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      <div className="w-5 h-5 rounded-md bg-brand-50 flex items-center justify-center flex-shrink-0">
                        <Check className="w-3 h-3 text-brand-600" />
                      </div>
                      <ItemIcon className="w-4 h-4 text-slate-400 flex-shrink-0" />
                      <span className="text-sm text-slate-700">{item.label}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More */}
      {activeCategories.length > 3 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-slate-200 hover:border-brand-500 hover:bg-brand-50 text-sm font-bold text-slate-700 hover:text-brand-700 transition-all"
        >
          <span>
            {showAll 
              ? "نمایش کمتر" 
              : `مشاهده همه ${allActiveAmenities.length} امکان`}
          </span>
          <ChevronDown className={cn("w-4 h-4 transition-transform", showAll && "rotate-180")} />
        </button>
      )}
    </div>
  );
}