import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/axios";
import type { CartResponse } from "@/types/cart";

export function useCartQuery() {
  return useQuery<CartResponse>({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await api.get<{ success: boolean; data: CartResponse }>(
        "/api/cart",
      );
      return res.data.data;
    },
  });
}
