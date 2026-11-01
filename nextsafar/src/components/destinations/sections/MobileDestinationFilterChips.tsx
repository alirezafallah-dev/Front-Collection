"use client";

import { MobileFilterSheet as BaseMobileFilterSheet } from "@/components/shared/filters";
import DestinationFiltersSidebar from "./DestinationFiltersSidebar";
import type { DestinationFiltersState } from "./constants";

interface Props {
  open: boolean;
  onClose: () => void;
  filters: DestinationFiltersState;
  onChange: (f: DestinationFiltersState) => void;
  totalCount: number;
  filteredCount: number;
}

export default function MobileDestinationFilterSheet({
  open,
  onClose,
  filters,
  onChange,
  filteredCount,
}: Props) {
  return (
    <BaseMobileFilterSheet
      open={open}
      onClose={onClose}
      title="فیلترها"
      resultCount={filteredCount}
      resultLabel="مقصد"
    >
      <DestinationFiltersSidebar
        filters={filters}
        onChange={onChange}
        totalCount={0}
        filteredCount={filteredCount}
        compact={true} // ✅ حالت فشرده برای موبایل
      />
    </BaseMobileFilterSheet>
  );
}