import { Plane } from "lucide-react";

const CITIES = [
  "مشهد", "کیش", "استانبول", "دبی", "شیراز", "تفلیس", "کربلا", "آنکارا", "وان", "باکو",
];

export function HorizonBand() {
  const items = [...CITIES, ...CITIES];

  return (
    <div className="relative">
      {/* موج بالای افق */}
      <svg className="block w-full text-navy-950" viewBox="0 0 1440 70" fill="none" preserveAspectRatio="none" aria-hidden>
        <path
          d="M0 70 V38 C 240 8, 480 8, 720 38 C 960 68, 1200 68, 1440 38 V70 Z"
          fill="currentColor"
        />
      </svg>

      {/* نوار افق با مقاصد */}
      <div className="marquee-hover overflow-hidden bg-navy-950 py-6">
        <div className="animate-marquee flex w-max items-center">
          {items.map((city, i) => (
            <span key={i} className="flex shrink-0 items-center gap-10 px-10">
              <span className="text-outline text-3xl font-black lg:text-4xl">{city}</span>
              <Plane className="h-5 w-5 rotate-45 text-brand-500" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}