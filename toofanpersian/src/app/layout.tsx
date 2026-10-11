import type { Metadata } from "next";
import { Vazirmatn } from "next/font/google";
import "./globals.css";

const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-vazirmatn",
  display: "swap",
});

export const metadata: Metadata = {
  title: "طوفان پرشین - شرکت خدمات مسافرتی و جهانگردی",
  description: "خرید آنلاین بلیط هواپیما، رزرو هتل و تورهای مسافرتی با بهترین قیمت",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" className={vazirmatn.variable}>
      <body className={vazirmatn.className}>{children}</body>
    </html>
  );
}