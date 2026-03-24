"use client";

import { useState } from "react";
import { days } from "@/data/days";
import { legs } from "@/data/legs";
import { Badge } from "@/components/ui/badge";
import { CategoryIcon } from "@/components/shared/CategoryIcon";
import { MapLink } from "@/components/shared/MapLink";
import { BookingStatusBadge } from "@/components/shared/BookingStatus";
import { cn } from "@/lib/utils";
import type { Activity } from "@/data/types";

// Extract all food, nightlife, and experience activities
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
    <div className="space-y-4">
      <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
        Food & Nightlife Guide
      </h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {(["all", "food", "nightlife", "experience"] as FilterType[]).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={cn(
              "rounded-full px-3 py-1 text-sm font-medium transition-colors",
              filter === f
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-300"
            )}
          >
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>

      <p className="text-sm text-gray-500 dark:text-gray-400">
        {filtered.length} spots across the trip
      </p>

      {/* List */}
      <div className="space-y-3">
        {filtered.map((spot) => {
          const leg = legs.find((l) => l.slug === spot.legSlug);
          return (
            <div
              key={spot.id}
              className="rounded-xl border border-gray-200 bg-white p-3 dark:border-gray-800 dark:bg-gray-900"
            >
              <div className="flex items-start gap-2">
                <CategoryIcon category={spot.category} className="h-5 w-5 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                    {spot.name}
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-gray-500 dark:text-gray-400">
                    <span>{leg?.icon} Day {spot.dayNumber}</span>
                    {spot.rating && <span>⭐ {spot.rating}</span>}
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {spot.notes}
                  </p>
                  <div className="mt-2 flex flex-wrap items-center gap-2">
                    {spot.mapsQuery && <MapLink query={spot.mapsQuery} />}
                    {spot.bookingStatus && <BookingStatusBadge status={spot.bookingStatus} />}
                    {spot.recSource === "asif" && (
                      <Badge variant="secondary" className="text-xs bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                        Asif&apos;s Rec
                      </Badge>
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
