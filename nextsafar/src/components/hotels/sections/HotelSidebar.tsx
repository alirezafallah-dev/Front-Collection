"use client";

import HotelFiltersSidebar from "./HotelFiltersSidebar";
import ResponsiveMap from "@/components/shared/map/ResponsiveMap";
import type { HotelFiltersState } from "../constants";
import type { MapPoint } from "@/components/shared/map/types";

interface Props {
  mapPoints: MapPoint[];
  filters: HotelFiltersState;
  totalCount: number;
  filteredCount: number;
  priceMax: number;
  hoveredKey: string | null;
  onFiltersChange: (f: HotelFiltersState) => void;
  onHoverChange: (key: string | null) => void;
}

export default function HotelSidebar({
  mapPoints,
  filters,
  totalCount,
  filteredCount,
  priceMax,
  hoveredKey,
  onFiltersChange,
  onHoverChange,
}: Props) {
  return (
    <aside className="hidden lg:block w-72 flex-shrink-0">
      <div className="sticky top-24 space-y-4">
        {/* نقشه */}
        {mapPoints.length > 0 && (
          <ResponsiveMap
            points={mapPoints}
            title="نقشه هتل‌ها"
            itemLabel="هتل"
            desktopHeight={200}
            activeKey={hoveredKey}
            onPointHover={onHoverChange}
          />
        )}

        {/* فیلترها - فقط دسکتاپ */}
        <HotelFiltersSidebar
          filters={filters}
          onChange={onFiltersChange}
          totalCount={totalCount}
          filteredCount={filteredCount}
          priceMax={priceMax}
        />
      </div>
    </aside>
  );
}