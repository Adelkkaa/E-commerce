import { favoritesApi } from "./api/favoritesApi";

export const { useChangeProductFavoritesMutation, useGetFavoritesListQuery } =
  favoritesApi;

export { useFavorite } from "./model/useFavorite";
