import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, BookOpen, Clock } from "lucide-react";

const guides = [
  {
    id: "how-to-choose-hotel",
    title: "چگونه بهترین هتل را برای سفر خود انتخاب کنیم؟",
    excerpt: "راهنمای جامع انتخاب هتل بر اساس بودجه، موقعیت و نیازهای شما",
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=600&q=80",
    readTime: "۸ دقیقه",
    category: "راهنمای سفر",
  },
  {
    id: "istanbul-best-neighborhoods",
    title: "بهترین محله‌های استانبول برای اقامت",
    excerpt: "معرفی ۵ محله برتر استانبول برای توریست‌ها با مزایا و معایب هر کدام",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=600&q=80",
    readTime: "۶ دقیقه",
    category: "مقاصد",
  },
  {
    id: "4-vs-5-star",
    title: "تفاوت هتل‌های ۴ و ۵ ستاره",
    excerpt: "آیا هتل ۵ ستاره ارزش هزینه بیشتر را دارد؟ بررسی کامل امکانات و خدمات",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=600&q=80",
    readTime: "۵ دقیقه",
    category: "راهنما",
  },
];

export default function HotelsGuide() {
  return (
    <section className="py-12 md:py-16 bg-slate-50">
      <div className="container-brand px-4">
        {/* Header */}
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              راهنمای انتخاب هتل
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-navy-900 mb-2">
              قبل از رزرو بخوانید
            </h2>
            <p className="text-sm md:text-base text-slate-500">
              مقالات تخصصی برای انتخاب بهتر هتل
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors"
          >
            <span>همه مقالات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {guides.map((guide) => (
            <Link
              key={guide.id}
              href={`/blog/${guide.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold text-brand-600">
                  {guide.category}
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-sm md:text-base font-bold text-navy-900 mb-2 line-clamp-2 leading-relaxed group-hover:text-brand-600 transition-colors">
                  {guide.title}
                </h3>
                <p className="text-xs text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                  {guide.excerpt}
                </p>
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{guide.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs font-bold text-brand-600 group-hover:gap-2 transition-all">
                    <span>ادامه</span>
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
            href="/blog"
            className="flex items-center gap-2 text-sm font-bold text-brand-600"
          >
            <span>همه مقالات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}