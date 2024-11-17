export interface IOutletsItem {
  guid: string;
  name: string;
  price_type_guid: string;
}

export type IOutletsResponse = Array<IOutletsItem>;
