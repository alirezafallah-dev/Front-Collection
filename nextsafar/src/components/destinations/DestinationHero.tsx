import Image from "next/image";

const DESTINATION_HERO_IMAGE = "/images/hero/Travel-Destinations.png";

export default function DestinationHero() {
  return (
    <section className="pt-6 md:pt-0">
      <h1 className="sr-only">
        مقاصد گردشگری برتر جهان - سفر بعدی ایرانیان
      </h1>

      <div className="ns-container">
        {/* ═══ هیرو یکپارچه (موبایل + دسکتاپ) ═══ */}
        <div className="relative hidden md:block w-full aspect-[16/7] lg:aspect-[21/8]">
          <Image
            src={DESTINATION_HERO_IMAGE}
            alt="مقصدهای گردشگری برتر جهان"
            fill
            sizes="(max-width: 1280px) 100vw, 1280px"
            quality={85}
            priority
            fetchPriority="high"
            className="object-cover object-center md:object-contain md:object-top"
          />
        </div>
      </div>
    </section>
  );
}