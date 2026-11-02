import type { Metadata } from "next";
import { unstable_cache } from "next/cache";
import DestinationsPage from "@/components/destinations/DestinationsPage";
import DestinationHero from "@/components/destinations/DestinationHero";
import DestinaitonHeroInfo from "@/components/destinations/DestinaitonHeroInfo";
import DestinationCategoriesSection from "@/components/destinations/DestinationCategoriesSection";
import destinationsData from "@/data/destinations.json";
import categoriesData from "@/data/mock/destination-categories.json";
import type { DestinationsData } from "@/types/destination";

export const metadata: Metadata = {
  title: "مقصدهای گردشگری | سفر بعدی ایرانیان",
  description: "کشف مقاصد گردشگری برتر جهان با جزئیات کامل، تصاویر و اطلاعات جامع",
  openGraph: {
    title: "مقصدهای گردشگری | سفر بعدی ایرانیان",
    description: "کشف مقاصد گردشگری برتر جهان",
    images: ["/images/hero/Travel-Destinations.png"],
  },
};

const getDestinationsData = unstable_cache(
  async (): Promise<DestinationsData> => destinationsData as DestinationsData,
  ["destinations-data"],
  { revalidate: 3600, tags: ["destinations"] }
);

export default async function DestinationsRoute() {
  const data = await getDestinationsData();

  return (
    <>
      <link
        rel="preload"
        href="/fonts/IRANSansX-Bold.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
      <link
        rel="preload"
        as="image"
        href="/images/hero/Destination.png"
        fetchPriority="high"
      />

      <DestinationHero />
      <DestinaitonHeroInfo />

      <DestinationCategoriesSection
        title="دسته‌بندی مقاصد"
        subtitle="منطقه، کشور و شهر مورد نظر خود را انتخاب کنید"
        regions={categoriesData.regions}
        countries={categoriesData.countries}
        cities={categoriesData.cities}
        videoSrc="/videos/destination-intro.mp4"
        videoPoster="/images/categories/destination-poster.jpg"
        basePathByLevel={{
          country: "/destinations",
          city: "",
        }}
      />

      <DestinationsPage data={data} />
    </>
  );
}