import { cartApi } from "./cartApi";

export const {
  useGetCartListQuery,
  useGetProductInCartQuery,
  useChangeProductCountMutation,
  useDeleteProductMutation,
  useAddProductToCartMutation,
} = cartApi;
