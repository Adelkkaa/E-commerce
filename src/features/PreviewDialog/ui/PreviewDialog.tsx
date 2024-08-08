import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetProductCardSingleQuery } from "@/entities/ProductCard";
import { ProductPreviewSkeleton } from "@/entities/ProductPreviewSkeleton";
import FavoritesIcon from "@/shared/assets/images/Favorites.svg";
import { Button, Typography } from "@/shared/ui";

export const PreviewDialog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const guid = searchParams.get("guid");

  const [count, setCount] = useState(1);
  const [selectedStorageIndx] = useState(0);

  const { data: productCard, isLoading } = useGetProductCardSingleQuery({
    guid: guid as string,
  });

  const handleIncrementProduct = () => {
    if (
      productCard?.storages &&
      count < productCard.storages[selectedStorageIndx].in_stock
    ) {
      setCount((prev) => prev + 1);
    }
  };
  const handleDecrementProduct = () => {
    if (count > 1) {
      setCount((prev) => prev - 1);
    }
  };

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
                <span className="text-blueCustom">
                  <span className="text-blueCustom">
                    {productCard?.storages[0].in_stock} шт
                  </span>
                </span>
              </Typography>
              <Typography variant="textM" className="max-lg:text-textS">
                {productCard?.description}
              </Typography>
            </div>
            <div className="hidden lg:flex gap-[20px]">
              <div className=" flex justify-center items-center gap-[30px] !h-full">
                <Button
                  disabled={count === 1}
                  onClick={handleDecrementProduct}
                  variant="icon"
                  className="shadow-custom rounded-[50%] p-[2px] w-[38px] h-[38px] cursor-pointer hover:text-blueCustom"
                >
                  <Minus />
                </Button>
                <Typography
                  variant="textM"
                  className="text-[25px] font-semibold "
                >
                  {productCard?.storages[selectedStorageIndx].in_stock !== 0
                    ? count
                    : 0}
                </Typography>
                <Button
                  disabled={
                    count ===
                    productCard?.storages[selectedStorageIndx].in_stock
                  }
                  onClick={handleIncrementProduct}
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
