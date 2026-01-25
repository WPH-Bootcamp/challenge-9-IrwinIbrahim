import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/axios";
import type { MenuItem } from "@/types";

interface MenusResponse {
  menus: MenuItem[];
}

export function useMenusQuery(restaurantId: number) {
  return useQuery<MenuItem[]>({
    queryKey: ["menus", restaurantId],
    enabled: !!restaurantId,
    queryFn: async () => {
      const response = await api.get<MenusResponse>(
        `/api/resto/${restaurantId}/menu`,
      );
      return response.data.menus;
    },
  });
}
