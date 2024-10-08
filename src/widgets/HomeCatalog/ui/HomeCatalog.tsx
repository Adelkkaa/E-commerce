import { useSearchParams } from "react-router-dom";
import { useGetProductCardListQuery } from "@/entities/ProductCard";
import { ProductCardSkeleton } from "@/entities/ProductCardSkeleton";
import { HomeCatalogSort } from "@/features/HomeCatalogSort";
import { ProductCard } from "@/features/ProductCard";
import { ProductsPagination } from "@/features/ProductsPagination";
import { Button, Typography } from "@/shared/ui";

export const HomeCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const in_stock = searchParams.get("in_stock");
  const name = searchParams.get("name");

  const mockProductCards = Array.from({ length: 10 });
  const {
    data: productCardList,
    isLoading,
    isFetching,
    isSuccess,
  } = useGetProductCardListQuery({
    page: Number(page) || 1,
    size: 25,
    in_stock: in_stock || undefined,
    name: name || undefined,
  });

  const handleClearSearchName = () => {
    searchParams.delete("name");
    searchParams.set("page", "1");
    setSearchParams(searchParams);
    sessionStorage.removeItem("name");
  };

  return (
    <div className="flex flex-1 flex-col flex-wrap gap-3">
      <HomeCatalogSort />
      {name && (
        <div className="flex justify-between">
          <Typography variant="titleL" className="font-normal">
            Поиск по запросу: <span className="font-bold">{name}</span>
          </Typography>
          <Button onClick={handleClearSearchName} variant="outline">
            Очистить
          </Button>
        </div>
      )}
      <div className="flex flex-wrap justify-center md:justify-normal gap-1 md:gap-4">
        {isLoading || isFetching ? (
          mockProductCards.map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : (productCardList?.items && productCardList.items.length > 0 ? (
          productCardList.items.map((productCard) => (
            <ProductCard key={productCard.guid} {...productCard} />
          ))
        ) : (
          <Typography variant="titleL" className="font-normal">
            Список товаров пуст...
          </Typography>
        ))}
      </div>
      {isSuccess && !isFetching && productCardList.items.length > 0 && (
        <ProductsPagination
          activePage={page ? Number(page) : 1}
          totalPages={Number(productCardList.pages)}
        />
      )}
    </div>
  );
};
