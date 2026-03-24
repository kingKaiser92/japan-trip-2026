import { Badge } from "@/components/ui/badge";
import type { DayRhythm } from "@/data/types";

const config: Record<DayRhythm, { label: string; className: string }> = {
  packed: { label: "PACKED", className: "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200" },
  moderate: { label: "Moderate", className: "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-200" },
  chill: { label: "Chill", className: "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200" },
  arrival: { label: "Arrival", className: "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200" },
  departure: { label: "Departure", className: "bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-200" },
};

export function RhythmIndicator({ rhythm }: { rhythm: DayRhythm }) {
  const { label, className } = config[rhythm];
  return <Badge variant="secondary" className={className}>{label}</Badge>;
}
