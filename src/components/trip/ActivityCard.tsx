"use client";

import { useState } from "react";
import { ChevronDown, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { CategoryIcon } from "@/components/shared/CategoryIcon";
import { MapLink } from "@/components/shared/MapLink";
import { BookingStatusBadge } from "@/components/shared/BookingStatus";
import type { Activity } from "@/data/types";

export function ActivityCard({ activity }: { activity: Activity }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-xl transition-all duration-400",
        activity.isOptional
          ? "bg-surface-container-low/50"
          : "bg-surface-container-lowest",
        open && "shadow-ambient"
      )}
    >
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start gap-4 p-4 text-left"
      >
        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2.5">
            <CategoryIcon category={activity.category} className="h-4 w-4 shrink-0" />
            <span className="font-serif font-medium text-on-surface text-[15px] leading-tight">
              {activity.name}
            </span>
          </div>
          <div className="mt-1.5 flex items-center gap-2 text-[11px] uppercase tracking-wider text-on-surface-variant">
            <span>{activity.isApproximate && "~"}{activity.time}</span>
            {activity.isOptional && (
              <span className="text-on-surface-variant/60">Optional</span>
            )}
          </div>
          {!open && (
            <p className="mt-2 text-sm text-on-surface-variant leading-relaxed line-clamp-2">
              {activity.notes}
            </p>
          )}
          {/* Badges row */}
          <div className="mt-2 flex flex-wrap gap-1.5">
            {activity.bookingStatus && (
              <BookingStatusBadge status={activity.bookingStatus} />
            )}
            {activity.recSource === "asif" && (
              <span className="inline-flex items-center rounded-full bg-cherry-fixed px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-cherry-dark">
                Asif&apos;s Rec
              </span>
            )}
            {activity.recSource === "may-ann" && (
              <span className="inline-flex items-center rounded-full bg-surface-container-high px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-on-surface-variant">
                May Ann&apos;s Rec
              </span>
            )}
          </div>
        </div>

        {/* Chevron */}
        <ChevronDown
          className={cn(
            "h-4 w-4 shrink-0 text-on-surface-variant/40 transition-transform duration-400",
            open && "rotate-180"
          )}
        />
      </button>

      {/* Expanded content */}
      {open && (
        <div className="px-4 pb-5 pt-0 space-y-3">
          <p className="text-sm text-on-surface-variant leading-[1.7]">
            {activity.notes}
          </p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            {activity.mapsQuery && <MapLink query={activity.mapsQuery} />}
            {activity.rating && (
              <span className="text-on-surface-variant text-xs uppercase tracking-wider">
                {activity.rating}
              </span>
            )}
            {activity.hours && (
              <span className="text-on-surface-variant/60 flex items-center gap-1 text-xs">
                <Clock className="h-3 w-3" /> {activity.hours}
              </span>
            )}
            {activity.price && (
              <span className="text-on-surface-variant text-xs">
                {activity.price}
              </span>
            )}
          </div>
          {activity.confirmationCode && (
            <div className="rounded-lg bg-surface-container-low px-4 py-3 text-sm">
              <span className="text-[10px] uppercase tracking-wider text-on-surface-variant">Confirmation</span>
              <p className="mt-0.5 font-medium text-on-surface">
                {activity.confirmationCode}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
