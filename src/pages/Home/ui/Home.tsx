import { Suspense } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { HomeCatalog } from "@/widgets/HomeCatalog";
import { HomeFilters } from "@/widgets/HomeFilters";

export const Home = () => {
  const { pathname } = useLocation();

  if (pathname !== "/") {
    return (
      <Suspense fallback="Loading...">
        <Outlet />
      </Suspense>
    );
  }
  return (
    <section className="my-[76px] flex gap-[30px]">
      <HomeFilters />
      <HomeCatalog />
    </section>
  );
};
