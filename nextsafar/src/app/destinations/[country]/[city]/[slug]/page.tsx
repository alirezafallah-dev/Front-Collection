import type { Metadata } from "next";
import { notFound } from "next/navigation";
import DestinationDetailPage from "@/components/destinations/single/DestinationDetailPage";
import destinationsData from "@/data/destinations.json";
import categoriesData from "@/data/mock/destination-categories.json";
import type { Destination } from "@/types/destination";

interface Props {
  params: Promise<{ country: string; city: string; slug: string }>;
}

export async function generateStaticParams() {
  return destinationsData.destinations.map((d) => ({
    country: d.country,
    city: d.city,
    slug: d.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const destination = destinationsData.destinations.find((d) => d.slug === slug);
  if (!destination) return { title: "مقصد یافت نشد" };

  const country = categoriesData.countries.find((c) => c.slug === destination.country);
  const city = categoriesData.cities.find((c) => c.slug === destination.city);

  return {
    title: `${destination.title} | ${city?.name || ""} ${country?.name || ""}`,
    description: destination.description?.slice(0, 160),
    openGraph: {
      title: destination.title,
      description: destination.description?.slice(0, 160),
      images: [destination.image],
    },
  };
}

export default async function DestinationPage({ params }: Props) {
  const { slug } = await params;
  const destination = destinationsData.destinations.find(
    (d) => d.slug === slug
  ) as Destination | undefined;

  if (!destination) notFound();

  return <DestinationDetailPage destination={destination} />;
}