import { Minus, Plus, X } from "lucide-react";
import { FC } from "react";
import cardImage2 from "@/shared/assets/images/mockCard_2.jpg";
import { useToast } from "@/shared/hooks/use-toast";
import { cn } from "@/shared/lib/utils";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui";

export interface ICartTableProps {
  tableClassname?: string;
}

export const CartTable: FC<ICartTableProps> = ({ tableClassname }) => {
  const { toast } = useToast();

  const favoritesCard = Array.from({ length: 20 });
  return (
    <Table className={cn("text-textM", tableClassname)}>
      <TableHeader>
        <TableRow className="border-none bg-whiteCustom rounded-[10px]">
          <TableHead className="rounded-tl-[10px] rounded-bl-[10px]" />
          <TableHead />
          <TableHead className="text-center !text-textL !text-black py-[28px]">
            Наименование товара
          </TableHead>
          <TableHead className="text-center !text-textL !text-black py-[28px] rounded-tr-[10px] rounded-br-[10px]">
            Цена
          </TableHead>
          <TableHead className="text-center !text-textL !text-black py-[28px] rounded-tr-[10px] rounded-br-[10px]">
            Количество
          </TableHead>
          <TableHead className="text-center !text-textL !text-black py-[28px] rounded-tr-[10px] rounded-br-[10px]">
            Сумма
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {favoritesCard.map((_, index) => (
          <TableRow key={index} className="border-none">
            <TableCell
              className="w-[34px] h-[34px]"
              onClick={() =>
                toast({
                  title: "Товар успешно удален",
                  variant: "destructive",
                })
              }
            >
              <Button
                variant="icon"
                className="w-[24px] h-[24px] bg-whiteCustom p-[2px] rounded-[50%] hover:text-blueCustom cursor-pointer"
              >
                <X />
              </Button>
            </TableCell>
            <TableCell>
              <img src={cardImage2} alt="card" className="w-[90px] h-[90px]" />
            </TableCell>
            <TableCell className="text-center">
              Элект. антитаб. устр. LUXLITE SALTERY Compact WILD BERRIES (лесный
              ягоды)
            </TableCell>
            <TableCell className="text-center !font-semibold">
              122.56 ₽
            </TableCell>
            <TableCell className="!font-semibold text-center">
              <div className=" flex justify-center items-center gap-[16px] !h-full">
                <Button
                  variant="icon"
                  className="shadow-custom rounded-[50%] p-[2px] cursor-pointer hover:text-blueCustom"
                >
                  <Minus />
                </Button>
                10
                <Button
                  variant="icon"
                  className="shadow-custom rounded-[50%] p-[2px] cursor-pointer hover:text-blueCustom"
                >
                  <Plus />
                </Button>
              </div>
            </TableCell>
            <TableCell className="text-center !font-semibold">
              1225.56 ₽
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
