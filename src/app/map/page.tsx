"use client";

import { useState } from "react";
import { days } from "@/data/days";
import { legs } from "@/data/legs";
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

function getMultiStopGoogleMapsUrl(activities: typeof days[0]["activities"]): string {
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

  return (
    <div className="space-y-10">
      {/* Page header */}
      <div className="space-y-3 pt-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          Route Planner
        </p>
        <h1 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-on-surface">
          Map View
        </h1>
        <p className="text-base text-on-surface-variant leading-relaxed max-w-sm">
          Explore each day&apos;s route and open locations directly in Google Maps.
        </p>
      </div>

      {/* Day selector */}
      <div className="space-y-3">
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          Select Day
        </h2>
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
      </div>

      {/* Day info bar */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{leg.icon}</span>
          <h2 className="font-serif text-xl font-semibold text-on-surface">
            {day.title}
          </h2>
        </div>
        <p className="text-[11px] uppercase tracking-[0.15em] text-on-surface-variant">
          {formatDate(day.date)} &middot; {activitiesWithLocation.length} locations
        </p>
      </div>

      {/* Open full route button */}
      {activitiesWithLocation.length > 1 && (
        <a
          href={getMultiStopGoogleMapsUrl(day.activities)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded-xl bg-primary-container px-5 py-4 transition-all duration-400 hover:shadow-ambient group"
        >
          <div className="flex items-center gap-3">
            <Route className="h-5 w-5 text-cherry" />
            <div>
              <span className="font-serif text-[15px] font-medium text-surface">
                Open Full Day Route
              </span>
              <p className="text-[11px] uppercase tracking-wider text-surface-container-high mt-0.5">
                {activitiesWithLocation.length} stops in Google Maps
              </p>
            </div>
          </div>
          <ExternalLink className="h-4 w-4 text-surface-container-high group-hover:text-cherry transition-colors duration-400" />
        </a>
      )}

      {/* Route timeline */}
      <div className="space-y-3">
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          Route Timeline
        </h2>

        <div className="relative">
          {/* Continuous connector line */}
          <div className="absolute left-[15px] top-8 bottom-8 w-px bg-cherry-dim/20" />

          <div className="space-y-0">
            {day.activities.map((activity, index) => {
              const isFirst = index === 0;
              const isLast = index === day.activities.length - 1;
              const hasLocation = !!activity.mapsQuery;

              return (
                <div key={activity.id} className="relative flex gap-4 group">
                  {/* Pin marker */}
                  <div className="relative z-10 flex flex-col items-center shrink-0 pt-5">
                    <div
                      className={cn(
                        "flex h-[30px] w-[30px] items-center justify-center rounded-full transition-all duration-400",
                        isFirst || isLast
                          ? "bg-cherry-dim/40"
                          : "bg-cherry-dim/20 group-hover:bg-cherry-dim/30"
                      )}
                    >
                      {isFirst || isLast ? (
                        <MapPin className="h-3.5 w-3.5 text-cherry-dark" />
                      ) : (
                        <div className="h-2.5 w-2.5 rounded-full bg-cherry-dim" />
                      )}
                    </div>
                  </div>

                  {/* Activity card */}
                  <div
                    className={cn(
                      "flex-1 min-w-0 rounded-xl py-4 pr-4 transition-all duration-400",
                    )}
                  >
                    {/* Time label */}
                    <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-on-surface-variant mb-1.5">
                      <Clock className="h-3 w-3" />
                      <span>
                        {activity.isApproximate && "~"}
                        {activity.time}
                      </span>
                      {activity.isOptional && (
                        <span className="text-on-surface-variant/50 ml-1">
                          &middot; Optional
                        </span>
                      )}
                    </div>

                    {/* Name + category */}
                    <div className="flex items-center gap-2.5">
                      <CategoryIcon
                        category={activity.category}
                        className="h-4 w-4 shrink-0"
                      />
                      <span className="font-serif font-medium text-on-surface text-[15px] leading-tight">
                        {activity.name}
                      </span>
                    </div>

                    {/* Notes preview */}
                    <p className="mt-1.5 text-sm text-on-surface-variant leading-relaxed line-clamp-2">
                      {activity.notes}
                    </p>

                    {/* Maps link */}
                    {hasLocation && (
                      <a
                        href={getGoogleMapsUrl(activity.mapsQuery!)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2.5 inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface border-b border-cherry/40 pb-0.5 transition-colors duration-400"
                      >
                        <MapPin className="h-3.5 w-3.5" />
                        <span>Open in Maps</span>
                        <ChevronRight className="h-3 w-3 opacity-40" />
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Accommodation note */}
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
