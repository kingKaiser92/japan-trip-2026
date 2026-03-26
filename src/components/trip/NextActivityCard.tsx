"use client";

import { useMemo } from "react";
import Link from "next/link";
import { Navigation, ChevronRight, PartyPopper } from "lucide-react";
import { CategoryIcon } from "@/components/shared/CategoryIcon";
import { getGoogleMapsUrl } from "@/lib/maps";
import { cn } from "@/lib/utils";
import type { TripDay, Activity } from "@/data/types";

function parseActivityTime(time: string): number {
  const s = time.trim().toLowerCase();
  const match = s.match(/^(\d{1,2}):(\d{2})\s*(am|pm)$/);
  if (!match) return -1;
  let hours = parseInt(match[1], 10);
  const minutes = parseInt(match[2], 10);
  const period = match[3];
  if (period === "pm" && hours !== 12) hours += 12;
  if (period === "am" && hours === 12) hours = 0;
  return hours * 60 + minutes;
}

function getJSTMinutes(): number {
  const now = new Date();
  const jstOffset = 9 * 60;
  const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  return ((utcMinutes + jstOffset) % 1440 + 1440) % 1440;
}

export function NextActivityCard({ day, nextDay }: { day: TripDay; nextDay?: TripDay | null }) {
  const { current, next } = useMemo(() => {
    const nowMinutes = getJSTMinutes();

    // Find the next upcoming activity (first one that hasn't started yet)
    const upcoming = day.activities
      .map((a, i) => ({ activity: a, index: i, minutes: parseActivityTime(a.time) }))
      .filter((a) => a.minutes >= 0);

    const nextIdx = upcoming.findIndex((a) => a.minutes > nowMinutes);

    if (nextIdx === -1) {
      // All activities are past — day is complete
      return { current: null, next: null };
    }

    const currentActivity = upcoming[nextIdx].activity;
    const followUp = nextIdx + 1 < upcoming.length ? upcoming[nextIdx + 1].activity : null;

    return { current: currentActivity, next: followUp };
  }, [day]);

  // Day complete state
  if (!current) {
    return (
      <div className="rounded-xl bg-surface-container-lowest p-5 space-y-3 ghost-border">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-cherry-fixed">
            <PartyPopper className="h-5 w-5 text-cherry-dark" />
          </div>
          <div>
            <p className="font-serif font-semibold text-on-surface">Day Complete</p>
            <p className="text-[11px] uppercase tracking-wider text-on-surface-variant">
              Rest up for tomorrow
            </p>
          </div>
        </div>
        {nextDay && (
          <Link
            href={`/day/${nextDay.dayNumber}`}
            className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-on-surface transition-colors duration-400"
          >
            <span>Tomorrow: {nextDay.title}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-surface-container-lowest p-5 space-y-4 ghost-border shadow-ambient">
      {/* Current / next up */}
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cherry-fixed">
          <CategoryIcon category={current.category} className="h-5 w-5 !text-cherry-dark" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] uppercase tracking-[0.2em] text-cherry-dark font-semibold bg-cherry-fixed/60 inline-block px-2 py-0.5 rounded-full mb-1.5">
            Next Up
          </p>
          <p className="font-serif text-lg font-semibold text-on-surface leading-tight">
            {current.name}
          </p>
          <p className="text-[11px] uppercase tracking-wider text-on-surface-variant mt-1">
            {current.isApproximate && "~"}{current.time}
          </p>
        </div>
      </div>

      {/* Navigate button */}
      {current.mapsQuery && (
        <a
          href={getGoogleMapsUrl(current.mapsQuery)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-full bg-on-surface py-3 text-[11px] font-medium uppercase tracking-wider text-surface transition-all duration-400 hover:shadow-ambient"
        >
          <Navigation className="h-3.5 w-3.5" />
          Navigate
        </a>
      )}

      {/* Following activity preview */}
      {next && (
        <div className="flex items-center gap-3 rounded-lg bg-surface-container-low px-4 py-3">
          <CategoryIcon category={next.category} className="h-3.5 w-3.5 shrink-0" />
          <div className="flex-1 min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-on-surface-variant/60">Then</p>
            <p className="text-sm font-medium text-on-surface truncate">{next.name}</p>
          </div>
          <span className="text-[11px] text-on-surface-variant shrink-0">
            {next.isApproximate && "~"}{next.time}
          </span>
        </div>
      )}
    </div>
  );
}
