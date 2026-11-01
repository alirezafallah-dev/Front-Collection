"use client";

import DestinationFiltersSidebar from "./DestinationFiltersSidebar";
import ResponsiveMap from "@/components/shared/map/ResponsiveMap";
import type { DestinationFiltersState } from "../constants";
import type { MapPoint } from "@/components/shared/map/types";

interface Props {
  mapPoints: MapPoint[];
  filters: DestinationFiltersState;
  totalCount: number;
  filteredCount: number;
  hoveredKey: string | null;
  onFiltersChange: (f: DestinationFiltersState) => void;
  onHoverChange: (key: string | null) => void;
}

export default function DestinationSidebar({
  mapPoints,
  filters,
  totalCount,
  filteredCount,
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
            title="نقشه مقاصد"
            itemLabel="مقصد"
            desktopHeight={200}
            activeKey={hoveredKey}
            onPointHover={onHoverChange}
          />
        )}

        {/* فیلترها - فقط دسکتاپ */}
        <DestinationFiltersSidebar
          filters={filters}
          onChange={onFiltersChange}
          totalCount={totalCount}
          filteredCount={filteredCount}
        />
      </div>
    </aside>
  );
}