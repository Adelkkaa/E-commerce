import { cn } from "@/shared/lib/utils";
import { IProductPackage } from "@/shared/types/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui";

interface SelectDefaultProps {
  labelClassname?: string;
  labelText?: string;
  wrapperClassname?: string;
  selectClassname?: string;
  disabled?: boolean;
  placeholder: string;
  options: IProductPackage[];
  onChange: (value: IProductPackage) => void;
  value: string;
}

const PackageSelect = ({
  labelClassname,
  labelText,
  wrapperClassname,
  disabled,
  placeholder,
  selectClassname,
  options,
  onChange,
  value,
  ...props
}: SelectDefaultProps) => {
  const handleChangeSelect = (value: string) => {
    const preparedOption = options.find(
      (item) => item.value === value,
    ) as IProductPackage;

    console.log(preparedOption);
    onChange(preparedOption);
  };
  return (
    <div className={cn("flex flex-col gap-2", wrapperClassname)}>
      <label className={cn("relative")}>
        <span
          className={cn(
            "!text-textL absolute top-[-14px] left-[33px] bg-whiteCustom  text-grayCustom select-none",
            {
              "opacity-50 z-50": disabled,
            },
            labelClassname,
          )}
        >
          {labelText}
        </span>
        <Select {...props} value={value} onValueChange={handleChangeSelect}>
          <SelectTrigger
            disabled={disabled}
            className={cn(
              "outline-none bg-whiteCustom !p-0 gap-[0.5rem] w-full rounded-[8px] border-[2px] !pl-[33px] !pr-[10px] !py-[20px] !text-textM ring-offset-background data-[placeholder]:text-grayCustom text-black cursor-pointer",
              selectClassname,
            )}
          >
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((item) => (
              <SelectItem
                key={item.value}
                className="!text-center !text-textM justify-center !pl-0 data-[state=checked]:bg-blueCustom data-[state=checked]:text-white"
                value={item.value}
              >
                {item.name}{" "}
                <span className="text-grayCustom">({item.value} шт)</span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </label>
    </div>
  );
};

export { PackageSelect };
