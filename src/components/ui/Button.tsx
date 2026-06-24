import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Text from "./Text";

const buttonVariants = cva(
  "px-4 h-14 w-full bg-yellow rounded-lg flex justify-center items-center gap-2 overflow-hidden text-center",
  {
    variants: {
      variant: {
        primary: "hover:outline hover:outline-2 hover:outline-yellow-light",
      },
      disabled: {
        true: "opacity-30 pointer-events-none",
      },
    },
    defaultVariants: {
      variant: "primary",
      disabled: false,
    },
  },
);

const buttonTextVariants = cva("", {
  variants: {
    variant: {
      primary: "text-gray-900",
    },
  },
  defaultVariants: { variant: "primary" },
});

interface ButtonProps
  extends
    Omit<React.ComponentProps<"button">, "disabled">,
    VariantProps<typeof buttonVariants> {}

export default function Button({
  variant,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={buttonVariants({ variant, className, disabled })}
      {...props}
    >
      <Text variant="title-s" className={buttonTextVariants({ variant })}>
        {children}
      </Text>
    </button>
  );
}
