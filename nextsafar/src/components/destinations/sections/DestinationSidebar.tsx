"use client";

import DestinationFiltersSidebar from "./DestinationFiltersSidebar";
import ResponsiveMap from "@/components/shared/map/ResponsiveMap";
import type { DestinationFiltersState } from "../constants";
import type { ListingMapPoint } from "@/components/shared/map/types";

interface Props {
  mapPoints: ListingMapPoint[];
  filters: DestinationFiltersState;
  totalCount: number;
  filteredCount: number;
  hoveredKey: string | null;
  onFiltersChange: (f: DestinationFiltersState) => void;
  onHoverChange: (key: string | null) => void;
}

// بقیه فایل دست‌نخورده

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
      <div className="sticky top-37 space-y-4">
        {/* نقشه */}
        {mapPoints.length > 0 && (
          <ResponsiveMap
            points={mapPoints}
            title="نقشه مقاصد"
            itemLabel="مقصد"
            desktopHeight={185}
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