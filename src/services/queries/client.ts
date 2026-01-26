import { QueryClient } from "@tanstack/react-query";

// konfigurasi global react-query
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});