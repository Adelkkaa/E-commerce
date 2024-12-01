import { IProductCardPrice, IProductCardPriceV2 } from "@/shared/types/types";

export const getPreviewPrice = (prices: IProductCardPrice[]) => {
  if (!prices || prices.length === 0) return "Цена не установлена";

  return prices[0] && prices[0].value > 0
    ? `${prices[0].value} ₽/шт`
    : "Цена не установлена";
};

export const getPreviewPriceForSinglePage = ({
  prices,
  selectedSpecification,
}: {
  prices: IProductCardPriceV2[];
  selectedSpecification: string | null;
}) => {
  if (!prices || prices.length === 0 || !selectedSpecification)
    return "Цена не установлена";
  const resultPrice = prices.find(
    (item) => item.specification_guid === selectedSpecification,
  )?.price;

  return resultPrice ? `${resultPrice} ₽/шт` : "Цена не установлена";
};
