import { cartApi } from "./api/cartApi";

export const {
  useGetCartListQuery,
  useGetProductInCartQuery,
  useChangeProductCountMutation,
  useDeleteProductMutation,
  useAddProductToCartMutation,
} = cartApi;
