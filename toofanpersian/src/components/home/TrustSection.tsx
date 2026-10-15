"use client";

import { Shield, Clock, CreditCard, BadgeCheck } from "lucide-react";

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

const TRUST_BADGES = [
  { name: "ای‌نماد", description: "نماد اعتماد الکترونیکی", icon: "🛡️" },
  { name: "ساماندهی", description: "ثبت در ساماندهی", icon: "✅" },
  { name: "اتحادیه", description: "عضو اتحادیه آژانس‌ها", icon: "🏛️" },
  { name: "ISO 9001", description: "گواهی کیفیت", icon: "🏆" },
];

export default function TrustSection() {
  return (
    <section className="w-full bg-white py-8 md:py-16 lg:py-24">
      <div className="container-brand mx-auto max-w-7xl px-4">
        {/* ─── Features Grid - دلایل اعتماد ─── */}
        <div className="mb-8 md:mb-12 lg:mb-16">
          {/* Header */}
          <div className="text-center mb-6 md:mb-8 lg:mb-10">
            <div className="inline-flex items-center gap-2 px-3 md:px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 text-[10px] md:text-xs font-bold mb-2 md:mb-3">
              <Shield className="w-3 h-3 md:w-3.5 md:h-3.5" />
              چرا طوفان پرشین؟
            </div>
            <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-navy-900">
              دلایل اعتماد هزاران مسافر
            </h2>
          </div>

          {/* Grid - Responsive */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
            {FEATURES.map((feature, i) => (
              <div
                key={i}
                className="group relative p-4 md:p-5 lg:p-6 rounded-2xl bg-white border border-slate-100 hover:border-slate-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                {/* Gradient Decoration */}
                <div
                  className={`absolute -top-10 -right-10 w-24 h-24 md:w-28 md:h-28 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10 group-hover:scale-125 transition-all duration-500`}
                />

                {/* Icon */}
                <div
                  className={`relative inline-flex items-center justify-center w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-3 md:mb-4 shadow-lg`}
                >
                  <feature.icon className="w-5 h-5 md:w-5 md:h-5 lg:w-6 lg:h-6" />
                </div>

                {/* Title */}
                <h3 className="relative text-sm md:text-base font-bold text-navy-900 mb-1.5 md:mb-2">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="relative text-xs md:text-sm text-slate-500 leading-relaxed line-clamp-2">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}