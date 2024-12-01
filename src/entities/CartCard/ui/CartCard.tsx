import { Minus, Plus, X } from "lucide-react";
import { FC } from "react";
import FavoritesIcon from "@/shared/assets/images/Favorites.svg";
import { Button, Typography } from "@/shared/ui";

interface ICartCardProps {
  image_key: string;
  name: string;
  quantity: number;
  price: number;
}

export const CartCard: FC<ICartCardProps> = ({
  image_key,
  name,
  price,
  quantity,
}) => {
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
          <Typography
            variant="tableText"
            className="max-md:text-modalDesc max-md:font-medium"
          >
            {name}
          </Typography>
        </div>
      </div>
      <div className="flex flex-row md:flex-col md:items-end max-md:justify-between items-center">
        <div className="flex gap-[9px] md:gap-[5px]">
          <Button
            variant="icon"
            className="w-[24px] h-[24px] p-[2px] md:order-1 order-2 rounded-[3px] border border-grayCustom hover:text-blueCustom cursor-pointer"
          >
            <X />
          </Button>
          <Button
            variant="icon"
            className="w-[24px] h-[24px] p-[2px] md:order-2 order-1 rounded-[3px] border border-grayCustom hover:fillBlue cursor-pointer"
          >
            <FavoritesIcon className="max-w-[14px]" />
          </Button>
        </div>
        <div className=" flex justify-center items-center gap-[16px] !h-full">
          <Button
            variant="icon"
            className="shadow-custom w-[19px] h-[19px] rounded-[50%] p-[2px] cursor-pointer hover:text-blueCustom"
          >
            <Minus className="max-w-[14px] max-h-[14px]" />
          </Button>
          {quantity}
          <Button
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
