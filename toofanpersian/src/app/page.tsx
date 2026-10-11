import { Header } from "@/components/layout/header";
import SearchBox from "@/components/search/SearchBox";
import TrustSection from "@/components/home/TrustSection";

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />

      {/* Hero Section - ارتفاع بیشتر */}
      <section className="relative w-full min-h-[800px]">
        
        {/* Background Image - بدون زوم، با حفظ نسبت ابعاد */}
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: "url('/images/hero/hero-bg.png')",
            backgroundSize: "100% auto",
            backgroundPosition: "top center",
            backgroundRepeat: "no-repeat",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/30" />

        {/* Content - فرم پایین سکشن */}
        <div className="relative z-10 container-brand h-full min-h-[700px] flex flex-col justify-end items-center pb-[100px] md:pb-[120px]">
          {/* Search Box */}
          <div className="w-full max-w-7xl">
            <SearchBox />
          </div>
        </div>
      </section>

      {/* Trust Section - زیر فرم جستجو */}
      <TrustSection />

    </main>
  );
}