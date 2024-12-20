import { Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import { dialogActions, Loader, Typography } from "@/shared/ui";
import { OrdersTable } from "@/widgets/OrdersTable";

export const Orders = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const { guid, name } = useAppSelector((state) => state.outletsReducer);
  const { selectCurrentDialog } = dialogActions;

  const dispatch = useAppDispatch();

  const handleAuthClick = () => {
    dispatch(selectCurrentDialog("login"));
  };

  useEffect(() => {
    if (!guid || !name) {
      navigate("/orders");
    }
  }, [guid, name]);

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
