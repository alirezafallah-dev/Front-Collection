import Link from "next/link";
import { useRef } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { hotels } from "@/lib/data/hotels";
import HotelGridCard from "../hotels/HotelGridCard"; 

export default function HotelsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-slate-50 py-8 md:py-20">
      <div className="container-brand px-4">
        {/* Header */}
        <div className="mb-6 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 md:mb-3">
              <div className="w-6 md:w-8 h-0.5 bg-brand-500" />
              <span className="text-[10px] md:text-xs font-bold text-brand-600 uppercase tracking-wider">
                هتل‌های برتر
              </span>
            </div>
            <h2 className="text-xl md:text-3xl font-black text-navy-900 mb-1 md:mb-2">
              هتل‌های محبوب <span className="text-slate-400">و لوکس</span>
            </h2>
            <p className="text-xs md:text-base text-slate-600">
              اقامت در بهترین هتل‌های ۵ ستاره روسیه، تایلند و ترکیه
            </p>
          </div>
          <Link
            href="/hotels"
            className="hidden md:flex items-center gap-2 text-sm font-bold text-navy-900 hover:text-brand-600 transition-colors group"
          >
            <span>همه هتل‌ها</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-5">
          {hotels.slice(0, 6).map((hotel) => (
            <HotelGridCard 
              key={hotel.id} 
              hotel={hotel} 
              showNeighborhood={false} // 🆕 ساده‌تر در صفحه اصلی
            />
          ))}
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="lg:hidden relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {hotels.slice(0, 6).map((hotel) => (
              <div
                key={hotel.id}
                className="flex-shrink-0 w-[280px] snap-start"
              >
                <HotelGridCard 
                  hotel={hotel} 
                  showNeighborhood={false} // 🆕
                />
              </div>
            ))}
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={() => scroll("right")}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center text-navy-900 hover:bg-brand-500 hover:text-white transition-all z-10"
            aria-label="بعدی"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("left")}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center text-navy-900 hover:bg-brand-500 hover:text-white transition-all z-10"
            aria-label="قبلی"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 flex justify-center lg:hidden">
          <Link
            href="/hotels"
            className="flex items-center gap-2 text-sm font-bold text-brand-600"
          >
            <span>مشاهده همه هتل‌ها</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}