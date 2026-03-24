"use client";

import { useState } from "react";
import { foodSpots, type FoodCategory } from "@/data/restaurants";
import { legs } from "@/data/legs";
import { MapLink } from "@/components/shared/MapLink";
import { Utensils, Coffee, Wine, UtensilsCrossed } from "lucide-react";
import { cn } from "@/lib/utils";
import { getOpenStatus } from "@/lib/openNow";

const categoryIcons: Record<FoodCategory, typeof Utensils> = {
  restaurant: Utensils,
  cafe: Coffee,
  bar: Wine,
  "street-food": UtensilsCrossed,
};

type FilterType = "all" | FoodCategory;
type LegFilter = "all" | string;

export default function FoodPage() {
  const [categoryFilter, setCategoryFilter] = useState<FilterType>("all");
  const [legFilter, setLegFilter] = useState<LegFilter>("all");

  let filtered = foodSpots;
  if (categoryFilter !== "all") filtered = filtered.filter((s) => s.category === categoryFilter);
  if (legFilter !== "all") filtered = filtered.filter((s) => s.legSlug === legFilter);

  // Group by leg
  const groupedByLeg = legs
    .map((leg) => ({
      leg,
      spots: filtered.filter((s) => s.legSlug === leg.slug),
    }))
    .filter((g) => g.spots.length > 0);

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

      {/* Category filters */}
      <div className="space-y-2">
        <div className="flex flex-wrap gap-2">
          {(["all", "restaurant", "cafe", "bar", "street-food"] as FilterType[]).map((f) => (
            <button
              key={f}
              onClick={() => setCategoryFilter(f)}
              className={cn(
                "rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all duration-400",
                categoryFilter === f
                  ? "bg-cherry-fixed text-cherry-dark"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
              )}
            >
              {f === "all" ? "All" : f === "street-food" ? "Street Food" : f}
            </button>
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setLegFilter("all")}
            className={cn(
              "rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all duration-400",
              legFilter === "all"
                ? "bg-on-surface text-surface"
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
            )}
          >
            All Legs
          </button>
          {legs.map((leg) => (
            <button
              key={leg.slug}
              onClick={() => setLegFilter(leg.slug)}
              className={cn(
                "rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all duration-400",
                legFilter === leg.slug
                  ? "bg-on-surface text-surface"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
              )}
            >
              {leg.icon} {leg.title.split(" ")[0]}
            </button>
          ))}
        </div>
      </div>

      {/* Grouped list */}
      {groupedByLeg.map(({ leg, spots }) => {
        const neighborhoods = [...new Set(spots.map((s) => s.neighborhood))];

        return (
          <div key={leg.slug} className="space-y-6">
            <h2 className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
              <span>{leg.icon}</span> {leg.title}
            </h2>

            {neighborhoods.map((hood) => {
              const hoodSpots = spots.filter((s) => s.neighborhood === hood);
              return (
                <div key={hood} className="space-y-2">
                  <h3 className="text-xs font-medium text-on-surface-variant/60 uppercase tracking-wider pl-1">
                    {hood}
                  </h3>
                  <div className="space-y-2">
                    {hoodSpots.map((spot) => {
                      const Icon = categoryIcons[spot.category];
                      return (
                        <div
                          key={spot.id}
                          className="rounded-xl bg-surface-container-lowest p-4 transition-all duration-400 hover:shadow-ambient"
                        >
                          <div className="flex items-start gap-3">
                            <Icon className="h-4 w-4 mt-1 shrink-0 text-on-surface-variant" />
                            <div className="flex-1 min-w-0 space-y-1.5">
                              <div>
                                <div className="font-serif font-medium text-on-surface text-[15px]">
                                  {spot.name}
                                </div>
                                <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 text-[11px] uppercase tracking-[0.15em] text-on-surface-variant">
                                  {spot.cuisine && <span>{spot.cuisine}</span>}
                                  {spot.rating && <span>&middot; {spot.rating}★</span>}
                                  <span>&middot; {spot.hours}</span>
                                  {(() => {
                                    const status = getOpenStatus(spot.hours);
                                    if (status === "open") return <span className="text-green-400 font-semibold normal-case tracking-normal">&middot; Open</span>;
                                    if (status === "closed") return <span className="text-red-400/70 font-semibold normal-case tracking-normal">&middot; Closed</span>;
                                    return null;
                                  })()}
                                </div>
                              </div>
                              <p className="text-sm text-on-surface-variant leading-relaxed">
                                {spot.description}
                              </p>
                              <div className="flex flex-wrap items-center gap-3">
                                <MapLink query={spot.mapsQuery} />
                                {spot.recSource === "asif" && (
                                  <span className="inline-flex items-center rounded-full bg-cherry-fixed px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-cherry-dark">
                                    Asif&apos;s Rec
                                  </span>
                                )}
                                {spot.recSource === "may-ann" && (
                                  <span className="inline-flex items-center rounded-full bg-surface-container-high px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-on-surface-variant">
                                    May Ann&apos;s Rec
                                  </span>
                                )}
                              </div>
                              {spot.bookingNotes && (
                                <p className="text-xs text-on-surface-variant/60 italic">
                                  {spot.bookingNotes}
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
