import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { OrdersTable } from "@/widgets/OrdersTable";

export const Orders = () => {
  const { pathname } = useLocation();
  if (pathname !== "/orders") {
    return (
      <Suspense fallback="Loading...">
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
