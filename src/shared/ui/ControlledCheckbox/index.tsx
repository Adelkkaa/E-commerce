import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { Check } from "lucide-react";
import React from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { cn } from "@/shared/lib/utils";

interface ICheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root> {
  id: string;
  label: string;
  wrapperClassname?: string;
  labelClassname?: string;
  withIcon?: boolean;
}

type TCheckboxField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
} & ICheckboxProps;

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  TCheckboxField
>(
  (
    {
      className,
      withIcon = false,
      wrapperClassname,
      labelClassname,
      name,
      id,
      label,
      ...props
    },
    ref,
  ) => {
    const { field } = useController({
      name,
    });

    return (
      <div className={cn("inline-flex items-center", wrapperClassname)}>
        <CheckboxPrimitive.Root
          id={id}
          className={cn(
            "peer h-6 w-6 shrink-0 rounded-[4px] border border-grayCustom ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50  data-[state=checked]:text-primary-foreground",
            className,
          )}
          {...props}
          {...field}
          onCheckedChange={(val) => {
            field.onChange(val);
          }}
          checked={field.value}
          ref={ref}
        >
          <CheckboxPrimitive.Indicator
            className={cn("flex items-center justify-center w-full h-full")}
          >
            {withIcon ? (
              <Check className="h-6 w-6 text-blueCustom" />
            ) : (
              <div className="rounded-[2px] bg-blueCustom h-5 w-5" />
            )}
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>
        <label
          htmlFor={id}
          className={cn(
            "pl-[11px] text-textM leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none cursor-pointer",
            labelClassname,
          )}
        >
          {label}
        </label>
      </div>
    );
  },
);
Checkbox.displayName = "Input";

export { Checkbox };
