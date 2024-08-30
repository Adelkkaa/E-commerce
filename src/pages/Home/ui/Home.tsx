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
  const name = searchParams.get("name");

  // Заполняем sessionStorage при открытии вкладки с заполненными query параметрами
  useEffect(() => {
    if (pathname === "/") {
      if (page) {
        sessionStorage.setItem("page", page);
      }
      if (in_stock) {
        sessionStorage.setItem("in_stock", in_stock);
      }
      if (name) {
        sessionStorage.setItem("name", name);
      }
    }
  }, [pathname, page, in_stock, name]);

  // Заполняем query параметры при переходе с других страниц сайта
  useEffect(() => {
    if (pathname === "/") {
      const page = sessionStorage.getItem("page");
      const in_stock = sessionStorage.getItem("in_stock");
      const searchName = sessionStorage.getItem("name");
      if (page) {
        searchParams.set("page", page);
      }
      if (in_stock) {
        searchParams.set("in_stock", in_stock);
      }
      if (searchName) {
        searchParams.set("name", searchName);
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
