export type Airline = {
  code: string;
  name: string;
  logo: string;
};

export const AIRLINES: Airline[] = [
  { code: "IR", name: "ایران‌ایر", logo: "/images/logos/iranair.png" },
  { code: "EP", name: "ایران‌آسمان", logo: "/images/logos/iranaseaman.png" },
  { code: "W5", name: "ماهان", logo: "/images/logos/mahan.png" },
  { code: "ZO", name: "زاگرس", logo: "/images/logos/zagros.png" },
  { code: "QB", name: "قشم‌ایر", logo: "/images/logos/qeshm.png" },
  { code: "TK", name: "ترکیش ایرلاینز", logo: "/images/logos/turkish.png" },
  { code: "EK", name: "امارات", logo: "/images/logos/emirates.png" },
  { code: "QR", name: "قطر ایرویز", logo: "/images/logos/qatar.png" },
  { code: "FZ", name: "فلای دبی", logo: "/images/logos/flydubai.png" },
  { code: "GF", name: "خلیج ایر", logo: "/images/logos/gulfair.png" },
  { code: "SV", name: "سعودی", logo: "/images/logos/saudia.png" },
  { code: "KU", name: "کویت ایرویز", logo: "/images/logos/kuwait.png" },
];