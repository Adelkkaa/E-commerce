import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../baseQuery/baseQuery";

const tagTypes = [
  "CartCard",
  "ProductInCart",
  "ProductCard",
  "FavoritesProduct",
] as const;
export type ITagType = (typeof tagTypes)[number];

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes,
  endpoints: () => ({}),
});
