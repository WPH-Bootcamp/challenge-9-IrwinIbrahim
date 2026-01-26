import axios from "./axios";
import type { RestaurantCategory, Restaurant } from "@/types";

interface Params {
  category?: RestaurantCategory | null;
  search?: string;
  sort?: string;
}

export async function getRestaurants(params: Params): Promise<Restaurant[]> {
  const { category, search, sort } = params;

  let url = "/api/resto";

  // kalau backend pakai path-based
  if (category) {
    url = `/api/resto/${category}`;
  }

  const res = await axios.get(url, {
    params: {
      search,
      sort,
    },
  });

  return res.data.restaurants ?? res.data;
}
