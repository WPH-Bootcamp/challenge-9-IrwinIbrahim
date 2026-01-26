export interface MenuExtra {
  id: number;
  name: string;
  price: number;
}

export interface MenuItem {
  id: number;
  restaurantId: number;
  name: string;
  description?: string;
  image: string;
  price: number;
  isAvailable: boolean;
  category?: string;
  extras?: MenuExtra[];
}
