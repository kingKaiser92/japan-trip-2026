"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { ActivityCard } from "./ActivityCard";
import type { TripDay } from "@/data/types";

interface DayTimelineProps {
  day: TripDay;
  completedIds: Set<string>;
  onComplete: (id: string) => void;
}

export function DayTimeline({ day, completedIds, onComplete }: DayTimelineProps) {
  return (
    <div className="relative">
      {/* Soft timeline connector */}
      <div className="absolute left-[11px] top-6 bottom-6 w-px timeline-connector" />

      <div className="space-y-4">
        {day.activities.map((activity) => {
          const isDone = completedIds.has(activity.id);
          return (
            <div
              key={activity.id}
              className={cn("relative flex gap-4 transition-opacity duration-400", isDone && "opacity-40")}
            >
              {/* Timeline marker — tap to toggle complete */}
              <button
                onClick={() => onComplete(activity.id)}
                className="relative z-10 mt-5 shrink-0 group"
                title={isDone ? "Mark incomplete" : "Mark complete"}
              >
                <div
                  className={cn(
                    "h-[22px] w-[22px] rounded-full flex items-center justify-center transition-all duration-400",
                    isDone
                      ? "bg-cherry-dim"
                      : "bg-cherry-dim/30 group-hover:bg-cherry-dim/50"
                  )}
                >
                  {isDone ? (
                    <Check className="h-3 w-3 text-cherry-dark" />
                  ) : (
                    <div className="h-2 w-2 rounded-full bg-cherry-dim" />
                  )}
                </div>
              </button>
              {/* Card */}
              <div className="flex-1 min-w-0">
                <ActivityCard activity={activity} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
