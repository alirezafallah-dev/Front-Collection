"use client";

import { useState } from "react";
import { Search, Building2 } from "lucide-react";

const quickLinks = [
  { label: "استانبول", flag: "🇹🇷", country: "turkey", count: 3 },
  { label: "بانکوک", flag: "🇹🇭", country: "thailand", count: 1 },
  { label: "پوکت", flag: "🇹🇭", country: "thailand", count: 1 },
  { label: "مسکو", flag: "🇷🇺", country: "russia", count: 2 },
  { label: "سن‌پترزبورگ", flag: "🇷🇺", country: "russia", count: 1 },
];

export default function HotelsHero() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section className="relative w-full hero-section">
      {/* Background - همان استایل هیرو اصلی */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/images/hero/hotel-hero-bg.png')",
          backgroundSize: "100% auto",
          backgroundPosition: "top center",
          backgroundRepeat: "no-repeat",
        }}
      />
      
      {/* Overlay روشن - هم‌رنگ هیرو اصلی */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/30" />

      {/* Content */}
      <div className="relative z-10 container-brand h-full hero-content flex flex-col justify-end items-center">
        <div className="w-full max-w-3xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>هتل‌های لوکس و برتر</span>
          </div>

          {/* Title */}
          <h1 className="text-2xl md:text-4xl font-black text-navy-900 mb-3 leading-tight">
            اقامت در بهترین <span className="text-brand-600">هتل‌ها</span>
          </h1>

          {/* Search Box */}
          <div className="relative max-w-2xl mx-auto mb-4">
            <div className="flex items-center bg-white rounded-2xl shadow-xl shadow-navy-900/10 border border-slate-100 overflow-hidden">
              <div className="flex items-center gap-2 px-4 flex-1">
                <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="جستجوی هتل، شهر یا مقصد..."
                  className="w-full h-12 md:h-14 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                />
              </div>
              <button className="h-12 md:h-14 px-5 md:px-8 bg-brand-500 hover:bg-brand-600 text-white font-bold text-sm transition-colors">
                جستجو
              </button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs text-slate-500">محبوب‌ترین‌ها:</span>
            {quickLinks.map((link, i) => (
              <button
                key={i}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/80 backdrop-blur-sm hover:bg-white border border-slate-200 text-xs font-medium text-slate-700 transition-all"
              >
                <span>{link.flag}</span>
                <span>{link.label}</span>
                <span className="text-[10px] text-slate-400">({link.count})</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}