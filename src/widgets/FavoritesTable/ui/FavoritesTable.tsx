import { X } from "lucide-react";
import { FC } from "react";
import { useToast } from "@/shared/hooks/use-toast";
import { IFavoritesItem } from "@/shared/types/types";
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

interface IFavoritesTableProps {
  favorites: IFavoritesItem[];
}

export const FavoritesTable: FC<IFavoritesTableProps> = ({ favorites }) => {
  const { toast } = useToast();

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
          {favorites.map((item) => (
            <TableRow key={item.guid} className="border-none">
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
                  src={item.image_key}
                  alt="card"
                  className="w-[90px] h-[90px] md:min-w-[90px] object-contain md:min-h-[90px] max-md:min-w-[50px] max-md:min-h-[50px]"
                />
              </TableCell>
              <TableCell className="text-center max-md:text-[12px]">
                {item.name}
              </TableCell>
              <TableCell className="text-center !font-semibold max-md:text-[12px]  whitespace-nowrap">
                {item.price}{" "}
                <span className="font-medium max-md:text-[12px]">₽</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {favorites.length === 0 && (
        <Typography variant="textXl" className="flex mt-[30px] justify-center">
          Отсутствуют избранные товары
        </Typography>
      )}
    </>
  );
};
