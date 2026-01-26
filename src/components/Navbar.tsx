import { useState, useEffect } from "react";
import { FaLock } from "react-icons/fa";
import burgerBanner from "@/assets/images/foody-2.svg"; // logo saat scroll
import logoBanner from "@/assets/images/foody.svg";   // logo default
import profilePic from "@/assets/images/profile.png";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // aktif jika scroll lebih dari 50px
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
        isScrolled ? "bg-white text-black shadow-md" : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          <img
            src={isScrolled ? burgerBanner : logoBanner}
            alt="Foody Logo"
            className="w-8 h-8 object-contain"
          />
          <span className="text-xl font-bold">Foody</span>
        </div>

        {/* Profile Section */}
        <div className="flex items-center gap-3">
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
    </header>
  );
}