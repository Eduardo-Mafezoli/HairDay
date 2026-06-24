export type Period = "manha" | "tarde" | "noite";

export interface Appointment {
  id: string;
  date: string;
  time: string;
  period: Period;
  clientName: string;
}

export interface TimeSlot {
  time: string;
  period: Period;
}

export const TIME_SLOTS: TimeSlot[] = [
  { time: "09:00", period: "manha" },
  { time: "10:00", period: "manha" },
  { time: "11:00", period: "manha" },
  { time: "12:00", period: "manha" },
  { time: "13:00", period: "tarde" },
  { time: "14:00", period: "tarde" },
  { time: "15:00", period: "tarde" },
  { time: "16:00", period: "tarde" },
  { time: "17:00", period: "tarde" },
  { time: "18:00", period: "tarde" },
  { time: "19:00", period: "noite" },
  { time: "20:00", period: "noite" },
  { time: "21:00", period: "noite" },
];
