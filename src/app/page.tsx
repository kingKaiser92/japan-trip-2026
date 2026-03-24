import Link from "next/link";
import { legs } from "@/data/legs";
import { trip } from "@/data/trip";
import { days } from "@/data/days";
import { ChevronRight } from "lucide-react";
import { formatDate } from "@/lib/dates";
import { RhythmIndicator } from "@/components/shared/RhythmIndicator";

export default function HomePage() {
  return (
    <div className="space-y-16">
      {/* Hero — editorial style */}
      <div className="space-y-4 pt-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          April 11–23, 2026
        </p>
        <h1 className="font-serif text-4xl font-semibold leading-[1.15] tracking-tight text-on-surface">
          Japan
        </h1>
        <p className="text-base text-on-surface-variant leading-relaxed max-w-sm">
          {trip.totalDays} days across Tokyo, Mt. Fuji, Kyoto, and Osaka.
          A curated journey through temples, street food, and hidden bars.
        </p>
      </div>

      {/* Trip Legs */}
      <div className="space-y-6">
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          Itinerary
        </h2>
        <div className="space-y-4">
          {legs.map((leg) => (
            <Link
              key={leg.slug}
              href={`/leg/${leg.slug}`}
              className="group flex items-center gap-5 rounded-xl bg-surface-container-lowest p-5 transition-all duration-400 hover:shadow-ambient"
            >
              <div className="text-3xl">{leg.icon}</div>
              <div className="flex-1 min-w-0">
                <div className="font-serif text-lg font-medium text-on-surface">
                  {leg.title}
                </div>
                <div className="mt-1 text-[11px] uppercase tracking-[0.15em] text-on-surface-variant">
                  {leg.dates} &middot; {leg.accommodation.name}
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-on-surface-variant/30 group-hover:text-on-surface-variant transition-colors duration-400" />
            </Link>
          ))}
        </div>
      </div>

      {/* Day by Day */}
      <div className="space-y-6">
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          Day by Day
        </h2>
        <div className="space-y-3">
          {days.map((day) => {
            const leg = legs.find((l) => l.slug === day.legSlug)!;
            return (
              <Link
                key={day.dayNumber}
                href={`/day/${day.dayNumber}`}
                className="group flex items-center gap-4 rounded-xl bg-surface-container-lowest px-4 py-3.5 transition-all duration-400 hover:shadow-ambient"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-surface-container-low font-serif text-sm font-semibold text-on-surface">
                  {day.dayNumber}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2.5">
                    <span className="font-serif text-[15px] font-medium text-on-surface truncate">
                      {day.title}
                    </span>
                    <RhythmIndicator rhythm={day.rhythm} />
                  </div>
                  <div className="text-[11px] uppercase tracking-[0.15em] text-on-surface-variant mt-0.5">
                    {formatDate(day.date)} &middot; {leg.icon} {day.activities.length} activities
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-on-surface-variant/20 group-hover:text-on-surface-variant/50 transition-colors duration-400 shrink-0" />
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
