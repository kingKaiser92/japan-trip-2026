"use client";

import { useMemo } from "react";
import dynamic from "next/dynamic";
import { getCoords } from "@/data/coordinates";
import { useGeolocation } from "@/hooks/useGeolocation";
import type { TripDay } from "@/data/types";

const TripMap = dynamic(
  () => import("@/components/map/TripMap").then((m) => m.TripMap),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl bg-surface-container-lowest h-[350px] flex items-center justify-center">
        <p className="text-on-surface-variant text-sm">Loading map...</p>
      </div>
    ),
  }
);

export function DayMapView({ day }: { day: TripDay }) {
  const { position } = useGeolocation();

  const markers = useMemo(() => {
    let idx = 0;
    return day.activities
      .map((a) => {
        if (!a.mapsQuery) return null;
        const coords = getCoords(a.mapsQuery);
        if (!coords) return null;
        return {
          lat: coords.lat,
          lng: coords.lng,
          label: a.name,
          time: `${a.isApproximate ? "~" : ""}${a.time}`,
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
  }, [day]);

  if (markers.length === 0) return null;

  return (
    <TripMap
      markers={markers}
      userPosition={position}
      className="border border-surface-container-high"
    />
  );
}
