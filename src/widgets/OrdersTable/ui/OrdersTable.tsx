import { useNavigate, useSearchParams } from "react-router-dom";
import { useGetOrderListQuery } from "@/entities/Orders";
import { PaginationComponent } from "@/features/ProductsPagination";
import { useAppSelector } from "@/shared/hooks/use-redux";
import { formatDate } from "@/shared/lib/utils";
import {
  Loader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from "@/shared/ui";

export const OrdersTable = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");

  const { guid } = useAppSelector((state) => state.outletsReducer);

  const { data: orderList, isLoading } = useGetOrderListQuery(
    {
      cart_outlet_guid: guid as string,
      page: Number(page) || 1,
      size: 5,
    },
    { skip: !guid },
  );

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {orderList && orderList.items.length > 0 ? (
        <div className="flex flex-col justify-between gap-8">
          <Table className="text-textM ">
            <TableHeader>
              <TableRow className="border-none bg-whiteBg rounded-[10px]">
                <TableHead className="rounded-tl-[10px] rounded-bl-[10px] text-center !text-textL max-md:text-[12px] !text-black max-md:py-[11px] md:py-[28px]">
                  Заказ
                </TableHead>
                <TableHead className="text-center !text-textL max-md:text-[12px] !text-black max-md:py-[11px] md:py-[28px]">
                  Дата заказа
                </TableHead>
                <TableHead className="text-center !text-textL max-md:text-[12px] !text-black max-md:py-[11px] md:py-[28px]">
                  Статус
                </TableHead>
                <TableHead className="text-center !text-textL max-md:text-[12px] !text-black max-md:py-[11px] md:py-[28px] rounded-tr-[10px] rounded-br-[10px] whitespace-nowrap">
                  Сумма
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orderList.items.map((item) => (
                <TableRow
                  key={item.guid}
                  onClick={() => navigate(`/orders/${item.id}`)}
                  className="border-none text-tableText text-center cursor-pointer hover:bg-whiteBg hover:rounded-[10px]"
                >
                  <TableCell className="max-md:text-[12px] rounded-tl-[10px] rounded-bl-[10px]">
                    #{item.id}
                  </TableCell>
                  <TableCell className="max-md:text-[12px]">
                    {formatDate(item.created_at)}
                  </TableCell>
                  <TableCell className="max-md:text-[12px]">
                    {item.status}
                  </TableCell>
                  <TableCell className="max-md:text-[12px] whitespace-nowrap rounded-tr-[10px] rounded-br-[10px]">
                    {item.total_cost} <span className="font-medium"> ₽</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <PaginationComponent
            activePage={page ? Number(page) : 1}
            totalPages={orderList.pages}
          />
        </div>
      ) : (
        <Typography variant="textXl" className="flex mt-[30px] justify-center">
          Список заказов пуст
        </Typography>
      )}
    </>
  );
};
