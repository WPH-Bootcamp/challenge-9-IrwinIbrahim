import { useState, useEffect } from "react";
import { useRestaurantsQuery } from "@/services/queries/useRestaurantsQuery";
import RestaurantList from "@/components/RestaurantList";
import HeroBanner from "@/components/HeroBanner";
import Footer from "@/components/Footer";
import TabCategoryFilter from "@/components/TabCategoryFilter";
import EmptyState from "@/components/EmptyState";
import { useAppSelector } from "@/features/hooks";
import type { RestaurantCategory } from "@/types";
import RestaurantSkeleton from "@/components/RestaurantSkeleton";

export default function Home() {
  const selectedCategory =
    useAppSelector((state) => state.filters.category) ?? "all-restaurant";

  const [userLat, setUserLat] = useState<number | null>(null);
  const [userLong, setUserLong] = useState<number | null>(null);

  const [page, setPage] = useState(1);
  const limit = 20;
  const range = 10;

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(handler);
  }, [search]);

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

  // Tentukan query params dengan fallback otomatis
  let queryParams: any;
  if (selectedCategory === "nearby") {
    if (userLat != null && userLong != null) {
      queryParams = {
        category: "nearby" as RestaurantCategory,
        lat: userLat,
        long: userLong,
        range,
        limit,
        search: debouncedSearch || undefined,
      };
    } else {
      // fallback otomatis ke recommended
      queryParams = {
        category: "recommended" as RestaurantCategory,
        page,
        limit,
        search: debouncedSearch || undefined,
      };
    }
  } else {
    queryParams = {
      category: selectedCategory as RestaurantCategory,
      page,
      limit,
      search: debouncedSearch || undefined,
    };
  }

  const {
    data: restaurants,
    isLoading,
    isError,
  } = useRestaurantsQuery(queryParams);

  return (
    <div className="flex flex-col min-h-screen">
      <HeroBanner search={search} setSearch={setSearch} />

      {/* Category Filter */}
      <div className="px-16">
        <TabCategoryFilter />
      </div>

      {/* Konten utama */}
      <div className="p-4 flex-grow">
        <div className="flex-grow px-12 py-6">
          <h1 className="text-2xl font-bold mb-4">Recommended</h1>

          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <RestaurantSkeleton key={i} />
              ))}
            </div>
          )}

          {isError && (
            <EmptyState
              title="Error loading restaurants"
              description="Please try again later."
            />
          )}

          {/* Nearby tanpa lokasi → fallback ke recommended */}
          {selectedCategory === "nearby" &&
            (userLat === null || userLong === null) &&
            !isLoading && (
              <EmptyState
                title="Location not available"
                description="Showing recommended restaurants instead."
              />
            )}

          {/* Data ada */}
          {!isLoading && restaurants && restaurants.length > 0 && (
            <RestaurantList data={restaurants} />
          )}

          {/* Data kosong */}
          {!isLoading && restaurants && restaurants.length === 0 && (
            <EmptyState
              title="No restaurants found"
              description="Try adjusting your search or filters to discover more options."
            />
          )}
        </div>

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
