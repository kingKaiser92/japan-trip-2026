import type { BlockObjectResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { dateToDayNumber, dayNumberToDate, DATE_TO_LEG } from "./notion-config";

// ─── Types ───────────────────────────────────────────────────

type ActivityCategory = "sightseeing" | "food" | "shopping" | "nightlife" | "transport" | "hotel" | "training" | "experience";
type BookingStatus = "booked" | "pending" | "walk-in" | "no-reservation";
type RecSource = "asif" | "may-ann" | "personal" | null;
type DayRhythm = "packed" | "moderate" | "chill" | "arrival" | "departure";

export interface ParsedActivity {
  id: string;
  time: string;
  isApproximate: boolean;
  name: string;
  category: ActivityCategory;
  notes: string;
  isOptional: boolean;
  mapsQuery?: string;
  bookingStatus?: BookingStatus;
  recSource?: RecSource;
  rating?: string;
  price?: string;
  hours?: string;
  confirmationCode?: string;
}

export interface ParsedTraining {
  type: "run" | "hyrox" | "rest";
  description: string;
  distance?: string;
  location?: string;
  timeWindow?: string;
}

export interface ParsedDay {
  dayNumber: number;
  date: string;
  legSlug: string;
  title: string;
  subtitle: string;
  rhythm: DayRhythm;
  training?: ParsedTraining;
  activities: ParsedActivity[];
}

export interface ParsedActionItem {
  id: string;
  text: string;
  legSlug: string;
  completed: boolean;
}

export interface ParsedAccommodation {
  name: string;
  address: string;
  mapsQuery: string;
  rating?: number;
  highlights?: string[];
}

export interface ParsedLeg {
  slug: string;
  title: string;
  icon: string;
  dates: string;
  startDate: string;
  endDate: string;
  accommodation: ParsedAccommodation;
  dayNumbers: number[];
  days: ParsedDay[];
  actionItems: ParsedActionItem[];
}

// ─── Helpers ─────────────────────────────────────────────────

export function extractPlainText(richText: RichTextItemResponse[]): string {
  return richText.map((t) => t.plain_text).join("");
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 30);
}

function cleanName(raw: string): string {
  return raw
    .replace(/^\*\*/, "").replace(/\*\*$/, "")  // bold markers
    .replace(/^🛍️\s*/, "")                      // shopping emoji
    .replace(/^✅\s*/, "")                       // checkmark
    .replace(/\s*\(optional\)\s*/i, "")          // optional marker
    .replace(/\s*\*(optional)\*\s*/i, "")        // italic optional
    .trim();
}

function inferCategory(name: string, notes: string, sectionContext: string | null): ActivityCategory {
  const lower = (name + " " + notes + " " + (sectionContext || "")).toLowerCase();

  // Section-based
  if (sectionContext) {
    const ctx = sectionContext.toLowerCase();
    if (ctx.includes("nightlife") || ctx.includes("bar")) return "nightlife";
    if (ctx.includes("shopping")) return "shopping";
  }

  // Name-based
  if (/check\s*in|hotel|check\s*out/i.test(name)) return "hotel";
  if (/train|shinkansen|drive to|head to|flight|uber|airport/i.test(name)) return "transport";
  if (/rest|free time|pack|sleep/i.test(name.toLowerCase())) return "hotel";
  if (/🛍️/.test(name) || /kindal|dover street|beams|ragtag|rinkan|2nd street|gotemba|ginza six|shopping/i.test(name)) return "shopping";
  if (/bar |speakeasy|golden gai|nightlife|roppongi hills/i.test(name)) return "nightlife";
  if (/teamlab|onsen|tea ceremony|kimono|geisha|tuna auction|track experience/i.test(name)) return "experience";

  // Notes-based
  if (/temple|shrine|park|crossing|bamboo|philosopher|tower|castle|garden|rooftop|stroll|walk/i.test(lower)) return "sightseeing";
  if (/ramen|sushi|izakaya|yakitori|dinner|lunch|breakfast|market|food|dotonbori|eat|restaurant|cafe/i.test(lower)) return "food";

  return "sightseeing";
}

function inferBookingStatus(notes: string, name: string): BookingStatus | undefined {
  const combined = (name + " " + notes).toLowerCase();
  if (/\bbooked\b|✅|confirmation\s*#/i.test(combined)) return "booked";
  if (/book\s*(tickets|ahead|in advance|well in advance)|reserve ahead|book asap/i.test(combined)) return "pending";
  if (/walk-?in|no reservation/i.test(combined)) return "walk-in";
  return undefined;
}

function inferRecSource(sectionContext: string | null): RecSource | undefined {
  if (!sectionContext) return undefined;
  const lower = sectionContext.toLowerCase();
  if (lower.includes("asif")) return "asif";
  if (lower.includes("may ann")) return "may-ann";
  return undefined;
}

function extractRating(text: string): string | undefined {
  const match = text.match(/(\d+\.\d+)\s*(?:★|stars?)/i);
  return match ? match[1] : undefined;
}

function extractPrice(text: string): string | undefined {
  const match = text.match(/(¥[\d,]+)/);
  return match ? match[1] : undefined;
}

function extractHours(text: string): string | undefined {
  const match = text.match(/(\d{1,2}\s*(?:AM|PM)\s*[–-]\s*\d{1,2}\s*(?:AM|PM))/i);
  return match ? match[1] : undefined;
}

function extractConfirmation(text: string): string | undefined {
  const match = text.match(/(?:confirmation\s*#?\s*)([A-Z0-9]+)/i);
  if (match) return match[1];
  if (/check confirmation email/i.test(text)) return "Check confirmation email";
  return undefined;
}

function inferRhythm(title: string, subtitle: string): DayRhythm {
  const combined = (title + " " + subtitle).toLowerCase();
  if (combined.includes("arrival") || combined.includes("arrive") || combined.includes("land around")) return "arrival";
  if (combined.includes("departure") || combined.includes("fly home") || combined.includes("flight")) return "departure";
  if (combined.includes("packed") || combined.includes("big day")) return "packed";
  if (combined.includes("chill") || combined.includes("no pressure") || combined.includes("ease")) return "chill";
  return "moderate";
}

function parseTrainingFromText(text: string): ParsedTraining | undefined {
  if (!text.trim()) return undefined;

  const type: ParsedTraining["type"] = text.toLowerCase().includes("hyrox") ? "hyrox"
    : text.toLowerCase().includes("rest") ? "rest" : "run";

  const distMatch = text.match(/(\d+[–-]?\d*\s*mi)/i);
  const timeMatch = text.match(/(\d{1,2}[–-]\d{1,2}(?::\d{2})?\s*(?:AM|PM))/i) ||
    text.match(/(morning|afternoon)/i);

  return {
    type,
    description: text.replace(/^\*\*.*?\*\*\s*[—–-]\s*/, "").trim(),
    distance: distMatch?.[1],
    timeWindow: timeMatch?.[1],
  };
}

// ─── Block Parsing ───────────────────────────────────────────

export function parseLegPage(
  blocks: BlockObjectResponse[],
  legSlug: string,
  legTitle: string
): { days: ParsedDay[]; actionItems: ParsedActionItem[]; accommodation: ParsedAccommodation } {
  const days: ParsedDay[] = [];
  const actionItems: ParsedActionItem[] = [];
  let accommodation: ParsedAccommodation = { name: "", address: "", mapsQuery: "" };

  let currentDay: ParsedDay | null = null;
  let sectionContext: string | null = null;
  let recContext: string | null = null;
  let pendingTrainingText: string | null = null;
  let inActionItems = false;
  let activityCounter = 0;

  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];

    // ─── Heading 2: Day boundaries or section markers ───
    if (block.type === "heading_2") {
      const text = extractPlainText(block.heading_2.rich_text);

      // Day heading: "Day 1 — Arrive & Explore (April 15)"
      const dayMatch = text.match(/Day\s*(\d+)\s*[—–-]\s*(.+?)(?:\s*\(([^)]+)\))?$/i);
      if (dayMatch) {
        inActionItems = false;
        sectionContext = null;
        recContext = null;

        const dayNum = parseInt(dayMatch[1], 10);
        const title = dayMatch[2].trim();
        const dateStr = dayMatch[3] || "";

        // Determine global day number from date
        const globalDayNum = dateStr ? dateToDayNumber(dateStr) : dayNum;
        const assignedLeg = DATE_TO_LEG[globalDayNum] || legSlug;

        currentDay = {
          dayNumber: globalDayNum,
          date: dayNumberToDate(globalDayNum),
          legSlug: assignedLeg,
          title,
          subtitle: "",
          rhythm: "moderate",
          activities: [],
        };

        // Attach pending training
        if (pendingTrainingText) {
          currentDay.training = parseTrainingFromText(pendingTrainingText);
          pendingTrainingText = null;
        }

        days.push(currentDay);
        activityCounter = 0;
        continue;
      }

      // Action Items section
      if (/action items|booking/i.test(text)) {
        inActionItems = true;
        currentDay = null;
        sectionContext = null;
        continue;
      }

      // Friend Recs section
      if (/friend rec|asif.*rec|may ann/i.test(text)) {
        recContext = text;
        inActionItems = false;
        continue;
      }

      // Hotel Info section
      if (/hotel|flight|accommodation/i.test(text)) {
        sectionContext = "hotel-info";
        continue;
      }

      // Other h2 sections
      sectionContext = text;
      continue;
    }

    // ─── Heading 3: Sub-section context ───
    if (block.type === "heading_3") {
      const text = extractPlainText(block.heading_3.rich_text);

      // Training option heading
      if (/training|morning run|long run/i.test(text)) {
        // Next blockquote or paragraph has the training details
        continue;
      }

      if (/nightlife|bar/i.test(text)) sectionContext = "nightlife";
      else if (/shopping/i.test(text)) sectionContext = "shopping";
      else if (/sightseeing/i.test(text)) sectionContext = "sightseeing";
      else if (/rec booking|asif/i.test(text)) recContext = text;
      else sectionContext = text;
      continue;
    }

    // ─── Blockquote: Training options ───
    if (block.type === "quote") {
      const text = extractPlainText(block.quote.rich_text);
      if (/run|hyrox|mi\b|km\b|laps?|morning/i.test(text)) {
        pendingTrainingText = text;
      }
      continue;
    }

    // ─── Callout: Sometimes used for training ───
    if (block.type === "callout") {
      const text = extractPlainText(block.callout.rich_text);
      if (/run|hyrox|mi\b|km\b/i.test(text)) {
        pendingTrainingText = text;
      }
      continue;
    }

    // ─── Paragraph: Subtitle (italic after day heading) ───
    if (block.type === "paragraph" && currentDay && currentDay.subtitle === "") {
      const richText = block.paragraph.rich_text;
      if (richText.length > 0) {
        const text = extractPlainText(richText);
        const isItalic = richText[0]?.annotations?.italic;
        if (isItalic || currentDay.activities.length === 0) {
          currentDay.subtitle = text;
          currentDay.rhythm = inferRhythm(currentDay.title, text);
          continue;
        }
      }
    }

    // ─── To-do: Action items ───
    if (block.type === "to_do" && inActionItems) {
      const text = extractPlainText(block.to_do.rich_text);
      if (text.trim()) {
        actionItems.push({
          id: `${legSlug}-${slugify(text)}`,
          text: text.trim(),
          legSlug,
          completed: block.to_do.checked || false,
        });
      }
      continue;
    }

    // ─── Table: Activities, hotel info, or shopping ───
    if (block.type === "table" && block.has_children) {
      // Table rows are in block.children — we'll handle this via the tableRows passed in
      continue;
    }

    // ─── Table Row: Parse activity data ───
    if (block.type === "table_row") {
      const cells = block.table_row.cells.map((cell) =>
        cell.map((t) => t.plain_text).join("")
      );

      // Skip header rows
      if (cells[0]?.toLowerCase() === "time" || cells[0]?.toLowerCase() === "store" ||
          cells[0]?.toLowerCase() === "spot" || cells[0]?.toLowerCase() === "what" ||
          cells[0]?.toLowerCase() === "restaurant" || cells[0]?.toLowerCase() === "" && cells[1]?.toLowerCase() === "details") {
        // Check if this is a hotel info table
        if (cells[1]?.toLowerCase() === "details" || cells[0]?.toLowerCase() === "") {
          sectionContext = "hotel-info-table";
        }
        continue;
      }

      // Hotel info table rows
      if (sectionContext === "hotel-info-table" || sectionContext === "hotel-info") {
        const label = cells[0]?.toLowerCase() || "";
        const value = cells[1] || "";
        if (label.includes("hotel") || label.includes("accommodation")) {
          accommodation.name = value;
          accommodation.mapsQuery = value;
        }
        if (label.includes("address") || label.includes("base area")) {
          accommodation.address = value;
        }
        continue;
      }

      // Activity table rows (Time | Spot | Notes)
      if (currentDay && cells.length >= 3 && cells[0]) {
        const time = cells[0].trim();
        const spot = cells[1]?.trim() || "";
        const notes = cells[2]?.trim() || "";

        // Skip if time doesn't look like a time
        if (!/\d/.test(time) && !time.startsWith("~")) continue;

        const name = cleanName(spot);
        if (!name) continue;

        const effectiveRecSource = recContext ? inferRecSource(recContext) : undefined;

        const activity: ParsedActivity = {
          id: `d${currentDay.dayNumber}-${slugify(name)}-${activityCounter}`,
          time: time.replace(/^\\?~/, "").replace(/^~/, "").trim(),
          isApproximate: time.startsWith("~") || time.startsWith("\\~"),
          name,
          category: inferCategory(name, notes, sectionContext),
          notes,
          isOptional: /optional/i.test(spot) || /optional/i.test(notes),
          mapsQuery: name.length > 3 ? name : undefined,
          bookingStatus: inferBookingStatus(notes, spot),
          recSource: effectiveRecSource,
          rating: extractRating(notes),
          price: extractPrice(notes),
          hours: extractHours(notes),
          confirmationCode: extractConfirmation(notes),
        };

        currentDay.activities.push(activity);
        activityCounter++;
      }

      // Friend rec table rows (Spot | What It Is | Where | Best Fit | Near What)
      if (recContext && cells.length >= 2 && !currentDay) {
        // These are standalone rec tables outside of day context — skip for now
        // They're supplementary and not part of the main timeline
      }

      continue;
    }
  }

  return { days, actionItems, accommodation };
}

// ─── Main Page Parsing ───────────────────────────────────────

export interface ParsedLegEntry {
  dates: string;
  legTitle: string;
  accommodation: string;
  pageId: string;
}

export function parseMainPage(blocks: BlockObjectResponse[]): ParsedLegEntry[] {
  const entries: ParsedLegEntry[] = [];

  for (const block of blocks) {
    if (block.type === "table_row") {
      const cells = block.table_row.cells.map((cell) =>
        cell.map((t) => t.plain_text).join("")
      );

      // Skip header row
      if (cells[0]?.toLowerCase() === "dates") continue;

      // Look for mention-page in rich text
      const linkCell = block.table_row.cells[3]; // Link column
      let pageId = "";
      if (linkCell) {
        for (const item of linkCell) {
          if (item.type === "mention" && item.mention?.type === "page") {
            pageId = item.mention.page.id;
          }
        }
      }

      if (cells[0] && cells[1]) {
        entries.push({
          dates: cells[0].trim(),
          legTitle: cells[1].replace(/\*\*/g, "").trim(),
          accommodation: cells[2]?.trim() || "",
          pageId,
        });
      }
    }
  }

  return entries;
}
