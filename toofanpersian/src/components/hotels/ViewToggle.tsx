"use client";

import { LayoutGrid, List } from "lucide-react";
import { cn } from "@/lib/utils";

interface ViewToggleProps {
  view: "grid" | "list";
  onChange: (view: "grid" | "list") => void;
}

export default function ViewToggle({ view, onChange }: ViewToggleProps) {
  return (
    <div className="inline-flex bg-slate-100 rounded-lg p-0.5">
      <button
        onClick={() => onChange("grid")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition",
          view === "grid"
            ? "bg-white shadow-sm text-navy-900"
            : "text-slate-500 hover:text-slate-700"
        )}
        aria-label="نمایش Grid"
      >
        <LayoutGrid className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">کارت</span>
      </button>
      <button
        onClick={() => onChange("list")}
        className={cn(
          "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition",
          view === "list"
            ? "bg-white shadow-sm text-navy-900"
            : "text-slate-500 hover:text-slate-700"
        )}
        aria-label="نمایش List"
      >
        <List className="w-3.5 h-3.5" />
        <span className="hidden sm:inline">لیست</span>
      </button>
    </div>
  );
}