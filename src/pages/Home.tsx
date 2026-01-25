import { useState } from "react";
import { useRestaurantsQuery } from "@/services/queries/useRestaurantsQuery";
import type { Restaurant } from "@/types";

type QueryCategory = "best-seller" | "nearby" | "recommended" | null;

export default function HomePage() {
  const [category, setCategory] = useState<QueryCategory>("nearby");
  const [page, setPage] = useState(1);

  const { data: restaurants, isLoading, error } = useRestaurantsQuery({
    category,
    page,
    limit: 20,
    range: category === "nearby" ? 10 : undefined, // hanya untuk nearby
  });

  const handleCategoryChange = (newCategory: QueryCategory) => {
    setCategory(newCategory);
    setPage(1); // reset page saat ganti kategori
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Restaurants</h1>

      {/* Pilih kategori */}
      <div className="flex gap-2 mb-6">
        {["nearby", "recommended", "best-seller"].map((cat) => (
          <button
            key={cat}
            className={`px-3 py-1 rounded ${
              category === cat ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
            onClick={() => handleCategoryChange(cat as QueryCategory)}
          >
            {cat.replace("-", " ")}
          </button>
        ))}
      </div>

      {/* Loading */}
      {isLoading && <p>Loading...</p>}

      {/* Error */}
      {error && <p className="text-red-500">Error: {error.message}</p>}

      {/* List restoran */}
      {!isLoading && !error && restaurants && restaurants.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {restaurants.map((resto: Restaurant) => (
            <div
              key={resto.id}
              className="border p-4 rounded shadow hover:shadow-md transition"
            >
              <img
                src={resto.logo}
                alt={resto.name}
                className="w-full h-32 object-cover mb-2 rounded"
              />
              <h2 className="text-lg font-semibold">{resto.name}</h2>
              <p className="text-sm text-gray-600">{resto.place}</p>
              <p className="text-sm">
                ⭐ {resto.star} | {resto.reviewCount} reviews
              </p>
              {resto.distance !== undefined && category === "nearby" && (
                <p className="text-sm text-gray-500">{resto.distance} km away</p>
              )}
            </div>
          ))}
        </div>
      ) : (
        !isLoading && <p>No restaurants found.</p>
      )}

      {/* Pagination */}
      <div className="flex gap-2 mt-6">
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="px-3 py-1">{page}</span>
        <button
          className="px-3 py-1 bg-gray-300 rounded disabled:opacity-50"
          onClick={() => setPage((prev) => prev + 1)}
          disabled={!restaurants || restaurants.length < 20}
        >
          Next
        </button>
      </div>
    </div>
  );
}
