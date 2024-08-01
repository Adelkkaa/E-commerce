import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Loader } from "@/shared/ui";
import { OrdersTable } from "@/widgets/OrdersTable";

export const Orders = () => {
  const { pathname } = useLocation();
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
