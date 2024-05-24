import EyeIcon from "@/shared/assets/images/Eye.svg";
import HeartIcon from "@/shared/assets/images/Heart.svg";
import { useToast } from "@/shared/hooks/use-toast";
import { Button, Card, CardContent, CardFooter, Typography } from "@/shared/ui";
import cardImage from "./mockCard.png";
import cardImage2 from "./mockCard_2.jpg";

export const ProductCard = () => {
  const { toast } = useToast();

  return (
    <Card className="group max-w-[230px] w-[230px] min-h-[288px] max-h-[288px] cursor-pointer ">
      <CardContent className="flex items-center justify-center w-full relative bg-transparent !p-0  border-grayCustom border-b ">
        <img src={cardImage2} alt="card" className="w-[158px] h-[198px] " />
        <div className="absolute bottom-0 p-2 opacity-0 group-hover:opacity-100 w-full flex justify-center gap-[8px]">
          <Button variant="icon" size="icon" className="hover:fillBlue">
            <HeartIcon />
          </Button>
          <Button
            onClick={() =>
              toast({
                title: "Товар успешно добавлен в корзину",
              })
            }
          >
            Добавить в заказ
          </Button>
          <Button variant="icon" size="icon" className="hover:strokeBlue">
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
  );
};
