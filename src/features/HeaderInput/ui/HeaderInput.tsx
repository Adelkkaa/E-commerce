import { useDebounce } from "@uidotdev/usehooks";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGetProductCardListQuery } from "@/entities/ProductCard";
import { productListActions } from "@/entities/ProductList";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import { cn } from "@/shared/lib/utils";
import { Command } from "@/shared/ui";
import { CommandInput, CommandItem, CommandList } from "@/shared/ui/Command";

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

  const handleChangeSearchValue = (search: string) => {
    dispatch(selectName(search));
    setHintVisibility(true);
  };

  const handleSelectHint = ({
    guid,
    hintName,
  }: {
    guid: string;
    hintName: string;
  }) => {
    dispatch(selectName(hintName));
    sessionStorage.setItem("name", hintName);
    navigate(`/product/${guid}`);
    setHintVisibility(false);
  };

  const handleSearch = () => {
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
  }, [searchName]);

  const hintVisible =
    productCardList?.items &&
    productCardList.items.length > 0 &&
    debouncedSearchValue &&
    hintVisibility;
  return (
    <Command
      onFocus={() => setHintVisibility(true)}
      className={cn("relative flex-1 flex w-full items-center")}
    >
      <CommandInput
        value={name}
        onValueChange={handleChangeSearchValue}
        id="search"
        className="border-[2px] text-[20px] px-[32px]"
        placeholder="Введите ваш запрос..."
      />
      <CommandList
        className={cn(
          "absolute flex flex-col gap-2 border-[2px] text-[20px] rounded-sm top-[50px] w-full z-10 bg-white",
          hintVisible ? "block" : "hidden",
        )}
      >
        <CommandItem
          key="unique"
          className="line-clamp-1 px-[26px]"
          onSelect={handleSearch}
          value={`uniq-${name}`}
        >
          Поиск в каталоге: {name}
        </CommandItem>
        {hintVisible &&
          productCardList.items.map((product) => (
            <CommandItem
              key={product.guid}
              className="line-clamp-1 px-[26px]"
              onSelect={() =>
                handleSelectHint({
                  guid: product.guid,
                  hintName: product.name,
                })
              }
              value={`z-${product.name}`}
            >
              {product.name}
            </CommandItem>
          ))}
      </CommandList>
    </Command>
  );
};
