"use client";
import { MapPin } from "lucide-react";
import { ListingResults } from "@/components/shared/listing";
import DestinationGridCard from "./DestinationGridCard";
import DestinationListItem from "./DestinationListItem";
import type { Destination } from "@/types/destination";
import type { ViewMode } from "../constants";

interface Props {
  destinations: Destination[];
  view: ViewMode;
  onHover: (key: string | null) => void;
}

export default function DestinationResults({
  destinations,
  view,
  onHover,
}: Props) {
  return (
    <ListingResults<Destination>
      items={destinations}
      view={view}
      itemLabel="مقصد"
      getKey={(d) => d.id}
      renderCard={(destination) => (
        <DestinationGridCard destination={destination} onHover={onHover} />
      )}
      renderListCard={(destination) => (
        <DestinationListItem destination={destination} onHover={onHover} />
      )}
      emptyIcon={<MapPin className="w-12 h-12" />}
      emptyTitle="مقصدی یافت نشد"
      emptyMessage="فیلترهای خود را تغییر دهید یا مقصد دیگری را انتخاب کنید"
    />
  );
}