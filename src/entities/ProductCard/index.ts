import { productCardApi } from "./api/productCardApi";

export const { useGetProductCardListQuery, useGetProductCardSingleQuery } =
  productCardApi;
export {
  getPreviewPrice,
  getPreviewPriceForSinglePage,
} from "./model/getPreviewPrice";
