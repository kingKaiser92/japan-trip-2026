import { config } from "dotenv";
import { resolve } from "path";

// Load .env.local from project root
config({ path: resolve(__dirname, "..", ".env.local") });
import { Client } from "@notionhq/client";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { NOTION_PAGES, LEG_META } from "./notion-config";
import { parseLegPage, type ParsedDay, type ParsedActionItem } from "./notion-parser";
import { writeDaysFile, writeLegsFile, writeTripFile, writeActionItemsFile } from "./notion-writer";

const NOTION_API_KEY = process.env.NOTION_API_KEY;

if (!NOTION_API_KEY) {
  console.error("Missing NOTION_API_KEY in .env.local");
  console.error("1. Create an integration at https://www.notion.so/my-integrations");
  console.error('2. Share the "Japan Trip 2026" page with the integration');
  console.error("3. Add NOTION_API_KEY=secret_xxx to .env.local");
  process.exit(1);
}

const notion = new Client({ auth: NOTION_API_KEY });

// ─── Fetch all blocks recursively ────────────────────────────

async function fetchBlocks(blockId: string): Promise<BlockObjectResponse[]> {
  const blocks: BlockObjectResponse[] = [];
  let cursor: string | undefined = undefined;

  do {
    const response = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    });

    for (const block of response.results) {
      const b = block as BlockObjectResponse;
      blocks.push(b);

      // Recursively fetch children (tables, toggle blocks, etc.)
      if (b.has_children && b.type !== "child_page" && b.type !== "child_database") {
        const children = await fetchBlocks(b.id);
        blocks.push(...children);
      }
    }

    cursor = response.has_more ? response.next_cursor ?? undefined : undefined;
  } while (cursor);

  return blocks;
}

// ─── Date range extraction ───────────────────────────────────

function parseDateRange(dates: string): { startDate: string; endDate: string } {
  // "Apr 11–14" → { startDate: "2026-04-11", endDate: "2026-04-14" }
  const match = dates.match(/(\d+)[–-](\d+)/);
  if (match) {
    const start = parseInt(match[1], 10);
    const end = parseInt(match[2], 10);
    return {
      startDate: `2026-04-${start.toString().padStart(2, "0")}`,
      endDate: `2026-04-${end.toString().padStart(2, "0")}`,
    };
  }
  return { startDate: "2026-04-11", endDate: "2026-04-23" };
}

// ─── Main ────────────────────────────────────────────────────

async function main() {
  console.log("🇯🇵 Syncing Japan Trip 2026 from Notion...\n");

  const allDays: ParsedDay[] = [];
  const allActionItems: ParsedActionItem[] = [];
  const legData: {
    slug: string;
    title: string;
    icon: string;
    dates: string;
    startDate: string;
    endDate: string;
    accommodation: { name: string; address: string; mapsQuery: string; rating?: number; highlights?: string[] };
    dayNumbers: number[];
  }[] = [];

  // Process each leg page
  for (const [slug, pageId] of Object.entries(NOTION_PAGES.legs)) {
    const meta = LEG_META[pageId];
    if (!meta) {
      console.warn(`  ⚠ No metadata for page ${pageId}, skipping`);
      continue;
    }

    console.log(`  Fetching ${meta.icon} ${meta.title}...`);
    const blocks = await fetchBlocks(pageId);
    console.log(`    → ${blocks.length} blocks`);

    const result = parseLegPage(blocks, slug, meta.title);
    console.log(`    → ${result.days.length} days, ${result.days.reduce((n, d) => n + d.activities.length, 0)} activities, ${result.actionItems.length} action items`);

    allDays.push(...result.days);
    allActionItems.push(...result.actionItems);

    // Build leg entry
    const dayNumbers = result.days.map((d) => d.dayNumber);
    const datesMap: Record<string, string> = {
      "tokyo-1": "Apr 11–14",
      "fuji": "Apr 14–15",
      "kyoto": "Apr 15–20",
      "tokyo-ginza": "Apr 20–23",
    };

    legData.push({
      slug,
      title: meta.title,
      icon: meta.icon,
      dates: datesMap[slug] || "",
      ...parseDateRange(datesMap[slug] || ""),
      accommodation: result.accommodation.name
        ? result.accommodation
        : { name: meta.title, address: "", mapsQuery: meta.title },
      dayNumbers: dayNumbers.length > 0 ? dayNumbers : [],
    });
  }

  // Deduplicate days (some days appear in multiple legs)
  const dayMap = new Map<number, ParsedDay>();
  for (const day of allDays) {
    const existing = dayMap.get(day.dayNumber);
    if (!existing || day.activities.length > (existing.activities.length)) {
      dayMap.set(day.dayNumber, day);
    } else if (existing && day.activities.length > 0) {
      // Merge activities from overlapping leg
      for (const act of day.activities) {
        if (!existing.activities.find((a) => a.name === act.name)) {
          existing.activities.push(act);
        }
      }
    }
  }

  const finalDays = Array.from(dayMap.values()).sort((a, b) => a.dayNumber - b.dayNumber);

  // Write files
  console.log("\n  Writing data files...");

  writeTripFile();
  console.log("    ✓ src/data/trip.ts");

  writeLegsFile(legData);
  console.log("    ✓ src/data/legs.ts");

  writeDaysFile(finalDays);
  console.log("    ✓ src/data/days.ts");

  writeActionItemsFile(allActionItems);
  console.log("    ✓ src/data/actionItems.ts");

  // Summary
  const totalActivities = finalDays.reduce((n, d) => n + d.activities.length, 0);
  console.log(`\n✅ Synced: ${finalDays.length} days, ${totalActivities} activities, ${allActionItems.length} action items\n`);
}

main().catch((err) => {
  console.error("Sync failed:", err);
  process.exit(1);
});
