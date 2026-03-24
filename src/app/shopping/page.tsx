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
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        Shopping Guide
      </h1>

      {/* Leg filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setLegFilter("all")}
          className={cn(
            "rounded-full px-3 py-1 text-sm font-medium transition-colors",
            legFilter === "all"
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
          )}
        >
          All
        </button>
        {legs.map((leg) => (
          <button
            key={leg.slug}
            onClick={() => setLegFilter(leg.slug)}
            className={cn(
              "rounded-full px-3 py-1 text-sm font-medium transition-colors",
              legFilter === leg.slug
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
            )}
          >
            {leg.icon} {leg.title.split(" ")[0]}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {filtered.length} shopping stops
      </p>

      <div className="space-y-3">
        {filtered.map((spot) => {
          const leg = legs.find((l) => l.slug === spot.legSlug);
          return (
            <div
              key={spot.id}
              className={cn(
                "rounded-xl border bg-white p-3 dark:bg-gray-900",
                spot.isOptional
                  ? "border-dashed border-gray-300 dark:border-gray-700"
                  : "border-gray-200 dark:border-gray-800"
              )}
            >
              <div className="flex items-start gap-2">
                <CategoryIcon category="shopping" className="h-5 w-5 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                    {spot.name}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                    <span>{leg?.icon} Day {spot.dayNumber}</span>
                    {spot.rating && <span>⭐ {spot.rating}</span>}
                    {spot.hours && <span>{spot.hours}</span>}
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {spot.notes}
                  </p>
                  {spot.mapsQuery && (
                    <div className="mt-2">
                      <MapLink query={spot.mapsQuery} />
                    </div>
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
