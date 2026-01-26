export interface CartMenuItem {
  restaurant: {
    id: number;
    name: string;
    logo: string;
  };
  items: {
    id: number;
    menu: {
      id: number;
      foodName: string;
      price: number;
      type: string;
      image: string;
    };
    quantity: number;
    itemTotal: number;
  }[];
  subtotal: number;
}

export interface CartSummary {
  totalItems: number;
  totalPrice: number;
  restaurantCount: number;
}

export interface CartResponse {
  cart: CartMenuItem[];
  summary: CartSummary;
}
