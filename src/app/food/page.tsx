"use client";

import { useState } from "react";
import { days } from "@/data/days";
import { legs } from "@/data/legs";
import { CategoryIcon } from "@/components/shared/CategoryIcon";
import { MapLink } from "@/components/shared/MapLink";
import { BookingStatusBadge } from "@/components/shared/BookingStatus";
import { cn } from "@/lib/utils";
import type { Activity } from "@/data/types";

function getAllFoodSpots(): (Activity & { dayNumber: number; legSlug: string })[] {
  const spots: (Activity & { dayNumber: number; legSlug: string })[] = [];
  for (const day of days) {
    for (const act of day.activities) {
      if (act.category === "food" || act.category === "nightlife" || act.category === "experience") {
        spots.push({ ...act, dayNumber: day.dayNumber, legSlug: day.legSlug });
      }
    }
  }
  return spots;
}

type FilterType = "all" | "food" | "nightlife" | "experience";

export default function FoodPage() {
  const [filter, setFilter] = useState<FilterType>("all");
  const spots = getAllFoodSpots();
  const filtered = filter === "all" ? spots : spots.filter((s) => s.category === filter);

  return (
    <div className="space-y-10">
      <div className="space-y-3 pt-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          {filtered.length} spots across the trip
        </p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-on-surface">
          Food & Nightlife
        </h1>
      </div>

      {/* Filters — selection chips */}
      <div className="flex flex-wrap gap-2">
        {(["all", "food", "nightlife", "experience"] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all duration-400",
              filter === f
                ? "bg-cherry-fixed text-cherry-dark"
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
            )}
          >
            {f === "all" ? "All" : f}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((spot) => {
          const leg = legs.find((l) => l.slug === spot.legSlug);
          return (
            <div
              key={spot.id}
              className="rounded-xl bg-surface-container-lowest p-5 transition-all duration-400 hover:shadow-ambient"
            >
              <div className="flex items-start gap-3">
                <CategoryIcon category={spot.category} className="h-4 w-4 mt-1 shrink-0" />
                <div className="flex-1 min-w-0 space-y-2">
                  <div>
                    <div className="font-serif font-medium text-on-surface text-[15px]">
                      {spot.name}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[11px] uppercase tracking-[0.15em] text-on-surface-variant">
                      <span>{leg?.icon} Day {spot.dayNumber}</span>
                      {spot.rating && <span>&middot; {spot.rating}</span>}
                    </div>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {spot.notes}
                  </p>
                  <div className="flex flex-wrap items-center gap-3">
                    {spot.mapsQuery && <MapLink query={spot.mapsQuery} />}
                    {spot.bookingStatus && <BookingStatusBadge status={spot.bookingStatus} />}
                    {spot.recSource === "asif" && (
                      <span className="inline-flex items-center rounded-full bg-cherry-fixed px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-cherry-dark">
                        Asif&apos;s Rec
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
