import Image from "next/image";

const DESTINATION_HERO_IMAGE = "/images/hero/Destination.png";

export default function DestinationHero() {
  return (
    <section className="pt-5">
      <h1 className="sr-only">
        مقاصد گردشگری برتر جهان - سفر بعدی ایرانیان
      </h1>

      <div className="ns-container">
        <div className="relative w-full aspect-[16/9] md:aspect-[2172/650] rounded-2xl md:rounded-none overflow-hidden bg-white">
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