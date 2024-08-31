import React, { FC } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { dialogActions } from "@/entities/Dialog";
import { getPreviewPrice } from "@/entities/ProductCard";
import EyeIcon from "@/shared/assets/images/Eye.svg";
import HeartIcon from "@/shared/assets/images/Heart.svg";
import { useBreakpoint } from "@/shared/hooks/use-breakpoint";
import { useAppDispatch } from "@/shared/hooks/use-redux";
import { useToast } from "@/shared/hooks/use-toast";
import { IProductCardList } from "@/shared/types/types";
import { Button, Card, CardContent, CardFooter, Typography } from "@/shared/ui";

export const ProductCard: FC<IProductCardList> = ({
  guid,
  name,
  image_key,
  prices,
}) => {
  const { toast } = useToast();
  const { selectCurrentDialog } = dialogActions;
  const dispatch = useAppDispatch();
  const { isMobile } = useBreakpoint();
  const [searchParams, setSearchParams] = useSearchParams();

  const onClickPreview = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    searchParams.set("guid", guid);
    setSearchParams(searchParams);
    dispatch(selectCurrentDialog("productPreview"));
  };

  const onClickFavorites = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
  };

  const onClickCart = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    toast({
      title: "Товар успешно добавлен в корзину",
    });
  };

  return (
    <Link to={`/product/${guid}`}>
      <Card className="group flex flex-col md:max-w-[230px] md:w-[230px] md:min-h-[380px] md:max-h-[380px] max-w-[190px] w-[190px] min-h-[360px] max-h-[360px] cursor-pointer ">
        <CardContent className="flex items-center justify-center w-full relative bg-transparent !p-0  border-grayCustom border-b ">
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
          <div className="md:flex absolute bottom-0 p-2 opacity-0 group-hover:opacity-100 w-full hidden justify-center gap-[8px]">
            <Button
              onClick={onClickFavorites}
              variant="icon"
              size="icon"
              className="hover:fillBlue"
            >
              <HeartIcon />
            </Button>
            <Button onClick={onClickCart}>Добавить в заказ</Button>
            <Button
              onClick={onClickPreview}
              variant="icon"
              size="icon"
              className="hover:strokeBlue"
            >
              <EyeIcon />
            </Button>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col flex-grow max-md:grid max-md:grid-rows-3 md:justify-between items-start px-[10px] py-[8px]">
          <Typography variant="textXS" className="line-clamp-2">
            {name}
          </Typography>
          <Typography variant="titleS">{getPreviewPrice(prices)}</Typography>
          {isMobile && (
            <div className="flex self-end">
              <Button
                onClick={onClickFavorites}
                variant="icon"
                size="icon"
                className="hover:fillBlue"
              >
                <HeartIcon />
              </Button>
              <Button onClick={onClickCart}>Добавить в заказ</Button>
              <Button
                onClick={onClickPreview}
                variant="icon"
                size="icon"
                className="hover:strokeBlue"
              >
                <EyeIcon />
              </Button>
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  );
};
