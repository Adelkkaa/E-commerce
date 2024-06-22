import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const ordersCard = Array.from({ length: 20 });

  return (
    <>
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
              Дата доставки
            </TableHead>
            <TableHead className="text-center !text-textL max-md:text-[12px] !text-black max-md:py-[11px] md:py-[28px]">
              Статус
            </TableHead>
            <TableHead className="text-center !text-textL max-md:text-[12px] !text-black max-md:py-[11px] md:py-[28px] rounded-tr-[10px] rounded-br-[10px] whitespace-nowrap">
              Сумма
            </TableHead>
            {/* <TableHead className="max-md:hidden text-center !text-textL max-md:text-[12px] !text-black max-md:py-[11px] md:py-[28px] rounded-tr-[10px] rounded-br-[10px]">
              Детали
            </TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordersCard.map((_, index) => (
            <TableRow
              key={index}
              onClick={() => navigate("/orders/123")}
              className="border-none text-tableText text-center cursor-pointer hover:bg-whiteBg hover:rounded-[10px]"
            >
              <TableCell className="max-md:text-[12px] rounded-tl-[10px] rounded-bl-[10px]">
                #123435
              </TableCell>
              <TableCell className="max-md:text-[12px]">25.05.2024</TableCell>
              <TableCell className="max-md:text-[12px]">27.05.2024</TableCell>
              <TableCell className="max-md:text-[12px]">
                Ожидает доставки
              </TableCell>
              <TableCell className="max-md:text-[12px] whitespace-nowrap rounded-tr-[10px] rounded-br-[10px]">
                50 240.40 <span className="font-medium"> ₽</span>
              </TableCell>
              {/* <TableCell className="flex justify-center max-md:hidden">
                <Link
                  to="/orders/123"
                  className="hover:strokeBlue hover:border-blueCustom flex justify-center w-[70px] h-[30px] border-2 rounded-[10px]"
                >
                  <EyeIcon className="w-[24px] h-[24px] [&_path]:stroke-grayCustom" />
                </Link>
              </TableCell> */}
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
