"use client";

import { useState, useEffect } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import CurrentTehranDateTime from "@/components/shared/CurrentTehranDateTime";
import DestinationToolbar from "./sections/DestinationToolbar";
import MobileDestinationFilterChips from "./sections/MobileDestinationFilterChips";
import DestinationSidebar from "./sections/DestinationSidebar";
import DestinationResults from "./sections/DestinationResults";
import MobileDestinationFilterSheet from "./sections/MobileDestinationFilterSheet";
import ResponsiveMap from "@/components/shared/map/ResponsiveMap";
import { useDestinationFilters } from "./hooks/useDestinationFilters";
import { useDestinationMapPoints } from "./hooks/useDestinationMapPoints";
import type { DestinationsData } from "@/types/destination";

interface Props {
  data: DestinationsData;
}

export default function DestinationsPage({ data }: Props) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const isMobile = useMediaQuery("(max-width: 1023px)");

  const {
    filters,
    setFilters,
    sortBy,
    handleSortChange,
    view,
    handleViewChange,
    filteredDestinations,
    activeCount,
  } = useDestinationFilters(data.destinations);

  const mapPoints = useDestinationMapPoints(filteredDestinations);

  return (
    <div className="ns-container py-8 md:py-12">
      {/* Toolbar */}
      <DestinationToolbar
        filteredCount={filteredDestinations.length}
        activeCount={activeCount}
        sortBy={sortBy}
        view={view}
        onSortChange={handleSortChange}
        onViewChange={handleViewChange}
        onMobileFilterClick={() => setMobileFilterOpen(true)}
      />
      <CurrentTehranDateTime />

      {/* Mobile Filter Chips */}
      <MobileDestinationFilterChips filters={filters} onFiltersChange={setFilters} />

      {/* ✅ نقشه شناور موبایل */}
      {isMobile && mapPoints.length > 0 && (
        <ResponsiveMap
          points={mapPoints}
          title="نقشه مقاصد"
          itemLabel="مقصد"
          desktopHeight={180}
          activeKey={hoveredKey}
          onPointHover={setHoveredKey}
        />
      )}

      {/* Main Layout */}
      <div className="flex gap-6">
        <DestinationSidebar
          mapPoints={mapPoints}
          filters={filters}
          totalCount={data.destinations.length}
          filteredCount={filteredDestinations.length}
          hoveredKey={hoveredKey}
          onFiltersChange={setFilters}
          onHoverChange={setHoveredKey}
        />

        <main className="flex-1 min-w-0">
          <DestinationResults
            destinations={filteredDestinations}
            view={view}
            onHover={setHoveredKey}
          />
        </main>
      </div>

      {/* Mobile Filter Sheet */}
      <MobileDestinationFilterSheet
        open={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        filters={filters}
        onChange={setFilters}
        totalCount={data.destinations.length}
        filteredCount={filteredDestinations.length}
      />
    </div>
  );
}