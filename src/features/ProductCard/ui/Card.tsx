import React, { FC } from "react";
import { Link } from "react-router-dom";
import { getPreviewPrice } from "@/entities/ProductCard";
import HeartIcon from "@/shared/assets/images/Heart.svg";
import { IProductCardList } from "@/shared/types/types";
import { Button, Card, CardContent, CardFooter, Typography } from "@/shared/ui";

export const ProductCard: FC<IProductCardList> = ({
  guid,
  name,
  image_key,
  prices,
}) => {
  const onClickFavorites = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
  };

  return (
    <Link target="_blank" to={`/product/${guid}`}>
      <Card className="group flex flex-col md:max-w-[230px] md:w-[230px] md:min-h-[380px] md:max-h-[380px] max-w-[190px] w-[190px] min-h-[360px] max-h-[360px] cursor-pointer ">
        <CardContent className="flex items-center justify-center w-full relative bg-transparent !p-0 border-grayCustom border-b ">
          {image_key ? (
            <img
              src={image_key}
              alt="card"
              className="w-full h-[235px] md:h-[285px] object-contain"
              loading="lazy"
            />
          ) : (
            <div className="bg-whiteBg w-full h-[198px] " />
          )}
          <div className="flex absolute top-0 right-0 p-2 md:opacity-0 md:group-hover:opacity-100 w-full justify-end gap-[8px]">
            <Button
              onClick={onClickFavorites}
              variant="icon"
              size="icon"
              className="md:hover:fillBlue"
            >
              <HeartIcon width={24} height={24} />
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col flex-grow max-md:grid max-md:grid-rows-2 md:justify-between items-start px-[10px] py-[8px]">
          <Typography variant="textXS" className="line-clamp-2">
            {name}
          </Typography>
          <Typography variant="titleS">
            {prices[0].price_type.name !== "Розничная" && "от"}{" "}
            {getPreviewPrice(prices)}
          </Typography>
        </CardFooter>
      </Card>
    </Link>
  );
};
