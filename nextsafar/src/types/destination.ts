export interface Destination {
  id: number;
  title: string;
  title_en?: string;
  slug: string;
  country: string;
  city: string;
  type: string;
  image: string;
  gallery?: string[];
  description: string;
  rating: number;
  reviews: number;
  duration: string;
  duration_hours?: number;
  price_level: string;
  entrance_fee?: string;
  best_season: string[];
  activities: string[];
  highlights: string[];
  coordinates: {
    lat: number;
    lng: number;
  };
  opening_hours?: string;
  address: string;
  featured?: boolean;
}

export interface Tour {
  id: number;
  title: string;
  slug: string;
  destination_country: string;
  destination_city: string;
  related_destinations?: string[];
  image: string;
  duration_days: number;
  price: number;
  price_unit: string;
  category: string;
  difficulty: string;
  includes: string[];
  description: string;
  rating: number;
  reviews: number;
  featured?: boolean;
}

export interface DestinationsData {
  destinations: Destination[];
}

export interface ToursData {
  tours: Tour[];
}