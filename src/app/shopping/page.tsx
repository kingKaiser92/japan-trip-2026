"use client";

import { useState } from "react";
import { days } from "@/data/days";
import { legs } from "@/data/legs";
import { CategoryIcon } from "@/components/shared/CategoryIcon";
import { MapLink } from "@/components/shared/MapLink";
import { cn } from "@/lib/utils";
import type { Activity } from "@/data/types";

function getAllShoppingSpots(): (Activity & { dayNumber: number; legSlug: string })[] {
  const spots: (Activity & { dayNumber: number; legSlug: string })[] = [];
  for (const day of days) {
    for (const act of day.activities) {
      if (act.category === "shopping") {
        spots.push({ ...act, dayNumber: day.dayNumber, legSlug: day.legSlug });
      }
    }
  }
  return spots;
}

type LegFilter = "all" | string;

export default function ShoppingPage() {
  const [legFilter, setLegFilter] = useState<LegFilter>("all");
  const spots = getAllShoppingSpots();
  const filtered = legFilter === "all" ? spots : spots.filter((s) => s.legSlug === legFilter);

  return (
    <div className="space-y-10">
      <div className="space-y-3 pt-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          {filtered.length} shopping stops
        </p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-on-surface">
          Shopping Guide
        </h1>
      </div>

      {/* Leg filters — selection chips */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setLegFilter("all")}
          className={cn(
            "rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all duration-400",
            legFilter === "all"
              ? "bg-cherry-fixed text-cherry-dark"
              : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
          )}
        >
          All
        </button>
        {legs.map((leg) => (
          <button
            key={leg.slug}
            onClick={() => setLegFilter(leg.slug)}
            className={cn(
              "rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all duration-400",
              legFilter === leg.slug
                ? "bg-cherry-fixed text-cherry-dark"
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
            )}
          >
            {leg.icon} {leg.title.split(" ")[0]}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {filtered.map((spot) => {
          const leg = legs.find((l) => l.slug === spot.legSlug);
          return (
            <div
              key={spot.id}
              className={cn(
                "rounded-xl p-5 transition-all duration-400 hover:shadow-ambient",
                spot.isOptional ? "bg-surface-container-low/60" : "bg-surface-container-lowest"
              )}
            >
              <div className="flex items-start gap-3">
                <CategoryIcon category="shopping" className="h-4 w-4 mt-1 shrink-0" />
                <div className="flex-1 min-w-0 space-y-2">
                  <div>
                    <div className="font-serif font-medium text-on-surface text-[15px]">
                      {spot.name}
                    </div>
                    <div className="flex items-center gap-2 mt-1 text-[11px] uppercase tracking-[0.15em] text-on-surface-variant">
                      <span>{leg?.icon} Day {spot.dayNumber}</span>
                      {spot.rating && <span>&middot; {spot.rating}</span>}
                      {spot.hours && <span>&middot; {spot.hours}</span>}
                      {spot.isOptional && <span>&middot; Optional</span>}
                    </div>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {spot.notes}
                  </p>
                  {spot.mapsQuery && (
                    <MapLink query={spot.mapsQuery} />
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
