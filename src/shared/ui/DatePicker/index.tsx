// eslint-disable-next-line
// @ts-nocheck
import { forwardRef } from "react";
import type { ReactDatePickerProps } from "react-datepicker";
import ReactDatePicker from "react-datepicker";
import type { FieldPath, FieldValues } from "react-hook-form";
import { useController } from "react-hook-form";
import { IMaskInput } from "react-imask";
import { cn } from "@/shared/lib/utils";

type TDatePicker<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = {
  name: TName;
  label: string;
  labelClassname?: string;
  dateFormat?: string;
  labelTextClassname?: string;
} & Omit<ReactDatePickerProps, "onChange">;

export const DatePicker = forwardRef<ReactDatePicker, TDatePicker>(
  (
    {
      name,
      label,
      dateFormat = "dd.MM.yyyy",
      labelClassname,
      className,
      labelTextClassname,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    const {
      field: { value, onChange, ...field },
      fieldState: { error },
    } = useController({
      name,
    });

    return (
      <div className="flex flex-col gap-2">
        <label
          className={cn(
            "relative flex flex-col gap-[0.5rem] w-full rounded-[8px] border-[2px] bg-background px-[33px] py-[10px] text-textL ring-offset-background text-grayCustom cursor-pointer bg-white",
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
            {label}
          </span>
          <ReactDatePicker
            {...field}
            {...props}
            ref={ref}
            name={name}
            value={value}
            selected={value}
            onChange={(date) => onChange(date)}
            dateFormat={dateFormat}
            className="w-full h-full text-textM text-black bg-white outline-none"
            customInput={
              <IMaskInput
                definitions={{
                  "#": /[0-9]/,
                }}
                mask="##.##.####"
              />
            }
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
