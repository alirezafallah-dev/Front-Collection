import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Stamp, Clock, FileText } from "lucide-react";
import visasData from "@/data/mock/visas.json";
import { faDigits } from "@/lib/api/hotels";

export const metadata: Metadata = {
  title: "ویزای کشورهای مختلف | سفر بعدی",
  description: "اطلاعات کامل ویزا، مدارک مورد نیاز و شرایط اخذ ویزا",
};

// ساختار پست ویزا (فرمت WordPress)
interface VisaPost {
  id: number;
  slug: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  date: string;
  _embedded?: {
    "wp:featuredmedia"?: { source_url: string; media_type: string }[];
    "wp:term"?: { name: string; taxonomy: string }[][];
  };
  visa_info?: {
    processing_time?: string;
    validity?: string;
    [key: string]: unknown;
  };
}

// حذف تگ‌های HTML از عنوان
const stripHtml = (html: string) => html.replace(/<[^>]*>/g, "").trim();

export default function VisasPage() {
  const visas = visasData as VisaPost[];

  return (
    <div className="ns-container py-8 md:py-12">
      {/* هدر */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 rounded-xl bg-visa/10 flex items-center justify-center">
            <Stamp className="w-6 h-6 text-visa" />
          </div>
          <div>
            <h1 className="text-xl md:text-2xl font-extrabold text-text-strong">
              ویزای کشورهای مختلف
            </h1>
            <p className="text-sm text-text-muted">
              {faDigits(visas.length)} کشور با اطلاعات کامل ویزا
            </p>
          </div>
        </div>
      </div>

      {/* لیست ویزاها */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
        {visas.map((visa) => {
          const title = stripHtml(visa.title?.rendered || "");
          const image = visa._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
          const processingTime = visa.visa_info?.processing_time;
          const validity = visa.visa_info?.validity;

          return (
            <Link
              key={visa.id}
              href={`/visas/${visa.slug}`}
              className="group bg-white rounded-[10px] md:rounded-lg border border-border hover:border-visa hover:shadow-card-hover transition-all duration-300 overflow-hidden"
            >
              {/* تصویر */}
              <div className="relative aspect-[16/9] bg-bg-sec overflow-hidden">
                {image ? (
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-visa/20 to-primary/10">
                    <Stamp className="w-12 h-12 text-visa/40" />
                  </div>
                )}
              </div>

              {/* محتوا */}
              <div className="p-4">
                <h2 className="font-bold text-sm md:text-base text-text-strong group-hover:text-visa transition line-clamp-1 mb-2">
                  {title}
                </h2>

                <div className="space-y-1.5">
                  {processingTime && (
                    <p className="flex items-center gap-1.5 text-xs text-text-muted">
                      <Clock className="w-3.5 h-3.5 text-visa" />
                      زمان صدور: {processingTime}
                    </p>
                  )}
                  {validity && (
                    <p className="flex items-center gap-1.5 text-xs text-text-muted">
                      <FileText className="w-3.5 h-3.5 text-visa" />
                      اعتبار: {validity}
                    </p>
                  )}
                </div>

                {/* دکمه مشاهده */}
                <div className="mt-4 pt-3 border-t border-divider">
                  <span className="flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-visa/10 text-visa text-xs font-bold group-hover:bg-visa group-hover:text-white transition">
                    مشاهده جزئیات
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* حالت خالی */}
      {visas.length === 0 && (
        <div className="text-center py-16">
          <Stamp className="w-16 h-16 text-text-subtle mx-auto mb-4" />
          <h2 className="text-lg font-bold text-text-strong mb-2">اطلاعات ویزا یافت نشد</h2>
          <p className="text-sm text-text-muted">به زودی اطلاعات ویزای کشورهای جدید اضافه می‌شود</p>
        </div>
      )}
    </div>
  );
}