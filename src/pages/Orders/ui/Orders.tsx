import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { dialogActions } from "@/entities/Dialog";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import { Loader, Typography } from "@/shared/ui";
import { OrdersTable } from "@/widgets/OrdersTable";

export const Orders = () => {
  const { pathname } = useLocation();

  const { guid, name } = useAppSelector((state) => state.outletsReducer);
  const { selectCurrentDialog } = dialogActions;

  const dispatch = useAppDispatch();

  const handleAuthClick = () => {
    dispatch(selectCurrentDialog("login"));
  };

  if (!guid || !name) {
    return (
      <section className="my-[26px]">
        <div className="max-md:py-[20px] md:py-[71px] justify-center flex items-start gap-[5px]">
          <Typography variant="textXl">
            Для просмотра списка заказов необходимо{" "}
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

  if (pathname !== "/orders") {
    return (
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    );
  }
  return (
    <section className="my-[26px]">
      <OrdersTable />
    </section>
  );
};
