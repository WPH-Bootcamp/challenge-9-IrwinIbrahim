import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "@/pages/Home";
import CartPage from "@/pages/Cart";
import CheckoutPage from "@/pages/Checkout";
import OrdersPage from "@/pages/Orders";
import LoginPage from "@/pages/Login";
import RegisterPage from "@/pages/Register";

import ProtectedRoute from "@/components/ProtectedRoute";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/queries/client";

import { AuthProvider } from "@/context/AuthContext";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <HomePage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cart"
              element={
                <ProtectedRoute>
                  <CartPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <CheckoutPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/orders"
              element={
                <ProtectedRoute>
                  <OrdersPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
