import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Plane, Hotel, Calendar, Percent } from "lucide-react";

const tours = [
  {
    id: "russia-moscow-7d",
    title: "تور ۷ روزه مسکو و سن‌پترزبورگ",
    destination: "روسیه",
    destinationFlag: "🇷🇺",
    duration: "۷ روز",
    hotel: "هتل ۴ ستاره",
    flightType: "پرواز چارتر ماهان",
    flightIcon: "mahani", // ویژه
    oldPrice: "۳۲,۰۰۰,۰۰۰",
    newPrice: "۲۹,۰۰۰,۰۰۰",
    discount: "25%",
    image: "https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=800&q=80",
    tags: ["پیشنهاد ویژه", "چارتر"],
  },
  {
    id: "russia-stpet-5d",
    title: "تور ۵ روزه سن‌پترزبورگ",
    destination: "روسیه",
    destinationFlag: "🇷🇺",
    duration: "۵ روز",
    hotel: "هتل ۴ ستاره",
    flightType: "پرواز مستقیم",
    flightIcon: "normal",
    oldPrice: "۲۸,۰۰۰,۰۰۰",
    newPrice: "۲۴,۵۰۰,۰۰۰",
    discount: "12%",
    image: "https://images.unsplash.com/photo-1556176357-a009bc965813?w=800&q=80",
    tags: ["جديد"],
  },
  {
    id: "thailand-bangkok-5d",
    title: "تور ۵ روزه بانکوک",
    destination: "تایلند",
    destinationFlag: "🇹🇭",
    duration: "۵ روز",
    hotel: "هتل ۵ ستاره",
    flightType: "پرواز چارتر ماهان",
    flightIcon: "mahani",
    oldPrice: "۳۰,۰۰۰,۰۰۰",
    newPrice: "۲۵,۰۰۰,۰۰۰",
    discount: "17%",
    image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=80",
    tags: ["پیشنهاد ویژه"],
  },
  {
    id: "thailand-phuket-6d",
    title: "تور ۶ روزه پوکت",
    destination: "تایلند",
    destinationFlag: "🇹🇭",
    duration: "۶ روز",
    hotel: "هتل ساحلی ۵ ستاره",
    flightType: "پرواز چارتر ماهان",
    flightIcon: "mahani",
    oldPrice: "۳۵,۰۰۰,۰۰۰",
    newPrice: "۲۸,۰۰۰,۰۰۰",
    discount: "20%",
    image: "https://images.unsplash.com/photo-1589394815804-963808570129?w=800&q=80",
    tags: ["فروش ویژه", "چارتر"],
  },
  {
    id: "istanbul-4d",
    title: "تور ۴ روزه استانبول",
    destination: "استانبول",
    destinationFlag: "🇹🇷",
    duration: "۴ روز",
    hotel: "هتل ۴ ستاره",
    flightType: "پرواز ترکیش",
    flightIcon: "normal",
    oldPrice: "۲۲,۰۰۰,۰۰۰",
    newPrice: "۱۸,۰۰۰,۰۰۰",
    discount: "18%",
    image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&q=80",
    tags: ["پرطرفدار"],
  },
  {
    id: "istanbul-cappadocia-5d",
    title: "تور ۵ روزه استانبول + کاپادوکیا",
    destination: "ترکیه",
    destinationFlag: "🇹🇷",
    duration: "۵ روز",
    hotel: "هتل ۴ ستاره",
    flightType: "پرواز چارتر ماهان",
    flightIcon: "mahani",
    oldPrice: "۲۸,۰۰۰,۰۰۰",
    newPrice: "۲۳,۰۰۰,۰۰۰",
    discount: "18%",
    image: "https://images.unsplash.com/photo-1641128324972-af32127e9c47?w=800&q=80",
    tags: ["چارتر"],
  },
];

export default function FeaturedToursSection() {
  return (
    <section className="w-full bg-slate-50 py-12 md:py-20">
      <div className="container-brand px-4">
        {/* Header */}
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold mb-3">
              <Percent className="w-3.5 h-3.5" />
              تورهای ویژه
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-navy-900 mb-2">
              تورهای پرطرفدار با تخفیف
            </h2>
            <p className="text-sm md:text-base text-slate-500">
              بهترین تورهای روسیه، تایلند و استانبول با قیمت استثنایی
            </p>
          </div>
          <Link
            href="/tours"
            className="hidden md:flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors"
          >
            <span>مشاهده همه تورها</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Tours Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {tours.map((tour) => (
            <Link
              key={tour.id}
              href={`/tours/${tour.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <Image
                  src={tour.image}
                  alt={tour.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Discount Badge */}
                <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-black px-3 py-1.5 rounded-full shadow-lg">
                  {tour.discount} تخفیف
                </div>

                {/* Charter Badge */}
                {tour.flightIcon === "mahani" && (
                  <div className="absolute top-3 left-3 bg-navy-900 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg flex items-center gap-1">
                    <Plane className="w-3 h-3" />
                    <span>چارتر ماهان</span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 md:p-5">
                {/* Title + Flag */}
                <div className="flex items-start gap-2 mb-3">
                  <span className="text-xl flex-shrink-0">{tour.destinationFlag}</span>
                  <h3 className="text-sm md:text-base font-bold text-navy-900 line-clamp-2 leading-relaxed">
                    {tour.title}
                  </h3>
                </div>

                {/* Features */}
                <div className="flex flex-col gap-1.5 mb-4">
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Calendar className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Hotel className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                    <span>{tour.hotel}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-600">
                    <Plane className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                    <span>{tour.flightType}</span>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {tour.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] font-bold px-2 py-1 rounded-md bg-brand-50 text-brand-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Price + CTA */}
                <div className="flex items-end justify-between pt-3 border-t border-slate-100">
                  <div>
                    <div className="text-xs text-slate-400 line-through mb-0.5">
                      {tour.oldPrice} تومان
                    </div>
                    <div className="text-base md:text-lg font-black text-brand-600">
                      {tour.newPrice} <span className="text-[10px] font-bold">تومان</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-brand-600 group-hover:gap-2 transition-all">
                    <span>رزرو</span>
                    <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 flex justify-center md:hidden">
          <Link
            href="/tours"
            className="flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors"
          >
            <span>مشاهده همه تورها</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}