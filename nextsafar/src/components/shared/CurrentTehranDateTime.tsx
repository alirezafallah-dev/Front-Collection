"use client";

import { useEffect, useState } from "react";
import { Clock3 } from "lucide-react";

const dateFormatter = new Intl.DateTimeFormat("fa-IR", {
  dateStyle: "full",
  timeZone: "Asia/Tehran",
});

const timeFormatter = new Intl.DateTimeFormat("fa-IR", {
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  timeZone: "Asia/Tehran",
});

export default function CurrentTehranDateTime() {
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    const intervalId = window.setInterval(() => setNow(new Date()), 1000);

    return () => window.clearInterval(intervalId);
  }, []);

  return (
    <div className="mb-5 flex items-center justify-end gap-2 text-xs text-text-muted">
      <Clock3 aria-hidden="true" className="h-4 w-4 shrink-0" />
      <span className="font-medium">زمان فعلی تهران:</span>
      {now ? (
        <time dateTime={now.toISOString()}>
          {dateFormatter.format(now)}، {timeFormatter.format(now)}
        </time>
      ) : (
        <span aria-live="off">در حال دریافت زمان...</span>
      )}
    </div>
  );
}
