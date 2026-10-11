"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Phone, User, Menu, X, ChevronLeft, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "خانه", active: true },
  { href: "/flights", label: "پرواز" },
  { href: "/hotels", label: "هتل" },
  { href: "/blog", label: "مجله گردشگری" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

interface HeaderProps {
  onSearchClick?: () => void;
}

export function Header({ onSearchClick }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg lg:border-b lg:border-line">
        <div className="container-brand flex h-16 items-center justify-between lg:h-20">
          
          {/* Mobile: منو سمت راست */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded-full p-2.5 text-navy-900 hover:bg-surface lg:hidden"
            aria-label="منو"
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* لوگو - وسط در موبایل، سمت راست در دسکتاپ */}
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/logo.png"
              alt="طوفان پرشین"
              width={44}
              height={44}
              className="h-11 w-11 rounded-xl"
            />
            <div className="flex flex-col gap-0.5">
              <span className="text-lg font-black text-navy-900 leading-tight">
                طوفان پرشین
              </span>
              <span className="text-[10px] font-medium text-navy-900/60 leading-tight">
                شرکت خدمات مسافرتی و جهانگردی
              </span>
            </div>
          </Link>

          {/* منوی وسط - Desktop */}
          <nav className="hidden items-center gap-8 lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-sm font-bold transition-colors relative",
                  item.active
                    ? "text-brand-600"
                    : "text-navy-900 hover:text-brand-500"
                )}
              >
                {item.label}
                {item.active && (
                  <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-brand-500 rounded-full" />
                )}
              </Link>
            ))}
          </nav>

          {/* Mobile: دکمه جستجو سمت چپ */}
          <button
            type="button"
            onClick={onSearchClick}
            className="rounded-full p-2.5 text-navy-900 hover:bg-surface lg:hidden"
            aria-label="جستجو"
          >
            <Search className="h-6 w-6" />
          </button>

          {/* دکمه‌های سمت چپ - Desktop */}
          <div className="hidden items-center gap-4 lg:flex">
            <a
              href="tel:02191000000"
              className="flex items-center gap-2 rounded-xl border-2 border-navy-900/15 px-4 py-2.5 text-sm font-bold text-navy-900 transition-all hover:border-brand-500 hover:text-brand-500 hover:shadow-sm"
            >
              <Phone className="h-4 w-4" />
              <span>۰۲۱-۹۱۰۰۰۰۰۰</span>
            </a>
            <Link
              href="/login"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-navy-900/5 text-navy-900 transition-all hover:bg-brand-500 hover:text-white hover:shadow-lg"
              aria-label="حساب کاربری"
            >
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Slide Menu - Mobile */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* Overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-navy-900/50 backdrop-blur-sm transition-opacity duration-300",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileOpen(false)}
        />

        {/* Slide Panel */}
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-[320px] max-w-[85vw] bg-white shadow-2xl transition-transform duration-300 ease-out",
            mobileOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-line px-6 py-4">
            <span className="text-lg font-black text-navy-900">منو</span>
            <button
              type="button"
              onClick={() => setMobileOpen(false)}
              className="rounded-full p-2 text-navy-900 hover:bg-surface"
              aria-label="بستن"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-1 px-4 py-6">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "flex items-center justify-between rounded-xl px-4 py-3.5 text-sm font-bold transition",
                  item.active
                    ? "bg-brand-50 text-brand-600"
                    : "text-navy-900 hover:bg-surface"
                )}
              >
                <span>{item.label}</span>
                <ChevronLeft className="h-4 w-4" />
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="border-t border-line px-6 py-6">
            <a
              href="tel:02191000000"
              className="mb-3 flex items-center justify-center gap-2 rounded-xl border-2 border-navy-900/15 px-5 py-3.5 text-sm font-bold text-navy-900 transition hover:border-brand-500 hover:text-brand-500"
            >
              <Phone className="h-4 w-4" />
              <span>۰۲۱-۹۱۰۰۰۰۰۰</span>
            </a>
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center gap-2 rounded-xl bg-brand-500 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-brand-600"
            >
              <User className="h-4 w-4" />
              <span>ورود / ثبت‌نام</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}