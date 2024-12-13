import { baseApi } from "@/shared/api/baseApi";
import { IFavoritesItem } from "@/shared/types/types";

interface IChangeProductFavoritesArgs {
  isFavorite: boolean;
  cart_outlet_guid: string;
  good_guid: string;
}

type IChangeProductFavoritesResponse = Omit<
  IChangeProductFavoritesArgs,
  "isFavorite"
>;

interface IFavoritesListQueryArgs {
  cart_outlet_guid: string;
  price_type_guid: string;
}

interface IFavoritesListResponse {
  cart_outlet_guid: string;
  goods: IFavoritesItem[];
}

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
      invalidatesTags: (result, _, args) =>
        result?.good_guid
          ? [
              { type: "CartCard", id: result.good_guid },
              { type: "ProductCard", id: result.good_guid },
              args.isFavorite
                ? { type: "FavoritesProduct", id: result.good_guid }
                : { type: "FavoritesProduct", id: "LIST" },
            ]
          : [
              { type: "CartCard", id: "LIST" },
              { type: "ProductCard", id: "LIST" },
              { type: "FavoritesProduct", id: "LIST" },
            ],
    }),
    getFavoritesList: build.query<
      IFavoritesListResponse,
      IFavoritesListQueryArgs
    >({
      query: ({ cart_outlet_guid, price_type_guid }) => {
        return {
          url: `outlets/${cart_outlet_guid}/favorites`,
          params: {
            price_type_guid,
          },
        };
      },
      providesTags: (result) =>
        result?.goods.length
          ? [
              ...result.goods.map((good) => ({
                type: "FavoritesProduct" as const,
                id: good.guid,
              })),
            ]
          : [{ type: "FavoritesProduct", id: "LIST" }],
    }),
  }),
  overrideExisting: true,
});
