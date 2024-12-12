import { baseApi } from "@/shared/api/baseApi";
import {
  IProductCardApiResponse,
  IProductGroups,
  ISingleProduct,
} from "@/shared/types/types";

interface IProductCardListQueryParams {
  page?: number;
  size?: number;
  in_stock?: string;
  name?: string;
  price_type_guid?: string;
  cart_outlet_guid?: string;
  price_from?: string;
  price_to?: string;
  good_group_guids?: string;
  order_by?: string;
}

export const productCardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProductCardList: build.query<
      IProductCardApiResponse,
      IProductCardListQueryParams
    >({
      query: (params) => {
        return {
          url: `goods`,
          params: params || undefined,
        };
      },
      providesTags: (result) =>
        result?.items.length
          ? [
              ...result.items.map((good) => ({
                type: "ProductCard" as const,
                id: good.guid,
              })),
            ]
          : [{ type: "ProductCard", id: "LIST" }],
    }),
    getProductGroups: build.query<IProductGroups[], void>({
      query: () => {
        return {
          url: `good-groups`,
        };
      },
    }),
    getProductCardSingle: build.query<
      ISingleProduct,
      { guid: string; price_type_guid?: string | null }
    >({
      query: ({ guid, price_type_guid }) => ({
        url: `goods/${guid}`,
        params: { price_type_guid: price_type_guid || undefined },
      }),
      providesTags: (result) =>
        result
          ? [
              {
                type: "ProductCard",
                id: result.guid,
              },
            ]
          : [{ type: "ProductCard", id: "ITEM" }],
    }),
  }),
  overrideExisting: true,
});
