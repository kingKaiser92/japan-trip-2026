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
  // We need to handle this synchronously for static generation
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
    <div className="space-y-4">
      <DayNavigator currentDayNumber={dayNumber} />

      {/* Day header */}
      <div className="space-y-1">
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <span>{leg.icon} {leg.title}</span>
          <span>&middot;</span>
          <span>{formatDate(day.date)}</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          {day.title}
        </h1>
        <div className="flex items-center gap-2">
          <RhythmIndicator rhythm={day.rhythm} />
          <span className="text-sm text-gray-500 dark:text-gray-400">
            {day.activities.length} activities
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
          {day.subtitle}
        </p>
      </div>

      {/* Training callout */}
      {day.training && (
        <div className="rounded-xl border border-green-200 bg-green-50 p-3 dark:border-green-800 dark:bg-green-950">
          <div className="flex items-center gap-2 text-sm font-medium text-green-800 dark:text-green-200">
            <Dumbbell className="h-4 w-4" />
            {day.training.type === "run" ? "Morning Run" : "HYROX Training"}
          </div>
          <p className="mt-1 text-sm text-green-700 dark:text-green-300">
            {day.training.description}
          </p>
          {day.training.timeWindow && (
            <p className="mt-0.5 text-xs text-green-600 dark:text-green-400">
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
