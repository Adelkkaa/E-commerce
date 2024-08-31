import { Minus, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getPreviewPrice,
  useGetProductCardSingleQuery,
} from "@/entities/ProductCard";
import { ProductSkeleton } from "@/entities/ProductSkeleton";
import FavoritesIcon from "@/shared/assets/images/Favorites.svg";
import { scrollToTop } from "@/shared/lib/scrollToTop";
import { cn } from "@/shared/lib/utils";
import { Button, Typography } from "@/shared/ui";

export const Product = () => {
  const { productId } = useParams();
  const [count, setCount] = useState(1);
  const [selectedStorageIndx] = useState(0);

  const { data: productCard, isLoading } = useGetProductCardSingleQuery({
    guid: productId as string,
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
    scrollToTop();
  }, []);

  return (
    <section className="relative mb-[71px] mt-[26px] max-md:px-[20px]">
      {isLoading && !productCard ? (
        <ProductSkeleton />
      ) : (
        <>
          <div className="flex mb:max-md:flex-col md:gap-[40px] dk:gap-[90px] max-md:gap-[33px]">
            {productCard?.image_key ? (
              <img
                src={productCard.image_key}
                alt="card"
                className="border border-grayCustom rounded-[10px] md:max-dk:min-w-[400px] md:max-dk:max-w-[400px] dk:min-w-[500px] dk:max-w-[500px] h-[500px] bg-white object-contain"
              />
            ) : (
              <div className="border border-grayCustom rounded-[10px] md:max-dk:min-w-[400px] dk:min-w-[500px] h-[500px] bg-white " />
            )}
            <div className="flex flex-col flex-1 justify-between">
              <div className="flex flex-col gap-[20px]">
                <Typography variant="titleL" className="max-md:text-textL">
                  {productCard?.name}
                </Typography>
                <Typography variant="titleL" className="max-md:text-textL">
                  {/* 122.56 <span className="font-normal">₽</span>/шт */}
                  {productCard && getPreviewPrice(productCard.prices)}
                </Typography>
                <div className="border border-grayCustom" />
                <Typography
                  variant="textL"
                  className="font-semibold max-md:text-titleXS"
                >
                  В наличии на складе:{" "}
                  <span className="text-blueCustom">
                    {productCard?.storages && productCard.storages.length > 0
                      ? productCard.storages[0]?.in_stock
                      : 0}{" "}
                    шт
                  </span>
                </Typography>
                <Typography variant="textM" className="text-textS">
                  {productCard?.description}
                </Typography>
              </div>
              {productCard?.storages && productCard.storages.length > 0 && (
                <div className="hidden tb:flex gap-[50px]">
                  <div className="flex  justify-center items-center gap-[30px] !h-full">
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
                      className="text-[25px] font-semibold min-w-10 text-center"
                    >
                      {productCard.storages[selectedStorageIndx].in_stock !== 0
                        ? count
                        : 0}
                    </Typography>
                    <Button
                      disabled={
                        count ===
                        productCard.storages[selectedStorageIndx].in_stock
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
              )}
              {productCard?.storages && productCard.storages.length > 0 && (
                <div className="hidden md:max-tb:flex flex-col gap-[20px]">
                  <div className="flex w-full justify-between">
                    <div className="flex  justify-center items-center gap-[30px] !h-full">
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
                        className="text-[25px] font-semibold"
                      >
                        {productCard.storages[selectedStorageIndx].in_stock !==
                        0
                          ? count
                          : 0}
                      </Typography>
                      <Button
                        disabled={
                          count ===
                          productCard.storages[selectedStorageIndx].in_stock
                        }
                        onClick={handleIncrementProduct}
                        variant="icon"
                        className="shadow-custom rounded-[50%] p-[2px] w-[38px] h-[38px] cursor-pointer hover:text-blueCustom"
                      >
                        <Plus />
                      </Button>
                    </div>
                    <Button
                      variant="icon"
                      className="shadow-custom border border-grayCustom p-[2px] w-[60px] h-[60px] cursor-pointer hover:fillBlue"
                    >
                      <FavoritesIcon />
                    </Button>
                  </div>
                  <Button className="bg-blueCustom text-[25px] font-bold">
                    Добавить в заказ
                  </Button>
                </div>
              )}
            </div>
          </div>
          {productCard?.properties && productCard.properties.length > 0 && (
            <div className="flex flex-col mt-[50px] gap-[30px]">
              <Typography variant="titleL" className="max-md:text-textL">
                Дополнительная информация
              </Typography>
              <div>
                {productCard.properties.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className={cn("flex justify-between rounded-[10px] p-1", {
                        "bg-whiteBg": index % 2 === 0,
                      })}
                    >
                      <Typography
                        variant="textL"
                        className="w-[50%] text-center"
                      >
                        {item.name}
                      </Typography>
                      <Typography
                        variant="textL"
                        className="w-[50%] text-center"
                      >
                        {item.value}
                      </Typography>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
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
        </>
      )}
    </section>
  );
};
