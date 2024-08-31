import { IProductCardPrice } from "@/shared/types/types";

export const getPreviewPrice = (prices: IProductCardPrice[]) => {
  if (!prices || prices.length === 0) return "Цена не указана";

  const retailPrice = prices.find(
    (p) => p.price_type && p.price_type.name === "Розничная",
  );

  return retailPrice ? `${retailPrice.value} ₽/шт` : "Цена не указана";
};
