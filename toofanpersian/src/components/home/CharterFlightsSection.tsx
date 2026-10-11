import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Plane, Clock, Calendar, Check, Shield, Sparkles } from "lucide-react";

const charterFlights = [
  {
    id: "tehran-moscow",
    origin: "تهران",
    originCode: "IKA",
    destination: "مسکو",
    destinationCode: "SVO",
    destinationFlag: "🇷🇺",
    duration: "۴ ساعت",
    frequency: "همه روزه",
    price: "۱۲,۵۰۰,۰۰۰",
    oldPrice: "۱۵,۰۰۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=800&q=80",
  },
  {
    id: "tehran-bangkok",
    origin: "تهران",
    originCode: "IKA",
    destination: "بانکوک",
    destinationCode: "BKK",
    destinationFlag: "🇹🇭",
    duration: "۷ ساعت",
    frequency: "۴ پرواز در هفته",
    price: "۱۵,۸۰۰,۰۰۰",
    oldPrice: "۱۸,۵۰۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1563492065599-3520f775eeed?w=800&q=80",
  },
  {
    id: "tehran-istanbul",
    origin: "تهران",
    originCode: "IKA",
    destination: "استانبول",
    destinationCode: "IST",
    destinationFlag: "🇹🇷",
    duration: "۳ ساعت",
    frequency: "همه روزه",
    price: "۸,۹۰۰,۰۰۰",
    oldPrice: "۱۱,۰۰۰,۰۰۰",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
  },
];

const benefits = [
  { icon: Shield, text: "ضمانت کمترین قیمت" },
  { icon: Check, text: "صدور فوری بلیت" },
  { icon: Sparkles, text: "خدمات VIP" },
];

export default function CharterFlightsSection() {
  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="container-brand px-4">
        {/* Hero Banner - برندینگ ماهان */}
        <div className="relative mb-8 md:mb-12 overflow-hidden rounded-3xl bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
              backgroundSize: "32px 32px",
            }} />
          </div>

          {/* Decorative Plane */}
          <div className="absolute -top-10 -right-10 w-64 h-64 opacity-20">
            <Plane className="w-full h-full text-white rotate-[-30deg]" strokeWidth={0.5} />
          </div>

          {/* Content */}
          <div className="relative p-6 md:p-10">
            {/* Charter Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500 text-white text-xs font-black mb-4 shadow-lg shadow-brand-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>چارتر اختصاصی طوفان پرشین</span>
            </div>

            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
              <div className="text-white">
                <h2 className="text-2xl md:text-4xl font-black mb-2 flex items-center gap-3 flex-wrap">
                  <span>پروازهای چارتر</span>
                  <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-red-600 text-white text-sm md:text-base shadow-lg">
                    <Plane className="w-4 h-4" />
                    <span>ماهان</span>
                  </span>
                </h2>
                <p className="text-sm md:text-base text-white/80 mb-4 max-w-xl">
                  با چارتر اختصاصی ماهان، با بهترین قیمت و بالاترین کیفیت به مقاصد رویایی خود سفر کنید
                </p>

                {/* Benefits */}
                <div className="flex flex-wrap gap-3">
                  {benefits.map((benefit, i) => (
                    <div key={i} className="flex items-center gap-1.5 text-xs md:text-sm font-bold text-white/90">
                      <benefit.icon className="w-4 h-4 text-brand-400" />
                      <span>{benefit.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              <Link
                href="/flights/charter"
                className="hidden md:flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 text-white font-bold hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/30"
              >
                <span>مشاهده همه پروازها</span>
                <ArrowLeft className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>

        {/* Flights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {charterFlights.map((flight) => (
            <Link
              key={flight.id}
              href={`/flights/${flight.id}`}
              className="group relative bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image Background */}
              <div className="relative h-32 md:h-40 overflow-hidden">
                <Image
                  src={flight.image}
                  alt={`پرواز ${flight.origin} به ${flight.destination}`}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />

                {/* Charter Badge */}
                <div className="absolute top-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-black shadow-lg">
                  <Plane className="w-3 h-3" />
                  <span>چارتر ماهان</span>
                </div>

                {/* Destination Flag + Name */}
                <div className="absolute bottom-3 left-4 text-white">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{flight.destinationFlag}</span>
                    <span className="text-lg font-black">{flight.destination}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-5">
                {/* Route */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex-1">
                    <div className="text-[10px] text-slate-400 font-medium mb-0.5">از</div>
                    <div className="text-sm font-black text-navy-900">
                      {flight.origin} <span className="text-xs text-slate-400">({flight.originCode})</span>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <div className="h-px w-6 bg-slate-300" />
                    <Plane className="w-4 h-4 text-brand-500 -rotate-45" />
                    <div className="h-px w-6 bg-slate-300" />
                  </div>

                  <div className="flex-1 text-left">
                    <div className="text-[10px] text-slate-400 font-medium mb-0.5">به</div>
                    <div className="text-sm font-black text-navy-900">
                      {flight.destination} <span className="text-xs text-slate-400">({flight.destinationCode})</span>
                    </div>
                  </div>
                </div>

                {/* Details */}
                <div className="flex items-center gap-3 mb-4 text-xs text-slate-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-brand-500" />
                    <span>{flight.duration}</span>
                  </div>
                  <div className="w-px h-3 bg-slate-200" />
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-brand-500" />
                    <span>{flight.frequency}</span>
                  </div>
                </div>

                {/* Price + CTA */}
                <div className="flex items-end justify-between pt-3 border-t border-slate-100">
                  <div>
                    <div className="text-[10px] text-slate-400 mb-0.5">قیمت از</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-xs text-slate-400 line-through">
                        {flight.oldPrice}
                      </span>
                      <span className="text-base md:text-lg font-black text-brand-600">
                        {flight.price}
                      </span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-medium">تومان</div>
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
            href="/flights/charter"
            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-500 text-white font-bold text-sm hover:bg-brand-600 transition-all shadow-lg shadow-brand-500/30"
          >
            <span>مشاهده همه پروازهای چارتر</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}