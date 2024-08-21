import { Suspense, useEffect } from "react";
import { Outlet, useLocation, useSearchParams } from "react-router-dom";
import { Loader } from "@/shared/ui";
import { HomeCatalog } from "@/widgets/HomeCatalog";
import { HomeFilters } from "@/widgets/HomeFilters";

export const Home = () => {
  const { pathname } = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const in_stock = searchParams.get("in_stock");

  // Заполняем sessionStorage при открытии вкладки с заполненными query параметрами
  useEffect(() => {
    if (pathname === "/") {
      if (page) {
        sessionStorage.setItem(
          "homeSearchParams",
          JSON.stringify({
            ...JSON.parse(sessionStorage.getItem("homeSearchParams") || "{}"),
            page,
          }),
        );
      }
      if (in_stock) {
        sessionStorage.setItem(
          "homeSearchParams",
          JSON.stringify({
            ...JSON.parse(sessionStorage.getItem("homeSearchParams") || "{}"),
            in_stock,
          }),
        );
      }
    }
  }, [pathname, page, in_stock]);

  // Заполняем query параметры при переходе с других страниц сайта
  useEffect(() => {
    if (pathname === "/") {
      const homeSearch = JSON.parse(
        sessionStorage.getItem("homeSearchParams") || "{}",
      );
      if (homeSearch?.page) {
        searchParams.set("page", homeSearch?.page);
      }
      if (homeSearch?.in_stock) {
        searchParams.set("in_stock", homeSearch?.in_stock);
      }
      setSearchParams(searchParams);
    }
  }, [pathname]);

  if (pathname !== "/") {
    return (
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    );
  }
  return (
    <section className="max-xl:padding my-[26px] md:my-[76px] flex mb:max-md:flex-col gap-[30px]">
      <HomeFilters />
      <HomeCatalog />
    </section>
  );
};
