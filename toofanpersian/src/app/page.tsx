import { Header } from "@/components/layout/header";
import SearchBox from "@/components/search/SearchBox";
import QuickTrustBar from "@/components/home/QuickTrustBar";
import TrustSection from "@/components/home/TrustSection";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full hero-section">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/hero/hero-bg.png')",
            backgroundSize: "100% auto",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/30" />
        <div className="relative z-10 container-brand h-full hero-content flex flex-col justify-end items-center">
          <div className="w-full max-w-7xl">
            <SearchBox />
          </div>
        </div>
      </section>

      {/* Quick Trust Bar - زیر فرم جستجو */}
      <QuickTrustBar />

      {/* 🔹 اینجا بخش‌های دیگه میان: تور، مجله و... */}

      {/* Trust Section - پایین صفحه */}
      <TrustSection />
    </main>
  );
}