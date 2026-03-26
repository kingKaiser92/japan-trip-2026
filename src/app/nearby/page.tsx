"use client";

import { useState, useMemo } from "react";
import { useGeolocation } from "@/hooks/useGeolocation";
import { haversineDistance } from "@/lib/distance";
import { getCoords } from "@/data/coordinates";
import { foodSpots } from "@/data/restaurants";
import { recsAsFoodSpots, notionRecs } from "@/data/notionRecs";
import { shops } from "@/data/shops";
import { NearbyCard, type NearbyItem } from "@/components/nearby/NearbyCard";
import { cn } from "@/lib/utils";
import { Loader2, MapPinOff, RefreshCw } from "lucide-react";

type RadiusOption = 500 | 1000 | 2000;
type TypeFilter = "all" | "food" | "shop";

const radiusOptions: { value: RadiusOption; label: string }[] = [
  { value: 500, label: "Right here" },
  { value: 1000, label: "Short walk" },
  { value: 2000, label: "Worth the walk" },
];

const typeFilters: { value: TypeFilter; label: string }[] = [
  { value: "all", label: "All" },
  { value: "food", label: "Food" },
  { value: "shop", label: "Shops" },
];

export default function NearbyPage() {
  const { position, error, loading, refresh } = useGeolocation();
  const [radius, setRadius] = useState<RadiusOption>(1000);
  const [typeFilter, setTypeFilter] = useState<TypeFilter>("all");

  // Build unified item list, deduped by lowercase name
  const allItems = useMemo(() => {
    const seen = new Set<string>();
    const items: NearbyItem[] = [];

    const addItem = (
      id: string,
      name: string,
      description: string,
      hours: string,
      mapsQuery: string,
      itemType: "food" | "shop",
      opts: { cuisine?: string; rating?: string; recSource?: string | null; category?: string }
    ) => {
      const key = name.toLowerCase();
      if (seen.has(key)) return;

      // Try coords by name first, then by mapsQuery
      const coords = getCoords(name) || getCoords(mapsQuery);
      if (!coords || !position) return;

      const distance = haversineDistance(position.lat, position.lng, coords.lat, coords.lng);

      seen.add(key);
      items.push({
        id,
        name,
        description,
        hours,
        mapsQuery,
        distance,
        itemType,
        cuisine: opts.cuisine,
        rating: opts.rating,
        recSource: (opts.recSource ?? null) as NearbyItem["recSource"],
        category: opts.category,
      });
    };

    // Food spots
    for (const s of foodSpots) {
      addItem(s.id, s.name, s.description, s.hours, s.mapsQuery, "food", {
        cuisine: s.cuisine,
        rating: s.rating,
        recSource: s.recSource,
        category: s.category,
      });
    }

    // Notion recs as food
    for (const r of recsAsFoodSpots()) {
      addItem(r.id, r.name, r.description, r.hours, r.mapsQuery, "food", {
        cuisine: r.cuisine,
        recSource: r.recSource,
        category: r.category,
      });
    }

    // Shops
    for (const s of shops) {
      addItem(s.id, s.name, s.description, s.hours, s.mapsQuery, "shop", {
        rating: s.rating,
        recSource: s.recSource,
        category: "shop",
      });
    }

    // Notion recs that are shops
    for (const r of notionRecs.filter((n) => n.category === "shop")) {
      addItem(r.id, r.name, r.description, r.hours, r.mapsQuery, "shop", {
        recSource: r.recSource,
        category: "shop",
      });
    }

    return items;
  }, [position]);

  // Filter and sort
  const filtered = useMemo(() => {
    let list = allItems.filter((item) => item.distance <= radius);
    if (typeFilter !== "all") list = list.filter((item) => item.itemType === typeFilter);
    return list.sort((a, b) => a.distance - b.distance);
  }, [allItems, radius, typeFilter]);

  // Next radius up for empty state
  const nextRadius = radius < 2000 ? (radius === 500 ? 1000 : 2000) as RadiusOption : null;

  return (
    <div className="space-y-10">
      <div className="space-y-3 pt-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          nearby
        </p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-on-surface">
          What&apos;s Close
        </h1>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="flex flex-col items-center gap-4 py-20 text-on-surface-variant">
          <Loader2 className="h-8 w-8 animate-spin text-cherry" />
          <p className="text-sm">Finding your location&hellip;</p>
        </div>
      )}

      {/* Error state */}
      {!loading && error && (
        <div className="flex flex-col items-center gap-4 py-20 text-on-surface-variant">
          <MapPinOff className="h-8 w-8" />
          <p className="text-sm text-center max-w-xs">{error}</p>
          <button
            onClick={refresh}
            className="rounded-full bg-cherry-fixed px-5 py-2 text-[11px] font-medium uppercase tracking-wider text-cherry-dark transition-all duration-400 hover:shadow-ambient"
          >
            Try Again
          </button>
        </div>
      )}

      {/* Results */}
      {!loading && !error && position && (
        <>
          {/* Filters */}
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {radiusOptions.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => setRadius(opt.value)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all duration-400",
                    radius === opt.value
                      ? "bg-cherry-fixed text-cherry-dark"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                  )}
                >
                  {opt.value < 1000 ? `${opt.value}m` : `${opt.value / 1000}km`} &middot; {opt.label}
                </button>
              ))}
            </div>
            <div className="flex flex-wrap gap-2">
              {typeFilters.map((f) => (
                <button
                  key={f.value}
                  onClick={() => setTypeFilter(f.value)}
                  className={cn(
                    "rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all duration-400",
                    typeFilter === f.value
                      ? "bg-on-surface text-surface"
                      : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
                  )}
                >
                  {f.label}
                </button>
              ))}
              <button
                onClick={refresh}
                className="ml-auto rounded-full bg-surface-container-high p-2 text-on-surface-variant hover:bg-surface-container-highest transition-all duration-400"
                title="Refresh location"
              >
                <RefreshCw className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>

          {/* Count */}
          <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
            {filtered.length} spot{filtered.length !== 1 ? "s" : ""} within{" "}
            {radius < 1000 ? `${radius}m` : `${radius / 1000}km`}
          </p>

          {/* Cards */}
          {filtered.length > 0 ? (
            <div className="space-y-2">
              {filtered.map((item) => (
                <NearbyCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-16 text-on-surface-variant">
              <p className="text-sm">
                Nothing from your list within{" "}
                {radius < 1000 ? `${radius}m` : `${radius / 1000}km`}
              </p>
              {nextRadius && (
                <button
                  onClick={() => setRadius(nextRadius)}
                  className="rounded-full bg-cherry-fixed px-5 py-2 text-[11px] font-medium uppercase tracking-wider text-cherry-dark transition-all duration-400 hover:shadow-ambient"
                >
                  Expand to {nextRadius < 1000 ? `${nextRadius}m` : `${nextRadius / 1000}km`}
                </button>
              )}
            </div>
          )}
        </>
      )}
    </div>
  );
}
