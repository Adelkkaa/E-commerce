import { useGetCartListQuery } from "@/entities/CartCard";
import { dialogActions } from "@/entities/Dialog";
import { CartInfo } from "@/features/CartInfo";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import { Loader, Typography } from "@/shared/ui";
import { BottomCartSheet } from "@/widgets/BottomCartSheet";
import { CartContent } from "@/widgets/CartContent";

export const Cart = () => {
  const { guid, name } = useAppSelector((state) => state.outletsReducer);
  const { selectCurrentDialog } = dialogActions;

  const dispatch = useAppDispatch();

  const { data: cartData, isLoading } = useGetCartListQuery(
    {
      cart_outlet_guid: guid as string,
    },
    { skip: !guid },
  );

  const handleAuthClick = () => {
    dispatch(selectCurrentDialog("login"));
  };

  if (!guid || !name) {
    return (
      <section className="padding bg-whiteCustom max-md:relative">
        <div className="max-md:py-[20px] md:py-[71px] justify-center flex items-start gap-[5px]">
          <Typography variant="textXl">
            Для просмотра корзины необходимо{" "}
            <span
              className="text-blueCustom underline underline-offset-8 cursor-pointer"
              role="link"
              aria-disabled="true"
              onClick={handleAuthClick}
            >
              авторизоваться
            </span>
          </Typography>
        </div>
      </section>
    );
  }
  return (
    <section className="padding bg-whiteCustom max-md:relative">
      <div className="max-md:py-[20px] md:py-[71px] flex gap-[20px] items-start">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <CartContent cartGoods={cartData?.goods || []} />
            {cartData && (
              <CartInfo
                outletName={name}
                totalCost={cartData.total_cost}
                containerClassName="max-md:hidden flex basis-[25%]"
              />
            )}
          </>
        )}
      </div>
      {cartData && <BottomCartSheet name={name} cartData={cartData} />}
    </section>
  );
};
