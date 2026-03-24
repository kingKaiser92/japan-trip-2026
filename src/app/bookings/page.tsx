"use client";

import { useState } from "react";
import {
  Plane,
  Hotel,
  Train,
  Sparkles,
  UtensilsCrossed,
  CheckCircle2,
  Clock,
  MapPin,
  Ticket,
  User,
} from "lucide-react";
import { bookings, BookingCategory } from "@/data/bookings";
import { cn } from "@/lib/utils";
import { getGoogleMapsUrl } from "@/lib/maps";

type CategoryFilter = "all" | BookingCategory;

const categoryConfig: Record<
  BookingCategory,
  { label: string; icon: typeof Plane }
> = {
  flight: { label: "Flights", icon: Plane },
  hotel: { label: "Hotels", icon: Hotel },
  transport: { label: "Transport", icon: Train },
  experience: { label: "Experiences", icon: Sparkles },
  restaurant: { label: "Restaurants", icon: UtensilsCrossed },
};

const categoryOrder: BookingCategory[] = [
  "flight",
  "hotel",
  "transport",
  "experience",
  "restaurant",
];

function formatBookingDate(date: string, dateEnd?: string): string {
  const fmt = (d: string) => {
    const [, m, day] = d.split("-");
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${months[parseInt(m) - 1]} ${parseInt(day)}`;
  };
  if (dateEnd) {
    return `${fmt(date)} – ${fmt(dateEnd)}`;
  }
  return fmt(date);
}

export default function BookingsPage() {
  const [filter, setFilter] = useState<CategoryFilter>("all");

  const filtered =
    filter === "all"
      ? bookings
      : bookings.filter((b) => b.category === filter);

  const confirmedCount = bookings.filter(
    (b) => b.status === "confirmed"
  ).length;
  const pendingCount = bookings.filter((b) => b.status === "pending").length;

  const grouped = categoryOrder
    .map((cat) => ({
      category: cat,
      config: categoryConfig[cat],
      items: filtered.filter((b) => b.category === cat),
    }))
    .filter((g) => g.items.length > 0);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-3 pt-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          {confirmedCount} confirmed &middot; {pendingCount} pending
        </p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-on-surface">
          Bookings Hub
        </h1>
      </div>

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setFilter("all")}
          className={cn(
            "rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all duration-400",
            filter === "all"
              ? "bg-cherry-fixed text-cherry-dark"
              : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
          )}
        >
          All
        </button>
        {categoryOrder.map((cat) => {
          const cfg = categoryConfig[cat];
          const Icon = cfg.icon;
          return (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-4 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all duration-400",
                filter === cat
                  ? "bg-cherry-fixed text-cherry-dark"
                  : "bg-surface-container-high text-on-surface-variant hover:bg-surface-container-highest"
              )}
            >
              <Icon className="h-3 w-3" />
              {cfg.label}
            </button>
          );
        })}
      </div>

      {/* Grouped bookings */}
      {grouped.map(({ category, config, items }) => {
        const GroupIcon = config.icon;
        return (
          <div key={category} className="space-y-3">
            <h2 className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
              <GroupIcon className="h-3.5 w-3.5" />
              {config.label}
            </h2>
            <div className="space-y-2">
              {items.map((booking) => {
                const CatIcon = categoryConfig[booking.category].icon;
                return (
                  <div
                    key={booking.id}
                    className="rounded-xl bg-surface-container-lowest p-4 transition-all duration-400 hover:shadow-ambient"
                  >
                    <div className="flex items-start gap-3">
                      <CatIcon className="h-4 w-4 mt-1 shrink-0 text-on-surface-variant" />
                      <div className="flex-1 min-w-0 space-y-2">
                        {/* Title row */}
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <div className="font-serif font-medium text-on-surface text-[15px]">
                              {booking.name}
                            </div>
                            <div className="flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-0.5 text-[11px] uppercase tracking-[0.15em] text-on-surface-variant">
                              <span>
                                {formatBookingDate(
                                  booking.date,
                                  booking.dateEnd
                                )}
                              </span>
                              {booking.time && (
                                <>
                                  <span>&middot;</span>
                                  <span>{booking.time}</span>
                                </>
                              )}
                            </div>
                          </div>
                          {/* Status badge */}
                          <span
                            className={cn(
                              "inline-flex items-center gap-1 shrink-0 rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider",
                              booking.status === "confirmed"
                                ? "bg-emerald-500/10 text-emerald-400"
                                : "bg-amber-500/10 text-amber-400"
                            )}
                          >
                            {booking.status === "confirmed" ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : (
                              <Clock className="h-3 w-3" />
                            )}
                            {booking.status}
                          </span>
                        </div>

                        {/* Details */}
                        <div className="space-y-1.5">
                          {booking.confirmationCode && (
                            <div className="inline-flex items-center gap-1.5 text-xs text-on-surface-variant">
                              <Ticket className="h-3 w-3" />
                              <span className="font-mono text-on-surface">
                                {booking.confirmationCode}
                              </span>
                            </div>
                          )}

                          {booking.bookedUnder && (
                            <div className="flex items-center gap-1.5 text-xs text-on-surface-variant">
                              <User className="h-3 w-3" />
                              <span>Booked under {booking.bookedUnder}</span>
                            </div>
                          )}

                          {booking.notes && (
                            <p className="text-sm text-on-surface-variant leading-relaxed">
                              {booking.notes}
                            </p>
                          )}

                          {booking.price && (
                            <p className="text-xs font-medium text-on-surface-variant">
                              {booking.price}
                            </p>
                          )}

                          {booking.mapsQuery && (
                            <a
                              href={getGoogleMapsUrl(booking.mapsQuery)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface border-b border-cherry/40 pb-0.5"
                            >
                              <MapPin className="h-3.5 w-3.5" />
                              <span>
                                {booking.location || "Open in Maps"}
                              </span>
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
