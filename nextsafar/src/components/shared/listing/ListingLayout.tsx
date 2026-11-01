"use client";

import { ReactNode } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import type { ListingLayoutProps } from "./types";

export default function ListingLayout({
  toolbar,
  mobileFilterChips,
  mobileMap,
  sidebar,
  results,
  mobileFilterSheet,
  bottomSections,
  className = "",
}: ListingLayoutProps) {
  const isMobile = useMediaQuery("(max-width: 1023px)");

  return (
    <div className={`ns-container py-8 md:py-12 ${className}`}>
      {/* ═══ Toolbar ═══ */}
      {toolbar}

      {/* ═══ Mobile Filter Chips ═══ */}
      {mobileFilterChips}

      {/* ═══ نقشه شناور موبایل ═══ */}
      {isMobile && mobileMap}

      {/* ═══ Main Layout: Sidebar + Results ═══ */}
      <div className="flex gap-6">
        {sidebar}
        <main className="flex-1 min-w-0">{results}</main>
      </div>

      {/* ═══ Bottom Sections (FAQ, Guide, etc.) ═══ */}
      {bottomSections}

      {/* ═══ Mobile Filter Sheet ═══ */}
      {mobileFilterSheet}
    </div>
  );
}