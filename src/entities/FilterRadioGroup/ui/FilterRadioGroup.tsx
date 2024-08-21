import { FC } from "react";
import { RadioGroup, RadioGroupItem } from "@/shared/ui";

interface IFilterRadioGroupProps {
  onValueChange: (value: string) => void;
  items: Array<{
    id: string;
    value: string;
    label: string;
  }>;
  value: string;
}

export const FilterRadioGroup: FC<IFilterRadioGroupProps> = ({
  onValueChange,
  items,
  value,
}) => {
  return (
    <RadioGroup value={value} onValueChange={onValueChange}>
      {items.map(({ id, value, label }) => (
        <div key={id} className="flex items-center space-x-2 cursor-pointer">
          <RadioGroupItem value={value} id={id} />
          <label htmlFor={id}>{label}</label>
        </div>
      ))}
    </RadioGroup>
  );
};
