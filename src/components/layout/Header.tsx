"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentDay } from "@/hooks/useCurrentDay";
import { days } from "@/data/days";
import { legs } from "@/data/legs";
import { cn } from "@/lib/utils";

const desktopNav = [
  { href: "/food", label: "Food" },
  { href: "/shopping", label: "Shop" },
  { href: "/nearby", label: "Nearby" },
  { href: "/map", label: "Map" },
  { href: "/bookings", label: "Bookings" },
  { href: "/training", label: "Training" },
  { href: "/essentials", label: "Essentials" },
  { href: "/checklist", label: "Checklist" },
];

export function Header() {
  const pathname = usePathname();
  const currentDay = useCurrentDay();
  const day = currentDay ? days.find((d) => d.dayNumber === currentDay) : null;
  const leg = day ? legs.find((l) => l.slug === day.legSlug) : null;

  return (
    <header className="sticky top-0 z-40 glass">
      <div className="mx-auto flex h-14 max-w-2xl items-center justify-between px-5">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-lg">🇯🇵</span>
          <span className="font-serif text-lg font-semibold tracking-tight text-on-surface">
            Japan 2026
          </span>
        </Link>
        {day && leg && (
          <Link
            href={`/day/${currentDay}`}
            className="flex items-center gap-2 rounded-full bg-on-surface/5 px-3.5 py-1.5 text-sm font-medium text-on-surface"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cherry opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cherry" />
            </span>
            Day {currentDay}
          </Link>
        )}
      </div>

      {/* Desktop nav — hidden on mobile (mobile uses MobileNav) */}
      <nav className="hidden md:block border-t border-outline-variant/20">
        <div className="mx-auto flex max-w-2xl items-center gap-1 overflow-x-auto px-5 py-1.5">
          {desktopNav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-full px-3.5 py-1.5 text-[11px] font-medium uppercase tracking-wider transition-all duration-400 whitespace-nowrap",
                  isActive
                    ? "bg-cherry-fixed text-cherry-dark"
                    : "text-on-surface-variant hover:bg-surface-container-high"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
