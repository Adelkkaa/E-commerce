interface IProductCardProperty {
  name: string;
  value: string;
}

export interface IGetAllApiResponse<T> {
  items: T[];
  page: number;
  size: number;
  pages: number;
  total: number;
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
  specification: IProductCardPriceType;
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
  is_favorite: boolean;
}

export type IProductCardList = Pick<
  IProductCard,
  "guid" | "name" | "type" | "image_key" | "prices" | "is_favorite"
>;

export interface IProductGroups {
  name: string;
  guid: string;
  parent_group_guid: string | null;
  child_groups: IProductGroups[];
}

export type IProductCardApiResponse = IGetAllApiResponse<IProductCardList>;

export interface IResponseError<T> {
  status: number;
  data: T;
}

export type IResponseErrorPrimary = IResponseError<{
  detail: string;
}>;

export type IProductCardPriceV2 = IProductCardStorage & { price: number };

export interface IProductPackage {
  name: string;
  value: string;
}

export interface ISingleProduct
  extends Omit<IProductCard, "prices" | "storages" | "producing_country"> {
  specification: IProductCardPriceV2[];
  package: IProductPackage[];
}

export interface ICartGood {
  guid: string;
  specification_guid: string;
  price_type_guid: string;
  name: string;
  image_key: string;
  is_favorite: boolean;
  quantity: number;
  price: number;
}

export interface ICartList {
  cart_outlet_guid: string;
  goods: ICartGood[];
  total_cost: number;
}

export type IFavoritesItem = Pick<
  IProductCard,
  "guid" | "image_key" | "name"
> & {
  price: number;
};
