import { ActivityCard } from "./ActivityCard";
import type { TripDay } from "@/data/types";

export function DayTimeline({ day }: { day: TripDay }) {
  return (
    <div className="space-y-3">
      {day.activities.map((activity) => (
        <ActivityCard key={activity.id} activity={activity} />
      ))}
    </div>
  );
}
