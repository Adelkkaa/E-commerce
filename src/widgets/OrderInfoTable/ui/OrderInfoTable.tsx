import cardImage2 from "@/shared/assets/images/mockCard_2.jpg";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui";

export const OrderInfoTable = () => {
  const ordersCard = Array.from({ length: 20 });
  return (
    <div className="flex flex-col gap-[60px]">
      <Table className="text-textM ">
        <TableHeader>
          <TableRow className="border-none bg-whiteCustom rounded-[10px]">
            <TableHead className="rounded-tl-[10px] rounded-bl-[10px] text-center !text-textL !text-black py-[28px]">
              Номер заказа
            </TableHead>
            <TableHead className="text-center !text-textL !text-black py-[28px]">
              Торговая точка
            </TableHead>
            <TableHead className="text-center !text-textL !text-black py-[28px]">
              Статус заказа
            </TableHead>
            <TableHead className="text-center !text-textL !text-black py-[28px]">
              Количество позиций
            </TableHead>
            <TableHead className="text-center !text-textL !text-black py-[28px] rounded-tr-[10px] rounded-br-[10px]">
              Сумма
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="border-none text-tableText text-center">
            <TableCell>#123435</TableCell>
            <TableCell>ИП Шайхутдинова О.В.</TableCell>
            <TableCell>Ожидает доставки</TableCell>
            <TableCell>14 шт</TableCell>
            <TableCell>50 240.40 ₽</TableCell>
          </TableRow>
        </TableBody>
      </Table>

      <Table className="text-textM ">
        <TableHeader>
          <TableRow className="border-none bg-whiteCustom rounded-[10px]">
            <TableHead className="rounded-tl-[10px] rounded-bl-[10px] text-center !text-textL !text-black py-[28px]" />
            <TableHead className="text-center !text-textL !text-black py-[28px]">
              Наименование товара
            </TableHead>
            <TableHead className="text-center !text-textL !text-black py-[28px]">
              Количество
            </TableHead>
            <TableHead className="text-center !text-textL !text-black py-[28px] rounded-tr-[10px] rounded-br-[10px]">
              Цена
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {ordersCard.map((_, index) => (
            <TableRow
              key={index}
              className="border-none text-tableText text-center"
            >
              <TableCell>
                <img
                  src={cardImage2}
                  alt="card"
                  className="w-[90px] h-[90px]"
                />
              </TableCell>
              <TableCell>
                Элект. антитаб. устр. LUXLITE SALTERY Compact WILD BERRIES
                (лесный ягоды)
              </TableCell>
              <TableCell>3 шт</TableCell>
              <TableCell>12 240.40 ₽</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
