import Calendar from "../ui/Calendar";
import Text from "../ui/Text";
import PeriodSection from "./PeriodSection";
import type { Appointment } from "../../data/scheduleData";
import { useState } from "react";

interface ScheduleListProps {
  appointments: Appointment[];
  onDelete: (id: string) => void;
}

export default function ScheduleList({
  appointments,
  onDelete,
}: ScheduleListProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const dateString = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
  const filtered = appointments.filter((a) => a.date === dateString);

  const manha = filtered.filter((a) => a.period === "manha");
  const tarde = filtered.filter((a) => a.period === "tarde");
  const noite = filtered.filter((a) => a.period === "noite");
  return (
    <div className="flex flex-col gap-4 w-full px-28 py-20">
      <div className="flex gap-4 justify-between">
        <div className="flex flex-col gap-4">
          {/* Title */}
          <Text variant="title-l" className="text-gray-100">
            Your Schedule
          </Text>
          <Text variant="text-m" className="text-gray-100">
            Check your scheduled haircuts by day
          </Text>
        </div>
        {/* Calendar */}
        <Calendar value={selectedDate} onChange={setSelectedDate} />
      </div>

      {/* lista de períodos */}
      <PeriodSection period="manha" appointments={manha} onDelete={onDelete} />
      <PeriodSection period="tarde" appointments={tarde} onDelete={onDelete} />
      <PeriodSection period="noite" appointments={noite} onDelete={onDelete} />
    </div>
  );
}
