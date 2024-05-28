import clsx from "clsx";
import React, { ElementType, forwardRef, ReactElement } from "react";

export type Variant =
  | "h1"
  | "h2"
  | "h3"
  | "textS"
  | "textXXS"
  | "textXS"
  | "titleXS"
  | "titleS"
  | "textM"
  | "textL"
  | "textXl"
  | "textAlertTitle"
  | "buttonM"
  | "modalTitle"
  | "modalDesc"
  | "titleL"
  | "tableText";

interface Props {
  variant: Variant;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  as?: ElementType;
}

const tags: Record<Variant, ElementType> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  textXS: "p",
  textS: "p",
  textM: "p",
  textL: "p",
  titleS: "p",
  titleXS: "p",
  textXXS: "p",
  textXl: "p",
  textAlertTitle: "p",
  buttonM: "p",
  modalTitle: "p",
  modalDesc: "p",
  titleL: "p",
  tableText: "p",
};

const sizes: Record<Variant, string> = {
  h1: "text-h1",
  h2: "text-h2",
  h3: "text-h3",
  textXXS: "text-textXXS",
  textXS: "text-textXS",
  textS: "text-textS",
  textM: "text-textM",
  textL: "text-textL",
  titleS: "text-titleS",
  titleXS: "text-titleXS",
  titleL: "text-titleL",
  textXl: "text-textXl",
  textAlertTitle: "text-textAlertTitle",
  buttonM: "text-buttonM",
  modalTitle: "text-modalTitle",
  modalDesc: "text-modalDesc",
  tableText: "text-tableText",
};

export const Typography = forwardRef<ReactElement, Props>(
  ({ variant, children, className = "", as, onClick }, ref) => {
    const sizeClasses = sizes[variant];
    const Tag = as || tags[variant];

    return (
      <Tag
        onClick={() => onClick?.()}
        ref={ref}
        className={clsx(sizeClasses, className)}
      >
        {children}
      </Tag>
    );
  },
);
