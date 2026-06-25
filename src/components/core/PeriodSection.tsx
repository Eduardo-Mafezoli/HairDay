import Icon from "../ui/Icon";
import Text from "../ui/Text";
import AppointmentItem from "./AppointmentItem";

import { type Period, type Appointment } from "../../data/scheduleData";

const PERIOD_CONFIG = {
  manha: { icon: "sun", label: "Manhã", range: "09h-12h" },
  tarde: { icon: "cloud", label: "Tarde", range: "13h-18h" },
  noite: { icon: "moon", label: "Noite", range: "19h-21h" },
} as const;

interface PeriodSectionProps {
  period: Period;
  appointments: Appointment[];
  onDelete: (id: string) => void;
}

export default function PeriodSection({
  period,
  appointments,
  onDelete,
}: PeriodSectionProps) {
  const config = PERIOD_CONFIG[period as keyof typeof PERIOD_CONFIG];

  return (
    <section className="flex flex-col border border-gray-400 rounded-lg">
      <div className="flex items-center p-2 justify-between border-b border-gray-400">
        <div className="flex items-center gap-2">
          <Icon name={config.icon} className="text-yellow" />
          <Text variant="text-m" className="text-gray-300">
            {config.label}
          </Text>
        </div>
        <Text className="text-gray-300">{config.range}</Text>
      </div>

      <div>
        {appointments.length === 0 ? (
          <Text variant="text-s" className="text-gray-500 p-3">
            No appointments yet
          </Text>
        ) : (
          appointments.map((appointment) => (
            <AppointmentItem
              key={appointment.id}
              time={appointment.time}
              clientName={appointment.clientName}
              onDelete={() => onDelete(appointment.id)}
            />
          ))
        )}
      </div>
    </section>
  );
}
