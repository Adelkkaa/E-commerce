import { IProductCardPrice, IProductCardPriceV2 } from "@/shared/types/types";

export const getPreviewPrice = (prices: IProductCardPrice[]) => {
  if (!prices || prices.length === 0) return "Цена не установлена";

  return prices[0] && prices[0].value > 0
    ? `${prices[0].value} ₽/шт`
    : "Цена не установлена";
};

export const getPreviewPriceForSinglePage = (
  prices: IProductCardPriceV2[],
  currentIdx: number,
) => {
  if (!prices || prices.length === 0) return "Цена не установлена";

  return prices[currentIdx] && prices[currentIdx].price > 0
    ? `${prices[currentIdx].price} ₽/шт`
    : "Цена не установлена";
};
