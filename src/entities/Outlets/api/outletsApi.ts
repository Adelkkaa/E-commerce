import { baseApi } from "@/shared/api/baseApi";
import { ISelectOptions } from "@/shared/ui";
import { IOutletsResponse } from "../model/types";

export const outletsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getOutlets: build.query<ISelectOptions[], void>({
      query: () => ({
        url: `outlets`,
      }),
      transformResponse: (response: IOutletsResponse) => {
        const transformedResults = response.map((item) => ({
          label: item.name,
          value: item.price_type_guid,
        }));
        return transformedResults;
      },
    }),
  }),
  overrideExisting: true,
});

export const { useGetOutletsQuery } = outletsApi;
