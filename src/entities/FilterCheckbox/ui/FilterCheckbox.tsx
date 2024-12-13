import { FC } from "react";
import { Checkbox } from "@/shared/ui";

interface IFilterCheckboxProps {
  id: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
  checked: boolean;
}

export const FilterCheckbox: FC<IFilterCheckboxProps> = ({
  id,
  label,
  value,
  onChange,
  checked,
}) => {
  return (
    <div className="flex items-center">
      <Checkbox
        value={value}
        checked={checked}
        onCheckedChange={() => {
          onChange(value);
        }}
        id={id}
      />
      <label
        htmlFor={id}
        className="pl-[11px] text-textS leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none cursor-pointer"
      >
        {label}
      </label>
    </div>
  );
};
