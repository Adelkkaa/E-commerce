import { productCardApi } from "./api/productCardApi";

export const {
  useGetProductCardListQuery,
  useGetProductCardSingleQuery,
  useGetProductGroupsQuery,
} = productCardApi;
export {
  getPreviewPrice,
  getPreviewPriceForSinglePage,
} from "./model/getPreviewPrice";
export { getInStockValue } from "./model/getSingleProductInfo";
export { PackageSelect } from "./ui/PackageSelect";
export { SpecificationSelect } from "./ui/SpecificationSelect";
