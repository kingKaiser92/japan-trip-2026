"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, CalendarDays, Utensils, ShoppingBag, CheckSquare } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCurrentDay } from "@/hooks/useCurrentDay";

const navItems = [
  { href: "/", icon: Home, label: "Home" },
  { href: "/day/1", icon: CalendarDays, label: "Today", isDynamic: true },
  { href: "/food", icon: Utensils, label: "Food" },
  { href: "/shopping", icon: ShoppingBag, label: "Shop" },
  { href: "/checklist", icon: CheckSquare, label: "List" },
];

export function MobileNav() {
  const pathname = usePathname();
  const currentDay = useCurrentDay();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-gray-200 bg-white/95 backdrop-blur-sm dark:border-gray-800 dark:bg-gray-950/95 md:hidden">
      <div className="flex items-center justify-around px-2 py-1">
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
                "flex flex-col items-center gap-0.5 px-3 py-2 text-xs transition-colors",
                isActive
                  ? "text-red-600 dark:text-red-400"
                  : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
              )}
            >
              <Icon className="h-5 w-5" />
              <span>{item.isDynamic && currentDay ? "Today" : item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
