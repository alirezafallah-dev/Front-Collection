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
    <section className="w-full bg-white py-16 md:py-24">
      <div className="container-brand mx-auto max-w-7xl px-4">

        {/* Features Grid - دلایل اعتماد */}
        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold mb-3">
              <Shield className="w-3.5 h-3.5"/>
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
                <div className={`absolute -top-10 -right-10 w-32 h-32 rounded-full bg-gradient-to-br ${feature.gradient} opacity-5 group-hover:opacity-10 group-hover:scale-125 transition-all duration-500`}/>
                <div className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} text-white mb-4 shadow-lg`}>
                  <feature.icon className="w-6 h-6"/>
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

        {/* Trust Badges - مجوزها */}
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