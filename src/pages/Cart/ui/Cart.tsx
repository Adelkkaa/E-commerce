import { CartInfo } from "@/features/CartInfo";
import { CartContent } from "@/widgets/CartContent";

export const Cart = () => {
  return (
    <section className="fullWidth  bg-whiteCustom">
      <div className=" subContainer py-[71px] flex gap-[20px] items-start">
        <CartContent />
        <CartInfo />
      </div>
    </section>
  );
};
