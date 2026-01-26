import { useState, useEffect, useRef } from "react";
import burgerBanner from "@/assets/images/logomerah.png";
import logoBanner from "@/assets/images/logoputih.png";
import profilePic from "@/assets/images/profile.png";
import { useAuth } from "@/context/AuthContext";
import {
  FaShoppingCart,
  FaMapMarkerAlt,
  FaBoxOpen,
  FaSignOutAlt,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white text-black shadow-lg backdrop-blur-md"
          : "bg-transparent text-white"
      }`}
    >
      <div className="max-w-screen-xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo + Brand */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src={isScrolled ? burgerBanner : logoBanner}
            alt="Foody Logo"
            className="w-8 h-8 object-contain transition-opacity duration-500"
          />
          <span className="text-xl font-bold">Foody</span>
        </div>

        {/* Auth + Cart Section */}
        <div className="flex items-center gap-5 relative" ref={dropdownRef}>
          <FaShoppingCart
            className={`text-2xl cursor-pointer transition ${
              isScrolled
                ? "text-black hover:text-red-600"
                : "text-white hover:text-red-400"
            }`}
            onClick={() => navigate("/cart")}
          />

          {token && user ? (
            <div className="relative">
              {/* Avatar + Name (name hidden on mobile) */}
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowDropdown((prev) => !prev)}
              >
                <img
                  src={user.avatar || profilePic}
                  alt="User Profile"
                  className={`w-8 h-8 rounded-full object-cover border transition hover:ring-2 hover:ring-red-500 ${
                    isScrolled ? "border-black" : "border-white"
                  }`}
                />
                <span className="text-lg font-semibold hidden sm:inline">
                  {user.name}
                </span>
              </div>

              {/* Dropdown menu */}
              {showDropdown && (
                <div
                  className={`absolute right-0 mt-2 w-56 rounded-md shadow-lg z-50 ${
                    isScrolled
                      ? "bg-white text-black"
                      : "bg-gray-800 text-white"
                  }`}
                >
                  <ul className="py-2">
                    <li className="px-4 py-2 flex items-center gap-3">
                      <img
                        src={user.avatar || profilePic}
                        alt="User"
                        className="w-8 h-8 rounded-full object-cover border"
                      />
                      <span className="font-semibold">{user.name}</span>
                    </li>
                    <li
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate("/address")}
                    >
                      <FaMapMarkerAlt className="text-sm" />
                      <span>Delivery Address</span>
                    </li>
                    <li
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => navigate("/orders")}
                    >
                      <FaBoxOpen className="text-sm" />
                      <span>My Orders</span>
                    </li>
                    <li
                      className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 cursor-pointer"
                      onClick={() => {
                        logout();
                        navigate("/login");
                      }}
                    >
                      <FaSignOutAlt className="text-sm" />
                      <span>Logout</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className={`px-4 py-2 rounded font-semibold transition ${
                  isScrolled
                    ? "bg-gray-900 text-white hover:bg-gray-700"
                    : "bg-white text-gray-900 hover:bg-gray-200"
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/register")}
                className={`px-4 py-2 rounded font-semibold border transition ${
                  isScrolled
                    ? "border-gray-900 text-gray-900 hover:bg-gray-100"
                    : "border-white text-white hover:bg-white hover:text-gray-900"
                }`}
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
