"use client";

import { SearchX } from "lucide-react";
import type { EmptyStateProps } from "./types";

export default function EmptyState({
  icon,
  title = "موردی یافت نشد",
  message = "فیلترهای خود را تغییر دهید یا جستجوی دیگری را امتحان کنید",
}: EmptyStateProps) {
  return (
    <div className="rounded-lg border-2 border-dashed border-border bg-bg-sec/30 p-12 text-center">
      {icon ? (
        <div className="w-12 h-12 text-primary/50 mx-auto mb-4">{icon}</div>
      ) : (
        <SearchX className="w-12 h-12 text-primary/50 mx-auto mb-4" />
      )}
      <h3 className="text-lg font-extrabold text-text-strong mb-2">{title}</h3>
      <p className="text-sm text-text-muted">{message}</p>
    </div>
  );
}