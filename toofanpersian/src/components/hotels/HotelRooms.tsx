"use client";

import Image from "next/image";
import { Users, Maximize, BedDouble, Check } from "lucide-react";
import { HotelRoom } from "@/lib/data/hotels";

interface HotelRoomsProps {
  rooms: HotelRoom[];
}

export default function HotelRooms({ rooms }: HotelRoomsProps) {
  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6">
      <h2 className="text-lg font-black text-navy-900 mb-5">
        اتاق‌های موجود
      </h2>

      <div className="space-y-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded-xl border border-slate-200 hover:border-brand-300 hover:shadow-md transition-all"
          >
            <div className="relative h-48 md:h-40 rounded-xl overflow-hidden md:col-span-1">
              <Image
                src={room.image}
                alt={room.name}
                fill
                sizes="(max-width: 768px) 100vw, 33vw"
                className="object-cover"
              />
            </div>

            <div className="md:col-span-2">
              <h3 className="text-base font-bold text-navy-900 mb-2">
                {room.name}
              </h3>
              <p className="text-sm text-slate-600 mb-3 leading-relaxed">
                {room.description}
              </p>

              <div className="flex flex-wrap gap-3 mb-3 text-xs text-slate-600">
                <div className="flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-brand-500" />
                  <span>ظرفیت {room.capacity} نفر</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Maximize className="w-3.5 h-3.5 text-brand-500" />
                  <span>{room.size}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BedDouble className="w-3.5 h-3.5 text-brand-500" />
                  <span>{room.bed}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-1.5">
                {room.amenities.map((amenity, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-slate-100 text-[11px] font-medium text-slate-700"
                  >
                    <Check className="w-3 h-3 text-brand-500" />
                    {amenity}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}