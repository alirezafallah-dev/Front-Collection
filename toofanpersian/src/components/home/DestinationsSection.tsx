import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

const destinations = [
  {
    id: "russia",
    name: "روسیه",
    flag: "🇷🇺",
    cities: ["مسکو", "سن‌پترزبورگ"],
    price: "۲۹,۰۰۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1513326738677-b964603b136d?w=800&q=80",
    gradient: "from-red-600/80 to-red-900/90",
    href: "/destinations/russia",
  },
  {
    id: "thailand",
    name: "تایلند",
    flag: "🇹🇭",
    cities: ["بانکوک", "پاتایا", "پوکت"],
    price: "۲۵,۰۰۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1528181304800-259b08848526?w=800&q=80",
    gradient: "from-emerald-600/80 to-emerald-900/90",
    href: "/destinations/thailand",
  },
  {
    id: "istanbul",
    name: "استانبول",
    flag: "🇹🇷",
    cities: ["استانبول", "کاپادوکیا", "آنتالیا"],
    price: "۱۸,۰۰۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
    gradient: "from-blue-600/80 to-blue-900/90",
    href: "/destinations/istanbul",
  },
];

export default function DestinationsSection() {
  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="container-brand px-4">
        {/* Header */}
        <div className="mb-8 md:mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold mb-3">
            مقاصد تخصصی ما
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-navy-900 mb-2">
            مقاصد محبوب طوفان پرشین
          </h2>
          <p className="text-sm md:text-base text-slate-500">
            سفر به بهترین مقاصد با بهترین قیمت و خدمات
          </p>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {destinations.map((dest) => (
            <Link
              key={dest.id}
              href={dest.href}
              className="group relative overflow-hidden rounded-2xl bg-white border border-slate-100 hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Background */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <Image
                  src={dest.image}
                  alt={`تور ${dest.name}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-t ${dest.gradient}`} />

                {/* Content Overlay */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                  {/* Flag + Name */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-3xl drop-shadow-lg">{dest.flag}</span>
                    <h3 className="text-2xl md:text-3xl font-black drop-shadow-lg">
                      {dest.name}
                    </h3>
                  </div>

                  {/* Cities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {dest.cities.map((city, i) => (
                      <span
                        key={i}
                        className="text-xs font-medium bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full border border-white/30"
                      >
                        {city}
                      </span>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="flex items-end justify-between">
                    <div>
                      <div className="text-xs text-white/80 mb-1">شروع قیمت از</div>
                      <div className="text-lg md:text-xl font-black">
                        {dest.price} <span className="text-xs font-bold">تومان</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-sm font-bold bg-white/20 backdrop-blur-sm px-3 py-2 rounded-full group-hover:bg-white/30 transition-colors">
                      <span>مشاهده</span>
                      <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}