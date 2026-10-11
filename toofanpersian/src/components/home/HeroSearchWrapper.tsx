"use client";

import FlightForm from "@/components/search/FlightForm";

export default function HeroSearchWrapper() {
  return (
    <div className="rounded-2xl bg-white shadow-lg border">
      <div className="p-4 md:p-6">
        <FlightForm />
      </div>
    </div>
  );
}