import { useAppDispatch, useAppSelector } from "@/features/hooks";
import { setCategory } from "@/features/filters/filtersSlice";
import type { RestaurantCategory } from "@/types";
import {  useEffect } from "react";
// Import PNG icons
import burgerIcon from "@/assets/icons/all.png";
import mapIcon from "@/assets/icons/nearby.png";
import discountIcon from "@/assets/icons/discount.png";
import trophyIcon from "@/assets/icons/best-seller.png";
import deliveryIcon from "@/assets/icons/delivery.png";
import lunchIcon from "@/assets/icons/lunch.png";

const categories: {
  label: string;
  value: RestaurantCategory | null;
  icon: string;
}[] = [
  { label: "All Restaurant", value: "recommended", icon: burgerIcon },
  { label: "Nearby", value: "nearby", icon: mapIcon },
  { label: "Discount", value: "discount", icon: discountIcon },
  { label: "Best Seller", value: "best-seller", icon: trophyIcon },
  { label: "Delivery", value: "delivery", icon: deliveryIcon },
  { label: "Lunch", value: "lunch", icon: lunchIcon },
];

export default function TabCategoryFilter() {
  const dispatch = useAppDispatch();
  const active = useAppSelector((state) => state.filters.category);

  // Set default ke "recommended" kalau belum ada category
  useEffect(() => {
    if (!active) {
      dispatch(setCategory("recommended"));
    }
  }, [active, dispatch]);

  return (
    <div className="w-full px-8 py-6 flex justify-center">
      <div className="flex flex-wrap justify-center gap-6 max-w-5xl">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => dispatch(setCategory(cat.value))}
            className={`flex flex-col items-center justify-center min-w-[110px] h-[120px] rounded-xl shadow-md transition-all
              ${active === cat.value ? "bg-red-500 text-white" : "bg-gray-100 text-gray-700"}
              hover:scale-105`}
          >
            <img
              src={cat.icon}
              alt={cat.label}
              className="w-12 h-12 mb-3 object-contain"
            />
            <span className="text-sm font-semibold text-center">{cat.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}