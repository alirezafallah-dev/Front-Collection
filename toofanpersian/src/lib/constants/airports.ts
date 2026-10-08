export type Airport = {
  code: string;
  city: string;
  name: string;
  country?: string;
};

export const IRAN_AIRPORTS: Airport[] = [
  { code: "IKA", city: "تهران", name: "فرودگاه بین‌المللی امام خمینی", country: "ایران" },
  { code: "THR", city: "تهران", name: "فرودگاه بین‌المللی مهرآباد", country: "ایران" },
  { code: "MHD", city: "مشهد", name: "فرودگاه شهید هاشمی‌نژاد", country: "ایران" },
  { code: "SYZ", city: "شیراز", name: "فرودگاه شهید دستغیب", country: "ایران" },
  { code: "IFN", city: "اصفهان", name: "فرودگاه شهید بهشتی", country: "ایران" },
  { code: "TBZ", city: "تبریز", name: "فرودگاه شهید مدنی", country: "ایران" },
  { code: "KIH", city: "کیش", name: "فرودگاه بین‌المللی کیش", country: "ایران" },
  { code: "AWZ", city: "اهواز", name: "فرودگاه بین‌المللی اهواز", country: "ایران" },
  { code: "BND", city: "بندرعباس", name: "فرودگاه بین‌المللی بندرعباس", country: "ایران" },
  { code: "KER", city: "کرمان", name: "فرودگاه آیت‌الله هاشمی رفسنجانی", country: "ایران" },
  { code: "RAS", city: "رشت", name: "فرودگاه سردار جنگل", country: "ایران" },
  { code: "SRY", city: "ساری", name: "فرودگاه دشت ناز", country: "ایران" },
];

export const INTERNATIONAL_AIRPORTS: Airport[] = [
  { code: "IST", city: "استانبول", name: "فرودگاه جدید استانبول", country: "ترکیه" },
  { code: "SAW", city: "استانبول", name: "فرودگاه صبیحه گوکچن", country: "ترکیه" },
  { code: "DXB", city: "دبی", name: "فرودگاه بین‌المللی دبی", country: "امارات" },
  { code: "DWC", city: "دبی", name: "فرودگاه آل مکتوم", country: "امارات" },
  { code: "DOH", city: "دوحه", name: "فرودگاه بین‌المللی حمد", country: "قطر" },
  { code: "CDG", city: "پاریس", name: "فرودگاه شارل دو گل", country: "فرانسه" },
  { code: "LHR", city: "لندن", name: "فرودگاه هیترو", country: "انگلستان" },
  { code: "FCO", city: "رم", name: "فرودگاه فیومیچینو", country: "ایتالیا" },
  { code: "FRA", city: "فرانکفورت", name: "فرودگاه بین‌المللی فرانکفورت", country: "آلمان" },
  { code: "AMS", city: "آمستردام", name: "فرودگاه اسخیپول", country: "هلند" },
];

export const ALL_AIRPORTS = [...IRAN_AIRPORTS, ...INTERNATIONAL_AIRPORTS];