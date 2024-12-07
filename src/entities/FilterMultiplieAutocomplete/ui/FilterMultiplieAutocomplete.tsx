import { Check, ChevronDown, Loader2, X } from "lucide-react";
import { useState } from "react";
import { cn } from "@/shared/lib/utils";
import { Badge, Popover, PopoverContent, PopoverTrigger } from "@/shared/ui";
import { Button } from "@/shared/ui/Button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/shared/ui/Command";

interface IMultipleAutocompleteProps<T> {
  title: string;
  placeholder?: string;
  data: T[];
  value: string[];
  valueExtractor: keyof T;
  nameExtractor: keyof T;
  isLoading: boolean;
  isDisabled?: boolean;
  labelClassname?: string;
  className?: string;
  onChange: (value: string[]) => void;
}

export const FilterMultiplieAutocomplete = <T extends Record<string, any>>({
  title,
  data,
  value,
  onChange,
  isLoading,
  className,
  placeholder,
  labelClassname,
  isDisabled,
  valueExtractor,
  nameExtractor,
}: IMultipleAutocompleteProps<T>) => {
  const [open, setOpen] = useState<boolean>(false);
  const placeholderValue = placeholder || `Выберите ${title.toLowerCase()}`;
  const valuesObj =
    data.filter((item) => value.includes(item[valueExtractor])) || [];

  return (
    <Popover open={open} modal>
      <label className={cn("flex flex-1 relative group", labelClassname)}>
        <PopoverTrigger onClick={() => setOpen((prev) => !prev)} asChild>
          <Button
            disabled={isDisabled}
            variant="outline"
            role="combobox"
            className={cn(
              "w-full tb:w-[240px] justify-between border-[2px] border-border !pl-[33px] !py-[20px] !text-textM bg-whiteCustom",
              className,
              {
                "text-muted-foreground": !value,
              },
            )}
          >
            <span className="!text-textL absolute top-[-14px] left-[33px] bg-whiteCustom text-grayCustom select-none group-hover:bg-accent transition-colors">
              {title}
            </span>

            <div className="w-full flex flex-wrap gap-2 overflow-hidden">
              {valuesObj.length > 0
                ? valuesObj.map((item) => (
                    <Badge
                      key={item[valueExtractor]}
                      className="hover:bg-primary flex justify-between gap-2 cursor-default max-w-[90%]"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="w-full overflow-hidden overflow-ellipsis">
                        {item[nameExtractor]}
                      </div>
                      <div>
                        <X
                          className="h-4 w-4 cursor-pointer hover:text-white/45"
                          onClick={(e) => {
                            // По идее здесь должен быть e.stopPropagination(), но он не работает, а вот он работает)
                            e.preventDefault();
                            onChange(
                              value.filter(
                                (val) => val !== item[valueExtractor],
                              ),
                            );
                          }}
                        />
                      </div>
                    </Badge>
                  ))
                : placeholderValue}
            </div>
            <ChevronDown className="h-4 w-4 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0">
          <Command>
            <CommandList className="max-h-[200px]">
              {!isLoading && data.length === 0 && (
                <CommandEmpty>Нет доступных вариантов</CommandEmpty>
              )}

              {isLoading && (
                <CommandEmpty className="flex items-center justify-center h-14">
                  <Loader2 width={25} height={25} className="animate-spin" />
                </CommandEmpty>
              )}
              {data.length > 0 && (
                <CommandGroup>
                  {data.map((item) => (
                    <CommandItem
                      key={item[valueExtractor]}
                      className="cursor-pointer"
                      value={item[valueExtractor]}
                      disabled={
                        Array.isArray(value) &&
                        Boolean(
                          value.find((val) => val === item[valueExtractor]),
                        )
                      }
                      onSelect={() => {
                        onChange(
                          Array.isArray(value)
                            ? [...value, item[valueExtractor]]
                            : [item[valueExtractor]],
                        );
                        setOpen(false);
                      }}
                    >
                      <div className="flex items-center">
                        <p className="flex-1">{item[nameExtractor]}</p>
                        {Array.isArray(value) &&
                          value.map((val) => {
                            return (
                              val === item[valueExtractor] && (
                                <Check key={val} className="ml-auto h-4 w-4" />
                              )
                            );
                          })}
                      </div>
                    </CommandItem>
                  ))}
                </CommandGroup>
              )}
            </CommandList>
          </Command>
        </PopoverContent>
      </label>
    </Popover>
  );
};
