import React from "react";
import { Link } from "react-router-dom";
import { dialogActions } from "@/entities/Dialog";
import EyeIcon from "@/shared/assets/images/Eye.svg";
import HeartIcon from "@/shared/assets/images/Heart.svg";
import cardImage2 from "@/shared/assets/images/mockCard_2.jpg";
import { useAppDispatch } from "@/shared/hooks/use-redux";
import { useToast } from "@/shared/hooks/use-toast";
import { Button, Card, CardContent, CardFooter, Typography } from "@/shared/ui";

export const ProductCard = () => {
  const { toast } = useToast();
  const { selectCurrentDialog } = dialogActions;
  const dispatch = useAppDispatch();

  const onClickPreview = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
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
    <Link to="/product/123">
      <Card className="group max-w-[230px] w-[230px] min-h-[288px] max-h-[288px] cursor-pointer ">
        <CardContent className="flex items-center justify-center w-full relative bg-transparent !p-0  border-grayCustom border-b ">
          <img src={cardImage2} alt="card" className="w-[158px] h-[198px] " />
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
        <CardFooter className="flex flex-col items-start px-[10px] py-[8px]">
          <Typography variant="textXS">
            Элект. антитаб. устр. LUXLITE SALTERY Compact WILD BERRIES (лесный
            ягоды)
          </Typography>
          <Typography variant="titleS"> 122.56 ₽/шт</Typography>
        </CardFooter>
      </Card>
    </Link>
  );
};
