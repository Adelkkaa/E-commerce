import { ProductCardSkeleton } from "@/entities/ProdductCardSkeleton";
import { ProductCard } from "@/features/ProductCard";

export const Home = () => {
  return (
    <div>
      <ProductCard />
      <ProductCardSkeleton />
    </div>
  );
};
