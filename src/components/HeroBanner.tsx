import { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import burgerBanner from "@/assets/images/cover-home.svg";
import foodyLogo from "@/assets/images/foody-2.svg"; // logo saat scroll
import logoBanner from "@/assets/images/foody.svg";   // logo default
import profilePic from "@/assets/images/profile.png"; // ganti sesuai path gambar profil

interface HeroBannerProps {
  search: string;
  setSearch: (value: string) => void;
}

export default function HeroBanner({ search, setSearch }: HeroBannerProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // aktif jika scroll lebih dari 50px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="relative h-[500px] bg-cover bg-center"
      style={{ backgroundImage: `url(${burgerBanner})` }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 flex flex-col text-white">
        {/* Navbar */}
        <div
          className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 px-12 py-6 flex items-center justify-between ${
            isScrolled ? "bg-white text-black shadow-md" : "bg-transparent text-white"
          }`}
        >
          {/* Logo + Brand */}
          <div className="flex items-center gap-2">
            <img
              src={isScrolled ? logoBanner : foodyLogo }
              alt="Foody Logo"
              className="w-18 h-18 object-contain transition-all duration-300"
            />
          </div>

          {/* Profile Section */}
          <div className="flex items-center gap-4">
            <FaLock className="text-current text-2xl" />
            <img
              src={profilePic}
              alt="User Profile"
              className={`w-8 h-8 rounded-full object-cover border ${
                isScrolled ? "border-black" : "border-white"
              }`}
            />
            <span className="text-lg font-bold">John Doe</span>
          </div>
        </div>

        {/* Hero Content */}
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
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mt-4 w-full max-w-md px-4 py-2 rounded-md text-black"
          />
        </div>
      </div>
    </div>
  );
}