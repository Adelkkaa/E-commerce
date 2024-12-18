import { useParams } from "react-router-dom";
import { useGetSingleOrderQuery } from "@/entities/Orders";
import { useAppSelector } from "@/shared/hooks/use-redux";
import {
  Loader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui";

export const OrderInfoTable = () => {
  const { orderId } = useParams();

  const { guid, name } = useAppSelector((state) => state.outletsReducer);

  const { data: orderInfo, isLoading } = useGetSingleOrderQuery(
    {
      cart_outlet_guid: guid as string,
      id: Number(orderId),
    },
    { skip: !orderId },
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col md:gap-[60px] max-md:gap-[20px]">
      {orderInfo && (
        <Table className="text-textM ">
          <TableHeader>
            <TableRow className="border-none bg-whiteBg rounded-[10px]">
              <TableHead className="max-md:hidden rounded-tl-[10px] rounded-bl-[10px] text-center !text-textL max-md:text-[12px] max-md:py-[11px] !text-black py-[28px]">
                Номер заказа
              </TableHead>
              <TableHead className="text-center max-md:rounded-tl-[10px] max-md:rounded-bl-[10px] !text-textL max-md:text-[12px] max-md:py-[11px] !text-black py-[28px]">
                Торговая точка
              </TableHead>
              <TableHead className="text-center !text-textL max-md:text-[12px] max-md:py-[11px] !text-black py-[28px]">
                Статус заказа
              </TableHead>
              <TableHead className="text-center !text-textL max-md:text-[12px] max-md:py-[11px] !text-black py-[28px]">
                Количество позиций
              </TableHead>
              <TableHead className="text-center !text-textL max-md:text-[12px] max-md:py-[11px] !text-black py-[28px] rounded-tr-[10px] rounded-br-[10px]">
                Сумма
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="border-none text-tableText text-center">
              <TableCell className="max-md:hidden max-md:text-[12px]">
                #{orderInfo.id}
              </TableCell>
              <TableCell className="max-md:text-[12px]">{name}</TableCell>
              <TableCell className="max-md:text-[12px]">
                {orderInfo.status}
              </TableCell>
              <TableCell className="max-md:text-[12px]">
                {orderInfo.total_quantity} шт
              </TableCell>
              <TableCell className="max-md:text-[12px] whitespace-nowrap">
                {orderInfo.total_cost} ₽
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      )}

      {orderInfo?.goods && (
        <Table className="text-textM ">
          <TableHeader>
            <TableRow className="border-none bg-whiteBg rounded-[10px]">
              <TableHead className="max-md:hidden rounded-tl-[10px] rounded-bl-[10px] text-center !text-textL max-md:text-[12px] max-md:py-[11px] !text-black py-[28px]" />
              <TableHead className="text-center !text-textL max-md:text-[12px] max-md:py-[11px] !text-black py-[28px]">
                Наименование товара
              </TableHead>
              <TableHead className="text-center !text-textL max-md:text-[12px] max-md:py-[11px] !text-black py-[28px]">
                Количество
              </TableHead>
              <TableHead className="text-center !text-textL max-md:text-[12px] max-md:py-[11px] !text-black py-[28px] rounded-tr-[10px] rounded-br-[10px] whitespace-nowrap">
                Цена
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orderInfo.goods.map((item, index) => (
              <TableRow
                // Нет уникального ключа
                key={index}
                className="border-none text-tableText text-center"
              >
                <TableCell className="max-md:hidden">
                  <img
                    src={item.image_key}
                    alt="card"
                    className="w-[90px] h-[90px] min-w-[90px] min-h-[90px]"
                  />
                </TableCell>
                <TableCell className="max-md:text-[12px]">
                  {item.name}
                </TableCell>
                <TableCell className="max-md:text-[12px]">3 шт</TableCell>
                <TableCell className="max-md:text-[12px] whitespace-nowrap">
                  {item.price} ₽
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};
