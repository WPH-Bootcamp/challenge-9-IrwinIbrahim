import type { Restaurant } from "@/types";

interface Props {
  restaurant: Restaurant;
}

export default function RestaurantCard({ restaurant }: Props) {
  const {
    name,
    star,
    place,
    logo,
    category,
    reviewCount,
    distance,
  } = restaurant;

  return (
    <div className="border rounded-xl p-12 shadow hover:shadow-md transition flex items-start gap-4">
      {/* Logo di kiri */}
      <img
        src={logo}
        alt={name}
        className="w-16 h-16 object-contain"
      />

      {/* Teks di kanan */}
      <div className="flex flex-col">
        <h3 className="text-lg font-bold">{name}</h3>

        <p className="text-sm text-muted-foreground">
          ⭐ {star} · {reviewCount} reviews
        </p>

        <p className="text-sm text-muted-foreground">
          {category} · {place}
          {typeof distance === "number" && ` · ${distance.toFixed(1)} km`}
        </p>
      </div>
    </div>
  );
}