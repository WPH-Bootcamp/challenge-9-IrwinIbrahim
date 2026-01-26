export type RestaurantCategory =
  | "best-seller"
  | "recommended"
  | "delivery"
  | "lunch"
  | "discount"
  | "nearby";

export interface SampleMenu {
  id: number;
  foodName: string;
  price: number;
  type: string;
  image: string;
}

export interface Restaurant {
  id: number;
  name: string;
  star: number;
  place: string;
  lat: number;
  long: number;
  logo: string;
  images: string[];
  category: string;
  reviewCount: number;
  sampleMenus: SampleMenu[];
  isFrequentlyOrdered: boolean;
  menuCount: number;
  priceRange: {
    min: number;
    max: number;
  };
  distance: number;
}

export interface RestaurantsResponse {
  success: boolean;
  data: {
    restaurants?: Restaurant[];
    recommendations?: Restaurant[];
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
    message?: string;
  };
  message?: string;
}
