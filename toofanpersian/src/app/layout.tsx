import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "sonner";
import { Vazirmatn } from "next/font/google";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
  preload: true,
  weight: ["400", "500", "700", "900"], // فقط weightهای مورد نیاز
});

export const metadata: Metadata = {
  title: {
    default: "طوفان پرشین | رزرو آنلاین پرواز، تور و هتل",
    template: "%s | طوفان پرشین",
  },
  description:
    "جستجو و رزرو پروازهای داخلی و خارجی با تضمین بهترین قیمت، صدور آنی و پشتیبانی ۲۴ ساعته. طوفان پرشین، همراه مطمئن سفرهای شما.",
  keywords: [
    "رزرو پرواز",
    "بلیت هواپیما",
    "پرواز داخلی",
    "پرواز خارجی",
    "تور مسافرتی",
    "هتل",
    "طوفان پرشین",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className="font-sans">
        {children}
        <Toaster position="bottom-left" richColors />
      </body>
    </html>
  );
}