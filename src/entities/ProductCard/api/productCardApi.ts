import { baseApi } from "@/shared/api/baseApi";
import {
  IProductCardApiResponse,
  IProductCardV2,
  IProductGroups,
} from "@/shared/types/types";

interface IProductCardListQueryParams {
  page?: number;
  size?: number;
  in_stock?: string;
  name?: string;
  price_type_guid?: string;
  price_from?: string;
  price_to?: string;
  good_group_guids?: string;
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
    }),
    getProductGroups: build.query<IProductGroups[], void>({
      query: () => {
        return {
          url: `good-groups`,
        };
      },
    }),
    getProductCardSingle: build.query<
      IProductCardV2,
      { guid: string; price_type_guid?: string | null }
    >({
      query: ({ guid, price_type_guid }) => ({
        url: `goods/${guid}`,
        params: { price_type_guid: price_type_guid || undefined },
      }),
    }),
  }),
  overrideExisting: true,
});
