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
  const isLong = destination.description.length > 400;

  return (
    <section id="summary" className="rounded-[10px] md:rounded-lg border border-border bg-white p-5 md:p-6 shadow-sm hover:shadow-card-hover transition-shadow duration-500 ease-out">
      <h2 className="text-base md:text-lg font-extrabold text-text-strong mb-4">
        درباره {destination.title}
      </h2>

      <div className="relative">
        <p className={`text-sm md:text-[15px] leading-7 md:leading-8 text-text ${
          !expanded && isLong ? "line-clamp-4" : ""
        }`}>
          {destination.description}
        </p>

        {isLong && !expanded && (
          <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-white to-transparent pointer-events-none" />
        )}
      </div>

      {isLong && (
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:text-primary-dark transition"
        >
          {expanded ? "نمایش کمتر" : "ادامه متن"}
          {expanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      )}

      {/* Quick Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6 pt-6 border-t border-border/60">
        <div className="text-center p-3 rounded-lg bg-bg-sec/50">
          <div className="text-[10px] text-text-muted mb-1">امتیاز</div>
          <div className="text-lg md:text-xl font-black text-success">
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
    </section>
  );
}