import { baseApi } from "@/shared/api/baseApi";
import {
  IAddOrderArgs,
  IAddOrderResponse,
  IGetSingleOrderArgs,
  IGetSingleOrderResponse,
  IOrderList,
  IOrderListQueryArgs,
} from "../model/types";

export const ordersApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOrderList: build.query<IOrderList, IOrderListQueryArgs>({
      query: ({ cart_outlet_guid, page, size }) => {
        return {
          url: `outlets/${cart_outlet_guid}/orders`,
          params: {
            page,
            size,
          },
        };
      },
      providesTags: [{ type: "Orders", id: "LIST" }],
    }),
    getSingleOrder: build.query<IGetSingleOrderResponse, IGetSingleOrderArgs>({
      query: ({ cart_outlet_guid, id }) => {
        return {
          url: `outlets/${cart_outlet_guid}/orders/${id}`,
        };
      },
      providesTags: [{ type: "Orders", id: "LIST" }],
    }),
    addOrder: build.mutation<IAddOrderResponse, IAddOrderArgs>({
      query: ({ cart_outlet_guid, body }) => {
        return {
          url: `outlets/${cart_outlet_guid}/orders`,
          method: "post",
          body,
        };
      },
      invalidatesTags: [
        { type: "CartCard", id: "LIST" },
        { type: "ProductInCart", id: "ITEM" },
        { type: "Orders", id: "LIST" },
      ],
    }),
  }),
  overrideExisting: true,
});
