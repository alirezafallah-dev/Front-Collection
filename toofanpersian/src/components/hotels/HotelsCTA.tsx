import { Phone, MessageCircle, Headphones, Clock } from "lucide-react";

export default function HotelsCTA() {
  return (
    <section className="py-12 md:py-16 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 relative overflow-hidden">
      {/* Decorative Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="container-brand px-4 relative">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            {/* Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/20 border border-brand-500/30 text-brand-400 text-xs font-bold mb-4">
                <Headphones className="w-3.5 h-3.5" />
                <span>پشتیبانی ۲۴ ساعته</span>
              </div>

              <h2 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight">
                به کمک نیاز دارید؟
              </h2>
              <p className="text-sm md:text-base text-white/80 leading-relaxed mb-6">
                کارشناسان متخصص ما آماده راهنمایی شما برای انتخاب بهترین هتل بر اساس بودجه و نیازهای سفر شما هستند.
              </p>

              <div className="flex items-center gap-2 text-xs text-white/60">
                <Clock className="w-4 h-4" />
                <span>پاسخگویی همه روزه از ساعت ۹ صبح تا ۹ شب</span>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-3">
              <a
                href="tel:02191000000"
                className="group flex items-center gap-4 p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-brand-500/50 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-brand-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-white/60 mb-1">
                    تماس تلفنی
                  </div>
                  <div
                    className="text-lg md:text-xl font-black text-white"
                    dir="ltr"
                  >
                    ۰۲۱-۹۱۰۰۰۰۰۰
                  </div>
                </div>
              </a>

              <a
                href="https://wa.me/989120000000"
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-green-500/50 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-green-500 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <div className="text-xs text-white/60 mb-1">
                    چت واتساپ
                  </div>
                  <div className="text-lg md:text-xl font-black text-white">
                    مشاوره آنلاین
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}