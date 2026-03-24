"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { days } from "@/data/days";
import { legs } from "@/data/legs";
import { getCoords } from "@/data/coordinates";
import { formatDate } from "@/lib/dates";
import { getGoogleMapsUrl } from "@/lib/maps";
import { CategoryIcon } from "@/components/shared/CategoryIcon";
import { cn } from "@/lib/utils";
import {
  MapPin,
  ExternalLink,
  Route,
  Clock,
  ChevronRight,
} from "lucide-react";

// Dynamic import with SSR disabled (Leaflet requires window)
const TripMap = dynamic(
  () => import("@/components/map/TripMap").then((m) => m.TripMap),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-xl bg-surface-container-lowest h-[400px] flex items-center justify-center">
        <p className="text-on-surface-variant text-sm">Loading map…</p>
      </div>
    ),
  }
);

function getMultiStopGoogleMapsUrl(
  activities: (typeof days)[0]["activities"]
): string {
  const locations = activities
    .filter((a) => a.mapsQuery)
    .map((a) => a.mapsQuery!);

  if (locations.length === 0) return "#";
  if (locations.length === 1) return getGoogleMapsUrl(locations[0]);

  const origin = encodeURIComponent(locations[0]);
  const destination = encodeURIComponent(locations[locations.length - 1]);
  const waypoints = locations
    .slice(1, -1)
    .map((l) => encodeURIComponent(l))
    .join("|");

  let url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=transit`;
  if (waypoints) {
    url += `&waypoints=${waypoints}`;
  }
  return url;
}

export default function MapPage() {
  const [selectedDay, setSelectedDay] = useState(1);
  const day = days.find((d) => d.dayNumber === selectedDay)!;
  const leg = legs.find((l) => l.slug === day.legSlug)!;
  const activitiesWithLocation = day.activities.filter((a) => a.mapsQuery);

  // Build markers for the map
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

  return (
    <div className="space-y-8">
      {/* Page header */}
      <div className="space-y-3 pt-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          Route Planner
        </p>
        <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-on-surface">
          Map View
        </h1>
      </div>

      {/* Day selector */}
      <div className="flex gap-2 overflow-x-auto pb-2 -mx-5 px-5 scrollbar-hide">
        {days.map((d) => {
          const dLeg = legs.find((l) => l.slug === d.legSlug)!;
          return (
            <button
              key={d.dayNumber}
              onClick={() => setSelectedDay(d.dayNumber)}
              className={cn(
                "flex shrink-0 flex-col items-center gap-1.5 rounded-xl px-4 py-3 transition-all duration-400",
                selectedDay === d.dayNumber
                  ? "bg-primary-container text-surface shadow-ambient"
                  : "bg-surface-container-lowest text-on-surface hover:shadow-ambient"
              )}
            >
              <span className="text-lg">{dLeg.icon}</span>
              <span className="font-serif text-sm font-semibold">
                Day {d.dayNumber}
              </span>
              <span
                className={cn(
                  "text-[10px] uppercase tracking-wider",
                  selectedDay === d.dayNumber
                    ? "text-surface-container-high"
                    : "text-on-surface-variant"
                )}
              >
                {formatDate(d.date).split(",")[0]}
              </span>
            </button>
          );
        })}
      </div>

      {/* Interactive Map */}
      {markers.length > 0 ? (
        <TripMap markers={markers} className="border border-surface-container-high" />
      ) : (
        <div className="rounded-xl bg-surface-container-lowest h-[200px] flex items-center justify-center">
          <p className="text-on-surface-variant text-sm">
            No mappable locations for this day
          </p>
        </div>
      )}

      {/* Day info + Open full route */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-lg">{leg.icon}</span>
            <h2 className="font-serif text-xl font-semibold text-on-surface">
              {day.title}
            </h2>
          </div>
          <p className="text-[11px] uppercase tracking-[0.15em] text-on-surface-variant mt-1">
            {formatDate(day.date)} &middot; {markers.length} pins
          </p>
        </div>
        {activitiesWithLocation.length > 1 && (
          <a
            href={getMultiStopGoogleMapsUrl(day.activities)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 rounded-full bg-cherry-fixed px-4 py-2 text-[11px] font-medium uppercase tracking-wider text-cherry-dark transition-all hover:shadow-ambient"
          >
            <Route className="h-3.5 w-3.5" />
            Open Route
            <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>

      {/* Stop list */}
      <div className="space-y-1.5">
        {day.activities.map((activity, index) => {
          const hasLocation = !!activity.mapsQuery;
          const markerIndex = markers.findIndex(
            (m) => m.label === activity.name
          );

          return (
            <div
              key={activity.id}
              className="flex items-center gap-3 rounded-xl bg-surface-container-lowest px-4 py-3 transition-all duration-400 hover:shadow-ambient"
            >
              {/* Numbered pin */}
              {markerIndex >= 0 ? (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-cherry-dim text-[11px] font-bold text-cherry-dark">
                  {markerIndex + 1}
                </div>
              ) : (
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-surface-container-high">
                  <div className="h-2 w-2 rounded-full bg-on-surface-variant/30" />
                </div>
              )}

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <CategoryIcon
                    category={activity.category}
                    className="h-3.5 w-3.5 shrink-0"
                  />
                  <span className="font-serif font-medium text-on-surface text-[14px] truncate">
                    {activity.name}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 mt-0.5 text-[10px] uppercase tracking-wider text-on-surface-variant">
                  <Clock className="h-2.5 w-2.5" />
                  <span>
                    {activity.isApproximate && "~"}
                    {activity.time}
                  </span>
                  {activity.isOptional && (
                    <span className="text-on-surface-variant/50">
                      &middot; Optional
                    </span>
                  )}
                </div>
              </div>

              {/* Maps link */}
              {hasLocation && (
                <a
                  href={getGoogleMapsUrl(activity.mapsQuery!)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 p-2 rounded-full text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high transition-all"
                >
                  <MapPin className="h-4 w-4" />
                </a>
              )}
            </div>
          );
        })}
      </div>

      {/* Accommodation */}
      <div className="rounded-xl bg-surface-container-lowest p-5 space-y-2">
        <div className="flex items-center gap-2.5">
          <MapPin className="h-4 w-4 text-cherry-dim" />
          <span className="text-[11px] uppercase tracking-[0.2em] font-medium text-on-surface">
            Accommodation
          </span>
        </div>
        <p className="font-serif text-[15px] font-medium text-on-surface">
          {leg.accommodation.name}
        </p>
        {leg.accommodation.address && (
          <p className="text-sm text-on-surface-variant">
            {leg.accommodation.address}
          </p>
        )}
        <a
          href={getGoogleMapsUrl(leg.accommodation.mapsQuery)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface border-b border-cherry/40 pb-0.5 transition-colors duration-400"
        >
          <MapPin className="h-3.5 w-3.5" />
          <span>Open in Maps</span>
        </a>
      </div>
    </div>
  );
}
