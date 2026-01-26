import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Checkbox } from "@/ui/checkbox";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

import burgerBanner from "@/assets/images/burger-banner.svg";
import foodyLogo from "@/assets/images/foody.svg";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function LoginPage() {
  const [email, setEmail] = useState("john.doe@gmail.com");
  const [password, setPassword] = useState("john.doe123");
  const [remember, setRemember] = useState(true);
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin"); // indikator aktif
  const navigate = useNavigate();
  const { setToken } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE}/api/auth/login`, {
        email,
        password,
      });
      const token = response.data?.data?.token;
      if (token) {
        remember
          ? localStorage.setItem("token", token)
          : sessionStorage.setItem("token", token);
        setToken(token);
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

      <div className="w-full md:w-1/2 flex items-center justify-center p-10">
        <div className="w-full max-w-xl space-y-8">
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
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                className="text-lg py-3 px-4"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-lg">
                Password
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                minLength={6}
                className="text-lg py-3 px-4"
              />
            </div>
            <div className="flex items-center space-x-3">
              <Checkbox
                id="remember"
                checked={remember}
                onCheckedChange={(val) => setRemember(!!val)}
              />
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
