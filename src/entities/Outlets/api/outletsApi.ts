import { baseApi } from "@/shared/api/baseApi";
import { IOutletsResponse } from "../model/types";

export const outletsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOutlets: build.query<IOutletsResponse, void>({
      query: () => ({
        url: `outlets`,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetOutletsQuery } = outletsApi;
