import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IProductListSlice {
  inStock: string | null;
  name: string;
}

const initialState: IProductListSlice = {
  inStock: null,
  name: "",
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
  },
});

export const productListActions = ProductListSlice.actions;
export const productListReducer = ProductListSlice.reducer;
