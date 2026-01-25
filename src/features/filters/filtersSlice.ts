import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RestaurantCategory } from "@/types";

export interface FiltersState {
  category: RestaurantCategory | null;
  search: string;
  sort: string;
}

const initialState: FiltersState = {
  category: null,
  search: "",
  sort: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategory(state, action: PayloadAction<RestaurantCategory | null>) {
      state.category = action.payload;
    },
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
    setSort(state, action: PayloadAction<string>) {
      state.sort = action.payload;
    },
  },
});

export const { setCategory, setSearch, setSort } = filtersSlice.actions;
export default filtersSlice.reducer;
