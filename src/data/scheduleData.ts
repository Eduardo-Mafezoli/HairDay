export type Period = "manha" | "tarde" | "noite";

export interface Appointment {
  id: string;
  date: string;
  time: string;
  period: Period;
  clientName: string;
}
