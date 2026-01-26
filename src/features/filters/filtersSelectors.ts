import type { RootState } from "@/app/store";

export const selectCategory = (state: RootState) =>
  state.filters.category;

export const selectSearch = (state: RootState) =>
  state.filters.search;

export const selectSort = (state: RootState) =>
  state.filters.sort;