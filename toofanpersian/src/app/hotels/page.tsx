"use client";

import { useState, useMemo } from "react";
import { hotels } from "@/lib/data/hotels";
import { Header } from "@/components/layout/header";
import HotelsHero from "@/components/hotels/HotelsHero";
import FeaturedHotel from "@/components/hotels/FeaturedHotel";
import HotelsFilters, { FiltersState } from "@/components/hotels/HotelsFilters";
import MobileFilterSheet from "@/components/hotels/MobileFilterSheet";
import HotelGridCard from "@/components/hotels/HotelGridCard";
import HotelListItem from "@/components/hotels/HotelListItem";
import ViewToggle from "@/components/hotels/ViewToggle";
import HotelsGuide from "@/components/hotels/HotelsGuide";
import HotelsFAQ from "@/components/hotels/HotelsFAQ";
import HotelsCTA from "@/components/hotels/HotelsCTA";
import Footer from "@/components/layout/footer";
import { List, LayoutGrid } from "lucide-react";

const initialFilters: FiltersState = {
  search: "",
  stars: [],
  amenities: [],
  neighborhood: [],
};

export default function HotelsPage() {
  const [filters, setFilters] = useState<FiltersState>(initialFilters);
  const [view, setView] = useState<"grid" | "list">("list");

  const featuredHotel = hotels.find((h) => h.featured) || hotels[0];

  const filteredHotels = useMemo(() => {
    let result = [...hotels];

    // جستجو
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(
        (h) =>
          h.name.toLowerCase().includes(searchTerm) ||
          h.location.toLowerCase().includes(searchTerm) ||
          h.neighborhood.toLowerCase().includes(searchTerm)
      );
    }

    // ستاره
    if (filters.stars.length > 0) {
      result = result.filter((h) => filters.stars.includes(h.stars));
    }

    // منطقه
    if (filters.neighborhood.length > 0) {
      result = result.filter((h) => filters.neighborhood.includes(h.neighborhood));
    }

    return result;
  }, [filters]);

  return (
    <main className="min-h-screen bg-slate-50">
      <Header />
      <HotelsHero />
      <FeaturedHotel hotel={featuredHotel} />

      <MobileFilterSheet
        filters={filters}
        onChange={setFilters}
        totalCount={hotels.length}
        filteredCount={filteredHotels.length}
      />

      {/* Main Content */}
      <section className="py-6 md:py-12">
        <div className="container-brand px-4">
          {/* 🎯 items-start - کلید موفقیت sticky */}
          <div className="flex gap-6 items-start">
            {/* Desktop Sidebar */}
            <HotelsFilters
              filters={filters}
              onChange={setFilters}
              totalCount={hotels.length}
              filteredCount={filteredHotels.length}
            />

            {/* Hotels List */}
            <div className="flex-1 min-w-0">
              {/* Desktop Top Bar */}
              <div className="hidden lg:flex items-center justify-between mb-5 sticky top-16 z-20 bg-slate-50 py-3 -mx-2 px-2">
                <div className="text-sm text-slate-600">
                  <span className="font-bold text-navy-900">{filteredHotels.length}</span> هتل
                </div>
                <ViewToggle view={view} onChange={setView} />
              </div>

              {/* Mobile Top Bar */}
              <div className="lg:hidden mb-4">
                <div className="bg-white rounded-xl border border-slate-200 p-3 flex items-center justify-between shadow-sm">
                  <div className="text-sm text-slate-600">
                    <span className="font-black text-navy-900">{filteredHotels.length}</span> هتل
                  </div>
                  <div className="inline-flex bg-slate-100 rounded-lg p-0.5">
                    <button
                      onClick={() => setView("grid")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition ${
                        view === "grid"
                          ? "bg-white shadow-sm text-navy-900"
                          : "text-slate-500"
                      }`}
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span>کارت</span>
                    </button>
                    <button
                      onClick={() => setView("list")}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-bold transition ${
                        view === "list"
                          ? "bg-white shadow-sm text-navy-900"
                          : "text-slate-500"
                      }`}
                    >
                      <List className="w-3.5 h-3.5" />
                      <span>لیست</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Hotels Grid/List */}
              {filteredHotels.length === 0 ? (
                <div className="py-20 text-center bg-white rounded-2xl">
                  <div className="text-6xl mb-4">🔍</div>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">
                    هتلی یافت نشد
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    لطفاً فیلترهای خود را تغییر دهید
                  </p>
                  <button
                    onClick={() => setFilters(initialFilters)}
                    className="px-5 py-2.5 rounded-xl bg-brand-500 text-white font-bold text-sm hover:bg-brand-600"
                  >
                    پاک کردن فیلترها
                  </button>
                </div>
              ) : view === "grid" ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {filteredHotels.map((hotel) => (
                    <HotelGridCard
                      key={hotel.id}
                      hotel={hotel}
                      showNeighborhood={true}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {filteredHotels.map((hotel) => (
                    <HotelListItem key={hotel.id} hotel={hotel} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <HotelsGuide />
      <HotelsFAQ />
      <HotelsCTA />
      <Footer />
    </main>
  );
}