import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, Minus, Plus } from "lucide-react";
import * as React from "react";
import { cn } from "@/shared/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn(className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
    withIcon?: boolean;
    iconVariant?: "plus" | "chevron";
    headerClassname?: string;
  }
>(
  (
    {
      className,
      children,
      withIcon = true,
      iconVariant = "plus",
      headerClassname,
      ...props
    },
    ref,
  ) => (
    <AccordionPrimitive.Header
      className={cn(
        "flex border-b-2 border-black [&[data-state=open]]:border-main mb-4",
        headerClassname,
      )}
    >
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between pb-[10px] font-bold text-[20px] transition-all [&[data-state=open]>svg]:rotate-180 group",
          className,
        )}
        {...props}
      >
        {children}
        {withIcon && iconVariant === "plus" && (
          <>
            <Plus className="h-[20px] w-[20px] shrink-0 transition-transform duration-200 group-data-[state=open]:hidden" />
            <Minus className="h-[20px] w-[20px] shrink-0 transition-transform duration-200 group-data-[state=closed]:hidden" />
          </>
        )}
        {withIcon && iconVariant === "chevron" && (
          <>
            <ChevronDown className="h-[20px] w-[20px] shrink-0 transition-transform duration-200 group-data-[state=open]:rotate-180" />
          </>
        )}
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  ),
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div className={cn("pb-4 pt-0", className)}>{children}</div>
  </AccordionPrimitive.Content>
));

AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionContent, AccordionItem, AccordionTrigger };
