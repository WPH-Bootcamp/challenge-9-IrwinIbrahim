import type { MenuItem, MenuExtra } from "./menu";

export type OrderStatus =
  | "pending"
  | "paid"
  | "cancelled"
  | "completed";

export interface OrderItem {
  menu: MenuItem;
  quantity: number;
  selectedExtras?: MenuExtra[];
  note?: string;
}

export interface Order {
  id: number;
  userId: number;
  restaurantId: number;
  items: OrderItem[];
  totalPrice: number;
  status: OrderStatus;
  createdAt: string;
  total: number;
}
