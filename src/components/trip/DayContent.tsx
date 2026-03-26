"use client";

import { useState, useCallback } from "react";
import { List, Map } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { NextActivityCard } from "./NextActivityCard";
import { DayTimeline } from "./DayTimeline";
import { DayMapView } from "./DayMapView";
import type { TripDay } from "@/data/types";

type ViewMode = "list" | "map";

export function DayContent({ day, nextDay }: { day: TripDay; nextDay?: TripDay | null }) {
  const [view, setView] = useState<ViewMode>("list");
  const [completedRaw, setCompletedRaw] = useLocalStorage<string[]>(
    `day-${day.dayNumber}-completed`,
    []
  );

  const completedIds = new Set(completedRaw);

  const toggleComplete = useCallback(
    (id: string) => {
      setCompletedRaw((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
      );
    },
    [setCompletedRaw]
  );

  const completedCount = completedRaw.length;
  const totalCount = day.activities.length;

  return (
    <div className="space-y-8">
      {/* Next Activity smart card */}
      <NextActivityCard
        day={day}
        nextDay={nextDay}
        completedIds={completedIds}
        onComplete={toggleComplete}
      />

      {/* Progress + view toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
            {view === "list" ? "Timeline" : "Map View"}
          </h2>
          {completedCount > 0 && (
            <span className="text-[10px] uppercase tracking-wider text-on-surface-variant/60">
              {completedCount}/{totalCount} done
            </span>
          )}
        </div>
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
        <DayTimeline day={day} completedIds={completedIds} onComplete={toggleComplete} />
      ) : (
        <DayMapView day={day} />
      )}
    </div>
  );
}
