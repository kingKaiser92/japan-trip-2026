"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { getCoords } from "@/data/coordinates";
import type { TripDay } from "@/data/types";

const TripMap = dynamic(
  () => import("@/components/map/TripMap").then((m) => m.TripMap),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl bg-surface-container-lowest h-[250px] flex items-center justify-center">
        <p className="text-on-surface-variant text-sm">Loading map...</p>
      </div>
    ),
  }
);

export function LegMiniMap({ legDays }: { legDays: TripDay[] }) {
  const markers = useMemo(() => {
    const seen = new Set<string>();
    let idx = 0;

    return legDays
      .flatMap((day) => day.activities)
      .map((a) => {
        if (!a.mapsQuery) return null;
        // Dedupe by mapsQuery
        if (seen.has(a.mapsQuery)) return null;
        seen.add(a.mapsQuery);

        const coords = getCoords(a.mapsQuery);
        if (!coords) return null;

        return {
          lat: coords.lat,
          lng: coords.lng,
          label: a.name,
          time: "",
          category: a.category,
          index: idx++,
        };
      })
      .filter(Boolean) as {
      lat: number;
      lng: number;
      label: string;
      time: string;
      category: string;
      index: number;
    }[];
  }, [legDays]);

  if (markers.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
        All Pins &middot; {markers.length} locations
      </p>
      <TripMap markers={markers} className="border border-surface-container-high" />
    </div>
  );
}
