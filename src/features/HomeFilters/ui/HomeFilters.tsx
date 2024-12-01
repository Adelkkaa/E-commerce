import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterRadioGroup } from "@/entities/FilterRadioGroup";
import { productListActions } from "@/entities/ProductList";
import { useAppDispatch, useAppSelector } from "@/shared/hooks/use-redux";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  MaskedInput,
} from "@/shared/ui";

interface IHomeFilters {
  wrapperClassname?: string;
}

export const HomeFilters: FC<IHomeFilters> = ({ wrapperClassname }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const in_stock = searchParams.get("in_stock");
  const price_from = searchParams.get("price_from");
  const price_to = searchParams.get("price_to");

  const [accordionValue, setAccordionValue] = useState<string[]>(["in_stock"]);

  const dispatch = useAppDispatch();

  const { selectInStock, selectPriceFrom, selectPriceTo, clearFilters } =
    productListActions;
  const { inStock, priceFrom, priceTo } = useAppSelector(
    (state) => state.productListReducer,
  );

  const handleInStockFilterChange = (value: string) => {
    dispatch(selectInStock(value));
  };

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
  const handleApplyFilters = () => {
    const vocabulary: Record<string, string | null | undefined> = {
      in_stock: inStock,
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
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
    ["in_stock", "price_from", "price_to"].forEach((key) => {
      searchParams.delete(key);
    });
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (in_stock) {
      dispatch(selectInStock(in_stock));
      setAccordionValue((prev) => [...prev, "in_stock"]);
    }
    if (price_from) {
      dispatch(selectPriceFrom(price_from));
      setAccordionValue((prev) => [...prev, "price"]);
    }
    if (price_to) {
      dispatch(selectPriceTo(price_to));
      setAccordionValue((prev) => [...prev, "price"]);
    }
  }, [in_stock, price_from, price_to]);

  return (
    <div
      className={clsx("w-[240px] flex flex-col gap-[30px]", wrapperClassname)}
    >
      <Accordion
        value={accordionValue}
        onValueChange={setAccordionValue}
        type="multiple"
        className="flex flex-col gap-[30px]"
      >
        <AccordionItem value="in_stock">
          <AccordionTrigger>Наличие</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-[9px]">
            <FilterRadioGroup
              value={inStock || in_stock || ""}
              onValueChange={handleInStockFilterChange}
              items={[
                {
                  id: "in_stock",
                  value: "true",
                  label: "В наличии",
                },
                {
                  id: "out_of_stock",
                  value: "false",
                  label: "Нет в наличии",
                },
              ]}
            />
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
          className="flex-1 py-[10px] !text-buttonM text-white"
        >
          Отменить
        </Button>
        <Button
          onClick={handleApplyFilters}
          className="flex-1 py-[10px] !text-buttonM text-white"
        >
          Применить
        </Button>
      </div>
    </div>
  );
};
