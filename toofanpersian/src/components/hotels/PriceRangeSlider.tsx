"use client";

import { useState, useRef, useEffect } from "react";

interface PriceRangeSliderProps {
  min: number;
  max: number;
  value: [number, number];
  onChange: (value: [number, number]) => void;
  formatValue?: (value: number) => string;
}

export default function PriceRangeSlider({
  min,
  max,
  value,
  onChange,
  formatValue = (v) => v.toLocaleString("fa-IR"),
}: PriceRangeSliderProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [dragging, setDragging] = useState<"min" | "max" | null>(null);

  const getPercentage = (val: number) => ((val - min) / (max - min)) * 100;

  const getValueFromPosition = (clientX: number) => {
    if (!trackRef.current) return min;
    const rect = trackRef.current.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    const rawValue = min + percent * (max - min);
    // Round to nearest 1,000,000
    return Math.round(rawValue / 1000000) * 1000000;
  };

  const handleMouseDown = (type: "min" | "max") => (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(type);
  };

  const handleTouchStart = (type: "min" | "max") => (e: React.TouchEvent) => {
    setDragging(type);
  };

  useEffect(() => {
    if (!dragging) return;

    const handleMove = (clientX: number) => {
      const newValue = getValueFromPosition(clientX);
      if (dragging === "min") {
        onChange([Math.min(newValue, value[1] - 1000000), value[1]]);
      } else {
        onChange([value[0], Math.max(newValue, value[0] + 1000000)]);
      }
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => handleMove(e.touches[0].clientX);
    const handleEnd = () => setDragging(null);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleEnd);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleEnd);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleEnd);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleEnd);
    };
  }, [dragging, value, onChange, min, max]);

  const minPercent = getPercentage(value[0]);
  const maxPercent = getPercentage(value[1]);

  return (
    <div className="pt-6 pb-2">
      {/* Display Values */}
      <div className="flex items-center justify-between mb-6">
        <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 min-w-[110px]">
          <div className="text-[10px] text-slate-500 mb-0.5">حداقل</div>
          <div className="text-sm font-black text-navy-900">
            {formatValue(value[0])}
          </div>
        </div>
        <div className="flex-1 mx-3 h-px bg-slate-300" />
        <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 min-w-[110px]">
          <div className="text-[10px] text-slate-500 mb-0.5">حداکثر</div>
          <div className="text-sm font-black text-navy-900">
            {formatValue(value[1])}
          </div>
        </div>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        className="relative h-1.5 bg-slate-200 rounded-full cursor-pointer"
      >
        {/* Active Track */}
        <div
          className="absolute h-full bg-brand-500 rounded-full"
          style={{
            left: `${minPercent}%`,
            width: `${maxPercent - minPercent}%`,
          }}
        />

        {/* Min Handle */}
        <div
          onMouseDown={handleMouseDown("min")}
          onTouchStart={handleTouchStart("min")}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing"
          style={{ left: `${minPercent}%` }}
        >
          <div className="w-5 h-5 rounded-full bg-white border-2 border-brand-500 shadow-lg hover:scale-110 transition-transform" />
        </div>

        {/* Max Handle */}
        <div
          onMouseDown={handleMouseDown("max")}
          onTouchStart={handleTouchStart("max")}
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-grab active:cursor-grabbing"
          style={{ left: `${maxPercent}%` }}
        >
          <div className="w-5 h-5 rounded-full bg-white border-2 border-brand-500 shadow-lg hover:scale-110 transition-transform" />
        </div>
      </div>
    </div>
  );
}