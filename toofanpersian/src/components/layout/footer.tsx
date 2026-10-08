import Link from "next/link";
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from "lucide-react";
import Image from "next/image";

const FOOTER_LINKS = {
  services: {
    title: "خدمات",
    links: [
      { label: "رزرو پرواز", href: "/flights" },
      { label: "تورهای مسافرتی", href: "/tours" },
      { label: "هتل‌ها", href: "/hotels" },
      { label: "بیمه مسافرتی", href: "/insurance" },
    ],
  },
  company: {
    title: "شرکت",
    links: [
      { label: "درباره ما", href: "/about" },
      { label: "تماس با ما", href: "/contact" },
      { label: "فرصت‌های شغلی", href: "/careers" },
      { label: "قوانین و مقررات", href: "/terms" },
    ],
  },
  support: {
    title: "پشتیبانی",
    links: [
      { label: "سوالات متداول", href: "/faq" },
      { label: "راهنمای رزرو", href: "/booking-guide" },
      { label: "استرداد بلیت", href: "/refund" },
      { label: "شکایات", href: "/complaints" },
    ],
  },
};

const SOCIAL_LINKS = [
  { icon: Instagram, href: "https://instagram.com/toofanpersian", label: "اینستاگرام" },
  { icon: Twitter, href: "https://twitter.com/toofanpersian", label: "توییتر" },
  { icon: Linkedin, href: "https://linkedin.com/company/toofanpersian", label: "لینکدین" },
  { icon: Facebook, href: "https://facebook.com/toofanpersian", label: "فیسبوک" },
  { icon: Youtube, href: "https://youtube.com/@toofanpersian", label: "یوتیوب" },
];

export function Footer() {
  return (
    <footer className="border-t border-line bg-navy-950 text-white">
      <div className="container-brand py-12 lg:py-16">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/images/logo.png"
                alt="طوفان پرشین"
                width={48}
                height={48}
                className="h-12 w-12"
              />
              <div>
                <div className="text-xl font-black">طوفان پرشین</div>
                <div className="text-xs text-white/60">پرواز، تور و خدمات سفر</div>
              </div>
            </Link>
            <p className="mt-4 text-sm leading-7 text-white/70">
              آژانس مسافرتی طوفان پرشین با سال‌ها تجربه در صنعت گردشگری، ارائه‌دهنده خدمات رزرو
              آنلاین پرواز، تور و هتل با بهترین کیفیت و قیمت است.
            </p>

            {/* Trust Badges */}
            <div className="mt-6 flex items-center gap-4">
              <div className="rounded-lg bg-white/10 p-3">
<Image
  src="/images/trust/enamad.png"
  alt="نماد اعتماد الکترونیک"
  width={48}
  height={48}
  className="h-12 w-12"
/>
              </div>
              <div className="rounded-lg bg-white/10 p-3">
<Image
  src="/images/trust/samandehi.png"
  alt="نماد ساماندهی"
  width={48}
  height={48}
  className="h-12 w-12"
/>  
              </div>
            </div>
          </div>

          {/* Links */}
          {Object.values(FOOTER_LINKS).map((section) => (
            <div key={section.title}>
              <h3 className="mb-4 text-sm font-bold">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-white/70 transition hover:text-brand-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact & Social */}
        <div className="mt-12 flex flex-col items-start justify-between gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center">
          <div className="flex flex-col gap-2 text-sm text-white/70">
            <span>📞 پشتیبانی ۲۴ ساعته: ۰۲۱-۹۱۰۰۰۰۰۰</span>
            <span>📧 ایمیل: info@toofanpersian.com</span>
            <span>📍 تهران، خیابان ولیعصر، برج طوفان پرشین</span>
          </div>

          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.href}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="rounded-lg bg-white/10 p-2.5 transition hover:bg-brand-500"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-xs text-white/50">
          © ۱۴۰۵ تمامی حقوق این سایت متعلق به آژانس مسافرتی طوفان پرشین است.
        </div>
      </div>
    </footer>
  );
}