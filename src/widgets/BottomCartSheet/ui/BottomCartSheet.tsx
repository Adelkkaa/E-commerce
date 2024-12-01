import { FC, useState } from "react";
import { CartInfo } from "@/features/CartInfo";
import { ICartList } from "@/shared/types/types";
import { Sheet, SheetContent, SheetTrigger, Typography } from "@/shared/ui";

interface IBottomCartSheetProps {
  cartData: ICartList;
  name: string;
}

export const BottomCartSheet: FC<IBottomCartSheetProps> = ({
  cartData,
  name,
}) => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
  };
  return (
    <div className="sticky max-md:flex hidden bottom-[8px] my-[10px] gap-[8px]">
      <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <SheetTrigger className="hidden max-md:flex flex-1 min-h-[50px] !text-textL text-white !rounded-[8px] bg-blueCustom items-center justify-center hover:scale-[1.05]">
          Оформить заказ
        </SheetTrigger>
        <SheetContent
          withCloseIcon={false}
          side="bottom"
          className="w-full rounded-t-[10px] flex flex-col px-0 py-0"
        >
          <CartInfo
            outletName={name}
            totalCost={cartData.total_cost}
            onCloseSheet={handleCloseSheet}
            containerClassName="px-[26px] py-[20px]"
          />
        </SheetContent>
      </Sheet>
      <div className="flex flex-1 justify-center items-center bg-white boxShadow rounded-[10px]">
        <Typography variant="tableText">
          {cartData.total_cost.toFixed(2)}
          <span className="text-tableText font-medium"> ₽</span>
        </Typography>
      </div>
    </div>
  );
};
