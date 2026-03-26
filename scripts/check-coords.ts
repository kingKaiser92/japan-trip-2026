/**
 * Validates that every food spot, shop, and Notion rec has matching
 * coordinates in coordinates.ts. Run with: npx tsx scripts/check-coords.ts
 *
 * Exits with code 1 if any items are missing coords.
 */

import { foodSpots } from "../src/data/restaurants";
import { shops } from "../src/data/shops";
import { notionRecs } from "../src/data/notionRecs";
import { getCoords } from "../src/data/coordinates";

interface MissingItem {
  name: string;
  mapsQuery: string;
  source: string;
}

const missing: MissingItem[] = [];
const seen = new Set<string>();

function check(name: string, mapsQuery: string, source: string) {
  const key = name.toLowerCase();
  if (seen.has(key)) return;
  seen.add(key);

  if (!getCoords(name) && !getCoords(mapsQuery)) {
    missing.push({ name, mapsQuery, source });
  }
}

// Check all data sources
for (const s of foodSpots) check(s.name, s.mapsQuery, "foodSpots");
for (const s of shops) check(s.name, s.mapsQuery, "shops");
for (const r of notionRecs) check(r.name, r.mapsQuery, "notionRecs");

if (missing.length === 0) {
  console.log("✓ All items have matching coordinates.");
  process.exit(0);
} else {
  console.error(`✗ ${missing.length} item(s) missing coordinates:\n`);
  for (const item of missing) {
    console.error(`  [${item.source}] ${item.name}`);
    console.error(`    mapsQuery: "${item.mapsQuery}"\n`);
  }
  process.exit(1);
}
