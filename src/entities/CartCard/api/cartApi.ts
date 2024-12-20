import { baseApi } from "@/shared/api/baseApi";
import { ICartList } from "@/shared/types/types";

interface ICartListQueryArgs {
  cart_outlet_guid: string;
}

export interface IChangeProductCountResponse {
  good_guid: string;
  price_type_guid: string;
  quantity: number;
  specification_guid: string;
}

interface IChangeProductCountArgs {
  cart_outlet_guid: string;
  body: IChangeProductCountResponse;
}

interface IGetProductInCartArgs {
  cart_outlet_guid: string;
  good_guid: string;
  specification_guid: string;
}

interface IGetProductInCartResponse extends IGetProductInCartArgs {
  quantity: number;
}

export interface IDeleteProductCart {
  cart_outlet_guid: string;
  good_guid: string;
  specification_guid: string;
}

export const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCartList: build.query<ICartList, ICartListQueryArgs>({
      query: ({ cart_outlet_guid }) => {
        return {
          url: `outlets/${cart_outlet_guid}/cart`,
        };
      },
      providesTags: (result) =>
        result?.goods
          ? [
              ...result.goods.map((good) => ({
                type: "CartCard" as const,
                id: good.guid,
              })),
              { type: "CartCard", id: "LIST" },
            ]
          : [{ type: "CartCard", id: "LIST" }],
    }),
    getProductInCart: build.query<
      IGetProductInCartResponse,
      IGetProductInCartArgs
    >({
      query: ({ cart_outlet_guid, good_guid, specification_guid }) => {
        const params = new URLSearchParams({
          good_guid,
          specification_guid,
        });
        return {
          url: `outlets/${cart_outlet_guid}/cart/good?${params}`,
        };
      },
      providesTags: (result) =>
        result?.good_guid
          ? [
              {
                type: "ProductInCart",
                id: result.good_guid,
              },
              { type: "ProductInCart", id: "ITEM" },
            ]
          : [{ type: "ProductInCart", id: "ITEM" }],
    }),
    addProductToCart: build.mutation<
      IChangeProductCountResponse,
      IChangeProductCountArgs
    >({
      query: ({ cart_outlet_guid, body }) => {
        return {
          url: `outlets/${cart_outlet_guid}/cart`,
          method: "post",
          body,
        };
      },
      invalidatesTags: [
        { type: "CartCard", id: "LIST" },
        { type: "ProductInCart", id: "ITEM" },
      ],
    }),
    changeProductCount: build.mutation<
      IChangeProductCountResponse,
      IChangeProductCountArgs
    >({
      query: ({ cart_outlet_guid, body }) => {
        return {
          url: `outlets/${cart_outlet_guid}/cart`,
          method: "put",
          body,
        };
      },
      invalidatesTags: (result) =>
        result?.good_guid
          ? [
              { type: "CartCard", id: result.good_guid },
              { type: "ProductInCart", id: result.good_guid },
            ]
          : [
              { type: "CartCard", id: "LIST" },
              { type: "ProductInCart", id: "ITEM" },
            ],
    }),
    deleteProduct: build.mutation<IDeleteProductCart, IDeleteProductCart>({
      query: ({ cart_outlet_guid, good_guid, specification_guid }) => {
        const params = new URLSearchParams({
          good_guid,
          specification_guid,
        });
        return {
          url: `outlets/${cart_outlet_guid}/cart?${params}`,
          method: "delete",
        };
      },
      invalidatesTags: (result) =>
        result?.good_guid
          ? [
              { type: "CartCard", id: result.good_guid },
              { type: "ProductInCart", id: result.good_guid },
            ]
          : [
              { type: "CartCard", id: "LIST" },
              { type: "ProductInCart", id: "ITEM" },
            ],
    }),
  }),
  overrideExisting: true,
});
