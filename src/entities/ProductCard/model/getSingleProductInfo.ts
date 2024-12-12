import { ISingleProduct } from "@/shared/types/types";

export const getInStockValue = ({
  productInfo,
  selectedSpecification,
}: {
  productInfo: ISingleProduct;
  selectedSpecification: string | null;
}) => {
  if (
    productInfo.specification &&
    productInfo.specification.length > 0 &&
    selectedSpecification
  ) {
    return productInfo.specification.find(
      (item) => item.specification_guid === selectedSpecification,
    )?.in_stock as number;
  }
  return 0;
};
