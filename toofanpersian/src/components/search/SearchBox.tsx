"use client";
import { useState } from "react";
import { Plane, BedDouble, Globe } from "lucide-react";
import FlightForm from "./FlightForm";
import HotelForm from "./HotelForm";
import { cn } from "@/lib/utils";

type SearchType = "flight" | "hotel" | "tour";

export default function SearchBox() {
  const [activeTab, setActiveTab] = useState<SearchType>("flight");

  // ترتیب: پرواز، هتل، تور
  const tabs = [
    { id: "flight" as const, label: "پرواز", icon: Plane },
    { id: "hotel" as const, label: "هتل", icon: BedDouble },
    { id: "tour" as const, label: "تور", icon: Globe },
  ];

  return (
    // ❌ overflow-hidden حذف شد - تقویم دیگه cut نمیشه
    <div className="bg-white rounded-2xl shadow-lg border border-slate-100">
      {/* Header with tabs */}
      <div className="bg-gradient-to-r from-brand-50 to-white px-4 md:px-6 py-3 border-b border-slate-100 rounded-t-2xl">
        <div className="flex items-center gap-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex items-center gap-2 px-4 md:px-5 py-2 rounded-xl text-sm font-bold transition-all",
                  isActive
                    ? "bg-white text-brand-600 shadow-md"
                    : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                )}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Form content */}
      <div className="p-4 md:p-6">
        {activeTab === "flight" && <FlightForm />}
        {activeTab === "hotel" && <HotelForm />}
        {activeTab === "tour" && (
          <div className="text-center py-8">
            <Globe className="w-12 h-12 mx-auto mb-3 text-slate-300" />
            <p className="text-slate-500 font-medium">سیستم جستجوی تور به‌زودی اضافه می‌شود</p>
          </div>
        )}
      </div>
    </div>
  );
}