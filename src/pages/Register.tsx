import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import axios from "axios";

import burgerBanner from "@/assets/images/burger-banner.svg";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
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
      {/* Left Image Section */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center"
        style={{ backgroundImage: `url(${burgerBanner})` }}
      />

      {/* Right Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md space-y-6">
          <h1 className="text-4xl font-bold text-center">Foody</h1>
          <p className="text-center text-muted-foreground">
            Create your account <br /> Join us and start ordering!
          </p>

          {/* Tabs */}
          <div className="flex justify-center gap-4 text-sm font-medium">
            <Button variant="ghost" onClick={() => navigate("/login")}>Sign In</Button>
            <Button variant="ghost" className="text-red-600">Sign Up</Button>
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={handleRegister}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
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
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
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
                autoComplete="new-password"
                required
                minLength={8}
              />
            </div>
            <Button type="submit" className="w-full bg-red-600 text-white hover:bg-red-700">
              Register
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}