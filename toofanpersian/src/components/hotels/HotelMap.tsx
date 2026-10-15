"use client";

import { MapPin, Navigation, ExternalLink } from "lucide-react";

interface HotelMapProps {
  coordinates: { lat: number; lng: number };
  address: string;
  name: string;
}

export default function HotelMap({ coordinates, address, name }: HotelMapProps) {
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${coordinates.lat},${coordinates.lng}`;

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-brand-500" />
          <h2 className="text-lg font-black text-navy-900">
            موقعیت هتل
          </h2>
        </div>
        <a
          href={googleMapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 text-xs font-bold text-brand-600 hover:text-brand-700"
        >
          <span>مشاهده در گوگل مپ</span>
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      <p className="text-sm text-slate-600 mb-4">{address}</p>

      {/* Map */}
      <div className="relative h-64 rounded-xl overflow-hidden bg-slate-100">
        <iframe
          src={`https://www.google.com/maps?q=${coordinates.lat},${coordinates.lng}&output=embed`}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title={`${name} location`}
        />
      </div>

      {/* Directions Button */}
      <a
        href={googleMapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 flex items-center justify-center gap-2 w-full h-11 rounded-xl bg-navy-900 text-white font-bold text-sm hover:bg-navy-800 transition-colors"
      >
        <Navigation className="w-4 h-4" />
        <span>مسیریابی به هتل</span>
      </a>
    </div>
  );
}