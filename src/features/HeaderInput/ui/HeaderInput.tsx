import { useDebounce } from "@uidotdev/usehooks";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { useGetProductCardListQuery } from "@/entities/ProductCard";
import { productListActions } from "@/entities/ProductList";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import { cn } from "@/shared/lib/utils";
import { Input } from "@/shared/ui";

export const HeaderInput = () => {
  const searchName = sessionStorage.getItem("name");
  const [hintVisibility, setHintVisibility] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectInStock, selectName } = productListActions;
  const { name } = useAppSelector((state) => state.productListReducer);
  const debouncedSearchValue = useDebounce(name, 300);

  const { data: productCardList } = useGetProductCardListQuery(
    {
      name: debouncedSearchValue.toLowerCase() || undefined,
      size: 10,
    },
    { skip: !debouncedSearchValue },
  );

  const handleChangeSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(selectName(e.target.value));
    setHintVisibility(true);
  };

  const handleSelectHint = (hintName: string) => {
    dispatch(selectName(hintName));
    sessionStorage.setItem("name", hintName);
    setHintVisibility(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name) {
      setHintVisibility(false);
      navigate(`/?name=${name}`);
      sessionStorage.setItem("name", name);
      sessionStorage.removeItem("in_stock");
      sessionStorage.removeItem("page");
      dispatch(selectInStock(null));
    }
  };

  useEffect(() => {
    dispatch(selectName(searchName || ""));
    console.log("searchName", searchName);
  }, [searchName]);
  return (
    <form
      onSubmit={handleSubmit}
      className="flex-1 relative flex flex-col gap-4"
    >
      <label htmlFor="search" className={cn("relative flex items-center")}>
        <Search className=" absolute h-[16px] w-[16px] ml-[7px] cursor-pointer" />
        <Input
          value={name}
          onChange={handleChangeSearchValue}
          id="search"
          className="border-[2px] text-[20px] px-[32px]"
          placeholder="Введите ваш запрос..."
        />
      </label>
      {productCardList?.items &&
        productCardList.items.length > 0 &&
        debouncedSearchValue &&
        hintVisibility && (
          <div className="absolute flex flex-col gap-2 border-[2px] py-2 text-[20px] px-[32px] rounded-sm top-[50px] w-full z-10 bg-white">
            {productCardList.items.map((product) => (
              <Link
                key={product.guid}
                to={`/product/${product.guid}`}
                className="line-clamp-1"
                onClick={() => handleSelectHint(product.name)}
              >
                {product.name}
              </Link>
            ))}
          </div>
        )}
    </form>
  );
};
