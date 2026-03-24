/**
 * Parses a human-readable hours string and checks if a place
 * is currently open based on Japan Standard Time (UTC+9).
 *
 * Handles formats like:
 *   "11 AM–8 PM"
 *   "10:30 AM–8:30 PM"
 *   "Noon–8 PM"
 *   "Opens 6:30 AM"
 *   "Opens 10 AM"
 *   "Open 24 hours"
 *   "5 PM–1 AM"  (wraps past midnight)
 *
 * Returns null if the hours string can't be parsed (e.g. "Check hours", "Varies").
 */

function parseTime(str: string): number | null {
  const s = str.trim().toLowerCase();

  if (s === "noon" || s === "12 pm") return 12;
  if (s === "midnight" || s === "12 am") return 0;

  // Match patterns like "6:30 AM", "11 AM", "10:30 PM"
  const match = s.match(/^(\d{1,2})(?::(\d{2}))?\s*(am|pm)$/);
  if (!match) return null;

  let hours = parseInt(match[1], 10);
  const minutes = match[2] ? parseInt(match[2], 10) : 0;
  const period = match[3];

  if (period === "pm" && hours !== 12) hours += 12;
  if (period === "am" && hours === 12) hours = 0;

  return hours + minutes / 60;
}

export type OpenStatus = "open" | "closed" | "unknown";

export function getOpenStatus(hoursStr: string): OpenStatus {
  if (!hoursStr) return "unknown";

  const h = hoursStr.toLowerCase().trim();

  // Can't parse
  if (
    h.includes("check") ||
    h.includes("varies") ||
    h.includes("tba") ||
    h === ""
  ) {
    return "unknown";
  }

  // Open 24 hours
  if (h.includes("24 hour")) return "open";

  // Get current JST time
  const now = new Date();
  const jstOffset = 9 * 60; // JST is UTC+9
  const utcMinutes = now.getUTCHours() * 60 + now.getUTCMinutes();
  const jstMinutes = utcMinutes + jstOffset;
  const jstHour = ((jstMinutes / 60) % 24 + 24) % 24;

  // "Opens X AM/PM" — assume closes late
  const opensMatch = h.match(/opens?\s+(.+)/i);
  if (opensMatch) {
    const openTime = parseTime(opensMatch[1]);
    if (openTime !== null) {
      return jstHour >= openTime ? "open" : "closed";
    }
    return "unknown";
  }

  // Range: "X AM–Y PM" or "X AM - Y PM"
  const parts = hoursStr.split(/[–\-—]/);
  if (parts.length === 2) {
    // Handle "Noon" replacement
    const openStr = parts[0].trim().replace(/^noon$/i, "12 PM");
    const closeStr = parts[1].trim().replace(/^noon$/i, "12 PM");

    // Handle weekend hours in parens: "Noon–8 PM (11 AM weekends)"
    const cleanClose = closeStr.replace(/\s*\(.*\)/, "").trim();

    const openTime = parseTime(openStr);
    const closeTime = parseTime(cleanClose);

    if (openTime !== null && closeTime !== null) {
      if (closeTime > openTime) {
        // Normal hours (e.g. 11 AM – 8 PM)
        return jstHour >= openTime && jstHour < closeTime ? "open" : "closed";
      } else {
        // Wraps past midnight (e.g. 5 PM – 1 AM, 10 PM – 4 AM)
        return jstHour >= openTime || jstHour < closeTime ? "open" : "closed";
      }
    }
  }

  return "unknown";
}
