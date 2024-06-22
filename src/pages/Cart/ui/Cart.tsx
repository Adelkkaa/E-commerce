import { CartInfo } from "@/features/CartInfo";
import { BottomCartSheet } from "@/widgets/BottomCartSheet";
import { CartContent } from "@/widgets/CartContent";

export const Cart = () => {
  return (
    <section className="padding bg-whiteCustom max-md:relative">
      <div className="max-md:py-[20px] md:py-[71px] flex gap-[20px] items-start">
        <CartContent />
        <CartInfo containerClassName="max-md:hidden flex" />
      </div>
      <BottomCartSheet />
    </section>
  );
};
