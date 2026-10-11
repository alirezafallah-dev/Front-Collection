"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import HeroSearchWrapper from "@/components/home/HeroSearchWrapper";
import QuickTrustBar from "@/components/home/QuickTrustBar";
import TrustSection from "@/components/home/TrustSection";
import DestinationsSection from "@/components/home/DestinationsSection";
import FeaturedToursSection from "@/components/home/FeaturedToursSection";
import CharterFlightsSection from "@/components/home/CharterFlightsSection";
import HotelsSection from "@/components/home/HotelsSection";
import BlogSection from "@/components/home/BlogSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import Footer from "@/components/layout/footer";

export default function HomePage() {
  const [searchOpen, setSearchOpen] = useState(false);

  return (
    <main className="min-h-screen">
      <Header onSearchClick={() => setSearchOpen(true)} />

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
        
        {/* Content */}
        <div className="relative z-10 container-brand h-full hero-content flex flex-col justify-end items-center">
          <div className="w-full max-w-7xl">
            <HeroSearchWrapper />
          </div>
        </div>
      </section>


      {/* Quick Trust Bar */}
      <QuickTrustBar />

      {/* Destinations Section */}
      <DestinationsSection />

      {/* 🆕 Featured Tours Section */}
      <FeaturedToursSection />

      {/* 🆕 پروازهای چارتر ماهان */}
      <CharterFlightsSection />

      {/* 🆕 هتل‌های محبوب */}
      <HotelsSection />

      {/* 🆕 مجله گردشگری */}
      <BlogSection />

      {/* 🆕 نظرات مسافران */}
      <TestimonialsSection />

      {/* Trust Section */}
      <TrustSection />

      {/* 🆕 Footer */}
      <Footer />

    </main>
  );
}