import RestaurantCard from "./RestaurantCard";
import { useRecommendedRestaurantsQuery } from "@/services/queries/useRecommendedRestaurantsQuery";

export default function RecommendedSection() {
  const { data, isLoading, isError } =
    useRecommendedRestaurantsQuery();

  if (isLoading) return <p className="p-4">Loading...</p>;
  if (isError) return <p className="p-4 text-red-600">Failed to load</p>;

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">Recommended</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.map((restaurant) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
          />
        ))}
      </div>
    </div>
  );
}
