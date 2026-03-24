"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home,
  CalendarDays,
  Utensils,
  ShoppingBag,
  MoreHorizontal,
  MapPin,
  Dumbbell,
  BookOpen,
  Ticket,
  CheckSquare,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrentDay } from "@/hooks/useCurrentDay";
import { useState } from "react";

const primaryNav = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/day/1", icon: CalendarDays, label: "Today", isDynamic: true },
  { href: "/food", icon: Utensils, label: "Food" },
  { href: "/shopping", icon: ShoppingBag, label: "Shop" },
];

const moreNav = [
  { href: "/map", icon: MapPin, label: "Map" },
  { href: "/bookings", icon: Ticket, label: "Bookings" },
  { href: "/training", icon: Dumbbell, label: "Training" },
  { href: "/essentials", icon: BookOpen, label: "Essentials" },
  { href: "/checklist", icon: CheckSquare, label: "Checklist" },
];

export function MobileNav() {
  const pathname = usePathname();
  const currentDay = useCurrentDay();
  const [moreOpen, setMoreOpen] = useState(false);

  const isMoreActive = moreNav.some((item) => pathname === item.href);

  return (
    <>
      {/* More menu overlay */}
      {moreOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm md:hidden"
          onClick={() => setMoreOpen(false)}
        >
          <div
            className="absolute bottom-0 left-0 right-0 rounded-t-2xl bg-surface-container-lowest p-6 pb-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
                More
              </h3>
              <button
                onClick={() => setMoreOpen(false)}
                className="p-1 rounded-full text-on-surface-variant hover:text-on-surface"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {moreNav.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMoreOpen(false)}
                    className={cn(
                      "flex flex-col items-center gap-2 rounded-xl p-4 transition-all duration-200",
                      isActive
                        ? "bg-cherry-fixed/10 text-on-surface"
                        : "text-on-surface-variant hover:bg-surface-container-high"
                    )}
                  >
                    <Icon
                      className={cn("h-6 w-6", isActive && "text-cherry-dim")}
                    />
                    <span className="text-[11px] font-medium tracking-wide">
                      {item.label}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Bottom nav bar — 5 items */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 glass md:hidden">
        <div className="flex items-center justify-around px-2 py-2">
          {primaryNav.map((item) => {
            const href = item.isDynamic
              ? `/day/${currentDay || 1}`
              : item.href;
            const isActive = item.isDynamic
              ? pathname.startsWith("/day/")
              : pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.label}
                href={href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1.5 text-[10px] tracking-wide uppercase",
                  isActive ? "text-on-surface" : "text-on-surface-variant"
                )}
              >
                <Icon
                  className={cn("h-5 w-5", isActive && "text-cherry-dim")}
                />
                <span>
                  {item.isDynamic && currentDay ? "Today" : item.label}
                </span>
              </Link>
            );
          })}

          {/* More button */}
          <button
            onClick={() => setMoreOpen(true)}
            className={cn(
              "flex flex-col items-center gap-1 px-3 py-1.5 text-[10px] tracking-wide uppercase",
              isMoreActive ? "text-on-surface" : "text-on-surface-variant"
            )}
          >
            <MoreHorizontal
              className={cn("h-5 w-5", isMoreActive && "text-cherry-dim")}
            />
            <span>More</span>
          </button>
        </div>
      </nav>
    </>
  );
}
