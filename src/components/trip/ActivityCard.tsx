"use client";

import { useState } from "react";
import { ChevronDown, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryIcon } from "@/components/shared/CategoryIcon";
import { MapLink } from "@/components/shared/MapLink";
import { BookingStatusBadge } from "@/components/shared/BookingStatus";
import { Badge } from "@/components/ui/badge";
import type { Activity } from "@/data/types";

export function ActivityCard({ activity }: { activity: Activity }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-xl border transition-all",
        activity.isOptional
          ? "border-dashed border-gray-300 dark:border-gray-700"
          : "border-gray-200 dark:border-gray-800",
        open ? "bg-white shadow-md dark:bg-gray-900" : "bg-white dark:bg-gray-900/50"
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start gap-3 p-3 text-left"
      >
        {/* Time column */}
        <div className="flex flex-col items-center pt-0.5">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">
            {activity.isApproximate && "~"}
            {activity.time}
          </span>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <CategoryIcon category={activity.category} />
            <span className="font-medium text-gray-900 dark:text-gray-100 text-sm leading-tight">
              {activity.name}
            </span>
          </div>
          {!open && (
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 line-clamp-1">
              {activity.notes}
            </p>
          )}
          <div className="mt-1.5 flex flex-wrap gap-1.5">
            {activity.isOptional && (
              <Badge variant="outline" className="text-xs px-1.5 py-0">Optional</Badge>
            )}
            {activity.bookingStatus && (
              <BookingStatusBadge status={activity.bookingStatus} />
            )}
            {activity.recSource === "asif" && (
              <Badge variant="secondary" className="text-xs px-1.5 py-0 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                Asif&apos;s Rec
              </Badge>
            )}
            {activity.recSource === "may-ann" && (
              <Badge variant="secondary" className="text-xs px-1.5 py-0 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                May Ann&apos;s Rec
              </Badge>
            )}
          </div>
        </div>

        {/* Chevron */}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-gray-400 transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Expanded content */}
      {open && (
        <div className="border-t border-gray-100 dark:border-gray-800 px-3 pb-3 pt-2 space-y-2">
          <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
            {activity.notes}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-sm">
            {activity.mapsQuery && <MapLink query={activity.mapsQuery} />}
            {activity.rating && (
              <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                ⭐ {activity.rating}
              </span>
            )}
            {activity.hours && (
              <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {activity.hours}
              </span>
            )}
            {activity.price && (
              <span className="text-gray-500 dark:text-gray-400">
                {activity.price}
              </span>
            )}
          </div>
          {activity.confirmationCode && (
            <div className="rounded-lg bg-green-50 dark:bg-green-950 px-3 py-2 text-sm">
              <span className="font-medium text-green-800 dark:text-green-200">
                Confirmation: {activity.confirmationCode}
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
