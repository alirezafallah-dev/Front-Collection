"use client";

import { Clock, DollarSign, Sun, MapPin, Calendar, Info } from "lucide-react";
import type { Destination } from "@/types/destination";

interface Props {
  destination: Destination;
}

export default function DestinationPolicies({ destination }: Props) {
  return (
    <section id="policies" className="rounded-[10px] md:rounded-lg border border-border bg-white p-5 md:p-6 shadow-sm hover:shadow-card-hover transition-shadow duration-500 ease-out">
      <h2 className="text-base md:text-lg font-extrabold text-text-strong mb-5">
        اطلاعات کاربردی
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* ساعت کاری */}
        {destination.opening_hours && (
          <div className="flex items-start gap-3 p-4 rounded-lg bg-bg-sec/30">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Clock className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-text-strong mb-1">ساعت کاری</h3>
              <p className="text-xs text-text-muted">{destination.opening_hours}</p>
            </div>
          </div>
        )}

        {/* قیمت ورودی */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-bg-sec/30">
          <div className="w-9 h-9 rounded-lg bg-success/10 flex items-center justify-center shrink-0">
            <DollarSign className="w-4 h-4 text-success" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-text-strong mb-1">قیمت ورودی</h3>
            <p className="text-xs text-text-muted">{destination.entrance_fee || "رایگان"}</p>
          </div>
        </div>

        {/* بهترین فصل */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-bg-sec/30">
          <div className="w-9 h-9 rounded-lg bg-warning/10 flex items-center justify-center shrink-0">
            <Sun className="w-4 h-4 text-warning" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-text-strong mb-1">بهترین فصل سفر</h3>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {destination.best_season.map((season) => (
                <span key={season} className="px-2 py-0.5 rounded-md bg-warning/10 text-warning text-[10px] font-bold">
                  {season}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* آدرس */}
        <div className="flex items-start gap-3 p-4 rounded-lg bg-bg-sec/30">
          <div className="w-9 h-9 rounded-lg bg-info/10 flex items-center justify-center shrink-0">
            <MapPin className="w-4 h-4 text-info" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-text-strong mb-1">آدرس</h3>
            <p className="text-xs text-text-muted">{destination.address}</p>
          </div>
        </div>
      </div>

      {/* Note */}
      <div className="mt-4 p-3 rounded-lg bg-info/5 border border-info/20">
        <div className="flex items-start gap-2">
          <Info className="w-4 h-4 text-info shrink-0 mt-0.5" />
          <p className="text-xs text-text-muted leading-6">
            توصیه می‌کنیم قبل از بازدید، ساعت کاری دقیق و قیمت بلیط را از طریق منابع رسمی چک کنید.
            قیمت‌ها ممکن است در فصول مختلف تغییر کند.
          </p>
        </div>
      </div>
    </section>
  );
}