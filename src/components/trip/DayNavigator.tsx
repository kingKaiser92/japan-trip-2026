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
          className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          <ChevronLeft className="h-4 w-4" />
          Day {prevDay}
        </Link>
      ) : (
        <div className="w-20" />
      )}

      <div className="text-center">
        <div className="text-sm font-bold text-gray-900 dark:text-gray-100">
          Day {currentDayNumber}
        </div>
        <div className="text-xs text-gray-500 dark:text-gray-400">
          {formatDate(day.date)}
        </div>
      </div>

      {nextDay ? (
        <Link
          href={`/day/${nextDay}`}
          className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
        >
          Day {nextDay}
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <div className="w-20" />
      )}
    </div>
  );
}
