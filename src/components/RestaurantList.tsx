import type { Restaurant } from "@/types";

interface RestaurantListProps {
  data: Restaurant[];
}

export default function RestaurantList({ data }: RestaurantListProps) {
  console.log("Rendering RestaurantList with data:", data);

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
        console.log("Rendering restaurant:", restaurant);
        return (
          <div key={restaurant.id} className="p-4 border rounded shadow">
            <img
              src={restaurant.logo || "/no-image.png"}
              alt={restaurant.name}
              className="w-full h-32 object-cover rounded"
            />
            <h2 className="text-lg font-bold mt-2">{restaurant.name}</h2>
            <p>Category: {restaurant.category}</p>
            <p>Star: {restaurant.star}</p>
            <p>Place: {restaurant.place}</p>
            <p>Distance: {restaurant.distance} km</p>
          </div>
        );
      })}
    </div>
  );
}
