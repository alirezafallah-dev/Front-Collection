"use client";

import { CheckCircle2, Sparkles } from "lucide-react";
import type { Destination } from "@/types/destination";

interface Props {
  destination: Destination;
}

export default function DestinationHighlights({ destination }: Props) {
  if (!destination.highlights || destination.highlights.length === 0) return null;

  return (
    <section id="highlights" className="rounded-[10px] md:rounded-lg border border-border bg-white p-5 md:p-6 shadow-sm hover:shadow-card-hover transition-shadow duration-500 ease-out">
      <div className="flex items-center gap-2 mb-5">
        <div className="w-9 h-9 rounded-lg bg-warning/10 flex items-center justify-center">
          <Sparkles className="w-4 h-4 text-warning" />
        </div>
        <h2 className="text-base md:text-lg font-extrabold text-text-strong">
          نکات برجسته
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {destination.highlights.map((highlight, i) => (
          <div
            key={i}
            className="flex items-start gap-3 p-3 rounded-lg bg-bg-sec/30 border border-border/40 hover:border-warning/30 hover:bg-warning/5 transition-all duration-500 ease-out"
          >
            <CheckCircle2 className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <span className="text-sm text-text-strong">{highlight}</span>
          </div>
        ))}
      </div>
    </section>
  );
}