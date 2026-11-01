"use client";

import { faDigits } from "@/lib/api/hotels";
import type { Destination } from "@/types/destination";
import DestinationGridCard from "../sections/DestinationGridCard";

interface Props {
  destinations: Destination[];
}

export default function SimilarDestinations({ destinations }: Props) {
  if (!destinations?.length) return null;

  return (
    <section className="mt-8 md:mt-12">
      <div className="mb-5 md:mb-6">
        <h2 className="ns-section-title !mb-1">مقصدهای مشابه</h2>
        <p className="text-xs md:text-sm text-text-muted">
          شاید این مقاصد هم برای شما جذاب باشد
        </p>
      </div>

      <div className="md:hidden">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-2 -mx-4 px-4">
          {destinations.map((d) => (
            <div key={d.id} className="w-[280px] shrink-0 snap-start">
              <DestinationGridCard destination={d} />
            </div>
          ))}
        </div>
      </div>

      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {destinations.map((d) => (
          <DestinationGridCard key={d.id} destination={d} />
        ))}
      </div>
    </section>
  );
}