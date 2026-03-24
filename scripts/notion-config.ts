export const NOTION_PAGES = {
  main: "30043cc4722d803eb3f2edddcfab10b6",
  legs: {
    "tokyo-1": "32743cc4722d81cbb634dff277627201",
    "fuji": "32743cc4722d810e9c40eea341d33ebc",
    "kyoto": "32743cc4722d81cea373e97fb6bfb917",
    "tokyo-ginza": "32743cc4722d815f9a87e437a61fed63",
  },
} as const;

export const LEG_META: Record<string, { slug: string; icon: string; title: string }> = {
  "32743cc4722d81cbb634dff277627201": { slug: "tokyo-1", icon: "🗼", title: "Tokyo First Leg" },
  "32743cc4722d810e9c40eea341d33ebc": { slug: "fuji", icon: "🏎️", title: "Fuji Speedway Overnight" },
  "32743cc4722d81cea373e97fb6bfb917": { slug: "kyoto", icon: "⛩️", title: "Kyoto" },
  "32743cc4722d815f9a87e437a61fed63": { slug: "tokyo-ginza", icon: "💫", title: "Tokyo Ginza Final Leg" },
};

// Date-to-day-number mapping (April 11 = Day 1, April 23 = Day 13)
export function dateToDayNumber(dateStr: string): number {
  // dateStr like "April 11" or "Apr 11"
  const match = dateStr.match(/(\d+)/);
  if (!match) return 0;
  const day = parseInt(match[0], 10);
  return day - 10; // April 11 = day 1, April 12 = day 2, etc.
}

export function dayNumberToDate(dayNumber: number): string {
  const day = dayNumber + 10;
  return `2026-04-${day.toString().padStart(2, "0")}`;
}

// Which leg does a given date primarily belong to?
export const DATE_TO_LEG: Record<number, string> = {
  1: "tokyo-1",
  2: "tokyo-1",
  3: "tokyo-1",
  4: "tokyo-1",   // Day 4 has activities in both tokyo-1 and fuji
  5: "fuji",      // Day 5 transitions fuji→kyoto
  6: "kyoto",
  7: "kyoto",
  8: "kyoto",
  9: "kyoto",
  10: "kyoto",    // Day 10 transitions kyoto→tokyo-ginza
  11: "tokyo-ginza",
  12: "tokyo-ginza",
  13: "tokyo-ginza",
};
