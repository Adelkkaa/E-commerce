import { useState } from "react";
import { FilterCheckbox } from "@/entities/FilterCheckbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Button,
  MaskedInput,
} from "@/shared/ui";

export const HomeFilters = () => {
  const [downPrice, setDownPrice] = useState("");
  return (
    <div className="w-[240px] flex flex-col gap-[30px]">
      <Accordion type="multiple" className="flex flex-col gap-[30px]">
        <AccordionItem value="item-1">
          <AccordionTrigger>Категории</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-[9px]">
            <FilterCheckbox id="salam" label="Салам" />
            <FilterCheckbox id="salam_1" label="Ну привет" />
            <FilterCheckbox id="anti-salam" label="Покеда" />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-2">
          <AccordionTrigger>Фильтр 1</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-[9px]">
            <FilterCheckbox id="salam-1" label="Салам" />
            <FilterCheckbox id="salam_1-1" label="Ну привет" />
            <FilterCheckbox id="anti-salam-1" label="Покеда" />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-3">
          <AccordionTrigger>Фильтр 2</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-[9px]">
            <FilterCheckbox id="salam-2" label="Салам" />
            <FilterCheckbox id="salam_1-2" label="Ну привет" />
            <FilterCheckbox id="anti-salam-2" label="Покеда" />
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="item-4">
          <AccordionTrigger>Фильтр 3</AccordionTrigger>
          <AccordionContent className="flex flex-col gap-[9px]">
            <FilterCheckbox id="salam-3" label="Салам" />
            <FilterCheckbox id="salam_1-3" label="Ну привет" />
            <FilterCheckbox id="anti-salam-3" label="Покеда" />
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
