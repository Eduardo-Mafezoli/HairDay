import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import Icon from "./Icon";

const inputTextVariants = cva(
  "pl-9 pr-3 py-2 w-full rounded-lg outline-1 justify-start items-center gap-2 text-white",
  {
    variants: {
      variant: {
        default: "outline-gray-400 focus:outline-yellow",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface InputTextProps
  extends
    VariantProps<typeof inputTextVariants>,
    React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function InputText({
  variant,
  className,
  ...props
}: InputTextProps) {
  return (
    <div className="relative flex items-center">
      <Icon
        name="user"
        className="absolute left-2 text-yellow pointer-events-none"
      />
      <input
        type="text"
        className={inputTextVariants({ variant, className })}
        {...props}
      />
    </div>
  );
}
