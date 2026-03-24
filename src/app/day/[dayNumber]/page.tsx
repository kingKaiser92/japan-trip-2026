import { notFound } from "next/navigation";
import { days } from "@/data/days";
import { legs } from "@/data/legs";
import { formatDate } from "@/lib/dates";
import { DayTimeline } from "@/components/trip/DayTimeline";
import { DayNavigator } from "@/components/trip/DayNavigator";
import { RhythmIndicator } from "@/components/shared/RhythmIndicator";
import { Dumbbell } from "lucide-react";

export function generateStaticParams() {
  return days.map((day) => ({ dayNumber: String(day.dayNumber) }));
}

export function generateMetadata({ params }: { params: Promise<{ dayNumber: string }> }) {
  return {
    title: "Japan Trip 2026 — Day",
  };
}

export default async function DayPage({ params }: { params: Promise<{ dayNumber: string }> }) {
  const { dayNumber: dayNumberStr } = await params;
  const dayNumber = parseInt(dayNumberStr, 10);
  const day = days.find((d) => d.dayNumber === dayNumber);

  if (!day) return notFound();

  const leg = legs.find((l) => l.slug === day.legSlug)!;

  return (
    <div className="space-y-8">
      <DayNavigator currentDayNumber={dayNumber} />

      {/* Day header — editorial */}
      <div className="space-y-3">
        <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          {leg.icon} {leg.title} &middot; {formatDate(day.date)}
        </p>
        <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-on-surface">
          {day.title}
        </h1>
        <div className="flex items-center gap-3">
          <RhythmIndicator rhythm={day.rhythm} />
          <span className="text-[11px] uppercase tracking-[0.15em] text-on-surface-variant">
            {day.activities.length} activities
          </span>
        </div>
        <p className="text-base text-on-surface-variant leading-relaxed max-w-lg">
          {day.subtitle}
        </p>
      </div>

      {/* Training callout */}
      {day.training && (
        <div className="rounded-xl bg-surface-container-low p-5">
          <div className="flex items-center gap-2.5">
            <Dumbbell className="h-4 w-4 text-on-surface-variant" />
            <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-on-surface">
              {day.training.type === "run" ? "Morning Run" : "HYROX Training"}
            </span>
          </div>
          <p className="mt-2 text-sm text-on-surface-variant leading-relaxed">
            {day.training.description}
          </p>
          {day.training.timeWindow && (
            <p className="mt-1 text-[11px] uppercase tracking-wider text-on-surface-variant/60">
              {day.training.timeWindow}
            </p>
          )}
        </div>
      )}

      {/* Timeline */}
      <DayTimeline day={day} />
    </div>
  );
}
