import { useSearchParams } from "react-router-dom";
import { useGetProductCardListQuery } from "@/entities/ProductCard";
import { ProductCardSkeleton } from "@/entities/ProductCardSkeleton";
import { productListActions } from "@/entities/ProductList";
import { HomeCatalogSort } from "@/features/HomeCatalogSort";
import { ProductCard } from "@/features/ProductCard";
import { PaginationComponent } from "@/features/ProductsPagination";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import { Button, Typography } from "@/shared/ui";

export const HomeCatalog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get("page");
  const price_from = searchParams.get("price_from");
  const price_to = searchParams.get("price_to");
  const categories = searchParams.get("categories");
  const order_by = searchParams.get("order_by");

  const name = searchParams.get("name");

  const dispatch = useAppDispatch();
  const { selectName } = productListActions;

  const { price_type_guid, guid } = useAppSelector(
    (state) => state.outletsReducer,
  );

  const mockProductCards = Array.from({ length: 10 });
  const {
    data: productCardList,
    isLoading,
    isFetching,
    isSuccess,
    currentData,
  } = useGetProductCardListQuery({
    page: Number(page) || 1,
    size: 25,
    in_stock: "true",
    name: name || undefined,
    price_type_guid: price_type_guid || undefined,
    cart_outlet_guid: guid || undefined,
    price_from: price_from || undefined,
    price_to: price_to || undefined,
    good_group_guids: categories || undefined,
    order_by: order_by || "name",
  });

  const handleClearSearchName = () => {
    dispatch(selectName(""));
    searchParams.delete("name");
    searchParams.set("page", "1");
    setSearchParams(searchParams);
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
        {isLoading || currentData?.items === undefined ? (
          mockProductCards.map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))
        ) : productCardList?.items && productCardList.items.length > 0 ? (
          productCardList.items.map((productCard) => (
            <ProductCard key={productCard.guid} {...productCard} />
          ))
        ) : (
          <Typography variant="titleL" className="font-normal">
            Список товаров пуст...
          </Typography>
        )}
      </div>
      {isSuccess &&
        !isFetching &&
        productCardList.items.length > 0 &&
        productCardList.pages > 1 && (
          <PaginationComponent
            activePage={page ? Number(page) : 1}
            totalPages={Number(productCardList.pages)}
          />
        )}
    </div>
  );
};
