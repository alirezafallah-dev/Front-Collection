"use client";

import Image from "next/image";
import {
  Shield,
  Clock,
  CreditCard,
  BadgeCheck,
  Plane,
  Users,
  Award,
  Headphones,
} from "lucide-react";

// لیست ایرلاین‌های همکار
const AIRLINES = [
  { name: "ایران ایر", logo: "/images/logos/iranair.png" },
  { name: "ماهان", logo: "/images/logos/mahan.png" },
  { name: "قطر", logo: "/images/logos/qatar.png" },
  { name: "امارات", logo: "/images/logos/emirates.png" },
  { name: "ترکیش", logo: "/images/logos/turkish.png" },
  { name: "گلف ایر", logo: "/images/logos/gulfair.png" },
  { name: "فلای دبی", logo: "/images/logos/flydubai.png" },
  { name: "قشم", logo: "/images/logos/qeshm.png" },
  { name: "زاگرس", logo: "/images/logos/zagros.png" },
  { name: "ایران ایرتور", logo: "/images/logos/iranaseaman.png" },
];

// آمار کلیدی
const STATS = [
  {
    icon: Award,
    value: "+۱۰",
    label: "سال تجربه",
    color: "text-blue-600",
    bg: "bg-blue-50",
  },
  {
    icon: Users,
    value: "+۵۰۰ هزار",
    label: "مسافر راضی",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
  },
  {
    icon: Plane,
    value: "+۱۵۰",
    label: "ایرلاین همکار",
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
  {
    icon: Headphones,
    value: "۲۴/۷",
    label: "پشتیبانی آنلاین",
    color: "text-rose-600",
    bg: "bg-rose-50",
  },
];

// ویژگی‌های اعتماد
const FEATURES = [
  {
    icon: Shield,
    title: "ضمانت بازگشت وجه",
    description: "در صورت لغو پرواز، وجه شما کامل بازگردانده می‌شود",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: CreditCard,
    title: "پرداخت امن",
    description: "درگاه‌های بانکی معتبر و رمزگذاری SSL",
    gradient: "from-emerald-500 to-teal-500",
  },
  {
    icon: Clock,
    title: "صدور آنی بلیت",
    description: "بلیت شما در کمتر از ۱ دقیقه صادر می‌شود",
    gradient: "from-amber-500 to-orange-500",
  },
  {
    icon: BadgeCheck,
    title: "دارای مجوز رسمی",
    description: "دارای مجوز سازمان هواپیمایی کشوری و اینماد",
    gradient: "from-rose-500 to-pink-500",
  },
];

// نمادهای اعتماد
const TRUST_BADGES = [
  {
    name: "ای‌نماد",
    description: "نماد اعتماد الکترونیکی",
    icon: "🛡️",
  },
  {
    name: "ساماندهی",
    description: "ثبت در ساماندهی",
    icon: "✅",
  },
  {
    name: "اتحادیه",
    description: "عضو اتحادیه آژانس‌ها",
    icon: "🏛️",
  },
  {
    name: "ISO 9001",
    description: "گواهی کیفیت",
    icon: "🏆",
  },
];

export default function TrustSection() {
  return (
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container-brand mx-auto max-w-7xl px-4">
        
        {/* ─── 1. Stats Banner ─── */}
        <div className="mb-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {STATS.map((stat, i) => (
              <div
                key={i}
                className="relative group text-center p-6 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-lg transition-all duration-300"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${stat.bg} ${stat.color} mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className="w-7 h-7" />
                </div>
                <div className="text-3xl md:text-4xl font-black text-navy-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-500 font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ─── 2. Features Grid ─── */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold mb-3">
              <Shield className="w-3.5 h-3.5" />
              چرا طوفان پرشین؟
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-navy-900">
              دلایل اعتماد هزاران مسافر
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {FEATURES.map((feature, i) => (
              <div
                key={i}
                className="group relative p-6 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Gradient Decoration */}
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10 group-hover:scale-125 transition-all duration-500`} />
                
                <div className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-4 shadow-lg`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="relative text-base font-bold text-navy-900 mb-2">
                  {feature.title}
                </h3>
                <p className="relative text-sm text-slate-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ─── 3. Airlines Marquee ─── */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 text-slate-600 text-xs font-bold mb-3">
              <Plane className="w-3.5 h-3.5" />
              ایرلاین‌های همکار
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-navy-900">
              همراه با معتبرترین ایرلاین‌های جهان
            </h2>
            <p className="text-sm text-slate-500 mt-2">
              با خیال راحت از بین بیش از ۱۵۰ ایرلاین داخلی و خارجی انتخاب کنید
            </p>
          </div>

          <div className="relative overflow-hidden">
            {/* Gradient masks */}
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

            {/* Marquee */}
            <div className="flex gap-8 animate-marquee">
              {[...AIRLINES, ...AIRLINES].map((airline, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center justify-center w-40 h-20 px-6 rounded-xl border border-slate-100 bg-white hover:border-brand-200 hover:shadow-md transition-all group"
                >
                  <Image
                    src={airline.logo}
                    alt={airline.name}
                    width={120}
                    height={60}
                    className="max-w-full max-h-full object-contain grayscale group-hover:grayscale-0 transition-all"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── 4. Trust Badges ─── */}
        <div>
          <div className="p-8 rounded-3xl bg-gradient-to-br from-slate-50 to-white border border-slate-100">
            <div className="text-center mb-6">
              <h3 className="text-lg font-bold text-navy-900">
                مجوزها و گواهینامه‌ها
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                تمامی مجوزهای لازم برای فعالیت قانونی و امن
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {TRUST_BADGES.map((badge, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center p-4 rounded-xl bg-white border border-slate-100 hover:border-brand-200 hover:shadow-md transition-all cursor-pointer group"
                >
                  <div className="text-4xl mb-2 group-hover:scale-110 transition-transform">
                    {badge.icon}
                  </div>
                  <div className="text-sm font-bold text-navy-900 text-center">
                    {badge.name}
                  </div>
                  <div className="text-[11px] text-slate-400 text-center mt-0.5">
                    {badge.description}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}