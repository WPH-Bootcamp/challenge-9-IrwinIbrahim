import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Checkbox } from "@/ui/checkbox";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import burgerBanner from "@/assets/images/burger-banner.svg";
import foodyLogo from "@/assets/images/foody.svg";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {},
  );
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const { setToken, setUser } = useAuth(); // tambahkan setUser

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: typeof errors = {};
    if (!email.includes("@")) newErrors.email = "Email must be valid";
    if (password.length < 6)
      newErrors.password = "Password must be at least 6 characters";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE}/api/auth/login`, {
        email,
        password,
      });
      const token = response.data?.data?.token;
      const user = response.data?.data?.user;

      if (token) {
        if (remember) {
          localStorage.setItem("token", token);
          localStorage.setItem("user", JSON.stringify(user)); // simpan user ke localStorage
        } else {
          sessionStorage.setItem("token", token);
          sessionStorage.setItem("user", JSON.stringify(user)); // simpan user ke sessionStorage
        }

        setToken(token);
        setUser(user); // simpan user ke context
        navigate("/");
      } else {
        alert("Token tidak ditemukan di response");
      }
    } catch (error: any) {
      alert(error.response?.data?.message || "Login gagal");
    }
  };

  return (
    <div className="flex min-h-screen">
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${burgerBanner})` }}
      />

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-xl space-y-8">
          {/* Logo + Text rata kiri */}
          <div className="flex justify-start">
            <img
              src={foodyLogo}
              alt="Foody Logo"
              className="w-40 h-40 object-contain"
            />
          </div>

          <div className="space-y-1 text-left">
            <p className="text-3xl font-semibold">Welcome</p>
            <p className="text-3xl font-semibold">Back</p>
            <p className="text-muted-foreground text-lg">
              Good to see you again! Let's eat
            </p>
          </div>

          {/* Tabs dengan indikator aktif */}
          <div className="flex justify-between gap-4 text-lg font-medium">
            <Button
              variant="ghost"
              onClick={() => setActiveTab("signin")}
              className={`w-1/2 py-3 ${
                activeTab === "signin"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              Sign In
            </Button>
            <Button
              variant="ghost"
              onClick={() => {
                setActiveTab("signup");
                navigate("/register");
              }}
              className={`w-1/2 py-3 ${
                activeTab === "signup"
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-black hover:bg-gray-200"
              }`}
            >
              Sign Up
            </Button>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={handleLogin}>
            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john.doe@gmail.com"
                autoComplete="email"
                required
                className={`text-lg py-3 px-4 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            {/* Password + Toggle Eye */}
            <div className="space-y-2 relative">
              <Label htmlFor="password" className="text-lg">
                Password
              </Label>
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="john.doe123"
                autoComplete="current-password"
                required
                minLength={6}
                className={`text-lg py-3 px-4 pr-10 ${errors.password ? "border-red-500" : ""}`}
              />
              <span
                className="absolute right-3 top-10 cursor-pointer text-gray-500"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            {/* Checkbox */}
            <div className="flex items-center gap-3 mt-2">
              <Checkbox
                id="remember"
                checked={remember}
                onCheckedChange={(val) => setRemember(!!val)}
                className={`
                  w-5 h-5 rounded-sm border-2 flex items-center justify-center
                  ${remember ? "bg-red-600 border-red-600 text-white" : "border-red-600 bg-transparent"}
                `}
              >
                {remember && (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={3}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                )}
              </Checkbox>
              <Label htmlFor="remember" className="text-lg">
                Remember Me
              </Label>
            </div>

            {/* Tombol Login */}
            <Button
              type="submit"
              className="w-full bg-red-600 text-white hover:bg-red-700 text-lg py-3"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
