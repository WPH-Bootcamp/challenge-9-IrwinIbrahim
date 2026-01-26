import { Button } from "@/ui/button";
import { Input } from "@/ui/input";
import { Label } from "@/ui/label";
import { useNavigate } from "react-router-dom";

export default function CheckoutPage() {
  const navigate = useNavigate();

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Order placed successfully!");
    navigate("/orders");
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Checkout</h1>
      <form className="space-y-4" onSubmit={handleCheckout}>
        <div>
          <Label htmlFor="address">Delivery Address</Label>
          <Input id="address" placeholder="123 Street, City" />
        </div>
        <div>
          <Label htmlFor="payment">Payment Method</Label>
          <Input id="payment" placeholder="Credit Card / Cash" />
        </div>
        <Button type="submit" className="w-full">Place Order</Button>
      </form>
    </div>
  );
}