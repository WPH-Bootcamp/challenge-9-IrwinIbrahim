import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "@/features/cart/cartSlice";
import filtersReducer from "@/features/filters/filtersSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    filters: filtersReducer,
  },
});

// Types Global
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
