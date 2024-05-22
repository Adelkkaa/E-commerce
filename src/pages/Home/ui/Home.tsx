import { ProductCardSkeleton } from "@/entities/ProductCardSkeleton";
import { ProductCard } from "@/features/ProductCard";


export const Home = () => {
  return (
    <section>
      <ProductCard />
      <ProductCardSkeleton />
    </section>
  );
};
