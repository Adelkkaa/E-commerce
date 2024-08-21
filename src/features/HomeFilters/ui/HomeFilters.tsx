import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FilterCheckbox } from "@/entities/FilterCheckbox";
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

  const [accordionValue, setAccordionValue] = useState<string[]>([]);

  const dispatch = useAppDispatch();

  const [downPrice, setDownPrice] = useState("");
  const { selectInStock } = productListActions;
  const { inStock } = useAppSelector((state) => state.productListReducer);

  const handleInStockFilterChange = (value: string) => {
    dispatch(selectInStock(value));
  };

  const handleApplyFilters = () => {
    if (inStock) {
      searchParams.set("in_stock", inStock);
    } else {
      searchParams.delete("in_stock");
    }

    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  const handleClearFilters = () => {
    dispatch(selectInStock(null));
    searchParams.delete("in_stock");
    searchParams.set("page", "1");
    setSearchParams(searchParams);
  };

  useEffect(() => {
    if (in_stock) {
      dispatch(selectInStock(in_stock));
      setAccordionValue((prev) => [...prev, "in_stock"]);
    }
  }, [in_stock]);

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
        <AccordionItem value="item-2">
          <AccordionTrigger>Фильтр 1</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-[9px]">
            <FilterCheckbox id="salam-1" label="Категория 2" />
            <FilterCheckbox id="salam_1-1" label="Категория 2" />
            <FilterCheckbox id="anti-salam-1" label="Категория 3" />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Фильтр 2</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-[9px]">
            <FilterCheckbox id="salam-2" label="Категория 2" />
            <FilterCheckbox id="salam_1-2" label="Категория 2" />
            <FilterCheckbox id="anti-salam-2" label="Категория 3" />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Фильтр 3</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-[9px]">
            <FilterCheckbox id="salam-3" label="Категория 2" />
            <FilterCheckbox id="salam_1-3" label="Категория 2" />
            <FilterCheckbox id="anti-salam-3" label="Категория 3" />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-5">
          <AccordionTrigger>Цена</AccordionTrigger>
          <AccordionContent className="flex gap-[20px]">
            <MaskedInput
              value={downPrice}
              onChange={(e) => setDownPrice(e.target.value)}
              placeholder="От"
            />
            <MaskedInput placeholder="До" />
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
