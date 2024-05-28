import { Link } from "react-router-dom";
import EyeIcon from "@/shared/assets/images/Eye.svg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from "@/shared/ui";

export const OrdersTable = () => {
  const ordersCard = Array.from({ length: 20 });
  return (
    <>
      <Table className="text-textM ">
        <TableHeader>
          <TableRow className="border-none bg-whiteCustom rounded-[10px]">
            <TableHead className="rounded-tl-[10px] rounded-bl-[10px] text-center !text-textL !text-black py-[28px]">
              Заказ
            </TableHead>
            <TableHead className="text-center !text-textL !text-black py-[28px]">
              Дата заказа
            </TableHead>
            <TableHead className="text-center !text-textL !text-black py-[28px]">
              Дата доставки
            </TableHead>
            <TableHead className="text-center !text-textL !text-black py-[28px]">
              Статус
            </TableHead>
            <TableHead className="text-center !text-textL !text-black py-[28px]">
              Сумма
            </TableHead>
            <TableHead className="text-center !text-textL !text-black py-[28px] rounded-tr-[10px] rounded-br-[10px]">
              Детали
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordersCard.map((_, index) => (
            <TableRow
              key={index}
              className="border-none text-tableText text-center"
            >
              <TableCell>#123435</TableCell>
              <TableCell>25.05.2024</TableCell>
              <TableCell>27.05.2024</TableCell>
              <TableCell>Ожидает доставки</TableCell>
              <TableCell>50 240.40 ₽</TableCell>
              <TableCell className="flex justify-center">
                <Link
                  to="/orders/123"
                  className="hover:strokeBlue hover:border-blueCustom flex justify-center w-[70px] h-[30px] border-2 rounded-[10px]"
                >
                  <EyeIcon className="w-[24px] h-[24px] [&_path]:stroke-grayCustom" />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {false && (
        <Typography variant="textXl" className="flex mt-[30px] justify-center">
          Список заказов пуст
        </Typography>
      )}
    </>
  );
};
