export function buildGrid(year: number, month: number) {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startingDay = new Date(year, month, 1).getDay();
  const daysInPrev = new Date(year, month, 0).getDate();

  const totalCells = Math.ceil((startingDay + daysInMonth) / 7) * 7;

  const prevDayMonth = Array.from({ length: startingDay }, (_, i) => ({
    day: daysInPrev - startingDay + i + 1,
    currentMonth: false,
  }));

  const monthDay = Array.from({ length: daysInMonth }, (_, i) => ({
    day: i + 1,
    currentMonth: true,
  }));

  const nextMonthDays = Array.from(
    { length: totalCells - startingDay - daysInMonth },
    (_, i) => ({
      day: i + 1,
      currentMonth: false,
    }),
  );

  const grid = [...prevDayMonth, ...monthDay, ...nextMonthDays];

  return { grid, startingDay, daysInMonth };
}
