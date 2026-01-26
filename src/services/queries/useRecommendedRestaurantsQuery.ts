import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/axios";
import type { Restaurant } from "@/types";

interface RecommendedResponse {
  restaurants: Restaurant[];
}

export function useRecommendedRestaurantsQuery() {
  return useQuery<Restaurant[]>({
    queryKey: ["recommended-restaurants"],
    queryFn: async () => {
      const response = await api.get<RecommendedResponse>(
        "/api/resto/recommended",
      );
      return response.data.restaurants;
    },
  });
}
