import clsx from "clsx";
import { FC, useState } from "react";
import { FilterCheckbox } from "@/entities/FilterCheckbox";
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
  const [downPrice, setDownPrice] = useState("");

  return (
    <div
      className={clsx("w-[240px] flex flex-col gap-[30px]", wrapperClassname)}
    >
      <Accordion type="multiple" className="flex flex-col gap-[30px]">
        <AccordionItem value="item-1">
          <AccordionTrigger>Категории</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-[9px]">
            <FilterCheckbox id="salam" label="Категория 1" />
            <FilterCheckbox id="salam_1" label="Категория 2" />
            <FilterCheckbox id="anti-salam" label="Категория 3" />
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
        <Button className="flex-1 py-[10px] !text-buttonM text-white">
          Отменить
        </Button>
        <Button className="flex-1 py-[10px] !text-buttonM text-white">
          Применить
        </Button>
      </div>
    </div>
  );
};
