import { Button } from "@/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/ui/card";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const navigate = useNavigate();

  const cartItems = [
    { id: 1, name: "Pizza", price: 10, quantity: 2 },
    { id: 2, name: "Burger", price: 8, quantity: 1 },
  ];

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Your Cart</h1>
      {cartItems.map((item) => (
        <Card key={item.id}>
          <CardHeader>
            <CardTitle>{item.name}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Quantity: {item.quantity}</p>
            <p>Price: ${item.price}</p>
          </CardContent>
        </Card>
      ))}
      <Card>
        <CardFooter className="flex justify-between">
          <span className="font-bold">Total: ${total}</span>
          <Button onClick={() => navigate("/checkout")}>Checkout</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
