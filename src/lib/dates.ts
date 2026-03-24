import { days } from "@/data/days";
import { trip } from "@/data/trip";

export function getCurrentDayNumber(): number | null {
  const now = new Date();
  // Use JST (UTC+9) for comparison
  const jst = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  const jstDate = jst.toISOString().split("T")[0];

  const day = days.find((d) => d.date === jstDate);
  return day ? day.dayNumber : null;
}

export function isTripActive(): boolean {
  const now = new Date();
  const jst = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  const jstDate = jst.toISOString().split("T")[0];
  return jstDate >= trip.startDate && jstDate <= trip.endDate;
}

export function getTripProgress(): number {
  const now = new Date();
  const jst = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  const start = new Date(trip.startDate);
  const end = new Date(trip.endDate);

  if (jst < start) return 0;
  if (jst > end) return 100;

  const total = end.getTime() - start.getTime();
  const elapsed = jst.getTime() - start.getTime();
  return Math.round((elapsed / total) * 100);
}

export function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

export function isDayPast(dateStr: string): boolean {
  const now = new Date();
  const jst = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  const jstDate = jst.toISOString().split("T")[0];
  return dateStr < jstDate;
}

export function isDayToday(dateStr: string): boolean {
  const now = new Date();
  const jst = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Tokyo" }));
  const jstDate = jst.toISOString().split("T")[0];
  return dateStr === jstDate;
}
