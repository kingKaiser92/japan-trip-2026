"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarDays, Utensils, ShoppingBag, CheckSquare, BookOpen, Dumbbell, MapPin, Ticket } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrentDay } from "@/hooks/useCurrentDay";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/day/1", icon: CalendarDays, label: "Today", isDynamic: true },
  { href: "/food", icon: Utensils, label: "Food" },
  { href: "/shopping", icon: ShoppingBag, label: "Shop" },
  { href: "/checklist", icon: CheckSquare, label: "List" },
  { href: "/map", icon: MapPin, label: "Map" },
  { href: "/training", icon: Dumbbell, label: "Train" },
  { href: "/essentials", icon: BookOpen, label: "Essentials" },
  { href: "/bookings", icon: Ticket, label: "Bookings" },
];

export function MobileNav() {
  const pathname = usePathname();
  const currentDay = useCurrentDay();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass md:hidden">
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const href = item.isDynamic ? `/day/${currentDay || 1}` : item.href;
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
                isActive
                  ? "text-on-surface"
                  : "text-on-surface-variant"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "text-cherry-dim")} />
              <span>{item.isDynamic && currentDay ? "Today" : item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
