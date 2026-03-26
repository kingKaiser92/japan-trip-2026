import { notFound } from "next/navigation";
import Link from "next/link";
import { legs } from "@/data/legs";
import { days } from "@/data/days";
import { formatDate } from "@/lib/dates";
import { ChevronRight, Train, Info } from "lucide-react";
import { MapLink } from "@/components/shared/MapLink";
import { RhythmIndicator } from "@/components/shared/RhythmIndicator";
import { LegMiniMap } from "@/components/trip/LegMiniMap";

const transportInfo: Record<string, string[]> = {
  "tokyo-1": ["Suica / Pasmo IC Card", "JR Yamanote Line", "Tokyo Metro", "Walking (Harajuku–Shibuya)"],
  "fuji": ["Hotel shuttle", "Rental car option", "Gotemba bus"],
  "kyoto": ["Kyoto Bus Day Pass", "JR Nara Line", "Hankyu Railway to Osaka", "Walking (Gion–Higashiyama)"],
  "tokyo-ginza": ["Suica / Pasmo IC Card", "Ginza Line", "Hibiya Line", "Narita/Haneda Express"],
};

const regionalTips: Record<string, string[]> = {
  "tokyo-1": [
    "Convenience stores (7-Eleven, Lawson) have ATMs that accept foreign cards.",
    "Trains stop around midnight — plan nightlife exits accordingly.",
    "Tipping is not expected and can be considered rude.",
  ],
  "fuji": [
    "Ear protection recommended at Fuji Speedway if attending events.",
    "Weather can be significantly cooler near Mt. Fuji — bring layers.",
    "Gotemba Outlets close early — arrive by 2 PM for best shopping.",
  ],
  "kyoto": [
    "No photos of Maiko/Geisha without permission in Gion.",
    "Fushimi Inari is best visited early morning (before 8 AM) to avoid crowds.",
    "Many temples close by 5 PM — plan sightseeing for mornings.",
    "Nishiki Market stalls start closing around 5-6 PM.",
  ],
  "tokyo-ginza": [
    "Ginza shops open later (11 AM–noon) — plan mornings for Tsukiji/Toyosu.",
    "Many high-end restaurants require reservations days in advance.",
    "Last day: Haneda is closer than Narita — confirm your terminal.",
  ],
};

export function generateStaticParams() {
  return legs.map((leg) => ({ legSlug: leg.slug }));
}

export default async function LegPage({ params }: { params: Promise<{ legSlug: string }> }) {
  const { legSlug } = await params;
  const leg = legs.find((l) => l.slug === legSlug);

  if (!leg) return notFound();

  const legDays = days.filter((d) => d.legSlug === legSlug);

  return (
    <div className="space-y-14">
      {/* Leg header — editorial */}
      <div className="space-y-4 pt-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          {leg.dates}
        </p>
        <div className="flex items-center gap-4">
          <span className="text-4xl">{leg.icon}</span>
          <h1 className="font-serif text-3xl font-semibold tracking-tight text-on-surface">
            {leg.title}
          </h1>
        </div>
      </div>

      {/* Accommodation */}
      <div className="rounded-xl bg-surface-container-lowest p-6 space-y-3">
        <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          Accommodation
        </p>
        <p className="font-serif text-lg font-medium text-on-surface">
          {leg.accommodation.name}
        </p>
        <p className="text-sm text-on-surface-variant">
          {leg.accommodation.address}
        </p>
        <MapLink query={leg.accommodation.mapsQuery} />
        {leg.accommodation.highlights && (
          <div className="flex flex-wrap gap-2 pt-1">
            {leg.accommodation.highlights.map((h) => (
              <span
                key={h}
                className="inline-block rounded-full bg-surface-container-high px-3 py-1 text-[11px] text-on-surface-variant"
              >
                {h}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Mini map */}
      <LegMiniMap legDays={legDays} />

      {/* Transport quick-links */}
      {transportInfo[legSlug] && (
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Train className="h-4 w-4 text-on-surface-variant" />
            <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
              Getting Around
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {transportInfo[legSlug].map((t) => (
              <span
                key={t}
                className="inline-block rounded-full bg-surface-container-lowest px-3.5 py-1.5 text-[11px] font-medium text-on-surface-variant ghost-border"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Regional tips */}
      {regionalTips[legSlug] && (
        <div className="rounded-xl bg-surface-container-low p-5 space-y-2.5">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-on-surface-variant" />
            <p className="text-[11px] uppercase tracking-[0.2em] font-medium text-on-surface">
              Local Tips
            </p>
          </div>
          <ul className="space-y-1.5">
            {regionalTips[legSlug].map((tip, i) => (
              <li key={i} className="text-sm text-on-surface-variant leading-relaxed">
                {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Days list */}
      <div className="space-y-6">
        <h2 className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          Daily Schedule
        </h2>
        <div className="space-y-3">
          {legDays.map((day) => (
            <Link
              key={day.dayNumber}
              href={`/day/${day.dayNumber}`}
              className="group flex items-start gap-4 rounded-xl bg-surface-container-lowest p-5 transition-all duration-400 hover:shadow-ambient"
            >
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-low font-serif font-semibold text-on-surface">
                {day.dayNumber}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2.5">
                  <span className="font-serif font-medium text-on-surface">
                    {day.title}
                  </span>
                  <RhythmIndicator rhythm={day.rhythm} />
                </div>
                <p className="text-[11px] uppercase tracking-[0.15em] text-on-surface-variant mt-0.5">
                  {formatDate(day.date)} &middot; {day.activities.length} activities
                </p>
                <p className="mt-2 text-sm text-on-surface-variant leading-relaxed line-clamp-2">
                  {day.subtitle}
                </p>
              </div>
              <ChevronRight className="h-4 w-4 text-on-surface-variant/20 group-hover:text-on-surface-variant/50 transition-colors duration-400 shrink-0 mt-1" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
