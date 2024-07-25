export interface IProductCard {
  guid: string;
  name: string;
  description: string;
  good_group_guid: string;
  type: string;
  filling: string;
  aroma: string;
  strength: string;
  format: string;
  manufacturing_method: string;
  package: string;
  block: string;
  box: string;
  producing_country: string;
  image_key: string;
  specifications: [
    {
      guid: string;
      name: string;
    },
  ];
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
