"use client";

import { useState } from "react";
import { Phone, MessageCircle, MapPin, Star, Clock, Heart, Share2 } from "lucide-react";
import { Hotel } from "@/lib/data/hotels";
import { cn } from "@/lib/utils";
import ShareModal from "./ShareModal";

interface HotelSidebarProps {
  hotel: Hotel;
}

export default function HotelSidebar({ hotel }: HotelSidebarProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const ratingLabel = 
    hotel.rating >= 4.8 ? "فوق‌العاده" :
    hotel.rating >= 4.5 ? "عالی" :
    hotel.rating >= 4.0 ? "خیلی خوب" :
    hotel.rating >= 3.5 ? "خوب" : "متوسط";

  return (
    <>
      <aside 
        className="hidden lg:block w-80 xl:w-96 flex-shrink-0 self-start sticky top-24 will-change-scroll"
        style={{ maxHeight: 'calc(100vh - 120px)' }}
      >
        <div className="space-y-4 overflow-y-auto pr-1" style={{ maxHeight: 'calc(100vh - 120px)' }}>
          
          {/* ═══════════════════════════════════════
              Score Box - سفید با متن مشکی
          ═══════════════════════════════════════ */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
            <div className="flex items-start gap-4">
              {/* Score Number */}
              <div className="w-16 h-16 rounded-xl bg-brand-500 flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-500/30">
                <span className="text-3xl font-black text-white">{hotel.rating}</span>
              </div>
              
              {/* Label + Reviews */}
              <div className="flex-1">
                <div className="text-xl font-black text-navy-900 mb-1">{ratingLabel}</div>
                <div className="flex items-center gap-2 text-sm text-slate-600">
                  <span>{hotel.reviewCount} نظر</span>
                  <span className="text-slate-300">•</span>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={cn(
                          "w-3 h-3",
                          i < Math.floor(hotel.rating)
                            ? "text-brand-500 fill-brand-500"
                            : "text-slate-300"
                        )}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════
              Action Buttons
          ═══════════════════════════════════════ */}
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={cn(
                "flex items-center justify-center gap-2 py-3 rounded-xl border-2 font-bold text-sm transition-all",
                isSaved
                  ? "border-red-200 bg-red-50 text-red-600"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
              )}
            >
              <Heart className={cn("w-4 h-4", isSaved && "fill-current")} />
              <span>{isSaved ? "ذخیره شد" : "ذخیره"}</span>
            </button>
            <button 
              onClick={() => setShowShare(true)}
              className="flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-slate-200 bg-white text-slate-700 font-bold text-sm hover:border-slate-300 transition-all"
            >
              <Share2 className="w-4 h-4" />
              <span>اشتراک</span>
            </button>
          </div>

          {/* ═══════════════════════════════════════
              Contact Card
          ═══════════════════════════════════════ */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <h3 className="text-sm font-black text-navy-900 mb-4">
              تماس و اطلاعات
            </h3>
            
            <div className="space-y-3">
              <a
                href={`tel:${hotel.phone}`}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-50 group-hover:bg-brand-100 flex items-center justify-center flex-shrink-0 transition-colors">
                  <Phone className="w-4 h-4 text-brand-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-slate-500">تلفن هتل</div>
                  <div className="text-sm font-bold text-navy-900 truncate" dir="ltr">
                    {hotel.phone}
                  </div>
                </div>
              </a>

              <a
                href="https://wa.me/989120000000"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-lg bg-brand-50 group-hover:bg-brand-100 flex items-center justify-center flex-shrink-0 transition-colors">
                  <MessageCircle className="w-4 h-4 text-brand-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-slate-500">واتساپ</div>
                  <div className="text-sm font-bold text-navy-900">مشاوره رایگان</div>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50">
                <div className="w-10 h-10 rounded-lg bg-white flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-4 h-4 text-brand-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-slate-500 mb-0.5">آدرس</div>
                  <div className="text-xs text-navy-900 leading-relaxed">
                    {hotel.address}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════
              Check-in/out
          ═══════════════════════════════════════ */}
          <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-3 rounded-xl bg-slate-50">
                <Clock className="w-4 h-4 text-brand-600 mx-auto mb-1.5" />
                <div className="text-[10px] text-slate-500 mb-0.5">Check-in</div>
                <div className="text-sm font-black text-navy-900">{hotel.checkIn}</div>
              </div>
              <div className="text-center p-3 rounded-xl bg-slate-50">
                <Clock className="w-4 h-4 text-brand-600 mx-auto mb-1.5" />
                <div className="text-[10px] text-slate-500 mb-0.5">Check-out</div>
                <div className="text-sm font-black text-navy-900">{hotel.checkOut}</div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════
              Help Card
          ═══════════════════════════════════════ */}
          <div className="bg-gradient-to-br from-navy-900 to-navy-800 rounded-2xl p-5 text-white">
            <h3 className="text-sm font-black mb-1.5">
              سوالی درباره این هتل دارید؟
            </h3>
            <p className="text-xs text-white/70 leading-relaxed mb-4">
              کارشناسان ما آماده پاسخگویی هستند
            </p>
            <a
              href="tel:02191000000"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-lg bg-brand-500 hover:bg-brand-600 text-white text-sm font-bold transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>۰۲۱-۹۱۰۰۰۰۰۰</span>
            </a>
          </div>
        </div>
      </aside>

      {/* Share Modal */}
      <ShareModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        title={hotel.name}
        description={`${hotel.location} - هتل ${hotel.stars} ستاره با امتیاز ${hotel.rating}`}
      />
    </>
  );
}