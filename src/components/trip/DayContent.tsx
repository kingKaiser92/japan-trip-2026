"use client";

import { useState } from "react";
import { List, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import { NextActivityCard } from "./NextActivityCard";
import { DayTimeline } from "./DayTimeline";
import { DayMapView } from "./DayMapView";
import type { TripDay } from "@/data/types";

type ViewMode = "list" | "map";

export function DayContent({ day, nextDay }: { day: TripDay; nextDay?: TripDay | null }) {
  const [view, setView] = useState<ViewMode>("list");

  return (
    <div className="space-y-8">
      {/* Next Activity smart card */}
      <NextActivityCard day={day} nextDay={nextDay} />

      {/* View toggle FAB */}
      <div className="flex items-center justify-between">
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          {view === "list" ? "Timeline" : "Map View"}
        </h2>
        <div className="flex rounded-full bg-surface-container-high p-0.5">
          <button
            onClick={() => setView("list")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all duration-400",
              view === "list"
                ? "bg-surface-container-lowest text-on-surface shadow-ambient"
                : "text-on-surface-variant"
            )}
          >
            <List className="h-3.5 w-3.5" />
            List
          </button>
          <button
            onClick={() => setView("map")}
            className={cn(
              "flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all duration-400",
              view === "map"
                ? "bg-surface-container-lowest text-on-surface shadow-ambient"
                : "text-on-surface-variant"
            )}
          >
            <Map className="h-3.5 w-3.5" />
            Map
          </button>
        </div>
      </div>

      {/* Content */}
      {view === "list" ? (
        <DayTimeline day={day} />
      ) : (
        <DayMapView day={day} />
      )}
    </div>
  );
}
