"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { faDigits } from "@/lib/api/hotels";
import type { Destination } from "@/types/destination";

interface Props {
  destination: Destination;
}

export default function DestinationAbout({ destination }: Props) {
  const [expanded, setExpanded] = useState(false);
  const long = destination.description.length > 400;
  const text = expanded || !long ? destination.description : destination.description.slice(0, 400) + "...";

  return (
    <section id="summary">
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="min-w-0">
          <h2 className="ns-section-title !mb-1">درباره {destination.title}</h2>
          <p className="text-xs md:text-sm text-text-muted">
            اطلاعات کامل و جزئیات مقصد {destination.title}
          </p>
        </div>
      </div>

      <div className="rounded-[10px] md:rounded-lg border border-border bg-white p-5 md:p-6">
        <p className="text-xs md:text-sm text-text leading-7 md:leading-8 whitespace-pre-line">
          {text}
        </p>

        {long && (
          <button
            onClick={() => setExpanded(!expanded)}
            className="inline-flex items-center gap-1 mt-3 text-[11px] md:text-xs font-bold text-primary hover:text-primary-dark transition"
          >
            {expanded ? (
              <>
                مشاهده کمتر <ChevronUp className="w-3.5 h-3.5" />
              </>
            ) : (
              <>
                ادامه مطلب <ChevronDown className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        )}

        {/* Quick Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-border/60">
          <div className="text-center p-3 rounded-lg bg-bg-sec/50">
            <div className="text-[10px] text-text-muted mb-1">امتیاز</div>
            <div className="text-lg md:text-xl font-black text-primary">
              {faDigits(destination.rating.toFixed(1))}
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-bg-sec/50">
            <div className="text-[10px] text-text-muted mb-1">نظرات</div>
            <div className="text-lg md:text-xl font-black text-text-strong">
              {faDigits(destination.reviews.toLocaleString())}
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-bg-sec/50">
            <div className="text-[10px] text-text-muted mb-1">مدت بازدید</div>
            <div className="text-sm md:text-base font-black text-text-strong">
              {destination.duration}
            </div>
          </div>
          <div className="text-center p-3 rounded-lg bg-bg-sec/50">
            <div className="text-[10px] text-text-muted mb-1">قیمت ورودی</div>
            <div className="text-sm md:text-base font-black text-text-strong">
              {destination.entrance_fee || "رایگان"}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}