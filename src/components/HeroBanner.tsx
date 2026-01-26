import { useState } from "react";
import burgerBanner from "@/assets/images/cover-home.svg";
import Navbar from "@/components/Navbar";

interface HeroBannerProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export default function HeroBanner({ search, setSearch }: HeroBannerProps) {
  // state lokal untuk input
  const [inputValue, setInputValue] = useState(search);

  return (
    <div
      className="relative h-[500px] bg-cover bg-center"
      style={{ backgroundImage: `url(${burgerBanner})` }}
    >
      <div className="absolute inset-0 bg-black/40 flex flex-col text-white">
        <Navbar />

        <div className="flex flex-col justify-center items-center flex-grow text-center px-4 mt-24">
          <h1 className="text-3xl md:text-5xl font-bold">
            Explore Culinary Experiences
          </h1>
          <p className="mt-2 text-lg">
            Search and refine your choice to discover the perfect restaurant
          </p>
          <input
            type="text"
            placeholder="Search restaurants..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} // hanya update lokal
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                setSearch(inputValue); // commit ke parent state saat Enter
              }
            }}
            className="mt-4 w-full max-w-md px-4 py-2 rounded-md text-black focus:ring-2 focus:ring-red-500"
          />
        </div>
      </div>
    </div>
  );
}