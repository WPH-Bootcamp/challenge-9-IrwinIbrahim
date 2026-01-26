import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import api from "@/services/api/axios";
import type { Restaurant, RestaurantCategory } from "@/types";
import { useAuth } from "@/context/AuthContext";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface RestaurantsQueryParams {
  category?: RestaurantCategory | null;
  location?: string;
  lat?: number; // ⬅ untuk nearby
  long?: number; // ⬅ untuk nearby
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

    if (params.category === "nearby") {
      // ✅ Nearby: wajib pakai lat & long
      if (params.lat != null) query.append("lat", params.lat.toString());
      if (params.long != null) query.append("long", params.long.toString());
      if (params.range != null) query.append("range", params.range.toString());
      if (params.limit != null) query.append("limit", params.limit.toString());
      if (params.search) query.append("search", params.search);
    } else {
      // ✅ Semua kategori lain
      if (params.location) query.append("location", params.location);
      if (params.range != null) query.append("range", params.range.toString());
      if (params.priceMin != null)
        query.append("priceMin", params.priceMin.toString());
      if (params.priceMax != null)
        query.append("priceMax", params.priceMax.toString());
      if (params.rating != null)
        query.append("rating", params.rating.toString());
      if (params.category) query.append("category", params.category);
      if (params.search) query.append("search", params.search);
      if (params.page != null) query.append("page", params.page.toString());
      if (params.limit != null) query.append("limit", params.limit.toString());
    }

    // ✅ Tentukan endpoint
    let endpoint = "/api/resto";
    if (params.category === "nearby") {
      endpoint = "/api/resto/nearby";
    } else if (params.category === "best-seller") {
      endpoint = "/api/resto/best-seller";
    } else if (params.category === "recommended") {
      endpoint = "/api/resto/recommended";
    }
    // ⚠️ kategori lain (delivery, lunch, dll.) tetap pakai /api/resto dengan query category

    const url = `${BASE_URL}${endpoint}?${query.toString()}`;
    console.log("Fetching restaurants from:", url);

    const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
    const res = await api.get<RestaurantsResponse>(url, { headers });
    console.log("API response:", res.data);

    return res.data.data.restaurants || res.data.data.recommendations || [];
  };

  const options: UseQueryOptions<Restaurant[], Error> = {
    queryKey: ["restaurants", params],
    queryFn,
    // keepPreviousData: true (bisa diaktifkan untuk paginasi mulus)
  };

  return useQuery<Restaurant[], Error>(options);
}
