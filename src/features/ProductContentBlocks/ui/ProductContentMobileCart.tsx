import { FC } from "react";
import FavoritesIcon from "@/shared/assets/images/Favorites.svg";
import { Button } from "@/shared/ui";

interface IProductContentMobileCartProps {}

export const ProductContentMobileCart: FC<
  IProductContentMobileCartProps
> = () => {
  return (
    <div className="sticky md:hidden bottom-[50px] gap-[123px] mt-[30px] w-full flex justify-between">
      <Button
        variant="icon"
        className="shadow-custom border border-grayCustom p-[2px] w-[60px] h-[60px] cursor-pointer hover:fillBlue"
      >
        <FavoritesIcon />
      </Button>
      <Button className="bg-blueCustom !text-textL text-white flex-1">
        Добавить в заказ
      </Button>
    </div>
  );
};
