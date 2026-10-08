import Image from "next/image";
import { Header } from "@/components/layout/header";
import { TravelEngine } from "@/components/search/travel-engine";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white">
      <Header />

      {/* ===== هیرو ===== */}
      <section className="relative overflow-hidden">
        {/* پترن خطوط fallback (اگر تصویر نبود) */}
        <div
          className="absolute inset-0 bg-[linear-gradient(90deg,rgba(16,20,51,0.06)_1px,transparent_1px)] bg-[size:64px_100%]"
          aria-hidden
        />

        {/* تصویر بک‌گراند هیرو */}
        <Image
          src="/images/hero/hero-bg.png"
          alt=""
          fill
          priority
          quality={90}
          sizes="100vw"
          className="object-cover"
        />

        {/* لایه readability */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-white/75 via-white/45 to-white"
          aria-hidden
        />

        <div className="container-brand relative pb-16 pt-14 lg:pb-24 lg:pt-20">
          {/* تیتر */}
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/80 px-4 py-1.5 text-[11px] font-black text-navy-700 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
              رزرو آنلاین پروازهای داخلی و خارجی
            </span>

            <h1 className="mt-5 text-3xl font-black leading-[1.45] text-navy-950 md:text-4xl lg:text-5xl lg:leading-[1.4]">
              پرواز بعدی‌تان را در چند ثانیه پیدا کنید
            </h1>

            <p className="mt-4 text-base leading-8 text-muted lg:text-lg lg:leading-9">
              مقایسه قیمت صدها پرواز از ایرلاین‌های معتبر، با صدور آنی،
              استرداد آسان و پشتیبانی ۲۴ ساعته
            </p>
          </div>

          {/* فرم جستجو */}
          <div className="relative z-10 mt-10 lg:mt-14">
            <TravelEngine />
          </div>
        </div>
      </section>
    </main>
  );
}