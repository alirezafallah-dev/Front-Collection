"use client";

import { Clock, DollarSign, Sun, MapPin, Info, Phone, Camera, Users } from "lucide-react";
import type { Destination } from "@/types/destination";

interface Props {
  destination: Destination;
}

export default function DestinationPolicies({ destination }: Props) {
  return (
    <section id="policies">
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="min-w-0">
          <h2 className="ns-section-title !mb-1">اطلاعات کاربردی</h2>
          <p className="text-xs md:text-sm text-text-muted">
            نکات مهم قبل از بازدید از این مقصد
          </p>
        </div>
      </div>

      <div className="rounded-[10px] md:rounded-lg border border-border bg-white p-5 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* ساعت کاری */}
          {destination.opening_hours && (
            <div className="flex items-start gap-3 p-4 rounded-lg bg-bg-sec/30 border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all duration-500 ease-out">
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
          <div className="flex items-start gap-3 p-4 rounded-lg bg-bg-sec/30 border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all duration-500 ease-out">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <DollarSign className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-text-strong mb-1">قیمت ورودی</h3>
              <p className="text-xs text-text-muted">{destination.entrance_fee || "رایگان"}</p>
            </div>
          </div>

          {/* بهترین فصل */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-bg-sec/30 border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all duration-500 ease-out">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Sun className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-text-strong mb-1">بهترین فصل سفر</h3>
              <div className="flex flex-wrap gap-1.5 mt-1">
                {destination.best_season?.map((season) => (
                  <span
                    key={season}
                    className="px-2 py-0.5 rounded-md bg-primary/10 text-primary text-[10px] font-bold"
                  >
                    {season}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* آدرس */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-bg-sec/30 border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all duration-500 ease-out">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-text-strong mb-1">آدرس</h3>
              <p className="text-xs text-text-muted">{destination.address}</p>
            </div>
          </div>

          {/* مدت بازدید */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-bg-sec/30 border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all duration-500 ease-out">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Camera className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-text-strong mb-1">مدت بازدید</h3>
              <p className="text-xs text-text-muted">{destination.duration}</p>
            </div>
          </div>

          {/* نوع مقصد */}
          <div className="flex items-start gap-3 p-4 rounded-lg bg-bg-sec/30 border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all duration-500 ease-out">
            <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <Users className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-sm font-bold text-text-strong mb-1">نوع مقصد</h3>
              <p className="text-xs text-text-muted">{destination.type}</p>
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/20">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <p className="text-xs text-text-muted leading-6">
              توصیه می‌کنیم قبل از بازدید، ساعت کاری دقیق و قیمت بلیط را از طریق منابع رسمی چک کنید.
              قیمت‌ها ممکن است در فصول مختلف تغییر کند.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}