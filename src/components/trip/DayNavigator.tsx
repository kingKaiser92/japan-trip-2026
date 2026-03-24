"use client";

import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { days } from "@/data/days";
import { formatDate } from "@/lib/dates";

export function DayNavigator({ currentDayNumber }: { currentDayNumber: number }) {
  const prevDay = currentDayNumber > 1 ? currentDayNumber - 1 : null;
  const nextDay = currentDayNumber < days.length ? currentDayNumber + 1 : null;
  const day = days.find((d) => d.dayNumber === currentDayNumber)!;

  return (
    <div className="flex items-center justify-between">
      {prevDay ? (
        <Link
          href={`/day/${prevDay}`}
          className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-on-surface"
        >
          <ChevronLeft className="h-4 w-4" />
          <span className="text-xs uppercase tracking-wider">Day {prevDay}</span>
        </Link>
      ) : (
        <div className="w-16" />
      )}

      <div className="text-center">
        <div className="font-serif text-lg font-semibold text-on-surface">
          Day {currentDayNumber}
        </div>
        <div className="text-[11px] uppercase tracking-wider text-on-surface-variant">
          {formatDate(day.date)}
        </div>
      </div>

      {nextDay ? (
        <Link
          href={`/day/${nextDay}`}
          className="flex items-center gap-1 text-sm text-on-surface-variant hover:text-on-surface"
        >
          <span className="text-xs uppercase tracking-wider">Day {nextDay}</span>
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <div className="w-16" />
      )}
    </div>
  );
}
