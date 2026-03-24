import { notFound } from "next/navigation";
import Link from "next/link";
import { legs } from "@/data/legs";
import { days } from "@/data/days";
import { formatDate } from "@/lib/dates";
import { MapPin, ChevronRight } from "lucide-react";
import { MapLink } from "@/components/shared/MapLink";
import { RhythmIndicator } from "@/components/shared/RhythmIndicator";

export function generateStaticParams() {
  return legs.map((leg) => ({ legSlug: leg.slug }));
}

export default async function LegPage({ params }: { params: Promise<{ legSlug: string }> }) {
  const { legSlug } = await params;
  const leg = legs.find((l) => l.slug === legSlug);

  if (!leg) return notFound();

  const legDays = days.filter((d) => d.legSlug === legSlug);

  return (
    <div className="space-y-6">
      {/* Leg header */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <div className="flex items-center gap-3">
          <span className="text-4xl">{leg.icon}</span>
          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {leg.title}
            </h1>
            <p className="text-sm text-gray-500 dark:text-gray-400">{leg.dates}</p>
          </div>
        </div>
        <div className="mt-4 space-y-1">
          <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
            <MapPin className="h-4 w-4 text-gray-400" />
            {leg.accommodation.name}
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 pl-6">
            {leg.accommodation.address}
          </p>
          <div className="pl-6">
            <MapLink query={leg.accommodation.mapsQuery} />
          </div>
          {leg.accommodation.highlights && (
            <div className="mt-2 flex flex-wrap gap-1.5 pl-6">
              {leg.accommodation.highlights.map((h) => (
                <span
                  key={h}
                  className="inline-block rounded-full bg-gray-100 px-2.5 py-0.5 text-xs text-gray-600 dark:bg-gray-800 dark:text-gray-300"
                >
                  {h}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Days list */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
          Daily Schedule
        </h2>
        {legDays.map((day) => (
          <Link
            key={day.dayNumber}
            href={`/day/${day.dayNumber}`}
            className="flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-50 font-bold text-red-600 dark:bg-red-950 dark:text-red-400">
              {day.dayNumber}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-gray-900 dark:text-gray-100">
                  {day.title}
                </span>
                <RhythmIndicator rhythm={day.rhythm} />
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatDate(day.date)} &middot; {day.activities.length} activities
              </p>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                {day.subtitle}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-gray-400 shrink-0 mt-1" />
          </Link>
        ))}
      </div>
    </div>
  );
}
