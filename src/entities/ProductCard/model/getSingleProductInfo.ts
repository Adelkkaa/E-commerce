import { IProductCardV2 } from "@/shared/types/types";

export const getInStockValue = ({
  productInfo,
  selectedSpecification,
}: {
  productInfo: IProductCardV2;
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
