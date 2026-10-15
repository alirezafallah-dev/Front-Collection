"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    q: "آیا ترانسفر فرودگاهی توسط هتل ارائه می‌شود؟",
    a: "بله، اکثر هتل‌های معرفی شده سرویس ترانسفر فرودگاهی دارند. در صورت درخواست، تیم طوفان پرشین نیز می‌تواند ترانسفر VIP با قیمت مناسب برای شما هماهنگ کند.",
  },
  {
    q: "ساعت check-in و check-out هتل‌ها چه زمانی است؟",
    a: "معمولاً check-in از ساعت ۱۴:۰۰ و check-out تا ساعت ۱۲:۰۰ انجام می‌شود. البته در صورت نیاز به check-in زودتر یا check-out دیرتر، می‌توانید با هماهنگی قبلی درخواست دهید.",
  },
  {
    q: "آیا هتل‌ها صبحانه ارائه می‌دهند؟",
    a: "بله، همه هتل‌های ۵ ستاره لیست ما صبحانه بوفه بین‌المللی را ارائه می‌دهند. بسیاری از هتل‌ها نیز رستوران‌های متنوع با غذاهای محلی و بین‌المللی دارند.",
  },
  {
    q: "کدام هتل‌ها برای خانواده‌ها مناسب‌تر هستند؟",
    a: "هتل‌هایی مانند Centara Grand Mirage پاتایا با پارک آبی و باشگاه کودکان، و همچنین CVK Park Bosphorus استانبول با اتاق‌های خانوادگی بزرگ، گزینه‌های عالی برای سفرهای خانوادگی هستند.",
  },
  {
    q: "آیا امکان لغو یا تغییر رزرو وجود دارد؟",
    a: "بله، بسته به سیاست هر هتل، امکان لغو یا تغییر رزرو وجود دارد. شرایط دقیق در هنگام رزرو به اطلاع شما می‌رسد و تیم پشتیبانی ما در تمام مراحل همراه شما خواهد بود.",
  },
  {
    q: "آیا هتل‌ها نزدیک به جاذبه‌های گردشگری هستند؟",
    a: "تمام هتل‌های ما در موقعیت‌های استراتژیک و نزدیک به مهم‌ترین جاذبه‌های گردشگری قرار دارند. در صفحه هر هتل، فاصله تا جاذبه‌های اصلی ذکر شده است.",
  },
];

export default function HotelsFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container-brand px-4">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold mb-3">
              <HelpCircle className="w-3.5 h-3.5" />
              سوالات متداول
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-navy-900 mb-2">
              پاسخ به سوالات شما
            </h2>
            <p className="text-sm md:text-base text-slate-500">
              رایج‌ترین سوالات درباره رزرو هتل
            </p>
          </div>

          {/* FAQ List */}
          <div className="space-y-3">
            {faqs.map((faq, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={cn(
                    "rounded-2xl border transition-all duration-300",
                    isOpen
                      ? "border-brand-500 bg-brand-50/30"
                      : "border-slate-200 bg-white hover:border-slate-300"
                  )}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between p-5 text-right"
                  >
                    <div className="flex items-start gap-3 flex-1">
                      <div
                        className={cn(
                          "w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 transition-colors",
                          isOpen
                            ? "bg-brand-500 text-white"
                            : "bg-slate-100 text-slate-600"
                        )}
                      >
                        <span className="text-sm font-black">{i + 1}</span>
                      </div>
                      <h3
                        className={cn(
                          "text-sm md:text-base font-bold leading-relaxed transition-colors",
                          isOpen ? "text-brand-600" : "text-navy-900"
                        )}
                      >
                        {faq.q}
                      </h3>
                    </div>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-300",
                        isOpen && "rotate-180 text-brand-500"
                      )}
                    />
                  </button>

                  <div
                    className={cn(
                      "overflow-hidden transition-all duration-300",
                      isOpen ? "max-h-96" : "max-h-0"
                    )}
                  >
                    <div className="px-5 pb-5 pr-16">
                      <p className="text-sm text-slate-600 leading-loose">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500 mb-3">
              سوال دیگه‌ای دارید؟
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-navy-900 text-white font-bold text-sm hover:bg-navy-800 transition-colors"
            >
              <HelpCircle className="w-4 h-4" />
              <span>تماس با پشتیبانی</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}