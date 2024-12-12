import { baseApi } from "@/shared/api/baseApi";

interface IChangeProductFavoritesArgs {
  isFavorite: boolean;
  cart_outlet_guid: string;
  good_guid: string;
}

type IChangeProductFavoritesResponse = Omit<
  IChangeProductFavoritesArgs,
  "isFavorite"
>;

export const favoritesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    changeProductFavorites: build.mutation<
      IChangeProductFavoritesResponse,
      IChangeProductFavoritesArgs
    >({
      query: ({ cart_outlet_guid, good_guid, isFavorite }) => {
        if (!isFavorite) {
          return {
            url: `outlets/${cart_outlet_guid}/favorites`,
            method: "post",
            params: {
              good_guid,
            },
          };
        }
        return {
          url: `outlets/${cart_outlet_guid}/favorites`,
          method: "delete",
          params: {
            good_guid,
          },
        };
      },
      invalidatesTags: (result) =>
        result?.good_guid
          ? [
              { type: "CartCard", id: result.good_guid },
              { type: "ProductCard", id: result.good_guid },
            ]
          : [
              { type: "CartCard", id: "LIST" },
              { type: "ProductCard", id: "LIST" },
            ],
    }),
  }),
  overrideExisting: true,
});
