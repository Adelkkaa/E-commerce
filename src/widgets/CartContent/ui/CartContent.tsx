import { CartCard } from "@/entities/CartCard";
import { Typography } from "@/shared/ui";

export const CartContent = () => {
  const favoritesCard = Array.from({ length: 20 });
  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-[10px]">
        {favoritesCard.map((_, index) => (
          <CartCard key={index} />
        ))}
      </div>
      {true && (
        <Typography variant="textXl" className="flex mt-[30px] justify-center">
          Корзина пустая
        </Typography>
      )}
    </div>
  );
};
