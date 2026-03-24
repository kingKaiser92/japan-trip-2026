"use client";

import { useState } from "react";
import { days } from "@/data/days";
import { legs } from "@/data/legs";
import { formatDate } from "@/lib/dates";
import { MapLink } from "@/components/shared/MapLink";
import { cn } from "@/lib/utils";
import { Footprints, Dumbbell, BedDouble, MapPin, Clock, Route } from "lucide-react";

type TrainingFilter = "all" | "run" | "hyrox" | "rest";

const keyLocations = [
  {
    name: "ASICS Run Tokyo Marunouchi",
    description:
      "Running station with lockers and showers. Opens 6:30 AM. Near Imperial Palace — perfect for early morning runs.",
    mapsQuery: "ASICS RUN TOKYO MARUNOUCHI",
    tag: "Running Station",
  },
  {
    name: "CrossFit Roppongi",
    description:
      "HYROX classes available. Book in advance. ~20 min from Akihabara, ~15 min from Ginza.",
    mapsQuery: "CrossFit Roppongi",
    tag: "HYROX",
  },
  {
    name: "Club 360",
    description:
      "Alternative HYROX location in the Roppongi/Minato area.",
    mapsQuery: "Club 360 Tokyo",
    tag: "HYROX",
  },
  {
    name: "Imperial Palace",
    description:
      "Tokyo running route — ~5 km per lap. Flat, well-lit, popular with runners. Walkable from Ginza hotel.",
    mapsQuery: "Imperial Palace Running Course Tokyo",
    tag: "Route",
  },
  {
    name: "Kamo River",
    description:
      "Kyoto running route with 4.3 km and 9.2 km marked courses. Cherry blossoms along the river in April.",
    mapsQuery: "Kamo River Running Course Kyoto",
    tag: "Route",
  },
  {
    name: "Sumida River",
    description:
      "Flat riverside path near Akihabara. Good for easy runs from the hotel.",
    mapsQuery: "Sumida River Running Path Tokyo",
    tag: "Route",
  },
];

const filterConfig: { key: TrainingFilter; label: string }[] = [
  { key: "all", label: "All" },
  { key: "run", label: "Running" },
  { key: "hyrox", label: "HYROX" },
  { key: "rest", label: "Rest" },
];

function getTrainingIcon(type: string) {
  switch (type) {
    case "run":
      return Footprints;
    case "hyrox":
      return Dumbbell;
    case "rest":
      return BedDouble;
    default:
      return Footprints;
  }
}

function getTrainingLabel(type: string) {
  switch (type) {
    case "run":
      return "Run";
    case "hyrox":
      return "HYROX";
    case "rest":
      return "Rest";
    default:
      return type;
  }
}

export default function TrainingPage() {
  const [filter, setFilter] = useState<TrainingFilter>("all");

  // Build training days — include all days, marking ones without training as rest
  const trainingDays = days.map((day) => {
    const leg = legs.find((l) => l.slug === day.legSlug)!;
    const training = day.training ?? { type: "rest" as const, description: "Rest day — no scheduled training." };
    return { day, leg, training };
  });

  const filtered =
    filter === "all"
      ? trainingDays
      : trainingDays.filter((t) => t.training.type === filter);

  const trainingCount = trainingDays.filter((t) => t.training.type !== "rest").length;
  const runCount = trainingDays.filter((t) => t.training.type === "run").length;
  const hyroxCount = trainingDays.filter((t) => t.training.type === "hyrox").length;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-3 pt-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          {trainingCount} training days &middot; {runCount} runs &middot; {hyroxCount} hyrox
        </p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-on-surface">
          Training Plan
        </h1>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {filterConfig.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={cn(
              "rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all duration-400",
              filter === f.key
                ? "bg-cherry-fixed text-cherry-dark"
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Training Calendar */}
      <div className="space-y-6">
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          Daily Schedule
        </h2>
        <div className="space-y-2">
          {filtered.map(({ day, leg, training }) => {
            const Icon = getTrainingIcon(training.type);
            const isRest = training.type === "rest";

            return (
              <div
                key={day.dayNumber}
                className={cn(
                  "rounded-xl bg-surface-container-lowest p-4 transition-all duration-400 hover:shadow-ambient",
                  isRest && "opacity-60"
                )}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-full shrink-0 mt-0.5",
                      training.type === "run" && "bg-emerald-500/15",
                      training.type === "hyrox" && "bg-amber-500/15",
                      training.type === "rest" && "bg-surface-container-low"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4",
                        training.type === "run" && "text-emerald-400",
                        training.type === "hyrox" && "text-amber-400",
                        training.type === "rest" && "text-on-surface-variant/50"
                      )}
                    />
                  </div>
                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif font-medium text-on-surface text-[15px]">
                          Day {day.dayNumber} &mdash; {getTrainingLabel(training.type)}
                        </span>
                        {training.distance && (
                          <span className="rounded-full bg-surface-container-high px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-on-surface-variant">
                            {training.distance}
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5 text-[11px] uppercase tracking-[0.15em] text-on-surface-variant">
                        <span>{formatDate(day.date)}</span>
                        <span>&middot;</span>
                        <span>{leg.icon} {leg.title}</span>
                        {training.timeWindow && (
                          <>
                            <span>&middot;</span>
                            <span className="inline-flex items-center gap-0.5">
                              <Clock className="h-3 w-3" />
                              {training.timeWindow}
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                    {!isRest && (
                      <p className="text-sm text-on-surface-variant leading-relaxed">
                        {training.description}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Key Locations */}
      <div className="space-y-6">
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          Key Locations
        </h2>
        <div className="space-y-2">
          {keyLocations.map((loc) => (
            <div
              key={loc.name}
              className="rounded-xl bg-surface-container-lowest p-4 transition-all duration-400 hover:shadow-ambient"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cherry-fixed/20 shrink-0 mt-0.5">
                  {loc.tag === "Route" ? (
                    <Route className="h-4 w-4 text-cherry-dim" />
                  ) : (
                    <MapPin className="h-4 w-4 text-cherry-dim" />
                  )}
                </div>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div>
                    <div className="font-serif font-medium text-on-surface text-[15px]">
                      {loc.name}
                    </div>
                    <div className="text-[11px] uppercase tracking-[0.15em] text-on-surface-variant mt-0.5">
                      {loc.tag}
                    </div>
                  </div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    {loc.description}
                  </p>
                  <MapLink query={loc.mapsQuery} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
