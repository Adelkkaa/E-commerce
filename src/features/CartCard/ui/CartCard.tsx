import { Minus, Plus, X } from "lucide-react";
import { FC } from "react";
import { Link } from "react-router-dom";
import { useCart } from "@/entities/CartCard";
import { useFavorite } from "@/entities/Favorites";
import FavoritesIcon from "@/shared/assets/images/Favorites.svg";
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
  const {
    incrementCount,
    decrementCount,
    deleteProduct,
    isChangeProductCountLoading,
    isDeleteProductLoading,
  } = useCart();

  const handleDeleteProduct = async () => {
    await deleteProduct({
      specification_guid,
      good_guid: guid,
    });
  };

  const handleIncrementCount = async () => {
    await incrementCount({
      quantity,
      specification_guid,
      good_guid: guid,
    });
  };

  const handleDecrementCount = async () => {
    await decrementCount({
      quantity,
      specification_guid,
      good_guid: guid,
    });
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
