"use client";

import Link from "next/link";
import { useCurrentDay } from "@/hooks/useCurrentDay";
import { days } from "@/data/days";
import { legs } from "@/data/legs";

export function Header() {
  const currentDay = useCurrentDay();
  const day = currentDay ? days.find((d) => d.dayNumber === currentDay) : null;
  const leg = day ? legs.find((l) => l.slug === day.legSlug) : null;

  return (
    <header className="sticky top-0 z-40 glass">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-lg">🇯🇵</span>
          <span className="font-serif text-lg font-semibold tracking-tight text-on-surface">
            Japan 2026
          </span>
        </Link>
        {day && leg && (
          <Link
            href={`/day/${currentDay}`}
            className="flex items-center gap-2 rounded-full bg-on-surface/5 px-3.5 py-1.5 text-sm font-medium text-on-surface"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cherry opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cherry" />
            </span>
            Day {currentDay}
          </Link>
        )}
      </div>
    </header>
  );
}
