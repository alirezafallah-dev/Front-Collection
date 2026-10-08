export type DepartureItem = {
  route: string;
  time: string;
  price: number;
  status: "صدور آنی" | "ظرفیت محدود" | "تخفیف ویژه";
};

export const DEPARTURES: DepartureItem[] = [
  { route: "تهران ← مشهد", time: "امروز ۱۴:۳۰", price: 1850000, status: "صدور آنی" },
  { route: "تهران ← کیش", time: "امروز ۱۸:۱۰", price: 2140000, status: "تخفیف ویژه" },
  { route: "تهران ← استانبول", time: "فردا ۰۵:۴۵", price: 8480000, status: "صدور آنی" },
  { route: "مشهد ← تهران", time: "امروز ۲۱:۰۰", price: 1790000, status: "ظرفیت محدود" },
  { route: "تهران ← دبی", time: "فردا ۰۹:۲۰", price: 9150000, status: "صدور آنی" },
  { route: "شیراز ← تهران", time: "امروز ۱۶:۴۰", price: 1620000, status: "تخفیف ویژه" },
  { route: "تهران ← شیراز", time: "فردا ۰۷:۱۵", price: 1680000, status: "صدور آنی" },
  { route: "اصفهان ← مشهد", time: "فردا ۱۱:۵۰", price: 2050000, status: "ظرفیت محدود" },
  { route: "تهران ← دوحه", time: "فردا ۲۳:۳۰", price: 11200000, status: "صدور آنی" },
  { route: "کیش ← تهران", time: "امروز ۲۰:۰۵", price: 2090000, status: "تخفیف ویژه" },
];