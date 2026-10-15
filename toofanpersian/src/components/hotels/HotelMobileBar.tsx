"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, Heart, Share2, X, Plus } from "lucide-react";
import { Hotel } from "@/lib/data/hotels";
import ShareModal from "./ShareModal";
import { cn } from "@/lib/utils";

interface HotelMobileBarProps {
  hotel: Hotel;
}

export default function HotelMobileBar({ hotel }: HotelMobileBarProps) {
  const [isSaved, setIsSaved] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCallExpanded, setIsCallExpanded] = useState(false);

  // بستن منو با اسکرول یا کلیک بیرون
  useEffect(() => {
    if (!isExpanded) return;
    
    const handleScroll = () => setIsExpanded(false);
    const handleClick = () => setIsExpanded(false);
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    // تاخیر برای جلوگیری از بسته شدن فوری
    setTimeout(() => {
      window.addEventListener("click", handleClick);
    }, 100);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
    };
  }, [isExpanded]);

  const toggleExpand = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExpanded(!isExpanded);
    setIsCallExpanded(false);
  };

  const handleAction = (action: () => void) => {
    action();
    setIsExpanded(false);
  };

  // اکشن‌های اصلی
  const actions = [
    {
      id: "save",
      icon: Heart,
      label: isSaved ? "ذخیره شد" : "ذخیره",
      color: isSaved ? "bg-red-500" : "bg-slate-700",
      iconFilled: isSaved,
      onClick: () => setIsSaved(!isSaved),
    },
    {
      id: "share",
      icon: Share2,
      label: "اشتراک",
      color: "bg-navy-800",
      onClick: () => setShowShare(true),
    },
    {
      id: "whatsapp",
      icon: MessageCircle,
      label: "واتساپ",
      color: "bg-emerald-500",
      onClick: () => window.open("https://wa.me/989120000000", "_blank"),
    },
  ];

  return (
    <>
      {/* ═══════════════════════════════════════
          Speed Dial FAB - موبایل
      ═══════════════════════════════════════ */}
      <div className="lg:hidden fixed bottom-6 left-4 z-40">
        
        {/* ══ Call Button - دکمه اصلی تماس ══ */}
        <div className="relative">
          {/* Sub-menu: Phone options */}
          {isCallExpanded && (
            <div className="absolute bottom-full left-0 mb-3 space-y-2">
              {/* Main Phone */}
              <a
                href={`tel:${hotel.phone}`}
                className="flex items-center gap-3 bg-white rounded-full pl-3 pr-4 py-2.5 shadow-xl shadow-navy-900/20 border border-slate-100 group animate-in slide-in-from-bottom-2 duration-200"
                style={{ animationDelay: "50ms" }}
              >
                <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 leading-tight">تلفن هتل</div>
                  <div className="text-xs font-black text-navy-900 leading-tight" dir="ltr">
                    {hotel.phone}
                  </div>
                </div>
              </a>

              {/* Agent Phone */}
              <a
                href="tel:02191000000"
                className="flex items-center gap-3 bg-white rounded-full pl-3 pr-4 py-2.5 shadow-xl shadow-navy-900/20 border border-slate-100 group animate-in slide-in-from-bottom-2 duration-200"
                style={{ animationDelay: "0ms" }}
              >
                <div className="w-8 h-8 rounded-full bg-navy-900 flex items-center justify-center">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <div className="text-right">
                  <div className="text-[10px] text-slate-500 leading-tight">مشاور طوفان پرشین</div>
                  <div className="text-xs font-black text-navy-900 leading-tight" dir="ltr">
                    ۰۲۱-۹۱۰۰۰۰۰۰
                  </div>
                </div>
              </a>
            </div>
          )}

          {/* Main Call Button */}
          <button
            onClick={() => {
              setIsCallExpanded(!isCallExpanded);
              setIsExpanded(false);
            }}
            className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300",
              "bg-gradient-to-br from-brand-500 to-brand-600",
              "hover:scale-110 active:scale-95",
              "shadow-brand-500/40",
              isCallExpanded && "rotate-45 bg-slate-700"
            )}
            aria-label="تماس"
          >
            {isCallExpanded ? (
              <X className="w-6 h-6" />
            ) : (
              <Phone className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          Secondary Actions FAB
      ═══════════════════════════════════════ */}
      <div className="lg:hidden fixed bottom-6 right-4 z-40">
        <div className="relative">
          {/* Sub-menu: Actions */}
          {isExpanded && (
            <div className="absolute bottom-full right-0 mb-3 space-y-2">
              {actions.map((action, i) => {
                const Icon = action.icon;
                return (
                  <button
                    key={action.id}
                    onClick={() => handleAction(action.onClick)}
                    className="flex items-center gap-3 bg-white rounded-full pr-3 pl-4 py-2.5 shadow-xl shadow-navy-900/20 border border-slate-100 group animate-in slide-in-from-bottom-2 duration-200"
                    style={{ animationDelay: `${(actions.length - 1 - i) * 50}ms` }}
                  >
                    <div className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center",
                      action.color
                    )}>
                      <Icon className={cn(
                        "w-4 h-4 text-white",
                        action.iconFilled && "fill-white"
                      )} />
                    </div>
                    <span className="text-xs font-bold text-navy-900">
                      {action.label}
                    </span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Main Toggle Button */}
          <button
            onClick={toggleExpand}
            className={cn(
              "w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300",
              "bg-navy-900",
              "hover:scale-110 active:scale-95",
              "shadow-navy-900/40",
              isExpanded && "rotate-45 bg-slate-700"
            )}
            aria-label="گزینه‌های بیشتر"
          >
            {isExpanded ? (
              <X className="w-6 h-6" />
            ) : (
              <Plus className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Backdrop وقتی منو باز است */}
      {(isExpanded || isCallExpanded) && (
        <div
          className="lg:hidden fixed inset-0 z-30 bg-navy-900/20 backdrop-blur-[2px] animate-in fade-in duration-200"
          onClick={() => {
            setIsExpanded(false);
            setIsCallExpanded(false);
          }}
        />
      )}

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