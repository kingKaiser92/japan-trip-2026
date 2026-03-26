"use client";

import { useState } from "react";
import { shops, type ShopItem } from "@/data/shops";
import { legs } from "@/data/legs";
import { notionRecs } from "@/data/notionRecs";
import { MapLink } from "@/components/shared/MapLink";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { getOpenStatus } from "@/lib/openNow";

type LegFilter = "all" | string;

export default function ShoppingPage() {
  const [legFilter, setLegFilter] = useState<LegFilter>("all");
  // Merge handcoded shops with Notion-synced shop recs
  const allShops: ShopItem[] = (() => {
    const existingNames = new Set(shops.map((s) => s.name.toLowerCase()));
    const notionShops = notionRecs
      .filter((r) => r.category === "shop" && !existingNames.has(r.name.toLowerCase()))
      .map((r) => ({
        id: r.id,
        name: r.name,
        description: r.description,
        location: r.location,
        hours: r.hours,
        legSlug: r.legSlug,
        neighborhood: r.neighborhood,
        mapsQuery: r.mapsQuery,
        recSource: r.recSource,
      }));
    return [...shops, ...notionShops];
  })();

  const filtered = legFilter === "all" ? allShops : allShops.filter((s) => s.legSlug === legFilter);

  // Group by leg
  const groupedByLeg = legs
    .map((leg) => ({
      leg,
      shops: filtered.filter((s) => s.legSlug === leg.slug),
    }))
    .filter((g) => g.shops.length > 0);

  return (
    <div className="space-y-10">
      <div className="space-y-3 pt-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          {filtered.length} stores across the trip
        </p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-on-surface">
          Shopping Guide
        </h1>
      </div>

      {/* Leg filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setLegFilter("all")}
          className={cn(
            "rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all duration-400",
            legFilter === "all"
              ? "bg-cherry-fixed text-cherry-dark"
              : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
          )}
        >
          All
        </button>
        {legs.map((leg) => (
          <button
            key={leg.slug}
            onClick={() => setLegFilter(leg.slug)}
            className={cn(
              "rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all duration-400",
              legFilter === leg.slug
                ? "bg-cherry-fixed text-cherry-dark"
                : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
            )}
          >
            {leg.icon} {leg.title.split(" ")[0]}
          </button>
        ))}
      </div>

      {/* Grouped store list */}
      {groupedByLeg.map(({ leg, shops: legShops }) => {
        // Group shops within a leg by neighborhood
        const neighborhoods = [...new Set(legShops.map((s) => s.neighborhood))];

        return (
          <div key={leg.slug} className="space-y-6">
            <h2 className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
              <span>{leg.icon}</span> {leg.title}
            </h2>

            {neighborhoods.map((hood) => {
              const hoodShops = legShops.filter((s) => s.neighborhood === hood);
              return (
                <div key={hood} className="space-y-2">
                  <h3 className="text-xs font-medium text-on-surface-variant/60 uppercase tracking-wider pl-1">
                    {hood}
                  </h3>
                  <div className="space-y-2">
                    {hoodShops.map((shop) => (
                      <div
                        key={shop.id}
                        className="rounded-xl bg-surface-container-lowest p-4 transition-all duration-400 hover:shadow-ambient"
                      >
                        <div className="flex items-start gap-3">
                          <ShoppingBag className="h-4 w-4 mt-1 shrink-0 text-on-surface-variant" />
                          <div className="flex-1 min-w-0 space-y-1.5">
                            <div>
                              <div className="font-serif font-medium text-on-surface text-[15px]">
                                {shop.name}
                              </div>
                              <div className="flex items-center gap-2 mt-0.5 text-[11px] uppercase tracking-[0.15em] text-on-surface-variant">
                                <span>{shop.location}</span>
                                {shop.rating && <span>&middot; {shop.rating}★</span>}
                                <span>&middot; {shop.hours}</span>
                                {(() => {
                                  const status = getOpenStatus(shop.hours);
                                  if (status === "open") return <span className="text-green-400 font-semibold normal-case tracking-normal">&middot; Open</span>;
                                  if (status === "closed") return <span className="text-red-400/70 font-semibold normal-case tracking-normal">&middot; Closed</span>;
                                  return null;
                                })()}
                              </div>
                            </div>
                            <p className="text-sm text-on-surface-variant leading-relaxed">
                              {shop.description}
                            </p>
                            <div className="flex flex-wrap items-center gap-3">
                              <MapLink query={shop.mapsQuery} />
                              {shop.recSource && shop.recSource !== "personal" && (
                                <span className={cn(
                                  "inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider",
                                  shop.recSource === "asif"
                                    ? "bg-cherry-fixed text-cherry-dark"
                                    : "bg-surface-container-high text-on-surface-variant"
                                )}>
                                  {shop.recSource === "asif" ? "Asif's" : shop.recSource === "may-ann" ? "May Ann's" : `${String(shop.recSource)}'s`} Rec
                                </span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
