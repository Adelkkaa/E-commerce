import { HomeCatalog } from "@/widgets/HomeCatalog";
import { HomeFilters } from "@/widgets/HomeFilters";

export const Home = () => {
  return (
    <section className="my-[76px] flex gap-[30px]">
      <HomeFilters />
      <HomeCatalog />
    </section>
  );
};
