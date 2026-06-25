import { cva, type VariantProps } from "class-variance-authority";
import Text from "./Text";

const timeButtonVariants = cva(
  "px-4 py-2 rounded-lg  border text-sm cursor-pointer transition-colors",
  {
    variants: {
      variant: {
        default: "bg-gray-600 border-gray-400 text-gray-200 hover:bg-gray-500",
        selected: "bg-gray-600 border-yellow text-yellow",
        disabled:
          "bg-gray-800 border-gray-600 text-gray-500 pointer-events-none opacity-30",
      },
    },
    defaultVariants: { variant: "default" },
  },
);

interface TimeSelectProps
  extends
    Omit<React.ComponentProps<"button">, "disabled">,
    VariantProps<typeof timeButtonVariants> {}

export default function TimeSelect({
  variant,
  className,
  children,
  ...props
}: TimeSelectProps) {
  return (
    <button className={timeButtonVariants({ variant, className })} {...props}>
      <Text variant="text-m">{children}</Text>
    </button>
  );
}
