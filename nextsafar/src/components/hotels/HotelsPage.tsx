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
import { useHotelFilters } from "./hooks/useHotelFilters";
import { useHotelMapPoints } from "./hooks/useHotelMapPoints";

// بخش‌های مخصوص هتل (مخصوص این صفحه)
import MobileFilterChips from "./sections/MobileFilterChips";
import HotelSidebar from "./sections/HotelSidebar";
import MobileFilterSheet from "./sections/MobileFilterSheet";
import HotelGuideSection from "./HotelGuideSection";
import HotelByTripType from "./HotelByTripType";
import HotelFAQ from "./HotelFAQ";

// کارت‌های هتل
import HotelGridCard from "./sections/HotelGridCard";
import HotelListCard from "./sections/HotelListItem";

import type { HotelsData } from "@/types/hotel";
import type { Hotel } from "@/types/hotel";

interface Props {
  data: HotelsData;
}

export default function HotelsPage({ data }: Props) {
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
    filteredHotels,
    activeCount,
    priceMax,
  } = useHotelFilters(data.hotels);

  const mapPoints = useHotelMapPoints(filteredHotels);

  return (
    <ListingLayout
      toolbar={
        <ListingToolbar
          filteredCount={filteredHotels.length}
          activeCount={activeCount}
          totalCount={data.hotels.length}
          sortBy={sortBy}
          view={view}
          onSortChange={handleSortChange}
          onViewChange={handleViewChange}
          onMobileFilterClick={() => setMobileFilterOpen(true)}
          itemLabel="هتل"
        />
      }
      mobileFilterChips={
        <MobileFilterChips filters={filters} onFiltersChange={setFilters} />
      }
      mobileMap={
        mapPoints.length > 0 ? (
          <ResponsiveMap
            points={mapPoints}
            title="نقشه هتل‌ها"
            itemLabel="هتل"
            desktopHeight={180}
            activeKey={hoveredKey}
            onPointHover={setHoveredKey}
          />
        ) : null
      }
      sidebar={
        <HotelSidebar
          mapPoints={mapPoints}
          filters={filters}
          totalCount={data.hotels.length}
          filteredCount={filteredHotels.length}
          priceMax={priceMax}
          hoveredKey={hoveredKey}
          onFiltersChange={setFilters}
          onHoverChange={setHoveredKey}
        />
      }
      results={
        <ListingResults<Hotel>
          items={filteredHotels}
          view={view}
          itemLabel="هتل"
          getKey={(hotel) => hotel.id ?? hotel.slug ?? ""}
          renderCard={(hotel) => (
            <HotelGridCard
              hotel={hotel}
              onHover={setHoveredKey}
            />
          )}
          renderListCard={(hotel) => (
            <HotelListCard
              hotel={hotel}
              onHover={setHoveredKey}
            />
          )}
          emptyTitle="هیچ هتلی با این فیلترها پیدا نشد"
          emptyMessage="فیلترهای خود را تغییر دهید یا محدوده جستجو را گسترش دهید"
        />
      }
      bottomSections={
        <>
          <HotelGuideSection />
          <HotelByTripType />
          <HotelFAQ />
        </>
      }
      mobileFilterSheet={
        <MobileFilterSheet
          open={mobileFilterOpen}
          onClose={() => setMobileFilterOpen(false)}
          filters={filters}
          onChange={setFilters}
          totalCount={data.hotels.length}
          filteredCount={filteredHotels.length}
          priceMax={priceMax}
        />
      }
    />
  );
}