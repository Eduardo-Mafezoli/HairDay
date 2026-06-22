import { useState } from "react";
import { cva, type VariantProps } from "class-variance-authority";

const timeButtonVariants = cva(
  "px-4 py-2 rounded-lg  border text-sm cursor-pointer transition-colors",
  {
    variants: {
      state: {
        default: "bg-gray-600 border-gray-400 text-gray-200 hover:bg-gray-500",
        selected: "bg-gray-600 border-yellow text-yellow",
        disabled: "border-gray-600 text-gray-500 point-events-none opacity-30",
      },
    },
    defaultVariants: { state: "default" },
  },
);

interface TimeSelectProps extends VariantProps<typeof timeButtonVariants> {
  times: string[];
  disabledTimes?: string[];
  onChange?: (time: string) => void;
}

export default function TimeSelect({
  times,
  disabledTimes = [],
  onChange,
}: TimeSelectProps) {
  const [selected, setSelected] = useState<string | null>(null);

  function handleSelect(time: string) {
    setSelected(time);
    onChange?.(time);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {times.map((time) => {
        const isDisabled = disabledTimes.includes(time);
        const isSelected = selected === time;

        return (
          <button
            key={time}
            disabled={isDisabled}
            onClick={() => !isDisabled && handleSelect(time)}
            className={timeButtonVariants({
              state: isDisabled
                ? "disabled"
                : isSelected
                  ? "selected"
                  : "default",
            })}
          >
            {time}
          </button>
        );
      })}
    </div>
  );
}
