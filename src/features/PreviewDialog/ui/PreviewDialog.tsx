import { Minus, Plus } from "lucide-react";
import FavoritesIcon from "@/shared/assets/images/Favorites.svg";
import cardImage2 from "@/shared/assets/images/mockCard_2.jpg";
import { Button, Typography } from "@/shared/ui";

export const PreviewDialog = () => {
  return (
    <div className="flex gap-[90px]">
      <div className="flex items-center justify-center border border-grayCustom rounded-[10px] min-w-[500px] h-[500px]">
        <img src={cardImage2} alt="card" className="w-[344px]" />
      </div>
      <div className="flex flex-col justify-between">
        <div className="flex flex-col gap-[20px]">
          <Typography variant="titleL">
            Элект. антитаб. устр. LUXLITE SALTERY Compact WILD BERRIES (лесный
            ягоды)
          </Typography>
          <Typography variant="titleL">122.56 ₽/шт</Typography>
          <div className="border border-grayCustom" />
          <Typography variant="textL" className="font-semibold">
            В наличии на складе: <span className="text-blueCustom">140 шт</span>
          </Typography>
          <Typography variant="textM">
            Luxlite Saltery Compact WILD BERRIES – одноразовая электронная
            сигарета с солевым никотином. Содержание никотина в заправочной
            жидкости – 5%. Микс из лесных ягод с лёгким холодком. Этот вкус
            разработан LUXLITE совместно с HQD эксклюзивно для линейки Saltery
            Compact. В перерывах между затяжками рекомендуется держать корпус в
            вертикальном положении.
          </Typography>
        </div>
        <div className="flex gap-[50px]">
          <div className=" flex justify-center items-center gap-[30px] !h-full">
            <Button
              variant="icon"
              className="shadow-custom rounded-[50%] p-[2px] w-[38px] h-[38px] cursor-pointer hover:text-blueCustom"
            >
              <Minus />
            </Button>
            <Typography variant="textM" className="text-[25px] font-semibold">
              10
            </Typography>
            <Button
              variant="icon"
              className="shadow-custom rounded-[50%] p-[2px] w-[38px] h-[38px] cursor-pointer hover:text-blueCustom"
            >
              <Plus />
            </Button>
          </div>
          <Button className="bg-blueCustom text-[25px] font-bold flex-1">
            Добавить в заказ
          </Button>
          <Button
            variant="icon"
            className="shadow-custom border border-grayCustom p-[2px] w-[60px] h-[60px] cursor-pointer hover:fillBlue"
          >
            <FavoritesIcon />
          </Button>
        </div>
      </div>
    </div>
  );
};
