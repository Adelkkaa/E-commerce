import React from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { cn } from "@/shared/lib/utils";

type InputDefaultProps = React.InputHTMLAttributes<HTMLInputElement> & {
  labelClassname?: string;
  labelText?: string;
  wrapperClassname?: string;
};

type TInputField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
} & InputDefaultProps;

const Input = React.forwardRef<HTMLInputElement, TInputField>(
  (
    {
      className,
      labelClassname,
      labelText,
      wrapperClassname,
      name,
      disabled,
      ...props
    },
    ref,
  ) => {
    const {
      field,
      fieldState: { error },
    } = useController({
      name,
    });
    return (
      <div className={cn("flex flex-col gap-2", wrapperClassname)}>
        <label
          className={cn(
            "relative flex flex-col gap-[0.5rem] w-full rounded-[8px]  border-[2px] focus-within:!border-blueCustom focus-within:!text-blueCustom bg-background px-[33px] py-[10px] text-textL ring-offset-background text-grayCustom cursor-pointer",
            labelClassname,
            {
              "border-red-600": error?.message,
              "bg-grayCustom": disabled,
              "border-blueCustom": field.value,
            },
          )}
        >
          <span
            className={cn("!text-textL absolute top-[-14px] bg-white", {
              "text-red-600": error?.message,
              "text-blueCustom": field.value,
            })}
          >
            {labelText}
          </span>
          <input
            className={cn(
              "resize-none !text-black text-textL placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              className,
            )}
            {...field}
            {...props}
            disabled={disabled}
            ref={ref}
          />
        </label>
        {error?.message && (
          <span className="text-textS text-red-600 border-red-600">
            {error.message}
          </span>
        )}
      </div>
    );
  },
);
Input.displayName = "Input";

export { Input };
