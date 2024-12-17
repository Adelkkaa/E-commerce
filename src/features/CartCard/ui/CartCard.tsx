import { Minus, Plus, X } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import {
  useChangeProductCountMutation,
  useDeleteProductMutation,
} from "@/entities/CartCard";
import { dialogActions } from "@/entities/Dialog";
import { useFavorite } from "@/entities/Favorites";
import FavoritesIcon from "@/shared/assets/images/Favorites.svg";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import { useToast } from "@/shared/hooks/use-toast";
import { cn } from "@/shared/lib/utils";
import { Button, Loader, Typography } from "@/shared/ui";

interface ICartCardProps {
  guid: string;
  specification_guid: string;
  image_key: string;
  name: string;
  quantity: number;
  price: number;
  isFavorite: boolean;
}

export const CartCard: FC<ICartCardProps> = ({
  image_key,
  name,
  price,
  quantity,
  guid,
  specification_guid,
  isFavorite,
}) => {
  const { onChangeFavorite } = useFavorite();
  const { toast } = useToast();
  const { price_type_guid, guid: outletGuid } = useAppSelector(
    (state) => state.outletsReducer,
  );
  const dispatch = useAppDispatch();
  const { selectCurrentDialog } = dialogActions;

  const [changeProductCount, { isLoading: isChangeProductCountLoading }] =
    useChangeProductCountMutation();
  const [deleteProduct, { isLoading: isDeleteProductLoading }] =
    useDeleteProductMutation();

  const errorHandler = (error: any) => {
    console.log(error);
    toast({
      title: "Произошла ошибка",
      description: error?.data?.detail || "Попробуйте еще раз",
      variant: "destructive",
    });
  };
  const handleIncrementCount = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (!price_type_guid || !outletGuid) {
      dispatch(selectCurrentDialog("login"));
      return;
    }
    try {
      await changeProductCount({
        cart_outlet_guid: outletGuid,
        body: {
          specification_guid,
          quantity: quantity + 1,
          price_type_guid,
          good_guid: guid,
        },
      }).unwrap();
    } catch (error: any) {
      errorHandler(error);
    }
  };

  const handleDecrementCount = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (!price_type_guid || !outletGuid) {
      dispatch(selectCurrentDialog("login"));
      return;
    }
    if (quantity > 1) {
      try {
        await changeProductCount({
          cart_outlet_guid: outletGuid,
          body: {
            specification_guid,
            quantity: quantity - 1,
            price_type_guid,
            good_guid: guid,
          },
        }).unwrap();
      } catch (error: any) {
        errorHandler(error);
      }
    } else {
      handleDeleteProduct();
    }
  };

  const handleDeleteProduct = async (e?: React.MouseEvent) => {
    e?.preventDefault();
    if (!price_type_guid || !outletGuid) {
      dispatch(selectCurrentDialog("login"));
      return;
    }
    try {
      await deleteProduct({
        cart_outlet_guid: outletGuid,
        good_guid: guid,
        specification_guid,
      }).unwrap();
    } catch (error: any) {
      errorHandler(error);
    }
  };
  return (
    <div className="w-full rounded-[10px] boxShadow bg-white flex md:flex-row max-md:gap-[5px] flex-col justify-between p-[5px]">
      <div className="flex gap-[15px]">
        <img
          src={image_key}
          alt="card"
          className="min-w-[75px] min-h-[75px] max-w-[75px] max-h-[75px] object-contain border border-grayCustom rounded-[4px]"
        />
        <div className="flex flex-col">
          <Typography variant="textL" className="max-md:text-[16px]">
            {price} <span className="text-textM max-md:text-[16px]">₽</span>
          </Typography>
          <Link to={`/product/${guid}`} target="_blank">
            <Typography
              variant="tableText"
              className="max-md:text-modalDesc max-md:font-medium"
            >
              {name}
            </Typography>
          </Link>
        </div>
      </div>
      <div className="flex flex-row md:flex-col md:items-end max-md:justify-between items-center">
        <div className="flex gap-[9px] md:gap-[5px]">
          <Button
            disabled={isChangeProductCountLoading || isDeleteProductLoading}
            onClick={handleDeleteProduct}
            variant="icon"
            className="w-[24px] h-[24px] p-[2px] md:order-1 order-2 rounded-[3px] border border-grayCustom hover:text-blueCustom cursor-pointer"
          >
            <X />
          </Button>
          <Button
            variant="icon"
            onClick={(e) => onChangeFavorite({ e, guid, isFavorite })}
            className={cn(
              "w-[24px] h-[24px] p-[2px] md:order-2 order-1 rounded-[3px] border border-grayCustom hover:fillMain cursor-pointer",
              {
                fillMain: isFavorite,
              },
            )}
          >
            <FavoritesIcon className="max-w-[14px]" />
          </Button>
        </div>
        <div className="flex justify-center items-center gap-[16px] !h-full">
          <Button
            disabled={isChangeProductCountLoading || isDeleteProductLoading}
            onClick={handleDecrementCount}
            variant="icon"
            className="shadow-custom w-[19px] h-[19px] rounded-[50%] p-[2px] cursor-pointer hover:text-blueCustom"
          >
            <Minus className="max-w-[14px] max-h-[14px]" />
          </Button>
          {isChangeProductCountLoading || isDeleteProductLoading ? (
            <Loader variant="local" width={24} height={24} />
          ) : (
            quantity
          )}

          <Button
            disabled={isChangeProductCountLoading || isDeleteProductLoading}
            onClick={handleIncrementCount}
            variant="icon"
            className="shadow-custom w-[19px] h-[19px] rounded-[50%] p-[2px] cursor-pointer hover:text-blueCustom"
          >
            <Plus className="max-w-[14px] max-h-[14px]" />
          </Button>
        </div>
      </div>
    </div>
  );
};
