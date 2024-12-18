import { ordersApi } from "./api/ordersApi";

export type {
  IAddOrderArgs,
  IAddOrderProduct,
  IAddOrderResponse,
  IOrderProduct,
} from "./model/types";

export const {
  useAddOrderMutation,
  useGetOrderListQuery,
  useGetSingleOrderQuery,
} = ordersApi;
