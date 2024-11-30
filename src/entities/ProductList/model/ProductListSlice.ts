import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProductListSlice {
  inStock: string | null;
  name: string;
  priceFrom: string;
  priceTo: string;
}

const initialState: IProductListSlice = {
  inStock: "true",
  name: "",
  priceFrom: "",
  priceTo: "",
};

export const ProductListSlice = createSlice({
  name: "ProductList",
  initialState,
  reducers: {
    selectInStock(state, { payload }: PayloadAction<string | null>) {
      return {
        ...state,
        inStock: payload,
      };
    },
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
    clearFilters(state) {
      return {
        ...state,
        inStock: null,
        priceFrom: "",
        priceTo: "",
      };
    },
  },
});

export const productListActions = ProductListSlice.actions;
export const productListReducer = ProductListSlice.reducer;
