import CascadingCategoryExplorer, {
  type CategoryLevel1,
  type CategoryLevel2,
  type CategoryLevel3,
} from "@/components/shared/categories/CascadingCategoryExplorer";

export interface Region {
  id: number;
  name: string;
  slug: string;
  image: string;
}

export interface Country {
  id: number;
  regionId: number;
  name: string;
  slug: string;
  image: string;
}

export interface City {
  id: number;
  countryId: number;
  name: string;
  slug: string;
  image: string;
  count: number;
}

export interface DestinationCategoriesSectionProps {
  title?: string;
  subtitle?: string;
  regions: Region[];
  countries: Country[];
  cities: City[];
  initialRegionId?: number;
  initialCountryId?: number;
  videoSrc: string;
  videoPoster?: string;
  basePath?: string;
  basePathByLevel?: {
    country?: string;
    city?: string;
  };
  className?: string;
}

export default function DestinationCategoriesSection({
  title = "دسته‌بندی مقاصد",
  subtitle = "منطقه، کشور و شهر مورد نظر خود را انتخاب کنید",
  regions,
  countries,
  cities,
  initialRegionId,
  initialCountryId,
  videoSrc,
  videoPoster,
  basePath = "/destinations",
  basePathByLevel,
  className = "",
}: DestinationCategoriesSectionProps) {
  const normalizedCountries: CategoryLevel2[] = countries.map((c) => ({
    id: c.id,
    parent_id: c.regionId,
    name: c.name,
    slug: c.slug,
    image: c.image,
  }));

  const normalizedCities: CategoryLevel3[] = cities.map((c) => ({
    id: c.id,
    parent_id: c.countryId,
    name: c.name,
    slug: c.slug,
    image: c.image,
    count: c.count,
  }));

  return (
    <CascadingCategoryExplorer
      title={title}
      subtitle={subtitle}
      levels={regions}
      subLevels={normalizedCountries}
      subSubLevels={normalizedCities}
      initialLevel1Id={initialRegionId}
      initialLevel2Id={initialCountryId}
      videoSrc={videoSrc}
      videoPoster={videoPoster}
      basePath={basePath}
      basePathByLevel={
        basePathByLevel
          ? {
              level2: basePathByLevel.country,
              level3: basePathByLevel.city,
            }
          : undefined
      }
      level1Label="منطقه"
      level2Label="کشور"
      level3Label="شهر"
      className={className}
    />
  );
}