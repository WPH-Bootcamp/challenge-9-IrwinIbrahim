// src/pages/Home.tsx
import { useState, useEffect } from "react";
import { useRestaurantsQuery } from "@/services/queries/useRestaurantsQuery";
import RestaurantList from "@/components/RestaurantList";
import HeroBanner from "@/components/HeroBanner";
import Footer from "@/components/Footer";
import type { RestaurantCategory } from "@/types";

export default function Home() {
  const [selectedCategory, setSelectedCategory] =
    useState<RestaurantCategory>("all-restaurant");

  // Nearby location
  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLong, setUserLong] = useState<number | null>(null);

  // Pagination
  const [page, setPage] = useState(1);
  const limit = 20;
  const range = 10; // untuk nearby

  // Search keyword
  const [search, setSearch] = useState("");

  // Ambil lokasi browser jika kategori nearby
  useEffect(() => {
    if (selectedCategory === "nearby" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLat(position.coords.latitude);
          setUserLong(position.coords.longitude);
        },
        (error) => {
          console.error("Error getting user location:", error.message);
        },
      );
    }
  }, [selectedCategory]);

  // Tentukan query params
  const queryParams =
    selectedCategory === "nearby"
      ? {
          category: "nearby" as RestaurantCategory,
          lat: userLat ?? 0, // default 0 kalau belum ada
          long: userLong ?? 0,
          range,
          limit,
          search: search || undefined,
        }
      : {
          category: selectedCategory,
          page,
          limit,
          search: search || undefined,
        };

  // Query
  const {
    data: restaurants,
    isLoading,
    isError,
  } = useRestaurantsQuery(queryParams);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner search={search} setSearch={setSearch} />

      {/* Konten utama */}
      <div className="p-4 flex-grow">
        <h1 className="text-2xl font-bold mb-4">Recomended</h1>

        {/* Pilih kategori */}
        <div className="flex gap-2 mb-4 flex-wrap">
          {["all-restaurant", "best-seller", "nearby", "delivery", "lunch"].map(
            (cat) => (
              <button
                key={cat}
                className={`px-4 py-2 rounded ${
                  selectedCategory === cat
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => {
                  setSelectedCategory(cat as RestaurantCategory);
                  setPage(1); // reset page saat ganti kategori
                }}
              >
                {cat}
              </button>
            ),
          )}
        </div>

        {/* Konten */}
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error loading restaurants.</p>}
        {!isLoading && restaurants && <RestaurantList data={restaurants} />}

        {/* Pagination sederhana */}
        {selectedCategory !== "nearby" &&
          restaurants &&
          restaurants.length === limit && (
            <div className="mt-4 flex justify-center gap-2">
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
              >
                Previous
              </button>
              <span className="px-2 py-2">{page}</span>
              <button
                className="px-4 py-2 bg-gray-200 rounded"
                onClick={() => setPage((p) => p + 1)}
              >
                Next
              </button>
            </div>
          )}
      </div>

      <Footer />
    </div>
  );
}
