"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { FilterSectionProps } from "./types";

export default function FilterSection({
  title,
  icon,
  badge,
  defaultOpen = true,
  children,
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border-b border-border last:border-0 pb-4 mb-5 last:pb-0 last:mb-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 py-1.5 cursor-pointer group"
      >
        <div className="flex items-center gap-2 min-w-0">
          {icon && (
            <span className="flex items-center justify-center w-5 h-5 rounded text-primary/80 group-hover:text-primary transition-colors">
              {icon}
            </span>
          )}
          <span className="text-xs font-bold text-text-strong truncate">
            {title}
          </span>
          {badge && badge > 0 && (
            <span className="px-1.5 py-0.5 rounded-full bg-primary text-white text-[9px] font-bold shrink-0">
              {badge}
            </span>
          )}
        </div>
        <ChevronDown
          className={`w-4 h-4 text-text-muted group-hover:text-text-strong transition-all duration-200 shrink-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && <div className="mt-1">{children}</div>}
    </div>
  );
}