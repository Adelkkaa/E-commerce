import { ProductCardSkeleton } from "@/entities/ProductCardSkeleton";
import { ProductCard } from "@/features/ProductCard";
import { HomeFilters } from "@/widgets/HomeFilters";

export const Home = () => {
  return (
    <section className="mt-[76px] flex gap-[30px]">
      <HomeFilters />
      <ProductCard />
    </section>
  );
};
