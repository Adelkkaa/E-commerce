import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProductListSlice {
  name: string;
  priceFrom: string;
  priceTo: string;
  categories: string[];
}

const initialState: IProductListSlice = {
  name: "",
  priceFrom: "",
  priceTo: "",
  categories: [],
};

export const ProductListSlice = createSlice({
  name: "ProductList",
  initialState,
  reducers: {
    selectName(state, { payload }: PayloadAction<string>) {
      return {
        ...state,
        name: payload,
      };
    },
    selectPriceFrom(state, { payload }: PayloadAction<string>) {
      return {
        ...state,
        priceFrom: payload,
      };
    },
    selectPriceTo(state, { payload }: PayloadAction<string>) {
      return {
        ...state,
        priceTo: payload,
      };
    },
    selectCategories(state, { payload }: PayloadAction<string[]>) {
      return {
        ...state,
        categories: payload,
      };
    },
    clearFilters(state) {
      return {
        ...state,
        priceFrom: "",
        priceTo: "",
        categories: [],
      };
    },
  },
});

export const productListActions = ProductListSlice.actions;
export const productListReducer = ProductListSlice.reducer;
