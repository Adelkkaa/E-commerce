import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetProductGroupsQuery } from "@/entities/ProductCard";
import { productListActions } from "@/entities/ProductList";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import { IProductGroups } from "@/shared/types/types";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  MaskedInput,
} from "@/shared/ui";
import {
  handleInitializeOpenState,
  prepareAddCategoriesData,
  renderProductGroups,
} from "../model/helper";

interface IHomeFilters {
  wrapperClassname?: string;
  onClickButton?: () => void;
}

export const HomeFilters: FC<IHomeFilters> = ({
  wrapperClassname,
  onClickButton,
}) => {
  const { data: productGroups, isSuccess } = useGetProductGroupsQuery();
  const [searchParams, setSearchParams] = useSearchParams();
  const price_from = searchParams.get("price_from");
  const price_to = searchParams.get("price_to");
  const categoriesParams = searchParams.get("categories");

  const [accordionValue, setAccordionValue] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const { selectPriceFrom, selectPriceTo, selectCategories, clearFilters } =
    productListActions;
  const { priceFrom, priceTo, categories } = useAppSelector(
    (state) => state.productListReducer,
  );

  const handlePriceFromFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(selectPriceFrom(e.target.value));
  };

  const handlePriceToFilterChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    dispatch(selectPriceTo(e.target.value));
  };

  const handleCategoriesFilterChange = (value: string) => {
    if (categories.includes(value)) {
      dispatch(selectCategories(categories.filter((item) => item !== value)));
    } else {
      const preparedCategories = prepareAddCategoriesData({
        categories,
        guid: value,
        productGroups: productGroups as IProductGroups[],
      });
      dispatch(selectCategories([...preparedCategories, value]));
    }
  };
  const handleApplyFilters = () => {
    const vocabulary: Record<string, string | null | undefined> = {
      price_from: priceFrom,
      price_to: priceTo,
    };

    Object.entries(vocabulary).forEach(([key, value]) => {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    });

    searchParams.set("categories", categories.join(","));
    searchParams.set("page", "1");
    setSearchParams(searchParams);
    if (onClickButton) {
      onClickButton();
    }
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    ["price_from", "price_to", "categories"].forEach((key) => {
      searchParams.delete(key);
    });
    searchParams.set("page", "1");
    setSearchParams(searchParams);
    setAccordionValue([]);
    if (onClickButton) {
      onClickButton();
    }
  };

  useEffect(() => {
    if (price_from) {
      dispatch(selectPriceFrom(price_from));
      setAccordionValue((prev) => [...prev, "price"]);
    }
    if (price_to) {
      dispatch(selectPriceTo(price_to));
      setAccordionValue((prev) =>
        prev.includes("price") ? prev : [...prev, "price"],
      );
    }

    if (categoriesParams && isSuccess) {
      dispatch(selectCategories(categoriesParams.split(",")));
      const categories = handleInitializeOpenState(
        productGroups,
        categoriesParams.split(","),
      );
      setAccordionValue((prev) =>
        prev.includes("categories")
          ? [...prev, ...categories]
          : [...prev, "categories", ...categories],
      );
    }
  }, [isSuccess]);

  return (
    <div
      className={clsx("w-[240px] flex flex-col gap-[30px]", wrapperClassname)}
    >
      <Accordion
        value={accordionValue}
        onValueChange={(value) => {
          setAccordionValue(value);
        }}
        type="multiple"
        className="flex flex-col gap-[30px]"
      >
        <AccordionItem value="categories">
          <AccordionTrigger>Категории</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-[20px]">
            {renderProductGroups({
              categories,
              handleCategoriesFilterChange,
              nesting: 0,
              productGroups: productGroups || [],
            })}
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger>Цена</AccordionTrigger>
          <AccordionContent className="flex gap-[20px]">
            <MaskedInput
              value={priceFrom || ""}
              onChange={handlePriceFromFilterChange}
              placeholder="От"
            />
            <MaskedInput
              value={priceTo || ""}
              onChange={handlePriceToFilterChange}
              placeholder="До"
            />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
      <div className="flex justify-between items-center gap-[20px]">
        <Button
          onClick={handleClearFilters}
          className="flex-1 py-[10px] !text-buttonM text-white rounded-[4px]"
        >
          Отменить
        </Button>
        <Button
          onClick={handleApplyFilters}
          className="flex-1 py-[10px] !text-buttonM text-white rounded-[4px]"
        >
          Применить
        </Button>
      </div>
    </div>
  );
};
