import { HomeCatalog } from "@/widgets/HomeCatalog";
import { HomeFilters } from "@/widgets/HomeFilters";

export const Home = () => {
  return (
    <section className="mt-[76px] flex gap-[30px]">
      <HomeFilters />
      {/* <ProductCard /> */}
      <HomeCatalog />
    </section>
  );
};
