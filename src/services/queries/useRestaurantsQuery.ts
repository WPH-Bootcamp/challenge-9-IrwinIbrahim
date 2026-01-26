import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import api from "@/services/api/axios";
import type { Restaurant, RestaurantCategory } from "@/types";
import { useAuth } from "@/context/AuthContext";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface RestaurantsQueryParams {
  category?: RestaurantCategory | null;
  location?: string;
  lat?: number;
  long?: number;
  range?: number;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  search?: string;
  page?: number;
  limit?: number;
}

interface RestaurantsResponse {
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
  };
  message?: string;
}

export function useRestaurantsQuery(params: RestaurantsQueryParams = {}) {
  const { token } = useAuth();

  const queryFn = async (): Promise<Restaurant[]> => {
    const query = new URLSearchParams();

    // Nearby: wajib pakai lat & long
    if (params.category === "nearby") {
      if (params.lat != null) query.append("lat", params.lat.toString());
      if (params.long != null) query.append("long", params.long.toString());
      if (params.range != null) query.append("range", params.range.toString());
      if (params.limit != null) query.append("limit", params.limit.toString());
    } else {
      // Semua kategori lain
      if (params.location) query.append("location", params.location);
      if (params.range != null) query.append("range", params.range.toString());
      if (params.priceMin != null)
        query.append("priceMin", params.priceMin.toString());
      if (params.priceMax != null)
        query.append("priceMax", params.priceMax.toString());
      if (params.rating != null)
        query.append("rating", params.rating.toString());
      if (params.category) query.append("category", params.category);
      if (params.search) query.append("q", params.search);
      if (params.page != null) query.append("page", params.page.toString());
      if (params.limit != null) query.append("limit", params.limit.toString());
    }

    // Tentukan endpoint berdasarkan kategori
    let endpoint = "/api/resto/recommended";
    switch (params.category) {
      case "best-seller":
        endpoint = "/api/resto/best-seller";
        break;
      case "nearby":
        endpoint = "/api/resto/nearby";
        break;
      case "delivery":
        endpoint = "/api/resto/delivery";
        break;
      case "lunch":
        endpoint = "/api/resto/lunch";
        break;
      case "recommended":
      default:
        endpoint = "/api/resto/recommended";
        break;
    }

    const url = `${BASE_URL}${endpoint}?${query.toString()}`;
    console.log("Fetching restaurants from:", url);

    // Kirim token ke semua request jika ada
    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;

    const res = await api.get<RestaurantsResponse>(url, { headers });
    console.log("API response:", res.data);

    // Response bisa berupa 'restaurants' atau 'recommendations'
    return res.data.data.restaurants || res.data.data.recommendations || [];
  };

  const options: UseQueryOptions<Restaurant[], Error> = {
    queryKey: ["restaurants", params],
    queryFn,
    // keepPreviousData: true, bisa diaktifkan untuk paginasi mulus
  };

  return useQuery<Restaurant[], Error>(options);
}
