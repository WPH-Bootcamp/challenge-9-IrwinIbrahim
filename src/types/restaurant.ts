export type RestaurantCategory =
  | "nearby"
  | "recommended"
  | "best-seller"
  | "delivery"
  | "lunch";

export interface Restaurant {
  id: number;
  name: string;
  star: number;
  place: string;
  logo: string;
  images: string[];
  category: string;
  reviewCount: number;
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
    restaurants: Restaurant[];
    pagination: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export interface RestaurantsQueryParams {
  location?: string;
  range?: number;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  category?: RestaurantCategory | null;
  search?: string;
  page?: number;
  limit?: number;
}
