import { ActivityCard } from "./ActivityCard";
import type { TripDay } from "@/data/types";

export function DayTimeline({ day }: { day: TripDay }) {
  return (
    <div className="relative">
      {/* Soft timeline connector */}
      <div className="absolute left-[11px] top-6 bottom-6 w-px timeline-connector" />

      <div className="space-y-4">
        {day.activities.map((activity) => (
          <div key={activity.id} className="relative flex gap-4">
            {/* Timeline marker */}
            <div className="relative z-10 mt-5 shrink-0">
              <div className="h-[22px] w-[22px] rounded-full bg-cherry-dim/30 flex items-center justify-center">
                <div className="h-2 w-2 rounded-full bg-cherry-dim" />
              </div>
            </div>
            {/* Card */}
            <div className="flex-1 min-w-0">
              <ActivityCard activity={activity} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
