"use client";

import { useState, useEffect, useRef } from "react";
import PaginationControls from "./PaginationControls";
import EmptyState from "./EmptyState";
import type { ListingResultsProps } from "./types";

const DEFAULT_LIST_PAGE_SIZE = 10;
const DEFAULT_GRID_PAGE_SIZE = 12;

export default function ListingResults<T>({
  items,
  view,
  renderCard,
  renderListCard,
  itemLabel,
  getKey,
  emptyIcon,
  emptyTitle,
  emptyMessage,
  listPageSize = DEFAULT_LIST_PAGE_SIZE,
  gridPageSize = DEFAULT_GRID_PAGE_SIZE,
  gridClassName = "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5",
  listClassName = "space-y-4 md:space-y-5",
}: ListingResultsProps<T>) {
  const pageSize = view === "list" ? listPageSize : gridPageSize;

  const [visibleCount, setVisibleCount] = useState<number>(pageSize);
  const newItemsRef = useRef<HTMLDivElement>(null);

  // Reset visibleCount وقتی view یا items تغییر می‌کند
  useEffect(() => {
    setVisibleCount(pageSize);
  }, [view, items.length, pageSize]);

  // حالت خالی
  if (items.length === 0) {
    return (
      <EmptyState
        icon={emptyIcon}
        title={emptyTitle}
        message={emptyMessage}
      />
    );
  }

  // برش لیست
  const visibleItems = items.slice(0, visibleCount);
  const hasMore = visibleCount < items.length;
  const remainingCount = items.length - visibleCount;
  const allShown = visibleCount >= items.length;

  // Handlers
  const handleLoadMore = () => {
    const nextCount = Math.min(visibleCount + pageSize, items.length);
    setVisibleCount(nextCount);
    setTimeout(() => {
      newItemsRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }, 100);
  };

  const handleShowAll = () => {
    setVisibleCount(items.length);
  };

  const handleShowLess = () => {
    setVisibleCount(pageSize);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // انتخاب render function بر اساس view
  const renderFn = view === "list" && renderListCard ? renderListCard : renderCard;

  // رندر آیتم‌ها
  const renderItems = () =>
    visibleItems.map((item, idx) => (
      <div
        key={getKey(item)}
        ref={idx === visibleCount - pageSize ? newItemsRef : null}
      >
        {renderFn(item, idx)}
      </div>
    ));

  // Pagination
  const pagination = (
    <PaginationControls
      hasMore={hasMore}
      visibleCount={visibleCount}
      totalCount={items.length}
      remainingCount={remainingCount}
      allShown={allShown}
      itemLabel={itemLabel}
      onLoadMore={handleLoadMore}
      onShowAll={handleShowAll}
      onShowLess={handleShowLess}
    />
  );

  // View: List
  if (view === "list") {
    return (
      <div className={listClassName}>
        {renderItems()}
        {pagination}
      </div>
    );
  }

  // View: Grid
  return (
    <div>
      <div className={gridClassName}>{renderItems()}</div>
      {pagination}
    </div>
  );
}