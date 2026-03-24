"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { legs } from "@/data/legs";
import { actionItems } from "@/data/actionItems";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChecklistPage() {
  const [checked, setChecked] = useLocalStorage<string[]>("checklist-checked",
    actionItems.filter(i => i.completed).map(i => i.id)
  );

  const toggle = (id: string) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const completedCount = checked.length;
  const totalCount = actionItems.length;
  const progress = (completedCount / totalCount) * 100;

  return (
    <div className="space-y-10">
      <div className="space-y-3 pt-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          {completedCount} of {totalCount} completed
        </p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-on-surface">
          Checklist
        </h1>
        {/* Progress bar */}
        <div className="h-1 w-full overflow-hidden rounded-full bg-surface-container-high">
          <div
            className="h-full rounded-full bg-cherry-dim transition-all duration-400"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {legs.map((leg) => {
        const legItems = actionItems.filter((i) => i.legSlug === leg.slug);
        if (legItems.length === 0) return null;
        return (
          <div key={leg.slug} className="space-y-3">
            <h2 className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
              <span>{leg.icon}</span> {leg.title}
            </h2>
            <div className="space-y-1">
              {legItems.map((item) => {
                const isChecked = checked.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className="flex w-full items-center gap-3.5 rounded-lg px-3 py-3 text-left transition-all duration-400 hover:bg-surface-container-low"
                  >
                    <div
                      className={cn(
                        "flex h-5 w-5 shrink-0 items-center justify-center rounded-full transition-all duration-400",
                        isChecked
                          ? "bg-on-surface"
                          : "bg-surface-container-high"
                      )}
                    >
                      {isChecked && <Check className="h-3 w-3 text-surface" />}
                    </div>
                    <span
                      className={cn(
                        "text-sm transition-all duration-400",
                        isChecked
                          ? "text-on-surface-variant/40 line-through"
                          : "text-on-surface"
                      )}
                    >
                      {item.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
