export default function RestaurantSkeleton() {
  return (
    <div className="border rounded-xl p-6 shadow flex items-start gap-4 animate-pulse">
      {/* Logo skeleton */}
      <div className="w-16 h-16 bg-gray-300 rounded-md relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
      </div>

      {/* Text skeleton */}
      <div className="flex flex-col gap-2 flex-grow">
        <div className="h-4 bg-gray-300 rounded w-1/2 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
        </div>
        <div className="h-3 bg-gray-300 rounded w-1/3 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
        </div>
        <div className="h-3 bg-gray-300 rounded w-2/3 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shimmer_1.5s_infinite]" />
        </div>
      </div>
    </div>
  );
}