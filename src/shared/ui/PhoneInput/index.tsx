import React from "react";
import { FieldPath, FieldValues, useController } from "react-hook-form";
import { IMaskInput } from "react-imask";
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

const PhoneInput = React.forwardRef<HTMLInputElement, TInputField>(
  (
    {
      className,
      labelClassname,
      wrapperClassname,
      labelText,
      name,
      disabled,
      ...props
    },
    ref,
  ) => {
    const {
      field: { onChange, ...field },
      fieldState: { error },
    } = useController({
      name,
    });
    return (
      <div className={cn("flex flex-col gap-2", wrapperClassname)}>
        <label
          className={cn(
            "relative flex flex-col gap-[0.5rem] w-full rounded-[8px] border-[2px] bg-background px-[33px] py-[10px] text-textL ring-offset-background text-grayCustom cursor-pointer disabled:opacity-50",
            labelClassname,
            {
              "border-blueCustom": field.value && !disabled && !error?.message,
              "border-red-600": error?.message,
            },
          )}
        >
          <span
            className={cn(
              "!text-textL absolute top-[-14px] bg-white disabled:opacity-50",
              {
                "text-red-600": error?.message,
                "text-blueCustom": field.value && !disabled,
              },
            )}
          >
            {labelText}
          </span>
          <IMaskInput
            overwrite
            definitions={{
              "#": /[0-9]/,
            }}
            className={cn(
              "resize-none !text-black text-textL placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
              className,
            )}
            inputRef={ref}
            mask="+7 (###) ###-##-##"
            onAccept={(value) => onChange({ target: { name, value } })}
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
PhoneInput.displayName = "PhoneInput";

export { PhoneInput };
