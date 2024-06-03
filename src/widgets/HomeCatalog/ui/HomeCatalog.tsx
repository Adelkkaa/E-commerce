import { HomeCatalogSort } from "@/features/HomeCatalogSort";
import { ProductCard } from "@/features/ProductCard";

export const HomeCatalog = () => {
  const productCards = Array.from({ length: 20 });

  return (
    <div className="flex flex-1 flex-col flex-wrap gap-3">
      <HomeCatalogSort />
      <div className="flex flex-wrap justify-center md:justify-normal gap-1 md:gap-5">
        {productCards.map((_, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </div>
  );
};
