import { useState } from "react";
import ScheduleList from "./components/core/ScheduleList";
import Sidebar from "./components/core/Sidebar";
import type { Appointment } from "./data/scheduleData";

export default function App() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  function handleSubmit(appointment: Appointment) {
    setAppointments((prev) => [...prev, appointment]);
  }

  function handleDelete(id: string) {
    setAppointments((prev) => prev.filter((a) => a.id !== id));
  }

  function dateString(date: Date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  }

  const disabledTimes = appointments
    .filter((a) => a.date === dateString(selectedDate))
    .map((a) => a.time);

  return (
    <main className="bg-gray-800 flex gap-6 min-h-screen p-8">
      <Sidebar
        onSubmit={handleSubmit}
        disabledTimes={disabledTimes}
        onDateChange={setSelectedDate}
      />
      <ScheduleList appointments={appointments} onDelete={handleDelete} />
    </main>
  );
}
