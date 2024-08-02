import { useSearchParams } from "react-router-dom";
import { useGetProductCardListQuery } from "@/entities/ProductCard";
import { ProductCardSkeleton } from "@/entities/ProductCardSkeleton";
import { HomeCatalogSort } from "@/features/HomeCatalogSort";
import { ProductCard } from "@/features/ProductCard";
import { ProductsPagination } from "@/features/ProductsPagination";

export const HomeCatalog = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get("page");
  const mockProductCards = Array.from({ length: 10 });
  const {
    data: productCardList,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetProductCardListQuery({
    page: Number(page) || 1,
    size: 25,
  });

  return (
    <div className="flex flex-1 flex-col flex-wrap gap-3">
      <HomeCatalogSort />
      <div className="flex flex-wrap justify-center md:justify-normal gap-1 md:gap-4">
        {isLoading || isFetching
          ? mockProductCards.map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))
          : productCardList?.items.map((productCard) => (
              <ProductCard key={productCard.guid} {...productCard} />
            ))}
      </div>
      {isSuccess && !isFetching && (
        <ProductsPagination
          activePage={page ? Number(page) : 1}
          totalPages={Number(productCardList.pages)}
        />
      )}
    </div>
  );
};
