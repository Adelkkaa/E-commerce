import { FC } from "react";
import { cn } from "@/shared/lib/utils";
import { Checkbox } from "@/shared/ui";

interface IFilterCheckboxProps {
  id: string;
  label: string;
  onChange: (value: string) => void;
  value: string;
  checked: boolean;
  className?: string;
}

export const FilterCheckbox: FC<IFilterCheckboxProps> = ({
  id,
  label,
  value,
  onChange,
  checked,
  className,
}) => {
  return (
    <div className={cn("flex items-center", className)}>
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
