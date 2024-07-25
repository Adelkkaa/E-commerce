import { baseApi } from "@/shared/api/baseApi";
import { IProductCardApiResponse } from "@/shared/types/types";

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
  }),
  overrideExisting: true,
});
