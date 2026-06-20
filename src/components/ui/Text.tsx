import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const textVariants = cva("font-sans", {
  variants: {
    variant: {
      "title-l": "text-3xl leading-6 font-bold",
      "title-m": "text-base leading-6 font-bold",
      "title-s": "text-sm leading-5 font-bold",
      "text-m": "text-base leading-6",
      "text-s": "text-sm leading-5",
    },
  },
  defaultVariants: {
    variant: "text-m",
  },
});

interface TextProps extends VariantProps<typeof textVariants> {
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
}

export default function Text({
  as = "div",
  variant,
  className,
  children,
  ...props
}: TextProps) {
  return React.createElement(
    as,
    {
      className: textVariants({ variant, className }),
      ...props,
    },
    children,
  );
}
