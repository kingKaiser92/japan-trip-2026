import Link from "next/link";
import { legs } from "@/data/legs";
import { trip } from "@/data/trip";
import { days } from "@/data/days";
import { MapPin, Calendar, ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/dates";
import { RhythmIndicator } from "@/components/shared/RhythmIndicator";

export default function HomePage() {
  return (
    <div className="space-y-6">
      {/* Hero */}
      <div className="rounded-2xl bg-gradient-to-br from-red-600 to-red-700 p-6 text-white">
        <h1 className="text-2xl font-bold">🇯🇵 {trip.title}</h1>
        <p className="mt-1 text-red-100">
          {trip.group} &middot; {trip.totalDays} days
        </p>
        <p className="mt-0.5 text-sm text-red-200">
          April 11–23, 2026
        </p>
      </div>

      {/* Trip Legs */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Trip Legs
        </h2>
        {legs.map((leg) => (
          <Link
            key={leg.slug}
            href={`/leg/${leg.slug}`}
            className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="text-3xl">{leg.icon}</div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 dark:text-gray-100">
                {leg.title}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Calendar className="h-3.5 w-3.5" />
                {leg.dates}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <MapPin className="h-3.5 w-3.5" />
                {leg.accommodation.name}
              </div>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400" />
          </Link>
        ))}
      </div>

      {/* All Days Quick List */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Day by Day
        </h2>
        <div className="space-y-2">
          {days.map((day) => {
            const leg = legs.find((l) => l.slug === day.legSlug)!;
            return (
              <Link
                key={day.dayNumber}
                href={`/day/${day.dayNumber}`}
                className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white px-3 py-2.5 transition-shadow hover:shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-50 text-sm font-bold text-red-600 dark:bg-red-950 dark:text-red-400">
                  {day.dayNumber}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                      {leg.icon} {day.title}
                    </span>
                    <RhythmIndicator rhythm={day.rhythm} />
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {formatDate(day.date)} &middot; {day.activities.length} activities
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-400 shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
