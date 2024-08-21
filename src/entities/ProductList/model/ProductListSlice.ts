import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProductListSlice {
  inStock: string | null;
}

const initialState: IProductListSlice = {
  inStock: null,
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
  },
});

export const productListActions = ProductListSlice.actions;
export const productListReducer = ProductListSlice.reducer;
