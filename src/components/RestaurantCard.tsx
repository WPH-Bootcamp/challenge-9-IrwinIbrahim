import type { Restaurant } from "@/types";

interface Props {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: Props) {
  return (
    <div className="border rounded-lg p-4 shadow hover:shadow-md transition">
      <img
        src={restaurant.logo}
        alt={restaurant.name}
        className="w-16 h-16 mb-2 object-contain"
      />

      <h3 className="text-lg font-bold">{restaurant.name}</h3>

      <p className="text-sm text-muted-foreground">
        ⭐ {restaurant.star} · {restaurant.reviewCount} reviews
      </p>

      <p className="text-sm text-muted-foreground">
        {restaurant.category} · {restaurant.place}
        {typeof restaurant.distance === "number" &&
          ` · ${restaurant.distance.toFixed(1)} km`}
      </p>

      <button className="mt-2 text-red-600 text-sm underline">
        Show More
      </button>
    </div>
  );
}
