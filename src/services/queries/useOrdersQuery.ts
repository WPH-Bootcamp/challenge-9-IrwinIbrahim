import { useQuery } from "@tanstack/react-query";
import api from "@/services/api/axios";
import type { Order } from "@/types";

interface OrdersResponse {
  orders: Order[];
}

export function useOrdersQuery() {
  return useQuery<Order[]>({
    queryKey: ["orders"],
    queryFn: async () => {
      const response = await api.get<OrdersResponse>("/api/orders");
      return response.data.orders;
    },
  });
}
