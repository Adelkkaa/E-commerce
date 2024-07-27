import { baseApi } from "@/shared/api/baseApi";
import { IProductCard, IProductCardApiResponse } from "@/shared/types/types";

interface IProductCardListQueryParams {
  page?: number;
  size?: number;
}

export const productCardApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getProductCardList: build.query<
      IProductCardApiResponse,
      IProductCardListQueryParams
    >({
      query: (params) => ({
        url: `goods/`,
        params: params || undefined,
      }),
    }),
    getProductCardSingle: build.query<IProductCard, { guid: string }>({
      query: ({ guid }) => ({
        url: `goods/${guid}`,
      }),
    }),
  }),
  overrideExisting: true,
});
