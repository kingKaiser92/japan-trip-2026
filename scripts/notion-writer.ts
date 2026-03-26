import { writeFileSync } from "fs";
import { join } from "path";
import type { ParsedDay, ParsedActivity, ParsedTraining, ParsedActionItem, ParsedAccommodation, ParsedRecommendation } from "./notion-parser";

const DATA_DIR = join(__dirname, "..", "src", "data");

function esc(s: string): string {
  return s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n");
}

function optField(key: string, val: string | number | boolean | undefined): string {
  if (val === undefined || val === null) return "";
  if (typeof val === "boolean") return `    ${key}: ${val},\n`;
  if (typeof val === "number") return `    ${key}: ${val},\n`;
  return `    ${key}: "${esc(String(val))}",\n`;
}

function formatActivity(a: ParsedActivity): string {
  let s = "      {\n";
  s += `        id: "${esc(a.id)}",\n`;
  s += `        time: "${esc(a.time)}",\n`;
  s += `        isApproximate: ${a.isApproximate},\n`;
  s += `        name: "${esc(a.name)}",\n`;
  s += `        category: "${a.category}",\n`;
  s += `        notes: "${esc(a.notes)}",\n`;
  s += `        isOptional: ${a.isOptional},\n`;
  if (a.mapsQuery) s += `        mapsQuery: "${esc(a.mapsQuery)}",\n`;
  if (a.bookingStatus) s += `        bookingStatus: "${a.bookingStatus}",\n`;
  if (a.recSource) s += `        recSource: "${a.recSource}",\n`;
  if (a.rating) s += `        rating: "${esc(a.rating)}",\n`;
  if (a.price) s += `        price: "${esc(a.price)}",\n`;
  if (a.hours) s += `        hours: "${esc(a.hours)}",\n`;
  if (a.confirmationCode) s += `        confirmationCode: "${esc(a.confirmationCode)}",\n`;
  s += "      }";
  return s;
}

function formatTraining(t: ParsedTraining): string {
  let s = "    training: {\n";
  s += `      type: "${t.type}",\n`;
  s += `      description: "${esc(t.description)}",\n`;
  if (t.distance) s += `      distance: "${esc(t.distance)}",\n`;
  if (t.location) s += `      location: "${esc(t.location)}",\n`;
  if (t.timeWindow) s += `      timeWindow: "${esc(t.timeWindow)}",\n`;
  s += "    },\n";
  return s;
}

function formatDay(d: ParsedDay): string {
  let s = "  {\n";
  s += `    dayNumber: ${d.dayNumber},\n`;
  s += `    date: "${d.date}",\n`;
  s += `    legSlug: "${d.legSlug}",\n`;
  s += `    title: "${esc(d.title)}",\n`;
  s += `    subtitle: "${esc(d.subtitle)}",\n`;
  s += `    rhythm: "${d.rhythm}",\n`;
  if (d.training) s += formatTraining(d.training);
  s += "    activities: [\n";
  s += d.activities.map(formatActivity).join(",\n");
  s += "\n    ],\n";
  s += "  }";
  return s;
}

export function writeDaysFile(days: ParsedDay[]): void {
  // Sort by day number
  days.sort((a, b) => a.dayNumber - b.dayNumber);

  let content = 'import { TripDay } from "./types";\n\n';
  content += "export const days: TripDay[] = [\n";
  content += days.map(formatDay).join(",\n");
  content += "\n];\n";

  writeFileSync(join(DATA_DIR, "days.ts"), content, "utf-8");
}

export function writeLegsFile(legs: {
  slug: string;
  title: string;
  icon: string;
  dates: string;
  startDate: string;
  endDate: string;
  accommodation: ParsedAccommodation;
  dayNumbers: number[];
}[]): void {
  let content = 'import { TripLeg } from "./types";\n\n';
  content += "export const legs: TripLeg[] = [\n";

  for (const leg of legs) {
    content += "  {\n";
    content += `    slug: "${leg.slug}",\n`;
    content += `    title: "${esc(leg.title)}",\n`;
    content += `    icon: "${leg.icon}",\n`;
    content += `    dates: "${esc(leg.dates)}",\n`;
    content += `    startDate: "${leg.startDate}",\n`;
    content += `    endDate: "${leg.endDate}",\n`;
    content += "    accommodation: {\n";
    content += `      name: "${esc(leg.accommodation.name)}",\n`;
    content += `      address: "${esc(leg.accommodation.address)}",\n`;
    content += `      mapsQuery: "${esc(leg.accommodation.mapsQuery)}",\n`;
    if (leg.accommodation.rating) content += `      rating: ${leg.accommodation.rating},\n`;
    if (leg.accommodation.highlights) {
      content += `      highlights: [${leg.accommodation.highlights.map((h) => `"${esc(h)}"`).join(", ")}],\n`;
    }
    content += "    },\n";
    content += `    dayNumbers: [${leg.dayNumbers.join(", ")}],\n`;
    content += "  },\n";
  }

  content += "];\n";
  writeFileSync(join(DATA_DIR, "legs.ts"), content, "utf-8");
}

export function writeTripFile(): void {
  const content = `import { TripMeta } from "./types";

export const trip: TripMeta = {
  title: "Japan Trip 2026",
  startDate: "2026-04-11",
  endDate: "2026-04-23",
  group: "Shadman + crew",
  totalDays: 13,
};
`;
  writeFileSync(join(DATA_DIR, "trip.ts"), content, "utf-8");
}

export function writeActionItemsFile(items: ParsedActionItem[]): void {
  let content = 'import { ActionItem } from "./types";\n\n';
  content += "export const actionItems: ActionItem[] = [\n";

  for (const item of items) {
    content += "  {\n";
    content += `    id: "${esc(item.id)}",\n`;
    content += `    text: "${esc(item.text)}",\n`;
    content += `    legSlug: "${item.legSlug}",\n`;
    content += `    completed: ${item.completed},\n`;
    content += "  },\n";
  }

  content += "];\n";
  writeFileSync(join(DATA_DIR, "actionItems.ts"), content, "utf-8");
}

export function writeRecommendationsFile(recs: ParsedRecommendation[]): void {
  // Deduplicate by normalized name (strip parentheticals, emojis, extra whitespace)
  const seen = new Set<string>();
  const unique = recs.filter((r) => {
    const key = r.name
      .toLowerCase()
      .replace(/\s*\([^)]*\)\s*/g, "")  // strip (Day 3), (Osaka), etc.
      .replace(/[^\w\s]/g, "")           // strip special chars
      .replace(/\s+/g, " ")
      .trim();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  let content = '// Auto-generated from Notion sync — do not edit manually\n';
  content += 'import type { FoodSpot, RecSource } from "./restaurants";\n\n';
  content += "export interface NotionRec {\n";
  content += "  id: string;\n";
  content += "  name: string;\n";
  content += "  description: string;\n";
  content += "  location: string;\n";
  content += "  neighborhood: string;\n";
  content += "  hours: string;\n";
  content += "  legSlug: string;\n";
  content += '  category: "restaurant" | "cafe" | "bar" | "street-food" | "shop" | "experience";\n';
  content += "  cuisine?: string;\n";
  content += "  recSource: RecSource;\n";
  content += "  mapsQuery: string;\n";
  content += "  bestFor?: string;\n";
  content += "  nearWhat?: string;\n";
  content += "}\n\n";
  content += "export const notionRecs: NotionRec[] = [\n";

  for (const rec of unique) {
    content += "  {\n";
    content += `    id: "${esc(rec.id)}",\n`;
    content += `    name: "${esc(rec.name)}",\n`;
    content += `    description: "${esc(rec.description)}",\n`;
    content += `    location: "${esc(rec.location)}",\n`;
    content += `    neighborhood: "${esc(rec.neighborhood)}",\n`;
    content += `    hours: "Check hours",\n`;
    content += `    legSlug: "${esc(rec.legSlug)}",\n`;
    content += `    category: "${rec.category}",\n`;
    if (rec.cuisine) content += `    cuisine: "${esc(rec.cuisine)}",\n`;
    content += `    recSource: "${rec.recSource}",\n`;
    content += `    mapsQuery: "${esc(rec.mapsQuery)}",\n`;
    if (rec.bestFor) content += `    bestFor: "${esc(rec.bestFor)}",\n`;
    if (rec.nearWhat) content += `    nearWhat: "${esc(rec.nearWhat)}",\n`;
    content += "  },\n";
  }

  content += "];\n\n";

  // Helper to convert NotionRec to FoodSpot format for merging
  content += "/** Convert Notion recs to FoodSpot format for unified display */\n";
  content += "export function recsAsFoodSpots(): FoodSpot[] {\n";
  content += '  return notionRecs\n';
  content += '    .filter((r) => r.category !== "shop" && r.category !== "experience")\n';
  content += "    .map((r) => ({\n";
  content += "      id: r.id,\n";
  content += "      name: r.name,\n";
  content += "      description: r.description,\n";
  content += "      location: r.location,\n";
  content += "      neighborhood: r.neighborhood,\n";
  content += "      hours: r.hours,\n";
  content += "      legSlug: r.legSlug,\n";
  content += '      category: r.category as FoodSpot["category"],\n';
  content += "      recSource: r.recSource,\n";
  content += "      mapsQuery: r.mapsQuery,\n";
  content += "      cuisine: r.cuisine,\n";
  content += "    }));\n";
  content += "}\n";

  writeFileSync(join(DATA_DIR, "notionRecs.ts"), content, "utf-8");
}
