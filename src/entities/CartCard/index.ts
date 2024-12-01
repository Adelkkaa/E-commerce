import { cartApi } from "./api/cartApi";

export const {
  useGetCartListQuery,
  useChangeProductCountMutation,
  useDeleteProductMutation,
} = cartApi;
