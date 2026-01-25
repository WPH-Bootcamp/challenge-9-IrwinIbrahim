import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/axios";
import type { RestaurantCategory } from "@/types";

export const useRestaurants = (category: RestaurantCategory) => {
  return useQuery({
    queryKey: ["restaurants", category ?? "all"],
    queryFn: async () => {
      const res = await api.get("/api/resto", {
        params: category ? { category } : {},
      });
      return res.data.data.restaurants;
    },
  });
};
