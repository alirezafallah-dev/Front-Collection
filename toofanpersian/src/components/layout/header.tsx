"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Phone, User, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/", label: "خانه", active: true },
  { href: "/flights", label: "پرواز" },
  { href: "/hotels", label: "هتل" },
  { href: "/blog", label: "مجله گردشگری" },
  { href: "/about", label: "درباره ما" },
  { href: "/contact", label: "تماس با ما" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur-lg">
      <div className="container-brand flex h-16 items-center justify-between lg:h-20">
        {/* لوگو و نام */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/logo.png"
            alt="طوفان پرشین"
            width={44}
            height={44}
            className="h-11 w-11"
          />
          <span className="text-lg font-black text-navy-900">طوفان پرشین</span>
        </Link>

        {/* منوی وسط */}
        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "text-sm font-bold transition-colors",
                item.active
                  ? "text-brand-600"
                  : "text-navy-900 hover:text-brand-500"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* دکمه‌های سمت چپ */}
        <div className="flex items-center gap-3">
          <a
            href="tel:02191000000"
            className="hidden items-center gap-2 rounded-lg border border-navy-900/20 px-4 py-2 text-sm font-bold text-navy-900 transition hover:border-brand-500 hover:text-brand-500 sm:flex"
          >
            <Phone className="h-4 w-4" />
            ۰۲۱-۹۱۰۰۰۰۰۰
          </a>
          <Link
            href="/login"
            className="hidden items-center gap-2 rounded-lg bg-brand-500 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-600 sm:flex"
          >
            <User className="h-4 w-4" />
            حساب کاربری
          </Link>

          {/* منوی موبایل */}
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-navy-900 hover:bg-surface lg:hidden"
            aria-label="منو"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* منوی موبایل */}
      {mobileOpen && (
        <div className="border-t border-line bg-white lg:hidden">
          <nav className="container-brand flex flex-col gap-2 py-4">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "rounded-lg px-4 py-3 text-sm font-bold transition",
                  item.active
                    ? "bg-brand-50 text-brand-600"
                    : "text-navy-900 hover:bg-surface"
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2">
              <a
                href="tel:02191000000"
                className="flex items-center justify-center gap-2 rounded-lg border border-navy-900/20 px-4 py-3 text-sm font-bold text-navy-900"
              >
                <Phone className="h-4 w-4" />
                ۰۲۱-۹۱۰۰۰۰۰۰
              </a>
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 rounded-lg bg-brand-500 px-4 py-3 text-sm font-bold text-white"
              >
                <User className="h-4 w-4" />
                حساب کاربری
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}