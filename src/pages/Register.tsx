import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import axios from "axios";

import burgerBanner from "@/assets/images/burger-banner.svg";
import foodyLogo from "@/assets/images/foody.svg"; 

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signup"); // indikator aktif
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_BASE}/api/auth/register`, {
        name,
        email,
        phone,
        password,
      });

      alert("Register berhasil!");
      navigate("/login");
    } catch (error: any) {
      alert(error.response?.data?.message || "Register gagal");
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
          
          <div className="flex justify-start">
            <img
              src={foodyLogo}
              alt="Foody Logo"
              className="w-40 h-40 object-contain"
            />
          </div>

          <div className="space-y-1 text-left">
            <p className="text-3xl font-semibold">Create your account</p>
            <p className="text-muted-foreground text-lg">
              Join us and start ordering!
            </p>
          </div>

          {/* Tabs seragam dengan Login */}
          <div className="flex justify-between gap-4 text-lg font-medium">
            <Button
              variant="ghost"
              onClick={() => {
                setActiveTab("signin");
                navigate("/login");
              }}
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
              onClick={() => setActiveTab("signup")}
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
          <form className="space-y-6" onSubmit={handleRegister}>
            <div className="space-y-2">
              <Label htmlFor="name" className="text-lg">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="text-lg py-3 px-4"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-lg">Email</Label>
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
              <Label htmlFor="phone" className="text-lg">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                required
                className="text-lg py-3 px-4"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-lg">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
                minLength={8}
                className="text-lg py-3 px-4"
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-red-600 text-white hover:bg-red-700 text-lg py-3"
            >
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}