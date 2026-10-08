import { Shield, Clock, Headphones, BadgeCheck, Wallet, Globe } from "lucide-react";

const FEATURES = [
  {
    icon: BadgeCheck,
    title: "صدور آنی بلیت",
    description: "بلیت شما بلافاصله پس از پرداخت موفق صادر و به ایمیل و موبایل شما ارسال می‌شود.",
    color: "brand",
  },
  {
    icon: Wallet,
    title: "تضمین بهترین قیمت",
    description: "با مقایسه صدها پرواز از ایرلاین‌های مختلف، بهترین قیمت را به شما ارائه می‌دهیم.",
    color: "navy",
  },
  {
    icon: Headphones,
    title: "پشتیبانی ۲۴ ساعته",
    description: "تیم پشتیبانی ما در تمام ساعات شبانه‌روز آماده پاسخگویی به سوالات شماست.",
    color: "brand",
  },
  {
    icon: Shield,
    title: "پرداخت امن",
    description: "پرداخت از طریق درگاه‌های معتبر بانکی با بالاترین سطح امنیت انجام می‌شود.",
    color: "navy",
  },
  {
    icon: Clock,
    title: "استرداد سریع",
    description: "در صورت لغو سفر، استرداد وجه شما در کمترین زمان ممکن انجام می‌شود.",
    color: "brand",
  },
  {
    icon: Globe,
    title: "پوشش جهانی",
    description: "دسترسی به پروازهای داخلی و خارجی به بیش از ۵۰۰ مقصد در سراسر جهان.",
    color: "navy",
  },
];

export function WhyChooseUs() {
  return (
    <section className="container-brand py-14">
      {/* Header */}
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-black text-navy-900 lg:text-3xl">
          چرا طوفان پرشین؟
        </h2>
        <p className="mt-2 text-muted">
          دلایلی که ما را به انتخاب اول مسافران تبدیل کرده است
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((feature, index) => {
          const Icon = feature.icon;
          const isBrand = feature.color === "brand";

          return (
            <div
              key={index}
              className="group rounded-2xl border border-line bg-white p-6 shadow-card transition hover:border-brand-200 hover:shadow-search"
            >
              {/* Icon */}
              <div
                className={`mb-4 inline-flex rounded-xl p-3 transition ${
                  isBrand
                    ? "bg-brand-50 text-brand-600 group-hover:bg-brand-500 group-hover:text-white"
                    : "bg-navy-50 text-navy-700 group-hover:bg-navy-700 group-hover:text-white"
                }`}
              >
                <Icon className="h-6 w-6" />
              </div>

              {/* Content */}
              <h3 className="mb-2 text-lg font-bold text-navy-900">
                {feature.title}
              </h3>
              <p className="text-sm leading-7 text-muted">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}