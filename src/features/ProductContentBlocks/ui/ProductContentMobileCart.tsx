import { Minus, Plus } from "lucide-react";
import { FC } from "react";
import FavoritesIcon from "@/shared/assets/images/Favorites.svg";
import { cn } from "@/shared/lib/utils";
import { Button, Typography } from "@/shared/ui";

interface IProductContentMobileCartProps {
  quantity: number;
  handleDecrementCount: () => Promise<void>;
  handleIncrementCount: () => Promise<void>;
  handleAddProductToCart: () => Promise<void>;
  handleChangeFavorite: () => void;
  isDisabled: boolean;
  inStockValue: number;
  isFavorite: boolean;
}

export const ProductContentMobileCart: FC<IProductContentMobileCartProps> = ({
  handleAddProductToCart,
  handleDecrementCount,
  handleIncrementCount,
  handleChangeFavorite,
  inStockValue,
  isDisabled,
  quantity,
  isFavorite,
}) => {
  return (
    <div className="sticky md:hidden bottom-[50px] gap-[123px] mt-[30px] w-full flex justify-between">
      <Button
        onClick={handleChangeFavorite}
        variant="icon"
        className={cn(
          "shadow-custom border border-grayCustom p-[2px] w-[60px] h-[60px] cursor-pointer hover:fillMain",
          {
            fillMain: isFavorite,
          },
        )}
      >
        <FavoritesIcon />
      </Button>
      {quantity > 0 && (
        <div className="flex justify-center items-center gap-[30px] !h-full">
          <Button
            disabled={quantity === 0 || isDisabled}
            onClick={handleDecrementCount}
            variant="icon"
            className="shadow-custom rounded-[50%] p-[2px] w-[38px] h-[38px] cursor-pointer hover:text-main"
          >
            <Minus />
          </Button>
          <Typography
            variant="textM"
            className="text-[25px] font-semibold min-w-10 text-center"
          >
            {inStockValue !== 0 ? quantity : 0}
          </Typography>
          <Button
            disabled={quantity === inStockValue || isDisabled}
            onClick={handleIncrementCount}
            variant="icon"
            className="shadow-custom rounded-[50%] p-[2px] w-[38px] h-[38px] cursor-pointer hover:text-main"
          >
            <Plus />
          </Button>
        </div>
      )}
      {quantity === 0 && (
        <Button
          onClick={handleAddProductToCart}
          className="bg-main !text-textL text-white flex-1"
        >
          Добавить в заказ
        </Button>
      )}
    </div>
  );
};
