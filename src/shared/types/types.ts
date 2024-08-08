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
}

export type IProductCardList = Pick<
  IProductCard,
  "guid" | "name" | "type" | "image_key"
>;

export interface IProductCardApiResponse {
  items: IProductCardList[];
  total: number;
  page: number;
  size: number;
  pages: number;
}
