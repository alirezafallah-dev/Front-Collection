"use client";
import { BedDouble } from "lucide-react";
import { ListingResults } from "@/components/shared/listing";
import HotelGridCard from "./HotelGridCard";
import HotelListItem from "./HotelListItem";
import type { Hotel } from "@/types/hotel";
import type { ViewMode } from "../constants";

interface HotelResultsProps {
  hotels: Hotel[];
  view: ViewMode;
  onHover: (key: string | null) => void;
}

export default function HotelResults({
  hotels,
  view,
  onHover,
}: HotelResultsProps) {
  return (
    <ListingResults<Hotel>
      items={hotels}
      view={view}
      itemLabel="هتل"
      getKey={(h) => h.id}
      renderCard={(hotel) => (
        <HotelGridCard hotel={hotel} onHover={onHover} />
      )}
      renderListCard={(hotel) => (
        <HotelListItem hotel={hotel} onHover={onHover} />
      )}
      emptyIcon={<BedDouble className="w-12 h-12" />}
      emptyTitle="هتلی یافت نشد"
      emptyMessage="فیلترهای خود را تغییر دهید یا مقصد دیگری را انتخاب کنید"
    />
  );
}