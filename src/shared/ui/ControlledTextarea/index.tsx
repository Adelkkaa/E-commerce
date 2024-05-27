import React from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { cn } from "@/shared/lib/utils";

type TextareaDefaultProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    labelClassname?: string;
    labelTextClassname?: string;
    labelText?: string;
  };

type TTextField<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
} & TextareaDefaultProps;

const ControlledTextarea = React.forwardRef<HTMLTextAreaElement, TTextField>(
  (
    {
      className,
      labelClassname,
      labelTextClassname,
      labelText,
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
      <div className="flex flex-col gap-2">
        <label
          className={cn(
            "relative flex flex-col gap-[0.5rem] w-full rounded-[8px] border-[2px] bg-background px-[33px] py-[10px] text-textL ring-offset-background text-grayCustom cursor-pointer",
            labelClassname,
            {
              "border-red-600": error?.message,
              "bg-grayCustom": disabled,
            },
          )}
        >
          <span
            className={cn(
              "!text-textL absolute top-[-14px] bg-white",
              {
                "text-red-600": error?.message,
              },
              labelTextClassname,
            )}
          >
            {labelText}
          </span>
          <textarea
            className={cn(
              "resize-none min-h-[70px] py-1 !text-black text-textM placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              className,
            )}
            {...field}
            {...props}
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
ControlledTextarea.displayName = "ControlledTextarea";

export { ControlledTextarea };
