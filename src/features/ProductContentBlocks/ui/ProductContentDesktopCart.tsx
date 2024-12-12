import { Minus, Plus } from "lucide-react";
import { FC } from "react";
import FavoritesIcon from "@/shared/assets/images/Favorites.svg";
import { Button, Typography } from "@/shared/ui";

interface IProductContentDesktopCartProps {
  quantity: number;
  handleDecrementCount: () => Promise<void>;
  handleIncrementCount: () => Promise<void>;
  handleAddProductToCart: () => Promise<void>;
  isDisabled: boolean;
  inStockValue: number;
}

export const ProductContentDesktopCart: FC<IProductContentDesktopCartProps> = ({
  quantity,
  handleDecrementCount,
  handleIncrementCount,
  handleAddProductToCart,
  isDisabled,
  inStockValue,
}) => {
  return (
    <div className="hidden tb:flex justify-between gap-[50px]">
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
          disabled={isDisabled}
          className="bg-main text-[25px] font-bold flex-1"
        >
          Добавить в заказ
        </Button>
      )}
      <Button
        disabled={isDisabled}
        variant="icon"
        className="shadow-custom border border-grayCustom p-[2px] w-[60px] h-[60px] cursor-pointer hover:fillMain"
      >
        <FavoritesIcon />
      </Button>
    </div>
  );
};
