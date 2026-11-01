// src/components/destinations/single/DestinationDetailPage.tsx
"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { Destination } from "@/types/destination";
import DestinationHeader from "./DestinationHeader";
import DestinationHeroGallery from "./DestinationHeroGallery";
import DestinationAbout from "./DestinationAbout";
import DestinationHighlights from "./DestinationHighlights";
import DestinationPolicies from "./DestinationPolicies";
import NearbyPlacesSection from "@/components/shared/sections/NearbyPlacesSection";
import SimilarDestinations from "./SimilarDestinations";
import RelatedTours from "./RelatedTours";
import { WeatherWidget } from "@/components/shared/weather";
import destinationsData from "@/data/destinations.json";
import DestinationInfoSidebar from "./DestinationInfoSidebar";

const TABS = [
  { id: "summary", label: "خلاصه" },
  { id: "highlights", label: "نکات برجسته" },
  { id: "nearby", label: "موقعیت" },
  { id: "policies", label: "اطلاعات کاربردی" },
  { id: "weather", label: "آب و هوا" },
];

interface Props {
  destination: Destination;
}

export default function DestinationDetailPage({ destination }: Props) {
  const similarDestinations = (destinationsData.destinations as Destination[])
    .filter(
      (d) =>
        d.id !== destination.id &&
        (d.city === destination.city ||
          d.country === destination.country ||
          d.type === destination.type)
    )
    .slice(0, 3);

  const images =
    destination.gallery && destination.gallery.length > 0
      ? destination.gallery
      : [destination.image];

  return (
    <div className="min-h-screen bg-white">
      <DestinationHeader destination={destination} />

      <div className="ns-container pb-24 md:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
          {/* ═══ ستون اصلی ═══ */}
          <div className="min-w-0 space-y-6 md:space-y-0">
            {/* گالری */}
            <DestinationHeroGallery images={images} title={destination.title} />

            <div className="space-y-8 md:space-y-12 mt-4 md:mt-0">
              {/* ═══ تب‌های چسبان ═══ */}
              <nav className="sticky top-[78px] md:top-[135px] z-30 bg-white/95 backdrop-blur border-b border-border">
                <div className="ns-container">
                  <div className="flex items-center gap-6 overflow-x-auto scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                    {TABS.map((t, i) => (
                      <a
                        key={t.id}
                        href={`#${t.id}`}
                        className={`relative py-3 text-[13px] md:text-sm font-bold whitespace-nowrap transition shrink-0 ${
                          i === 0
                            ? "text-primary"
                            : "text-text-muted hover:text-primary"
                        }`}
                      >
                        {t.label}
                        {i === 0 && (
                          <span className="absolute bottom-0 inset-x-0 h-0.5 bg-primary rounded-full" />
                        )}
                      </a>
                    ))}
                  </div>
                </div>
              </nav>

              {/* ═══ محتوا ═══ */}
              <div id="summary" />
              <DestinationAbout destination={destination} />

              {/* سایدبار موبایل - زیر درباره */}
              <div className="lg:hidden mt-6">
                <DestinationInfoSidebar
                  destination={destination}
                  similarDestinations={similarDestinations}
                />
              </div>

              <DestinationHighlights destination={destination} />

              <NearbyPlacesSection
                postType="destination"
                slug={destination.slug}
                currentPlaceKey={destination.slug}
                coordinates={destination.coordinates}
                title="مکان‌های دیدنی نزدیک به این مقصد"
                subtitle="جاذبه‌ها و مکان‌های نزدیک به این مقصد"
                fallbackPlaces={[
                  {
                    key: "museum-1",
                    title: "موزه تاریخی",
                    type: "attraction",
                    distance: "۱.۵ کیلومتر",
                    offset: { lat: 0.013, lng: 0.018 },
                  },
                  {
                    key: "restaurant-1",
                    title: "رستوران محلی",
                    type: "restaurant",
                    distance: "۶۰۰ متر",
                    offset: { lat: -0.005, lng: 0.006 },
                  },
                  {
                    key: "bazaar-1",
                    title: "بازار سنتی",
                    type: "center",
                    distance: "۱ کیلومتر",
                    offset: { lat: 0.009, lng: -0.011 },
                  },
                  {
                    key: "park-1",
                    title: "پارک طبیعی",
                    type: "attraction",
                    distance: "۲ کیلومتر",
                    offset: { lat: -0.018, lng: 0.014 },
                  },
                ]}
              />

              <DestinationPolicies destination={destination} />

              {/* آب و هوا */}
              <section id="weather">
                <div className="flex items-center justify-between gap-3 mb-5">
                  <div className="min-w-0">
                    <h2 className="ns-section-title !mb-1">وضعیت آب و هوا</h2>
                    <p className="text-xs md:text-sm text-text-muted">
                      آب و هوای فعلی {destination.city}
                    </p>
                  </div>
                </div>
                <WeatherWidget
                  lat={destination.coordinates.lat}
                  lng={destination.coordinates.lng}
                  cityName={destination.city}
                  showForecast
                />
              </section>
            </div>

            {/* تورهای مرتبط */}
            <RelatedTours destination={destination} />

            {/* مقاصد مشابه */}
            {similarDestinations.length > 0 && (
              <SimilarDestinations destinations={similarDestinations} />
            )}
          </div>

          {/* ═══ سایدبار دسکتاپ ═══ */}
          <aside className="hidden lg:block lg:sticky lg:top-[150px] lg:max-h-[calc(100vh-174px)] lg:overflow-y-auto scrollbar-hide">
            <DestinationInfoSidebar
              destination={destination}
              similarDestinations={similarDestinations}
            />
          </aside>
        </div>
      </div>
    </div>
  );
}