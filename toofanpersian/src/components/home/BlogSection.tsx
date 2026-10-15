"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Calendar, Clock, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";

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
    author: "تیم تحریریه",
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
  },
];

export default function BlogSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 320;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="w-full bg-white py-8 md:py-20">
      <div className="container-brand px-4">
        {/* Header */}
        <div className="mb-6 md:mb-12 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 mb-2 md:mb-3">
              <div className="w-6 md:w-8 h-0.5 bg-brand-500" />
              <span className="text-[10px] md:text-xs font-bold text-brand-600 uppercase tracking-wider">
                مجله گردشگری
              </span>
            </div>
            <h2 className="text-xl md:text-3xl font-black text-navy-900 mb-1 md:mb-2">
              آخرین مقالات <span className="text-slate-400">و راهنماهای سفر</span>
            </h2>
            <p className="text-xs md:text-base text-slate-600">
              راهنماهای جامع سفر به روسیه، تایلند و ترکیه
            </p>
          </div>
          <Link
            href="/blog"
            className="hidden md:flex items-center gap-2 text-sm font-bold text-navy-900 hover:text-brand-600 transition-colors group"
          >
            <span>همه مقالات</span>
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Desktop: Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-5">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} variant="vertical" />
          ))}
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="lg:hidden relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto scroll-smooth snap-x snap-mandatory pb-4 -mx-4 px-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {articles.map((article) => (
              <div
                key={article.id}
                className="flex-shrink-0 w-[300px] snap-start"
              >
                <ArticleCard article={article} variant="horizontal" />
              </div>
            ))}
          </div>

          {/* Navigation Arrows (تبلت) */}
          <button
            onClick={() => scroll("right")}
            className="hidden sm:flex absolute left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center text-navy-900 hover:bg-brand-500 hover:text-white transition-all z-10"
            aria-label="بعدی"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll("left")}
            className="hidden sm:flex absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-lg items-center justify-center text-navy-900 hover:bg-brand-500 hover:text-white transition-all z-10"
            aria-label="قبلی"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile CTA */}
        <div className="mt-6 flex justify-center lg:hidden">
          <Link
            href="/blog"
            className="flex items-center gap-2 text-sm font-bold text-brand-600"
          >
            <span>مشاهده همه مقالات</span>
            <ArrowLeft className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

// ══════════════════════════════════════════════
// Article Card Component
// ══════════════════════════════════════════════
interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  categoryColor: string;
  publishDate: string;
  readTime: string;
  image: string;
  author: string;
}

function ArticleCard({
  article,
  variant,
}: {
  article: Article;
  variant: "vertical" | "horizontal";
}) {
  if (variant === "horizontal") {
    // Mobile: کارت افقی فشرده
    return (
      <Link
        href={`/blog/${article.id}`}
        className="group block bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-lg transition-all h-full"
      >
        <div className="flex h-full">
          {/* Image */}
          <div className="relative w-28 flex-shrink-0 overflow-hidden">
            <Image
              src={article.image}
              alt={article.title}
              fill
              sizes="112px"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
            {/* Category Badge */}
            <div
              className={`absolute top-2 right-2 ${article.categoryColor} text-white text-[9px] font-black px-2 py-1 rounded-md shadow`}
            >
              {article.category}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 p-3 flex flex-col justify-between">
            {/* Header */}
            <div>
              <h3 className="text-xs font-bold text-navy-900 line-clamp-2 leading-relaxed mb-2 group-hover:text-brand-600 transition-colors">
                {article.title}
              </h3>
              <p className="text-[10px] text-slate-500 line-clamp-2 leading-relaxed mb-2">
                {article.excerpt}
              </p>
            </div>

            {/* Meta Info */}
            <div className="flex items-center gap-3 text-[10px] text-slate-500 mb-2">
              <div className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                <span>{article.publishDate}</span>
              </div>
              <div className="w-px h-3 bg-slate-300" />
              <div className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                <span>{article.readTime}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-[10px] text-slate-400">{article.author}</span>
              <div className="flex items-center gap-1 text-[10px] font-bold text-brand-600 group-hover:gap-1.5 transition-all">
                <span>ادامه</span>
                <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    );
  }

  // Desktop: کارت عمودی
  return (
    <Link
      href={`/blog/${article.id}`}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.image}
          alt={article.title}
          fill
          sizes="33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Category Badge */}
        <div
          className={`absolute top-3 right-3 ${article.categoryColor} text-white text-[10px] font-black px-3 py-1.5 rounded-full shadow-lg`}
        >
          {article.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
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
        <div className="mt-auto flex items-center justify-between pt-3 border-t border-slate-100">
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
  );
}