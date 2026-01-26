import type { Restaurant } from "@/types";
import RestaurantCard from "./RestaurantCard";
import EmptyState from "./EmptyState";

interface RestaurantListProps {
  data: Restaurant[];
}

export default function RestaurantList({ data }: RestaurantListProps) {
  if (data.length === 0) {
    return (
      <EmptyState
        title="No restaurants found"
        description="Try adjusting your search or filters to discover more options."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((restaurant) => (
        <RestaurantCard key={restaurant.id} restaurant={restaurant} />
      ))}
    </div>
  );
}
