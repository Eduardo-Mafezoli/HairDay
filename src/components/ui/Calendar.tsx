import { buildGrid } from "../../utils/buildGrid";
import { useState } from "react";
import Icon from "./Icon";
import Text from "./Text";

interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
}

export default function Calendar({ value, onChange }: CalendarProps) {
  const weekDays = ["S", "M", "T", "W", "T", "F", "S"];
  const MONTHS = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const [viewDate, setViewDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date>(value ?? new Date());
  const [isOpen, setIsOpen] = useState(false);

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const { grid } = buildGrid(year, month);

  function handleInputPrevMonth() {
    setViewDate(new Date(year, month - 1));
  }

  function handleInputNextMonth() {
    setViewDate(new Date(year, month + 1));
  }

  function handleSelectDay(day: number, currentMonth: boolean) {
    if (!currentMonth) return;
    const date = new Date(year, month, day);
    setSelectedDate(date);
    onChange?.(date);
    setIsOpen(false);
  }

  return (
    <div className="relative">
      <div className="w-full flex items-center justify-between gap-4 border border-gray-400 rounded-lg px-3 py-2">
        <div className="flex gap-2 items-center">
          <Icon name="calendar" className="text-yellow" />
          <Text variant="title-s" className="text-gray-400">
            {selectedDate?.toLocaleDateString("pt-BR")}
          </Text>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="cursor-pointer">
          <Icon name="caretDown" className="text-gray-400" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full right-0 z-50 flex flex-col gap-4 w-72 bg-gray-600 rounded-xl">
          <div className="flex justify-between items-center px-4 pt-4">
            <button
              type="button"
              onClick={handleInputPrevMonth}
              className="text-gray-400 hover:text-white"
            >
              <Icon name="caretLeft" size={18} className="cursor-pointer" />
            </button>
            <Text variant="title-s" className="text-white">
              {MONTHS[month]} {year}
            </Text>
            <button
              type="button"
              onClick={handleInputNextMonth}
              className="text-gray-400 hover:text-white"
            >
              <Icon name="caretRight" size={18} className="cursor-pointer" />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-1 px-2 pb-4">
            {weekDays.map((week, index) => (
              <Text
                key={index}
                variant="title-s"
                className="text-white text-center h-8 w-8 flex items-center justify-center mx-auto"
              >
                {week}
              </Text>
            ))}
            {grid.map(({ day, currentMonth }, index) => {
              const isSelected =
                selectedDate?.getDate() === day &&
                selectedDate?.getMonth() === month &&
                selectedDate?.getFullYear() === year &&
                currentMonth;

              const isToday =
                day === today.getDate() &&
                month === today.getMonth() &&
                year === today.getFullYear() &&
                currentMonth;

              const isPast = new Date(year, month, day) < today && currentMonth;

              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleSelectDay(day, currentMonth)}
                  disabled={!currentMonth || isPast}
                  className={`h-8 w-8 flex items-center justify-center mx-auto bg-transparent  p-0 cursor-pointer ${
                    isSelected
                      ? "border border-yellow text-yellow rounded-lg"
                      : isToday
                        ? "text-white underline"
                        : isPast
                          ? "text-gray-400 cursor-not-allowed"
                          : currentMonth
                            ? "text-gray-200"
                            : "text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Text variant="text-s">{day}</Text>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
