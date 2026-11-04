// فایل: src/lib/api/flights.ts - کل فایل
import { buildApiUrl } from "./config";
import type { FlightResult, FlightSearchParams } from "@/types";

// Re-export برای استفاده در صفحات
export type { FlightResult, FlightSearchParams };

export async function searchFlights(p: FlightSearchParams): Promise<FlightResult[]> {
  const qs = new URLSearchParams();
  Object.entries(p).forEach(([k, v]) => v && qs.set(k, String(v)));

  try {
    const res = await fetch(
      buildApiUrl(`/nextsafar/v1/flights/search?${qs.toString()}`),
      { next: { revalidate: 300 } }
    );
    
    if (!res.ok) return [];
    
    const d = await res.json();
    return d.ok ? d.items : [];
  } catch {
    return [];
  }
}