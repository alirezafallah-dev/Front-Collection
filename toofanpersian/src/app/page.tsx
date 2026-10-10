import Image from "next/image";
import { Header } from "@/components/layout/header";
import SearchBox from "@/components/search/SearchBox";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full aspect-[2172/600] min-h-[400px]">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-bg.png"
            alt=""
            fill
            priority
            quality={90}
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/50 via-white/30 to-slate-50" />

        {/* Content - فرم کمی پایین‌تر */}
        <div className="relative z-10 container-brand h-full flex flex-col justify-end items-center pb-16 md:pb-20">
          {/* Search Box */}
          <div className="w-full max-w-5xl">
            <SearchBox />
          </div>
        </div>
      </section>
    </main>
  );
}