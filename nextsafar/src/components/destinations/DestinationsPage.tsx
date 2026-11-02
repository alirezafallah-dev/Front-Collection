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
import type { SortKey } from "./constants";

// بخش‌های مخصوص مقصد
import MobileDestinationFilterChips from "./sections/MobileDestinationFilterChips";
import DestinationSidebar from "./sections/DestinationSidebar";
import MobileDestinationFilterSheet from "./sections/MobileDestinationFilterSheet";

// کارت‌های مقصد
import DestinationGridCard from "./sections/DestinationGridCard";
import DestinationListItem from "./sections/DestinationListItem";

import type { DestinationsData } from "@/types/destination";
import type { Destination } from "@/types/destination";

// ═══ نگاشت SortOption به SortKey ═══
const SORT_OPTION_TO_KEY: Record<SortOption, SortKey> = {
  recommended: "rating",
  rating: "rating",
  reviews: "reviews",
  price_low: "price_asc",
  price_high: "price_desc",
  stars: "rating", // مقصد ستاره ندارد، fallback به rating
  name: "rating", // fallback
};

const SORT_KEY_TO_OPTION: Record<SortKey, SortOption> = {
  rating: "rating",
  reviews: "reviews",
  price_asc: "price_low",
  price_desc: "price_high",
  duration_asc: "recommended",
  duration_desc: "recommended",
};

// ═══ گزینه‌های مرتب‌سازی مخصوص مقصد ═══
const DESTINATION_SORT_OPTIONS = [
  { value: "rating" as SortOption, label: "بیشترین امتیاز" },
  { value: "reviews" as SortOption, label: "بیشترین نظرات" },
  { value: "price_low" as SortOption, label: "ارزان‌ترین" },
  { value: "price_high" as SortOption, label: "گران‌ترین" },
];

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

  // ═══ تبدیل SortOption به SortKey ═══
  const handleSortChangeWrapper = (option: SortOption) => {
    const key = SORT_OPTION_TO_KEY[option] || "rating";
    handleSortChange(key);
  };

  // ═══ تبدیل SortKey به SortOption ═══
  const currentSortOption = SORT_KEY_TO_OPTION[sortBy] || "rating";

  return (
    <ListingLayout
      toolbar={
        <ListingToolbar
          filteredCount={filteredDestinations.length}
          activeCount={activeCount}
          totalCount={data.destinations.length}
          sortBy={currentSortOption}
          view={view}
          onSortChange={handleSortChangeWrapper}
          onViewChange={handleViewChange}
          onMobileFilterClick={() => setMobileFilterOpen(true)}
          itemLabel="مقصد"
          sortOptions={DESTINATION_SORT_OPTIONS}
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
            <DestinationGridCard destination={dest} onHover={setHoveredKey} />
          )}
          renderListCard={(dest) => (
            <DestinationListItem destination={dest} onHover={setHoveredKey} />
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