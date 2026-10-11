"use client";

import { useState } from "react";
import { Header } from "@/components/layout/header";
import HeroSearchWrapper from "@/components/home/HeroSearchWrapper";
import QuickTrustBar from "@/components/home/QuickTrustBar";
import TrustSection from "@/components/home/TrustSection";

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
            <HeroSearchWrapper 
              searchOpen={searchOpen}
              onSearchOpenChange={setSearchOpen}
            />
          </div>
        </div>
      </section>

      {/* Quick Trust Bar */}
      <QuickTrustBar />

      {/* Trust Section */}
      <TrustSection />
    </main>
  );
}