import { useState, useEffect } from "react";
import ScheduleList from "./components/core/ScheduleList";
import Sidebar from "./components/core/Sidebar";
import type { Appointment } from "./data/scheduleData";
import AppHeader from "./components/core/AppHeader";

export default function App() {
  const [appointments, setAppointments] = useState<Appointment[]>(() => {
    const saved = localStorage.getItem("appointments");
    return saved ? JSON.parse(saved) : [];
  });
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

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
    <div className="min-h-screen bg-gray-900">
      <AppHeader />
      <main className="flex flex-col lg:flex-row gap-6 p-8">
        <Sidebar
          onSubmit={handleSubmit}
          disabledTimes={disabledTimes}
          onDateChange={setSelectedDate}
        />
        <ScheduleList appointments={appointments} onDelete={handleDelete} />
      </main>
    </div>
  );
}
