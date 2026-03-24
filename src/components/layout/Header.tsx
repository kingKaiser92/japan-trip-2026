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
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/95">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2 font-bold text-lg">
          <span>🇯🇵</span>
          <span className="text-gray-900 dark:text-gray-100">Japan 2026</span>
        </Link>
        {day && leg && (
          <Link
            href={`/day/${currentDay}`}
            className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-sm font-medium text-red-700 dark:bg-red-950 dark:text-red-300"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
            </span>
            Day {currentDay} — {leg.icon} {leg.title.split(" ")[0]}
          </Link>
        )}
      </div>
    </header>
  );
}
