import { X } from "lucide-react";
import cardImage2 from "@/shared/assets/images/mockCard_2.jpg";
import { useToast } from "@/shared/hooks/use-toast";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Typography,
} from "@/shared/ui";

export const FavoritesTable = () => {
  const { toast } = useToast();

  const favoritesCard = Array.from({ length: 20 });
  return (
    <>
      <Table className="text-textM ">
        <TableHeader>
          <TableRow className="border-none bg-whiteBg rounded-[10px]">
            <TableHead className="rounded-tl-[10px] rounded-bl-[10px]" />
            <TableHead />
            <TableHead className="text-center md:!text-textL max-md:text-[12px] !text-black md:py-[28px] max-md:py-[11px]">
              Наименование товара
            </TableHead>
            <TableHead className="text-center md:!text-textL max-md:text-[12px] !text-black md:py-[28px] max-md:py-[11px] rounded-tr-[10px] rounded-br-[10px] whitespace-nowrap">
              Цена
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
                <img
                  src={cardImage2}
                  alt="card"
                  className="w-[90px] h-[90px] md:min-w-[90px] md:min-h-[90px] max-md:min-w-[50px] max-md:min-h-[50px]"
                />
              </TableCell>
              <TableCell className="text-center max-md:text-[12px]">
                Элект. антитаб. устр. LUXLITE SALTERY Compact WILD BERRIES
                (лесный ягоды)
              </TableCell>
              <TableCell className="text-center !font-semibold max-md:text-[12px]  whitespace-nowrap">
                122.56 <span className="font-medium max-md:text-[12px]">₽</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {false && (
        <Typography variant="textXl" className="flex mt-[30px] justify-center">
          Отсутствуют избранные товары
        </Typography>
      )}
    </>
  );
};
