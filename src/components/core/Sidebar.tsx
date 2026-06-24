import Button from "../ui/Button";
import Calendar from "../ui/Calendar";
import InputText from "../ui/InputText";
import Text from "../ui/Text";
import TimeSelect from "../ui/TimeSelect";

import { useState } from "react";
import type { Appointment } from "../../data/scheduleData";
import { TIME_SLOTS } from "../../data/scheduleData";

interface SidebarProps {
  onSubmit: (appointment: Appointment) => void;
  disabledTimes: string[];
}

export default function Sidebar({ onSubmit, disabledTimes }: SidebarProps) {
  const manhaSlots = TIME_SLOTS.filter((s) => s.period === "manha");
  const tardeSlots = TIME_SLOTS.filter((s) => s.period === "tarde");
  const noiteSlots = TIME_SLOTS.filter((s) => s.period === "noite");

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [clientName, setClientName] = useState("");

  function handleSelectTime(time: string) {
    setSelectedTime((prev) => (prev === time ? null : time));
  }

  function handleSubmit() {
    if (!selectedTime || !clientName) return;

    const date = `${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, "0")}-${String(selectedDate.getDate()).padStart(2, "0")}`;
    const period = TIME_SLOTS.find((s) => s.time === selectedTime)!.period;

    onSubmit({
      id: crypto.randomUUID(),
      date,
      time: selectedTime,
      period,
      clientName,
    });

    setSelectedTime(null);
    setClientName("");
  }

  return (
    <div className="flex flex-col gap-6 bg-gray-500 rounded-lg w-170 h-219 p-20">
      <div className="flex flex-col gap-2">
        <Text variant="title-l" className="text-gray-100">
          Schedule an appointment
        </Text>
        <Text variant="text-s" className="text-gray-200">
          Select date, time and client name
        </Text>
      </div>

      <div className="flex flex-col gap-2">
        <Text variant="title-s" className="text-gray-100">
          Date
        </Text>
        <Calendar value={selectedDate} onChange={setSelectedDate} />
      </div>

      <div className="flex flex-col gap-4">
        <Text variant="title-s" className="text-gray-100">
          Times
        </Text>

        <div className="flex flex-col gap-2">
          <Text variant="text-s" className="text-gray-200">
            Morning
          </Text>
          <div className="flex flex-wrap gap-2">
            {manhaSlots.map((slot) => (
              <TimeSelect
                key={slot.time}
                variant={
                  disabledTimes.includes(slot.time)
                    ? "disabled"
                    : selectedTime === slot.time
                      ? "selected"
                      : "default"
                }
                onClick={() => handleSelectTime(slot.time)}
              >
                {slot.time}
              </TimeSelect>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Text variant="text-s" className="text-gray-200">
            Afternoon
          </Text>
          <div className="flex flex-wrap gap-2">
            {tardeSlots.map((slot) => (
              <TimeSelect
                key={slot.time}
                variant={
                  disabledTimes.includes(slot.time)
                    ? "disabled"
                    : selectedTime === slot.time
                      ? "selected"
                      : "default"
                }
                onClick={() => handleSelectTime(slot.time)}
              >
                {slot.time}
              </TimeSelect>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Text variant="text-s" className="text-gray-200">
            Evening
          </Text>
          <div className="flex flex-wrap gap-2">
            {noiteSlots.map((slot) => (
              <TimeSelect
                key={slot.time}
                variant={
                  disabledTimes.includes(slot.time)
                    ? "disabled"
                    : selectedTime === slot.time
                      ? "selected"
                      : "default"
                }
                onClick={() => handleSelectTime(slot.time)}
              >
                {slot.time}
              </TimeSelect>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <Text variant="title-s" className="text-gray-100">
          Client
        </Text>
        <InputText
          placeholder="Client name"
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
        />
      </div>

      <Button onClick={handleSubmit}>
        <Text variant="title-s">SCHEDULE</Text>
      </Button>
    </div>
  );
}
