import { IGetAllApiResponse } from "@/shared/types/types";

export interface IOrderProduct {
  name: string;
  image_key: string;
  quantity: number;
  price: number;
}

export interface IOrderItem {
  id: number;
  guid: string;
  status: string;
  created_at: string;
  total_cost: number;
}

export type IGetSingleOrderResponse = IOrderItem & {
  cart_outlet_guid: string;
  total_quantity: number;
  goods: IOrderProduct[];
};

export interface IGetSingleOrderArgs {
  cart_outlet_guid: string;
  id: number;
}

export type IOrderList = IGetAllApiResponse<IOrderItem>;

export interface IOrderListQueryArgs {
  cart_outlet_guid: string;
  page: number;
  size: number;
}
export interface IAddOrderProduct {
  good_guid: string;
  specification_guid: string;
  quantity: number;
  price: number;
}

export interface IAddOrderArgs {
  cart_outlet_guid: string;
  body: {
    message: string;
    delivery_date: string;
    goods: IAddOrderProduct[];
  };
}

export interface IAddOrderResponse {
  guid: string;
  cart_outlet_guid: string;
  status: string;
  id: number;
}
