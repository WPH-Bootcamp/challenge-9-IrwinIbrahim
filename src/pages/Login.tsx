import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { Checkbox } from "@/ui/checkbox";
import axios from "axios";
import { useAuth } from "@/context/AuthContext";

// ✅ Import gambar dari src/assets/images
import burgerBanner from "@/assets/images/burger-banner.svg";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function LoginPage() {
  const [email, setEmail] = useState("john.doe@gmail.com");
  const [password, setPassword] = useState("john.doe123");
  const [remember, setRemember] = useState(true);
  const navigate = useNavigate();
  const { setToken } = useAuth();

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await axios.post(`${API_BASE}/api/auth/login`, {
      email,
      password,
    });

    console.log(response.data); // cek isi response

    // ✅ Ambil token dari dalam data
    const token = response.data?.data?.token;

    if (token) {
      remember
        ? localStorage.setItem("token", token)
        : sessionStorage.setItem("token", token);

      setToken(token); // update AuthContext
      navigate("/");   // redirect ke Home
    } else {
      alert("Token tidak ditemukan di response");
    }
  } catch (error: any) {
    alert(error.response?.data?.message || "Login gagal");
  }
};

  return (
    <div className="flex min-h-screen">
      {/* Left Image Section */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${burgerBanner})` }}
      />

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-4xl font-bold">Foody</h1>
          <div className="space-y-1">
            <p className="text-2xl font-semibold">Welcome</p>
            <p className="text-2xl font-semibold">Back</p>
            <p className="text-muted-foreground">
              Good to see you again! Let's eat
            </p>
          </div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 text-sm font-medium">
            <Button variant="ghost" className="text-red-600">Sign In</Button>
            <Button variant="ghost" onClick={() => navigate("/register")}>
              Sign Up
            </Button>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                minLength={6}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="remember"
                checked={remember}
                onCheckedChange={(val) => setRemember(!!val)}
              />
              <Label htmlFor="remember">Remember Me</Label>
            </div>
            <Button
              type="submit"
              className="w-full bg-red-600 text-white hover:bg-red-700"
            >
              Login
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}