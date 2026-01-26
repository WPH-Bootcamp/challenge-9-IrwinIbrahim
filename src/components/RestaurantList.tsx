import type { Restaurant } from "@/types";
import RestaurantCard from "./RestaurantCard";

interface RestaurantListProps {
  data: Restaurant[];
}

export default function RestaurantList({ data }: RestaurantListProps) {
  console.log("Rendering RestaurantList with data:", data); // 🔹 debug

  if (!Array.isArray(data)) {
    console.error("RestaurantList: data is not an array!", data);
    return <p>Data error: expected an array</p>;
  }

  if (data.length === 0) {
    return <p>No restaurants found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((restaurant) => {
        console.log("Rendering restaurant:", restaurant); // debug per item
        return <RestaurantCard key={restaurant.id} restaurant={restaurant} />;
      })}
    </div>
  );
}
