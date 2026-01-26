import { Card, CardHeader, CardTitle, CardContent } from "@/ui/card";
import { useOrdersQuery } from "@/services/queries/useOrdersQuery";

export default function OrdersPage() {
  const { data: orders, isLoading, error } = useOrdersQuery();

  if (isLoading) return <p className="p-6">Loading orders...</p>;
  if (error) return <p className="p-6">Error loading orders</p>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">My Orders</h1>
      {orders?.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <CardTitle>Order {order.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Status: {order.status}</p>
            <p>Total: ${order.total}</p>
            {order.createdAt && <p>Date: {new Date(order.createdAt).toLocaleString()}</p>}
          </CardContent>
        </Card>
      ))}
    </div>
  );
}