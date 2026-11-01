"use client";

import { CheckCircle2, Sparkles } from "lucide-react";
import type { Destination } from "@/types/destination";

interface Props {
  destination: Destination;
}

export default function DestinationHighlights({ destination }: Props) {
  if (!destination.highlights || destination.highlights.length === 0) return null;

  return (
    <section id="highlights">
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="min-w-0">
          <h2 className="ns-section-title !mb-1">نکات برجسته</h2>
          <p className="text-xs md:text-sm text-text-muted">
            ویژگی‌های منحصربه‌فرد این مقصد
          </p>
        </div>
      </div>

      <div className="rounded-[10px] md:rounded-lg border border-border bg-white p-5 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {destination.highlights.map((highlight, i) => (
            <div
              key={i}
              className="flex items-start gap-3 p-3 rounded-lg bg-bg-sec/30 border border-border/40 hover:border-primary/30 hover:bg-primary/5 transition-all duration-500 ease-out"
            >
              <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <span className="text-sm text-text-strong">{highlight}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}