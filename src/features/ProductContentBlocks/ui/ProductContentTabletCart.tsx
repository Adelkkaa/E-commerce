import { Minus, Plus } from "lucide-react";
import { FC } from "react";
import FavoritesIcon from "@/shared/assets/images/Favorites.svg";
import { Button, Typography } from "@/shared/ui";

interface IProductContentTabletCartProps {
  quantity: number;
  handleDecrementCount: () => Promise<void>;
  handleIncrementCount: () => Promise<void>;
  handleAddProductToCart: () => Promise<void>;
  isDisabled: boolean;
  inStockValue: number;
}

export const ProductContentTabletCart: FC<IProductContentTabletCartProps> = ({
  handleDecrementCount,
  handleIncrementCount,
  handleAddProductToCart,
  inStockValue,
  isDisabled,
  quantity,
}) => {
  return (
    <div className="hidden md:max-tb:flex flex-col gap-[20px]">
      <div className="flex w-full justify-between">
        {quantity && (
          <div className="flex justify-center items-center gap-[30px] !h-full">
            <Button
              disabled={quantity === 0 || isDisabled}
              onClick={handleDecrementCount}
              variant="icon"
              className="shadow-custom rounded-[50%] p-[2px] w-[38px] h-[38px] cursor-pointer hover:text-blueCustom"
            >
              <Minus />
            </Button>
            <Typography variant="textM" className="text-[25px] font-semibold">
              {inStockValue !== 0 ? quantity : 0}
            </Typography>
            <Button
              disabled={quantity === inStockValue || isDisabled}
              onClick={handleIncrementCount}
              variant="icon"
              className="shadow-custom rounded-[50%] p-[2px] w-[38px] h-[38px] cursor-pointer hover:text-blueCustom"
            >
              <Plus />
            </Button>
          </div>
        )}
        <Button
          variant="icon"
          className="shadow-custom border border-grayCustom p-[2px] w-[60px] h-[60px] cursor-pointer hover:fillBlue"
        >
          <FavoritesIcon />
        </Button>
      </div>
      {quantity === 0 && (
        <Button
          disabled={isDisabled}
          onClick={handleAddProductToCart}
          className="bg-blueCustom text-[25px] font-bold"
        >
          Добавить в заказ
        </Button>
      )}
    </div>
  );
};
