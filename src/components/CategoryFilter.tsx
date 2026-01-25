import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { setCategory } from "@/features/filters/filtersSlice";
import type { RestaurantCategory } from "@/types";

const categories: { label: string; value: RestaurantCategory | null }[] = [
  { label: "All", value: null },
  { label: "Nearby", value: "nearby" },
  { label: "Best Seller", value: "best-seller" },
  { label: "Delivery", value: "delivery" },
  { label: "Lunch", value: "lunch" },
];

export default function CategoryFilter() {
  const dispatch = useAppDispatch();
  const active = useAppSelector((state) => state.filters.category);

  return (
    <div className="flex gap-4 overflow-x-auto px-4 py-4">
      {categories.map((cat) => (
        <button
          key={cat.label}
          onClick={() => dispatch(setCategory(cat.value))}
          className={`px-4 py-2 rounded-full whitespace-nowrap text-sm
            ${
              active === cat.value
                ? "bg-red-500 text-white"
                : "bg-gray-100 text-gray-600"
            }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
