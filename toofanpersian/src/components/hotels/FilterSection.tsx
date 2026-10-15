"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterSectionProps {
  title: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  defaultOpen?: boolean;
  badge?: string | number;
}

export default function FilterSection({
  title,
  icon,
  children,
  defaultOpen = true,
  badge,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-slate-100 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between py-4 text-right"
      >
        <div className="flex items-center gap-2">
          {icon && <span className="text-slate-400">{icon}</span>}
          <span className="text-sm font-bold text-navy-900">{title}</span>
          {badge && (
            <span className="px-2 py-0.5 rounded-full bg-brand-100 text-brand-700 text-[10px] font-black">
              {badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={cn(
            "w-4 h-4 text-slate-400 transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>
      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          isOpen ? "max-h-[1000px] pb-4" : "max-h-0"
        )}
      >
        {children}
      </div>
    </div>
  );
}