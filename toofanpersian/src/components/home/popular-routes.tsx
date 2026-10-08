import Link from "next/link";
import { ArrowLeft, Clock, Plane } from "lucide-react";
import { POPULAR_ROUTES } from "@/lib/mock/popular-routes";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";

export function PopularRoutes() {
  return (
    <section className="container-brand py-14">
      {/* Header */}
      <div className="mb-8 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-black text-navy-900 lg:text-3xl">
            مسیرهای محبوب پروازی
          </h2>
          <p className="mt-2 text-muted">
            پرجستجوترین مسیرهای پروازی از سراسر ایران با بهترین قیمت
          </p>
        </div>
        <Link
          href="/flights"
          className="hidden items-center gap-2 text-sm font-bold text-navy-700 transition hover:text-brand-500 md:flex"
        >
          مشاهده همه مسیرها
          <ArrowLeft className="h-4 w-4" />
        </Link>
      </div>

      {/* Routes Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {POPULAR_ROUTES.map((route) => (
          <Link
            key={route.id}
            href={`/flights?from=${route.originCode}&to=${route.destinationCode}`}
            className="group relative overflow-hidden rounded-2xl bg-white shadow-card transition hover:shadow-search"
          >
            {/* Image */}
            <div className="relative h-56 overflow-hidden">
              <Image
                src={route.image}
                alt={`پرواز ${route.origin} به ${route.destination}`}
                fill
                className="object-cover transition duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/90 via-navy-900/40 to-transparent" />

              {/* Tag */}
              {route.tag && (
                <span className="absolute right-4 top-4 rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white shadow-chip">
                  {route.tag}
                </span>
              )}

              {/* Route Info Overlay */}
              <div className="absolute bottom-4 right-4 left-4">
                <div className="flex items-center gap-2 text-white">
                  <span className="font-bold">{route.origin}</span>
                  <Plane className="h-4 w-4" />
                  <span className="font-bold">{route.destination}</span>
                </div>
              </div>
            </div>

            {/* Card Content */}
            <div className="p-5">
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-muted">
                  <Clock className="h-4 w-4" />
                  <span>{route.duration}</span>
                </div>
                <div className="rounded-lg bg-sky-tint px-3 py-1.5 text-xs font-bold text-navy-700">
                  پرواز مستقیم
                </div>
              </div>

              <div className="flex items-end justify-between">
                <div>
                  <span className="block text-xs text-muted">قیمت از</span>
                  <span className="block text-2xl font-black text-brand-600">
                    {formatPrice(route.price)}
                  </span>
                  <span className="text-xs text-muted">تومان</span>
                </div>
                <button className="flex items-center gap-1 rounded-lg bg-navy-700 px-4 py-2 text-sm font-bold text-white transition group-hover:bg-brand-500">
                  جستجو
                  <ArrowLeft className="h-4 w-4" />
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}