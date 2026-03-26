"use client";

import Link from "next/link";
import { Navigation, ChevronRight, PartyPopper, Check } from "lucide-react";
import { CategoryIcon } from "@/components/shared/CategoryIcon";
import { getGoogleMapsUrl } from "@/lib/maps";
import type { TripDay, Activity } from "@/data/types";

interface NextActivityCardProps {
  day: TripDay;
  nextDay?: TripDay | null;
  completedIds: Set<string>;
  onComplete: (id: string) => void;
}

export function NextActivityCard({ day, nextDay, completedIds, onComplete }: NextActivityCardProps) {
  // Find first non-completed activity
  const remaining = day.activities.filter((a) => !completedIds.has(a.id));
  const current = remaining[0] ?? null;
  const next = remaining[1] ?? null;

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

      {/* Action buttons */}
      <div className="flex gap-2">
        {current.mapsQuery && (
          <a
            href={getGoogleMapsUrl(current.mapsQuery)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-on-surface py-3 text-[11px] font-medium uppercase tracking-wider text-surface transition-all duration-400 hover:shadow-ambient"
          >
            <Navigation className="h-3.5 w-3.5" />
            Navigate
          </a>
        )}
        <button
          onClick={() => onComplete(current.id)}
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-cherry-fixed py-3 text-[11px] font-medium uppercase tracking-wider text-cherry-dark transition-all duration-400 hover:shadow-ambient"
        >
          <Check className="h-3.5 w-3.5" />
          Done
        </button>
      </div>

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
