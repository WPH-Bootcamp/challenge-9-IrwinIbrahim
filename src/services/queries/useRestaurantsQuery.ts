import { useQuery, type UseQueryOptions } from "@tanstack/react-query";
import api from "@/services/api/axios";
import type { Restaurant } from "@/types";
import { useAuth } from "@/context/AuthContext";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export interface RestaurantsQueryParams {
  lat?: number;
  lng?: number;
  location?: string;
  range?: number;
  priceMin?: number;
  priceMax?: number;
  rating?: number;
  category?: string | null;
  search?: string;
  page?: number;
  limit?: number;
}

interface RestaurantsResponse {
  success: boolean;
  data: {
    restaurants: Restaurant[];
    pagination?: {
      page: number;
      limit: number;
      total: number;
      totalPages: number;
    };
  };
}

export function useRestaurantsQuery(params: RestaurantsQueryParams = {}) {
  const { token } = useAuth();

  const queryFn = async (): Promise<Restaurant[]> => {
    const query = new URLSearchParams();

    // Nearby biasanya butuh lat/lng
    if (params.lat) query.append("lat", params.lat.toString());
    if (params.lng) query.append("lng", params.lng.toString());

    if (params.location) query.append("location", params.location);
    if (params.range) query.append("range", params.range.toString());
    if (params.priceMin) query.append("priceMin", params.priceMin.toString());
    if (params.priceMax) query.append("priceMax", params.priceMax.toString());
    if (params.rating) query.append("rating", params.rating.toString());
    if (params.search) query.append("q", params.search);
    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());

    // Tambahkan category hanya jika bukan nearby
    if (params.category && params.category !== "nearby") {
      query.append("category", params.category);
    }

    // Tentukan endpoint
    let endpoint = "/api/resto/recommended";
    if (params.category === "best-seller") endpoint = "/api/resto/best-seller";
    else if (params.category === "nearby") endpoint = "/api/resto/nearby";
    else if (params.search) endpoint = "/api/resto/search";

    const url = `${BASE_URL}${endpoint}?${query.toString()}`;
    console.log("Fetching restaurants from:", url);

    // Tentukan header: best-seller tidak perlu token
    const headers =
      params.category === "best-seller"
        ? undefined
        : token
          ? { Authorization: `Bearer ${token}` }
          : undefined;

    const res = await api.get<RestaurantsResponse>(url, { headers });
    console.log("API response:", res.data);

    return res.data.data.restaurants || [];
  };

  const options: UseQueryOptions<Restaurant[], Error> = {
    queryKey: ["restaurants", params],
    queryFn,
    // keepPreviousData: true, // opsional untuk paginasi
  };

  return useQuery<Restaurant[], Error>(options);
}
