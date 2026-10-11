"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Mail,
  MapPin,
  Instagram,
  Send,
  MessageCircle,
  Youtube,
  ChevronDown,
  ChevronUp,
  ArrowUp,
  Shield,
  BadgeCheck,
  Building2,
  Award,
  Plane,
  Hotel,
  Map,
  Stamp,
  Globe,
  FileText,
  HelpCircle,
  UserPlus,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

const services = [
  { label: "بلیط هواپیما", href: "/flights", icon: Plane },
  { label: "رزرو هتل", href: "/hotels", icon: Hotel },
  { label: "تورهای مسافرتی", href: "/tours", icon: Map },
  { label: "ویزا", href: "/visa", icon: Stamp },
];

const destinations = [
  { label: "تور روسیه", href: "/destinations/russia", flag: "🇷🇺" },
  { label: "تور تایلند", href: "/destinations/thailand", flag: "🇹🇭" },
  { label: "تور استانبول", href: "/destinations/istanbul", flag: "🇹🇷" },
  { label: "تور کاپادوکیا", href: "/destinations/cappadocia", flag: "🇹🇷" },
];

const company = [
  { label: "درباره ما", href: "/about", icon: Globe },
  { label: "مجله گردشگری", href: "/blog", icon: FileText },
  { label: "تماس با ما", href: "/contact", icon: Phone },
  { label: "سوالات متداول", href: "/faq", icon: HelpCircle },
  { label: "فرصت‌های شغلی", href: "/careers", icon: UserPlus },
];

const socialLinks = [
  { label: "اینستاگرام", href: "https://instagram.com", icon: Instagram, color: "hover:bg-pink-500" },
  { label: "تلگرام", href: "https://t.me", icon: Send, color: "hover:bg-blue-500" },
  { label: "واتساپ", href: "https://wa.me", icon: MessageCircle, color: "hover:bg-green-500" },
  { label: "یوتیوب", href: "https://youtube.com", icon: Youtube, color: "hover:bg-red-500" },
];

const trustBadges = [
  { name: "ای‌نماد", description: "نماد اعتماد الکترونیکی", icon: Shield, url: "https://enamad.ir" },
  { name: "ساماندهی", description: "ثبت در ساماندهی", icon: BadgeCheck, url: "https://samandehi.ir" },
  { name: "اتحادیه", description: "عضو اتحادیه آژانس‌ها", icon: Building2, url: "#" },
  { name: "ISO 9001", description: "گواهی کیفیت", icon: Award, url: "#" },
];

// باز کردن popup کوچک برای مجوزها
const openBadgePopup = (url: string, name: string) => {
  if (url === "#") return;
  const width = 500;
  const height = 650;
  const left = window.screen.width / 2 - width / 2;
  const top = window.screen.height / 2 - height / 2;
  window.open(
    url,
    `badge_${name}`,
    `width=${width},height=${height},left=${left},top=${top},toolbar=no,menubar=no,scrollbars=yes,resizable=yes`
  );
};

export default function Footer() {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gradient-to-b from-navy-900 to-navy-950 text-white">
      {/* Decorative Top Line */}
      <div className="h-1 bg-gradient-to-r from-brand-400 via-brand-500 to-brand-600" />

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        className="absolute -top-5 left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-brand-500 text-white flex items-center justify-center shadow-lg shadow-brand-500/30 hover:bg-brand-600 hover:-translate-y-1 transition-all z-10"
        aria-label="بازگشت به بالا"
      >
        <ArrowUp className="w-5 h-5" />
      </button>

      <div className="container-brand px-4 pt-16 pb-8">
        {/* ─── Desktop Layout ─── */}
        <div className="hidden lg:block">
          {/* بخش معرفی شرکت - شیک‌تر */}
          <div className="pb-12 mb-12 border-b border-white/10">
            <div className="grid grid-cols-12 gap-8">
              {/* لوگو + توضیح */}
              <div className="col-span-5">
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative">
                    <Image
                      src="/images/logo.png"
                      alt="طوفان پرشین"
                      width={64}
                      height={64}
                      className="h-16 w-16 rounded-2xl shadow-lg shadow-brand-500/20"
                    />
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center">
                      <Plane className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <div>
                    <div className="text-2xl font-black text-white leading-tight">
                      طوفان پرشین
                    </div>
                    <div className="text-xs text-brand-400 font-medium mt-0.5">
                      TOOFAN PERSIAN TRAVEL
                    </div>
                  </div>
                </div>
                <p className="text-sm text-white/75 leading-loose max-w-md pr-2 border-r-2 border-brand-500/30">
                  آژانس مسافرتی طوفان پرشین با بیش از <span className="text-brand-400 font-bold">۱۰ سال تجربه</span> در صنعت گردشگری، چارتر کننده رسمی پروازهای ماهان و متخصص برگزاری تورهای روسیه، تایلند و ترکیه. ما با تیمی حرفه‌ای و خدماتی بی‌نظیر، همراه شما در سفرهای رویایی هستیم.
                </p>
              </div>

              {/* 4 ستون - چیدمان شیک */}
              <div className="col-span-7 grid grid-cols-4 gap-6">
                {/* ستون 1: خدمات */}
                <div>
                  <h3 className="text-sm font-black text-white mb-5 pb-2 relative">
                    خدمات ما
                    <span className="absolute bottom-0 right-0 w-8 h-0.5 bg-brand-500 rounded-full" />
                  </h3>
                  <ul className="space-y-3">
                    {services.map((service, i) => (
                      <li key={i}>
                        <Link
                          href={service.href}
                          className="flex items-center gap-2 text-sm text-white/70 hover:text-brand-400 transition-colors group"
                        >
                          <service.icon className="w-4 h-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                          <span>{service.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ستون 2: مقاصد */}
                <div>
                  <h3 className="text-sm font-black text-white mb-5 pb-2 relative">
                    مقاصد تخصصی
                    <span className="absolute bottom-0 right-0 w-8 h-0.5 bg-brand-500 rounded-full" />
                  </h3>
                  <ul className="space-y-3">
                    {destinations.map((dest, i) => (
                      <li key={i}>
                        <Link
                          href={dest.href}
                          className="flex items-center gap-2 text-sm text-white/70 hover:text-brand-400 transition-colors"
                        >
                          <span className="text-base">{dest.flag}</span>
                          <span>{dest.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ستون 3: شرکت */}
                <div>
                  <h3 className="text-sm font-black text-white mb-5 pb-2 relative">
                    شرکت
                    <span className="absolute bottom-0 right-0 w-8 h-0.5 bg-brand-500 rounded-full" />
                  </h3>
                  <ul className="space-y-3">
                    {company.map((item, i) => (
                      <li key={i}>
                        <Link
                          href={item.href}
                          className="flex items-center gap-2 text-sm text-white/70 hover:text-brand-400 transition-colors group"
                        >
                          <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform flex-shrink-0" />
                          <span>{item.label}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* ستون 4: تماس با ما */}
                <div>
                  <h3 className="text-sm font-black text-white mb-5 pb-2 relative">
                    تماس با ما
                    <span className="absolute bottom-0 right-0 w-8 h-0.5 bg-brand-500 rounded-full" />
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="tel:02191000000"
                      className="flex items-center gap-2 text-sm text-white/70 hover:text-brand-400 transition-colors group"
                    >
                      <Phone className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span dir="ltr" className="font-medium">۰۲۱-۹۱۰۰۰۰۰۰</span>
                    </a>
                    <a
                      href="mailto:info@toofantravel.com"
                      className="flex items-center gap-2 text-sm text-white/70 hover:text-brand-400 transition-colors group"
                    >
                      <Mail className="w-4 h-4 flex-shrink-0 group-hover:scale-110 transition-transform" />
                      <span>info@toofantravel.com</span>
                    </a>
                    <div className="flex items-start gap-2 text-sm text-white/70">
                      <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
                      <span className="leading-relaxed">
                        تهران، خیابان ولیعصر، بالاتر از میدان ونک، پلاک ۱۲۳
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* شبکه‌های اجتماعی - زیر بخش معرفی */}
            <div className="mt-8 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs text-white/50">ما را دنبال کنید:</span>
                <div className="flex items-center gap-2">
                  {socialLinks.map((social, i) => (
                    <a
                      key={i}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={cn(
                        "w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center text-white transition-all hover:scale-110",
                        social.color
                      )}
                      aria-label={social.label}
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>
              <div className="text-xs text-white/40">
                ساعت پاسخگویی: همه روزه ۹ صبح تا ۹ شب
              </div>
            </div>
          </div>
        </div>

        {/* ─── Mobile Layout ─── */}
        <div className="lg:hidden space-y-3 mb-10">
          {/* لوگو + توضیح */}
          <div className="pb-6 border-b border-white/10">
            <div className="flex items-center gap-3 mb-4">
              <Image
                src="/images/logo.png"
                alt="طوفان پرشین"
                width={48}
                height={48}
                className="h-12 w-12 rounded-xl"
              />
              <div>
                <div className="text-lg font-black text-white">طوفان پرشین</div>
                <div className="text-[10px] text-brand-400 font-medium">
                  TOOFAN PERSIAN TRAVEL
                </div>
              </div>
            </div>
            <p className="text-xs text-white/75 leading-loose">
              آژانس مسافرتی با بیش از ۱۰ سال تجربه، چارتر کننده رسمی پروازهای ماهان و متخصص تورهای روسیه، تایلند و ترکیه.
            </p>
          </div>

          {/* Accordion Sections */}
          <div className="space-y-2">
            {[
              { key: "services", title: "خدمات ما", items: services, type: "icon" },
              { key: "destinations", title: "مقاصد تخصصی", items: destinations, type: "flag" },
              { key: "company", title: "شرکت", items: company, type: "icon" },
            ].map((section) => (
              <div key={section.key} className="border border-white/10 rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleSection(section.key)}
                  className="w-full flex items-center justify-between p-4 text-right hover:bg-white/5 transition-colors"
                >
                  <span className="text-sm font-bold text-white">{section.title}</span>
                  {openSection === section.key ? (
                    <ChevronUp className="w-4 h-4 text-white/60" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-white/60" />
                  )}
                </button>
                {openSection === section.key && (
                  <div className="px-4 pb-4 space-y-2">
                    {section.items.map((item: any, i) => (
                      <Link
                        key={i}
                        href={item.href}
                        className="flex items-center gap-2 py-2 text-sm text-white/70 hover:text-brand-400 transition-colors"
                      >
                        {section.type === "icon" ? (
                          <item.icon className="w-4 h-4" />
                        ) : (
                          <span>{item.flag}</span>
                        )}
                        <span>{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* تماس با ما */}
          <div className="pt-5 border-t border-white/10 space-y-3">
            <h3 className="text-sm font-black text-white">تماس با ما</h3>
            <a
              href="tel:02191000000"
              className="flex items-center gap-2 text-sm text-white/70 hover:text-brand-400 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span dir="ltr">۰۲۱-۹۱۰۰۰۰۰۰</span>
            </a>
            <a
              href="mailto:info@toofantravel.com"
              className="flex items-center gap-2 text-sm text-white/70 hover:text-brand-400 transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>info@toofantravel.com</span>
            </a>
            <div className="flex items-start gap-2 text-sm text-white/70">
              <MapPin className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <span>تهران، خیابان ولیعصر، بالاتر از میدان ونک، پلاک ۱۲۳</span>
            </div>
          </div>

          {/* شبکه‌های اجتماعی */}
          <div className="pt-5 border-t border-white/10">
            <h3 className="text-sm font-black text-white mb-3">ما را دنبال کنید</h3>
            <div className="flex items-center gap-2">
              {socialLinks.map((social, i) => (
                <a
                  key={i}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    "w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center text-white transition-all active:scale-95",
                    social.color
                  )}
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Trust Badges ─── */}
        <div className="py-6 border-y border-white/10 mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Shield className="w-4 h-4 text-brand-400" />
            <h3 className="text-sm font-bold text-white/90">
              مجوزها و گواهینامه‌های رسمی
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {trustBadges.map((badge, i) => (
              <button
                key={i}
                type="button"
                onClick={() => openBadgePopup(badge.url, badge.name)}
                className="flex flex-col items-center p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group cursor-pointer text-center"
              >
                <div className="relative">
                  <badge.icon className="w-8 h-8 text-brand-400 mb-2 group-hover:scale-110 transition-transform" />
                  <ExternalLink className="absolute -top-1 -right-1 w-3 h-3 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-xs font-bold text-white">{badge.name}</div>
                <div className="text-[10px] text-white/50 mt-0.5">
                  {badge.description}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* ─── Bottom Bar ─── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-white/50">
          <div>
            © ۱۴۰۵ تمامی حقوق این سایت متعلق به{" "}
            <span className="text-brand-400 font-bold">طوفان پرشین</span> می‌باشد.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-brand-400 transition-colors">
              حریم خصوصی
            </Link>
            <Link href="/terms" className="hover:text-brand-400 transition-colors">
              قوانین و مقررات
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}