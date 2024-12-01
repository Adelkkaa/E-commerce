import { cva, type VariantProps } from "class-variance-authority";
import { Loader2 } from "lucide-react";
import { FC } from "react";

const loaderVariants = cva("", {
  variants: {
    variant: {
      global:
        "absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]",
      local: "static",
    },
  },
  defaultVariants: {
    variant: "global",
  },
});

interface ILoaderProps extends VariantProps<typeof loaderVariants> {
  width?: number;
  height?: number;
  className?: string;
}

export const Loader: FC<ILoaderProps> = ({
  className,
  variant,
  width = 64,
  height = 64,
}) => {
  return (
    <div className={loaderVariants({ variant, className })}>
      <Loader2
        width={width}
        height={height}
        className="animate-spin text-blueCustom"
      />
    </div>
  );
};
