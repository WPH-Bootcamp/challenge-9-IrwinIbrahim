import { useCartQuery } from "@/services/queries/useCartQuery";

export default function Cart() {
  const { data } = useCartQuery();

  if (!data) return <p>Loading...</p>;

  return (
    <div>
      {data.cart.map((group) => (
        <div key={group.restaurant?.id}>
          <h3>{group.restaurant?.name || "No Name"}</h3>
          <img src={group.restaurant?.logo} alt={group.restaurant?.name} />

          {group.items.map((item) => (
            <div key={item.id}>
              <p>{item.menu.foodName}</p>
              <p>Qty: {item.quantity}</p>
              <p>Price: ${item.menu.price}</p>
              <p>Total: ${item.itemTotal}</p>
            </div>
          ))}

          <p>Subtotal: ${group.subtotal}</p>
        </div>
      ))}
    </div>
  );
}
