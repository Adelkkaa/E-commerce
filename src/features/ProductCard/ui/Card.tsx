import React, { FC } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { dialogActions } from "@/entities/Dialog";
import EyeIcon from "@/shared/assets/images/Eye.svg";
import HeartIcon from "@/shared/assets/images/Heart.svg";
import { useBreakpoint } from "@/shared/hooks/use-breakpoint";
import { useAppDispatch } from "@/shared/hooks/use-redux";
import { useToast } from "@/shared/hooks/use-toast";
import { Button, Card, CardContent, CardFooter, Typography } from "@/shared/ui";

interface ICardProps {
  guid: string;
  name: string;
  type: string;
  image_key: string;
}

export const ProductCard: FC<ICardProps> = ({ guid, name, image_key }) => {
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
    // Сюда скорее всего как query параметр будем передавать guid, чтоб в запросе выцеплять на превью
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
      <Card className="group max-md:flex max-md:flex-col md:max-w-[230px] md:w-[230px] md:min-h-[288px] md:max-h-[288px] max-w-[190px] w-[190px] min-h-[330px] max-h-[330px] cursor-pointer ">
        <CardContent className="flex items-center justify-center w-full relative bg-transparent !p-0  border-grayCustom border-b ">
          {image_key ? (
            <img
              src={image_key}
              alt="card"
              className="w-[158px] h-[198px]"
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
        <CardFooter className="flex flex-col max-md:flex-grow max-md:grid items-start px-[10px] py-[8px]">
          <Typography variant="textXS">{name}</Typography>
          <Typography variant="titleS"> 122.56 ₽/шт</Typography>
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
