import { FC } from "react";
import { CartCard } from "@/entities/CartCard";
import { ICartGood } from "@/shared/types/types";
import { Typography } from "@/shared/ui";

interface ICartContentProps {
  cartGoods: ICartGood[];
}

export const CartContent: FC<ICartContentProps> = ({ cartGoods }) => {
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-[10px]">
        {cartGoods.length > 0 ? (
          cartGoods.map((item) => (
            <CartCard
              key={item.guid}
              image_key={item.image_key}
              name={item.name}
              price={item.price}
              quantity={item.quantity}
            />
          ))
        ) : (
          <Typography
            variant="textXl"
            className="flex mt-[30px] justify-center"
          >
            Корзина пустая
          </Typography>
        )}
      </div>
    </div>
  );
};
