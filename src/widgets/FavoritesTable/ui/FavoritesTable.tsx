import { X } from "lucide-react";
import { FC } from "react";
import { dialogActions } from "@/entities/Dialog";
import { useChangeProductFavoritesMutation } from "@/entities/Favorites";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
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

  const { price_type_guid, guid: outletGuid } = useAppSelector(
    (state) => state.outletsReducer,
  );

  const { selectCurrentDialog } = dialogActions;

  const dispatch = useAppDispatch();

  const [changeFavorites] = useChangeProductFavoritesMutation();

  const errorHandler = (error: any) => {
    console.log(error);
    toast({
      title: "Произошла ошибка",
      description: error?.data?.detail || "Попробуйте еще раз",
      variant: "destructive",
    });
  };

  const onDeleteFavorite = async (guid: string) => {
    if (!price_type_guid || !outletGuid) {
      dispatch(selectCurrentDialog("login"));
      return;
    }
    try {
      await changeFavorites({
        cart_outlet_guid: outletGuid,
        good_guid: guid,
        isFavorite: true,
      }).unwrap();
      toast({
        title: `Товар удален из избранного}`,
      });
    } catch (error: any) {
      errorHandler(error);
    }
  };

  return (
    <>
      {favorites.length > 0 ? (
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
                  onClick={() => onDeleteFavorite(item.guid)}
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
      ) : (
        <Typography variant="textXl" className="flex mt-[30px] justify-center">
          Отсутствуют избранные товары
        </Typography>
      )}
    </>
  );
};
