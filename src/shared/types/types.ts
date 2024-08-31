interface IProductCardProperty {
  name: string;
  value: string;
}

export interface IProductCardStorage {
  good_guid: string;
  in_stock: number;
  specification_guid: string;
  specification_name: string;
}

export interface IProductCardPriceType {
  name: string;
  guid: string;
}
export interface IProductCardPrice {
  good_guid: string;
  price_type: IProductCardPriceType;
  specification_guid: string;
  value: number;
}
export interface IProductCard {
  guid: string;
  name: string;
  description: string;
  good_group_guid: string;
  type: string;
  properties: IProductCardProperty[];
  producing_country: string;
  image_key: string;
  storages: IProductCardStorage[];
  prices: IProductCardPrice[] | [];
}

export type IProductCardList = Pick<
  IProductCard,
  "guid" | "name" | "type" | "image_key" | "prices"
>;

export interface IProductCardApiResponse {
  items: IProductCardList[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
