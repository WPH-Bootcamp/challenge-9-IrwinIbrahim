import banner from "@/assets/images/cover-home.svg";

export default function HeroBanner() {
  return (
    <div className="px-4 py-6">
      <img
        src={banner}
        alt="Food Banner"
        className="w-full rounded-xl object-cover"
      />
    </div>
  );
}
