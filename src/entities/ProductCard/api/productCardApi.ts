import { baseApi } from "@/shared/api/baseApi";
import { IProductCard, IProductCardApiResponse } from "@/shared/types/types";

interface IProductCardListQueryParams {
  page?: number;
  size?: number;
  in_stock?: string;
  name?: string;
  price_type_guid?: string;
}

export const productCardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProductCardList: build.query<
      IProductCardApiResponse,
      IProductCardListQueryParams
    >({
      query: (params) => {
        return {
          url: `goods/`,
          params: params || undefined,
        };
      },
    }),
    getProductCardSingle: build.query<IProductCard, { guid: string }>({
      query: ({ guid }) => ({
        url: `goods/${guid}`,
      }),
    }),
  }),
  overrideExisting: true,
});
