"use client";

import { useState } from "react";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  ListingLayout,
  ListingToolbar,
  ListingResults,
  type SortOption,
} from "@/components/shared/listing";
import ResponsiveMap from "@/components/shared/map/ResponsiveMap";
import { useDestinationFilters } from "./hooks/useDestinationFilters";
import { useDestinationMapPoints } from "./hooks/useDestinationMapPoints";

// بخش‌های مخصوص مقصد (مخصوص این صفحه)
import MobileDestinationFilterChips from "./sections/MobileDestinationFilterChips";
import DestinationSidebar from "./sections/DestinationSidebar";
import MobileDestinationFilterSheet from "./sections/MobileDestinationFilterSheet";

// کارت‌های مقصد
import DestinationGridCard from "./sections/DestinationGridCard";

import type { DestinationsData } from "@/types/destination";
import type { Destination } from "@/types/destination";

interface Props {
  data: DestinationsData;
}

export default function DestinationsPage({ data }: Props) {
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);

  // ✅ تشخیص موبایل
  const isMobile = useMediaQuery("(max-width: 1023px)");

  // ✅ Hooks فیلترینگ و نقشه
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
    <ListingLayout
      toolbar={
        <ListingToolbar
          filteredCount={filteredDestinations.length}
          activeCount={activeCount}
          totalCount={data.destinations.length}
          sortBy={sortBy}
          view={view}
          onSortChange={handleSortChange}
          onViewChange={handleViewChange}
          onMobileFilterClick={() => setMobileFilterOpen(true)}
          itemLabel="مقصد"
        />
      }
      mobileFilterChips={
        <MobileDestinationFilterChips
          filters={filters}
          onFiltersChange={setFilters}
        />
      }
      mobileMap={
        mapPoints.length > 0 ? (
          <ResponsiveMap
            points={mapPoints}
            title="نقشه مقاصد"
            itemLabel="مقصد"
            desktopHeight={180}
            activeKey={hoveredKey}
            onPointHover={setHoveredKey}
          />
        ) : null
      }
      sidebar={
        <DestinationSidebar
          mapPoints={mapPoints}
          filters={filters}
          totalCount={data.destinations.length}
          filteredCount={filteredDestinations.length}
          hoveredKey={hoveredKey}
          onFiltersChange={setFilters}
          onHoverChange={setHoveredKey}
        />
      }
      results={
        <ListingResults<Destination>
          items={filteredDestinations}
          view={view}
          itemLabel="مقصد"
          getKey={(dest) => dest.id ?? dest.slug ?? ""}
          renderCard={(dest) => (
            <DestinationGridCard
              destination={dest}
              onHover={setHoveredKey}
            />
          )}
          // ✅ اگر DestinationListCard نداریم، از همان GridCard استفاده می‌کنیم
          renderListCard={(dest) => (
            <DestinationGridCard
              destination={dest}
              onHover={setHoveredKey}
            />
          )}
          emptyTitle="هیچ مقصدی با این فیلترها پیدا نشد"
          emptyMessage="فیلترهای خود را تغییر دهید یا محدوده جستجو را گسترش دهید"
        />
      }
      mobileFilterSheet={
        <MobileDestinationFilterSheet
          open={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
          filters={filters}
          onChange={setFilters}
          totalCount={data.destinations.length}
          filteredCount={filteredDestinations.length}
        />
      }
    />
  );
}