import type { DayRhythm } from "@/data/types";

const config: Record<DayRhythm, { label: string; className: string }> = {
  packed: { label: "Packed", className: "bg-cherry-fixed text-cherry-dark" },
  moderate: { label: "Moderate", className: "bg-surface-container-high text-on-surface-variant" },
  chill: { label: "Chill", className: "bg-surface-container-low text-on-surface-variant" },
  arrival: { label: "Arrival", className: "bg-surface-container-high text-on-surface-variant" },
  departure: { label: "Departure", className: "bg-surface-container-high text-on-surface-variant" },
};

export function RhythmIndicator({ rhythm }: { rhythm: DayRhythm }) {
  const { label, className } = config[rhythm];
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${className}`}>
      {label}
    </span>
  );
}
