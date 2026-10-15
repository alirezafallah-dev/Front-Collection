"use client";

import { useState, useEffect } from "react";
import { X, Link2, Check, Send, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  url?: string;
}

// آیکون‌های سفارشی پیام‌رسان‌های ایرانی
const BaleIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.5 14.5c-.28 0-.5-.22-.5-.5 0-.83-.67-1.5-1.5-1.5h-5c-.83 0-1.5.67-1.5 1.5 0 .28-.22.5-.5.5s-.5-.22-.5-.5c0-1.38 1.12-2.5 2.5-2.5h5c1.38 0 2.5 1.12 2.5 2.5 0 .28-.22.5-.5.5zm-4.5-4c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm0-7c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
  </svg>
);

const EitaaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.18l7.5 3.75v7.14L12 18.82l-7.5-3.75V7.93L12 4.18zM12 8a3 3 0 100 6 3 3 0 000-6z"/>
  </svg>
);

const RubikaIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm3.5 14h-2l-1-2h-1l-1 2h-2l2-3.5L8.5 7h2l1 2h1l1-2h2l-2 3.5L15.5 16z"/>
  </svg>
);

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const shareOptions = [
  {
    id: "whatsapp",
    label: "واتساپ",
    icon: MessageCircle,
    color: "bg-green-500 hover:bg-green-600",
    getUrl: (url: string, text: string) =>
      `https://wa.me/?text=${encodeURIComponent(text + "\n" + url)}`,
  },
  {
    id: "telegram",
    label: "تلگرام",
    icon: Send,
    color: "bg-blue-500 hover:bg-blue-600",
    getUrl: (url: string, text: string) =>
      `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    id: "eitaa",
    label: "ایتا",
    icon: EitaaIcon,
    color: "bg-orange-500 hover:bg-orange-600",
    getUrl: (url: string, text: string) =>
      `https://eitaa.com/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    id: "bale",
    label: "بله",
    icon: BaleIcon,
    color: "bg-cyan-500 hover:bg-cyan-600",
    getUrl: (url: string, text: string) =>
      `https://ble.ir/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    id: "rubika",
    label: "روبیکا",
    icon: RubikaIcon,
    color: "bg-pink-500 hover:bg-pink-600",
    getUrl: (url: string, text: string) =>
      `https://rubika.ir/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`,
  },
  {
    id: "instagram",
    label: "اینستاگرام",
    icon: InstagramIcon,
    color: "bg-gradient-to-br from-purple-500 via-pink-500 to-orange-400 hover:opacity-90",
    getUrl: null, // اینستاگرام API مستقیم نداره
  },
];

export default function ShareModal({
  isOpen,
  onClose,
  title,
  description,
  url,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  const shareUrl = url || (typeof window !== "undefined" ? window.location.href : "");
  const shareText = description ? `${title}\n${description}` : title;

  // بستن با Escape
  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  // Reset copied state
  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  const handleShare = (option: typeof shareOptions[0]) => {
    if (option.id === "instagram") {
      // اینستاگرام - کپی کردن لینک و متن
      copyToClipboard();
      return;
    }

    if (option.getUrl) {
      const shareLink = option.getUrl(shareUrl, shareText);
      window.open(shareLink, "_blank", "noopener,noreferrer,width=600,height=600");
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      // Fallback برای مرورگرهای قدیمی
      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-end md:items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-navy-900/70 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative w-full md:max-w-md bg-white md:rounded-2xl rounded-t-3xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Handle bar برای موبایل */}
        <div className="md:hidden flex justify-center pt-3 pb-1">
          <div className="w-12 h-1 rounded-full bg-slate-300" />
        </div>

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h3 className="text-base font-black text-navy-900">
            اشتراک‌گذاری
          </h3>
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full hover:bg-slate-100 flex items-center justify-center text-slate-600 transition-colors"
            aria-label="بستن"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Title Preview */}
        <div className="px-5 py-4 bg-slate-50 border-b border-slate-100">
          <div className="text-sm font-bold text-navy-900 mb-1 line-clamp-1">
            {title}
          </div>
          {description && (
            <div className="text-xs text-slate-500 line-clamp-2">
              {description}
            </div>
          )}
        </div>

        {/* Share Options Grid */}
        <div className="p-5">
          <div className="grid grid-cols-4 gap-3 mb-5">
            {shareOptions.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.id}
                  onClick={() => handleShare(option)}
                  className="flex flex-col items-center gap-2 group"
                >
                  <div
                    className={cn(
                      "w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-md transition-all group-hover:scale-110 group-hover:shadow-lg",
                      option.color
                    )}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-bold text-slate-700 text-center leading-tight">
                    {option.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Copy Link */}
          <div className="pt-4 border-t border-slate-100">
            <div className="text-[11px] font-bold text-slate-500 mb-2">
              یا لینک را کپی کنید
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-slate-50 border border-slate-200 min-w-0">
                <Link2 className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span className="text-xs text-slate-700 truncate flex-1" dir="ltr">
                  {shareUrl}
                </span>
              </div>
              <button
                onClick={copyToClipboard}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-bold text-xs transition-all flex-shrink-0",
                  copied
                    ? "bg-emerald-500 text-white"
                    : "bg-navy-900 hover:bg-navy-800 text-white"
                )}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>کپی شد</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-4 h-4" />
                    <span>کپی</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}