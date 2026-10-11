import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, BookOpen } from "lucide-react";

const articles = [
  {
    id: "moscow-travel-guide-2025",
    title: "راهنمای کامل سفر به مسکو ۲۰۲۵",
    excerpt: "همه چیز درباره جاذبه‌های گردشگری، هزینه‌ها، بهترین زمان سفر و نکات مهم برای سفر به پایتخت روسیه",
    category: "راهنمای سفر",
    categoryColor: "bg-blue-500",
    publishDate: "۱۵ آبان ۱۴۰۵",
    readTime: "۸ دقیقه",
    image: "https://images.unsplash.com/photo-1547448415-e9f5b28e570d?w=800&q=80",
    author: "تیم تحریریه طوفان پرشین",
    flag: "🇷🇺",
  },
  {
    id: "bangkok-street-food",
    title: "۱۰ غذای خیابانی که باید در بانکوک امتحان کنید",
    excerpt: "معرفی بهترین غذاهای خیابانی بانکوک از پد تای تا تام یام گونگ به همراه آدرس بهترین رستوران‌ها",
    category: "غذا و نوشیدنی",
    categoryColor: "bg-orange-500",
    publishDate: "۱۰ آبان ۱۴۰۵",
    readTime: "۶ دقیقه",
    image: "https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=800&q=80",
    author: "سارا احمدی",
    flag: "🇹🇭",
  },
  {
    id: "istanbul-bosphorus-tour",
    title: "گشت و گذار در بسفور: جادوی استانبول",
    excerpt: "راهنمای کامل تور کشتی در تنگه بسفور، دیدنی‌های دو قاره و بهترین زمان برای عکاسی",
    category: "جاذبه‌های گردشگری",
    categoryColor: "bg-emerald-500",
    publishDate: "۵ آبان ۱۴۰۵",
    readTime: "۷ دقیقه",
    image: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=800&q=80",
    author: "علی محمدی",
    flag: "🇹🇷",
  },
  {
    id: "st-petersburg-museums",
    title: "موزه‌های سن‌پترزبورگ: سفر در تاریخ",
    excerpt: "معرفی ۵ موزه برتر سن‌پترزبورگ از موزه آرمیتاژ تا موزه فابرژه با راهنمای بازدید",
    category: "فرهنگ و هنر",
    categoryColor: "bg-purple-500",
    publishDate: "۱ آبان ۱۴۰۵",
    readTime: "۱۰ دقیقه",
    image: "https://images.unsplash.com/photo-1556176357-a009bc965813?w=800&q=80",
    author: "فاطمه رضایی",
    flag: "🇷🇺",
  },
  {
    id: "phuket-island-hopping",
    title: "جزیره‌گردی در پوکت: ۷ جزیره رویایی",
    excerpt: "معرفی بهترین جزایر اطراف پوکت برای قایق‌سواری، غواصی و استراحت در سواحل بکر",
    category: "ماجراجویی",
    categoryColor: "bg-cyan-500",
    publishDate: "۲۸ مهر ۱۴۰۵",
    readTime: "۹ دقیقه",
    image: "https://images.unsplash.com/photo-1589394815804-963808570129?w=800&q=80",
    author: "رضا کریمی",
    flag: "🇹🇭",
  },
  {
    id: "cappadocia-balloon-tour",
    title: "تور بالن سواری در کاپادوکیا: تجربه‌ای فراموش‌نشدنی",
    excerpt: "همه چیز درباره بالن سواری در کاپادوکیا از رزرو تا بهترین زمان و نکات ایمنی",
    category: "ماجراجویی",
    categoryColor: "bg-cyan-500",
    publishDate: "۲۰ مهر ۱۴۰۵",
    readTime: "۵ دقیقه",
    image: "https://images.unsplash.com/photo-1641128324972-af32127e9c47?w=800&q=80",
    author: "مریم حسینی",
    flag: "🇹🇷",
  },
];

export default function BlogSection() {
  return (
    <section className="w-full bg-white py-12 md:py-20">
      <div className="container-brand px-4">
        {/* Header */}
        <div className="mb-8 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-50 text-brand-600 text-xs font-bold mb-3">
              <BookOpen className="w-3.5 h-3.5" />
              مجله گردشگری
            </div>
            <h2 className="text-2xl md:text-3xl font-black text-navy-900 mb-2">
              آخرین مقالات و راهنماهای سفر
            </h2>
            <p className="text-sm md:text-base text-slate-500">
              راهنماهای جامع سفر به روسیه، تایلند و ترکیه
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors"
          >
            <span>مشاهده همه مقالات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/blog/${article.id}`}
              className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-48 md:h-56 overflow-hidden">
                <Image
                  src={article.image}
                  alt={article.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />

                {/* Category Badge */}
                <div className={`absolute top-3 right-3 ${article.categoryColor} text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg`}>
                  {article.category}
                </div>

                {/* Flag */}
                <div className="absolute bottom-3 right-3 text-2xl drop-shadow-lg">
                  {article.flag}
                </div>
              </div>

              {/* Content */}
              <div className="p-4 md:p-5">
                {/* Title */}
                <h3 className="text-sm md:text-base font-bold text-navy-900 mb-2 line-clamp-2 leading-relaxed group-hover:text-brand-600 transition-colors">
                  {article.title}
                </h3>

                {/* Excerpt */}
                <p className="text-xs md:text-sm text-slate-600 mb-4 line-clamp-2 leading-relaxed">
                  {article.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{article.publishDate}</span>
                  </div>
                  <div className="w-px h-3 bg-slate-300" />
                  <div className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{article.readTime}</span>
                  </div>
                </div>

                {/* Author + CTA */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div className="text-xs text-slate-500">
                    <span className="font-medium">{article.author}</span>
                  </div>

                  <div className="flex items-center gap-1 text-xs font-bold text-brand-600 group-hover:gap-2 transition-all">
                    <span>ادامه مطلب</span>
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
            className="flex items-center gap-2 text-sm font-bold text-brand-600 hover:text-brand-700 transition-colors"
          >
            <span>مشاهده همه مقالات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}