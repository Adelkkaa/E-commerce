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
    <div className="flex flex-col md:gap-[60px] max-md:gap-[20px]">
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
              #123435
            </TableCell>
            <TableCell className="max-md:text-[12px]">
              ИП Шайхутдинова О.В.
            </TableCell>
            <TableCell className="max-md:text-[12px]">
              Ожидает доставки
            </TableCell>
            <TableCell className="max-md:text-[12px]">14 шт</TableCell>
            <TableCell className="max-md:text-[12px] whitespace-nowrap">
              50 240.40 ₽
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>

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
          {ordersCard.map((_, index) => (
            <TableRow
              key={index}
              className="border-none text-tableText text-center"
            >
              <TableCell className="max-md:hidden">
                <img
                  src={cardImage2}
                  alt="card"
                  className="w-[90px] h-[90px] min-w-[90px] min-h-[90px]"
                />
              </TableCell>
              <TableCell className="max-md:text-[12px]">
                Элект. антитаб. устр. LUXLITE SALTERY Compact WILD BERRIES
                (лесный ягоды)
              </TableCell>
              <TableCell className="max-md:text-[12px]">3 шт</TableCell>
              <TableCell className="max-md:text-[12px] whitespace-nowrap">
                12 240.40 ₽
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
