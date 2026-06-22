import { useState, useRef, useEffect } from "react";
import Icon from "./Icon";

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

interface CalendarProps {
  value?: Date;
  onChange?: (date: Date) => void;
}

function buildGrid(viewDate: Date) {
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();

  const prev = Array.from({ length: firstWeekday }, (_, i) => ({
    day: daysInPrev - firstWeekday + i + 1,
    current: false,
  }));
  const curr = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    current: true,
  }));
  const next = Array.from(
    { length: 42 - prev.length - curr.length },
    (_, i) => ({
      day: i + 1,
      current: false,
    }),
  );

  return [...prev, ...curr, ...next];
}

export default function Calendar({ value, onChange }: CalendarProps) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(value ?? new Date());
  const [view, setView] = useState(selected);
  const ref = useRef<HTMLDivElement>(null);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node))
        setOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleSelect(day: number, current: boolean) {
    if (!current) return;
    const date = new Date(view.getFullYear(), view.getMonth(), day);
    setSelected(date);
    onChange?.(date);
    setOpen(false);
  }

  function isPast(day: number, current: boolean) {
    if (!current) return false;
    return new Date(view.getFullYear(), view.getMonth(), day) < today;
  }

  function isSame(date1: Date, date2: Date) {
    return (
      date1.getDate() === date2.getDate() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getFullYear() === date2.getFullYear()
    );
  }

  return (
    <div ref={ref} className="relative w-72">
      {/* Trigger */}
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center gap-2 bg-transparent border border-gray-300 px-4 py-2 rounded-lg text-gray-300 cursor-pointer"
      >
        <Icon name="calendar" className="text-yellow" />
        <span className="flex-1 text-left">
          {selected.toLocaleDateString("pt-BR")}
        </span>
        <Icon
          name="caretDown"
          className={`text-gray-300 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {/* Dropdown — absolute, não empurra nada */}
      {open && (
        <div className="absolute top-full left-0 mt-1 z-50 bg-gray-500 rounded-xl p-4 w-72 shadow-xl">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() =>
                setView(new Date(view.getFullYear(), view.getMonth() - 1))
              }
              className="text-gray-400 hover:text-white cursor-pointer"
            >
              <Icon name="caretLeft" />
            </button>
            <span className="text-white font-semibold">
              {MONTHS[view.getMonth()]} {view.getFullYear()}
            </span>
            <button
              onClick={() =>
                setView(new Date(view.getFullYear(), view.getMonth() + 1))
              }
              className="text-gray-400 hover:text-white cursor-pointer"
            >
              <Icon name="caretRight" />
            </button>
          </div>

          {/* Cabeçalho dias da semana */}
          <div className="grid grid-cols-7 mb-2">
            {["D", "S", "T", "Q", "Q", "S", "S"].map((d, i) => (
              <span key={i} className="text-center text-xs text-gray-500 py-1">
                {d}
              </span>
            ))}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-7">
            {buildGrid(view).map(({ day, current }, i) => {
              const date = new Date(view.getFullYear(), view.getMonth(), day);
              const isSelected = current && isSame(date, selected);
              const isToday = current && isSame(date, today);
              const past = isPast(day, current);

              return (
                <button
                  key={i}
                  disabled={!current || past} // 👈 bloqueia o clique
                  onClick={() => handleSelect(day, current)}
                  className={[
                    "flex items-center justify-center h-8 w-8 mx-auto rounded-lg text-sm transition-colors",
                    (!current || past) && "text-gray-700 cursor-default",
                    current &&
                      !past &&
                      !isSelected &&
                      !isToday &&
                      "text-gray-300 hover:bg-gray-700 cursor-pointer",
                    isToday && !isSelected && "text-white underline",
                    isSelected && "border border-yellow text-yellow",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
