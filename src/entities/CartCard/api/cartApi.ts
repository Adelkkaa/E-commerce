import { baseApi } from "@/shared/api/baseApi";
import { ICartList } from "@/shared/types/types";

interface ICartListQueryArgs {
  cart_outlet_guid: string;
}

export const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getCartList: build.query<ICartList, ICartListQueryArgs>({
      query: ({ cart_outlet_guid }) => {
        return {
          url: `outlets/${cart_outlet_guid}/cart`,
        };
      },
    }),
  }),
  overrideExisting: true,
});
