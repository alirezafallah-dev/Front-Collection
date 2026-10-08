export type PopularRoute = {
  id: string;
  origin: string;
  destination: string;
  originCode: string;
  destinationCode: string;
  price: number;
  duration: string;
  image: string;
  tag?: string;
};

export const POPULAR_ROUTES: PopularRoute[] = [
  {
    id: "1",
    origin: "تهران",
    destination: "مشهد",
    originCode: "THR",
    destinationCode: "MHD",
    price: 1850000,
    duration: "۱ ساعت و ۳۰ دقیقه",
    image: "/images/destinations/mashhad.jpg",
    tag: "محبوب‌ترین",
  },
  {
    id: "2",
    origin: "تهران",
    destination: "کیش",
    originCode: "THR",
    destinationCode: "KIH",
    price: 2200000,
    duration: "۲ ساعت",
    image: "/images/destinations/kish.jpg",
    tag: "تخفیف ویژه",
  },
  {
    id: "3",
    origin: "تهران",
    destination: "استانبول",
    originCode: "IKA",
    destinationCode: "IST",
    price: 8500000,
    duration: "۳ ساعت",
    image: "/images/destinations/istanbul.jpg",
  },
  {
    id: "4",
    origin: "تهران",
    destination: "دبی",
    originCode: "IKA",
    destinationCode: "DXB",
    price: 9200000,
    duration: "۲ ساعت و ۳۰ دقیقه",
    image: "/images/destinations/dubai.jpg",
  },
  {
    id: "5",
    origin: "تهران",
    destination: "شیراز",
    originCode: "THR",
    destinationCode: "SYZ",
    price: 1650000,
    duration: "۱ ساعت و ۲۰ دقیقه",
    image: "/images/destinations/shiraz.jpg",
  },
  {
    id: "6",
    origin: "مشهد",
    destination: "تهران",
    originCode: "MHD",
    destinationCode: "THR",
    price: 1850000,
    duration: "۱ ساعت و ۳۰ دقیقه",
    image: "/images/destinations/tehran.jpg",
  },
];