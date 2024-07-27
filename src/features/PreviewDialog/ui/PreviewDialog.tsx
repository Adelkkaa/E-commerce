import { Minus, Plus } from "lucide-react";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetProductCardSingleQuery } from "@/entities/ProductCard";
import { ProductPreviewSkeleton } from "@/entities/ProductPreviewSkeleton";
import FavoritesIcon from "@/shared/assets/images/Favorites.svg";
import { Button, Typography } from "@/shared/ui";

export const PreviewDialog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const guid = searchParams.get("guid");

  const { data: productCard, isLoading } = useGetProductCardSingleQuery({
    guid: guid as string,
  });

  useEffect(() => {
    return () => {
      searchParams.delete("guid");
      setSearchParams(searchParams);
    };
  }, []);

  return (
    <div className="flex mb:gap-[30px] lg:gap-[45px] xl:gap-[90px] relative  max-lg:flex-col max-lg:p-[20px] lg:p-[10px] max-lg:overflow-auto">
      {isLoading && !productCard ? (
        <ProductPreviewSkeleton />
      ) : (
        <>
          {productCard?.image_key ? (
            <img
              src={productCard.image_key}
              alt="card"
              className="border border-grayCustom rounded-[10px] mb:min-w-[300px] xl:min-w-[500px] lg:h-[500px] max-lg:h-[300px] bg-white"
            />
          ) : (
            <div className="border border-grayCustom rounded-[10px] mb:min-w-[300px] xl:min-w-[500px] lg:h-[500px] max-lg:h-[300px] bg-white" />
          )}
          <div className="flex flex-col justify-between">
            <div className="flex flex-col gap-[20px]">
              <Typography variant="titleL" className="max-lg:text-textL">
                {productCard?.name}
              </Typography>
              <Typography variant="titleL" className="max-lg:text-textL">
                122.56 ₽/шт
              </Typography>
              <div className="border border-grayCustom" />
              <Typography
                variant="textL"
                className="font-semibold max-lg:text-titleXS"
              >
                В наличии на складе:{" "}
                <span className="text-blueCustom">140 шт</span>
              </Typography>
              <Typography variant="textM" className="max-lg:text-textS">
                Luxlite Saltery Compact WILD BERRIES – одноразовая электронная
                сигарета с солевым никотином. Содержание никотина в заправочной
                жидкости – 5%. Микс из лесных ягод с лёгким холодком. Этот вкус
                разработан LUXLITE совместно с HQD эксклюзивно для линейки
                Saltery Compact. В перерывах между затяжками рекомендуется
                держать корпус в вертикальном положении.
              </Typography>
            </div>
            <div className="hidden lg:flex gap-[20px]">
              <div className=" flex justify-center items-center gap-[30px] !h-full">
                <Button
                  variant="icon"
                  className="shadow-custom rounded-[50%] p-[2px] w-[38px] h-[38px] cursor-pointer hover:text-blueCustom"
                >
                  <Minus />
                </Button>
                <Typography
                  variant="textM"
                  className="text-[25px] font-semibold"
                >
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
          <div className="lg:hidden gap-[30px] w-full flex justify-between">
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
        </>
      )}
    </div>
  );
};
