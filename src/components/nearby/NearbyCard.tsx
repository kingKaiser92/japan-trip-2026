"use client";

import { Utensils, Coffee, Wine, UtensilsCrossed, ShoppingBag } from "lucide-react";
import { MapLink } from "@/components/shared/MapLink";
import { getOpenStatus } from "@/lib/openNow";
import { formatWalkingTime } from "@/lib/distance";
import { cn } from "@/lib/utils";
import type { RecSource } from "@/data/restaurants";

const typeIcons = {
  restaurant: Utensils,
  cafe: Coffee,
  bar: Wine,
  "street-food": UtensilsCrossed,
  shop: ShoppingBag,
} as const;

export interface NearbyItem {
  id: string;
  name: string;
  description: string;
  hours: string;
  mapsQuery: string;
  distance: number; // meters
  itemType: "food" | "shop";
  cuisine?: string;
  rating?: string;
  recSource?: RecSource;
  category?: string;
}

export function NearbyCard({ item }: { item: NearbyItem }) {
  const iconKey = (item.category as keyof typeof typeIcons) ?? (item.itemType === "shop" ? "shop" : "restaurant");
  const Icon = typeIcons[iconKey] ?? Utensils;
  const status = getOpenStatus(item.hours);

  return (
    <div className="rounded-xl bg-surface-container-lowest p-4 transition-all duration-400 hover:shadow-ambient">
      <div className="flex items-start gap-3">
        <Icon className="h-4 w-4 mt-1 shrink-0 text-on-surface-variant" />
        <div className="flex-1 min-w-0 space-y-1.5">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif font-medium text-on-surface text-[15px]">
                {item.name}
              </span>
              <span className="shrink-0 rounded-full bg-cherry-fixed px-2 py-0.5 text-[11px] font-semibold text-cherry-dark">
                {formatWalkingTime(item.distance)}
              </span>
            </div>
            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 text-[11px] uppercase tracking-[0.15em] text-on-surface-variant">
              {item.cuisine && <span>{item.cuisine}</span>}
              {item.rating && <span>&middot; {item.rating}&#9733;</span>}
              <span>&middot; {item.hours}</span>
              {status === "open" && (
                <span className="text-green-400 font-semibold normal-case tracking-normal">
                  &middot; Open
                </span>
              )}
              {status === "closed" && (
                <span className="text-red-400/70 font-semibold normal-case tracking-normal">
                  &middot; Closed
                </span>
              )}
            </div>
          </div>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            {item.description}
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <MapLink query={item.mapsQuery} />
            {item.recSource && item.recSource !== "personal" && (
              <span
                className={cn(
                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider",
                  item.recSource === "asif"
                    ? "bg-cherry-fixed text-cherry-dark"
                    : "bg-surface-container-high text-on-surface-variant"
                )}
              >
                {item.recSource === "asif"
                  ? "Asif's"
                  : item.recSource === "may-ann"
                    ? "May Ann's"
                    : `${String(item.recSource)}'s`}{" "}
                Rec
              </span>
            )}
            {item.recSource === "personal" && (
              <span className="inline-flex items-center rounded-full bg-surface-container-high px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-on-surface-variant">
                Personal Pick
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
