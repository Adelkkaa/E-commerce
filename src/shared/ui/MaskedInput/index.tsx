import * as React from "react";
import { IMaskInput } from "react-imask";
import { cn } from "@/shared/lib/utils";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  value?: string;
};

const MaskedInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, value, onChange }, ref) => {
    return (
      <IMaskInput
        overwrite
        type={type}
        definitions={{
          "#": /[0-9]/,
        }}
        mask={Number}
        className={cn(
          "flex h-10 w-full rounded-[8px] border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 focus-visible:border-main focus-visible:outline-none",
          className,
        )}
        inputRef={ref}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    );
  },
);
MaskedInput.displayName = "MaskedInput";

export { MaskedInput };
