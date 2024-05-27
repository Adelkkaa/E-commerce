import { CartInfo } from "@/features/CartInfo";
import { CartTable } from "@/widgets/CartTable";

export const Cart = () => {
  return (
    <section className="my-[71px] flex gap-[20px] items-start">
      <CartTable />
      <CartInfo />
    </section>
  );
};
