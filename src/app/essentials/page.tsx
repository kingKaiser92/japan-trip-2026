import { legs } from "@/data/legs";
import { MapLink } from "@/components/shared/MapLink";
import {
  Hotel,
  Train,
  Banknote,
  MessageCircle,
  ShieldAlert,
  Wifi,
  Plane,
  Car,
} from "lucide-react";

const phrases = [
  { japanese: "Sumimasen", english: "Excuse me / Sorry" },
  { japanese: "Arigatou gozaimasu", english: "Thank you (formal)" },
  { japanese: "Eigo o hanasemasu ka?", english: "Do you speak English?" },
  { japanese: "Ikura desu ka?", english: "How much is this?" },
  { japanese: "Oishii", english: "Delicious!" },
  { japanese: "Kanpai!", english: "Cheers!" },
  { japanese: "Onegaishimasu", english: "Please (when requesting)" },
  { japanese: "Kore kudasai", english: "This one, please" },
];

export default function EssentialsPage() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="space-y-3 pt-4">
        <p className="text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          Quick Reference
        </p>
        <h1 className="font-serif text-3xl font-semibold tracking-tight text-on-surface">
          Essentials
        </h1>
        <p className="text-base text-on-surface-variant leading-relaxed max-w-sm">
          Everything you need at a glance — hotels, transport, money tips, and
          useful phrases.
        </p>
      </div>

      {/* Hotels & Addresses */}
      <div className="space-y-4">
        <h2 className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          <Hotel className="h-3.5 w-3.5" /> Hotels &amp; Addresses
        </h2>
        <div className="space-y-2">
          {legs.map((leg) => (
            <div
              key={leg.slug}
              className="rounded-xl bg-surface-container-lowest p-4 transition-all duration-400 hover:shadow-ambient"
            >
              <div className="flex items-start gap-3">
                <span className="text-xl mt-0.5 shrink-0">{leg.icon}</span>
                <div className="flex-1 min-w-0 space-y-1.5">
                  <div>
                    <div className="font-serif font-medium text-on-surface text-[15px]">
                      {leg.accommodation.name}
                    </div>
                    <div className="mt-0.5 text-[11px] uppercase tracking-[0.15em] text-on-surface-variant">
                      {leg.dates} &middot; {leg.title}
                    </div>
                  </div>
                  {leg.accommodation.address && (
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {leg.accommodation.address}
                    </p>
                  )}
                  <MapLink query={leg.accommodation.mapsQuery} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Transport */}
      <div className="space-y-4">
        <h2 className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          <Train className="h-3.5 w-3.5" /> Transport
        </h2>
        <div className="space-y-2">
          {/* IC Cards */}
          <div className="rounded-xl bg-surface-container-lowest p-4 transition-all duration-400 hover:shadow-ambient">
            <div className="flex items-start gap-3">
              <Train className="h-4 w-4 mt-1 shrink-0 text-on-surface-variant" />
              <div className="flex-1 min-w-0 space-y-1">
                <div className="font-serif font-medium text-on-surface text-[15px]">
                  Suica / Pasmo IC Cards
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Rechargeable transit cards for trains, buses, and konbini
                  purchases. Load at any station kiosk.
                </p>
              </div>
            </div>
          </div>

          {/* Haneda */}
          <div className="rounded-xl bg-surface-container-lowest p-4 transition-all duration-400 hover:shadow-ambient">
            <div className="flex items-start gap-3">
              <Plane className="h-4 w-4 mt-1 shrink-0 text-on-surface-variant" />
              <div className="flex-1 min-w-0 space-y-1">
                <div className="font-serif font-medium text-on-surface text-[15px]">
                  Haneda Airport (HND)
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Arrival and departure airport. Connected to central Tokyo via
                  Keikyu Line and Tokyo Monorail.
                </p>
                <MapLink query="Haneda Airport HND" />
              </div>
            </div>
          </div>

          {/* Shinkansen Mishima to Kyoto */}
          <div className="rounded-xl bg-surface-container-lowest p-4 transition-all duration-400 hover:shadow-ambient">
            <div className="flex items-start gap-3">
              <Train className="h-4 w-4 mt-1 shrink-0 text-on-surface-variant" />
              <div className="flex-1 min-w-0 space-y-1">
                <div className="font-serif font-medium text-on-surface text-[15px]">
                  Shinkansen: Mishima → Kyoto
                </div>
                <div className="mt-0.5 text-[11px] uppercase tracking-[0.15em] text-on-surface-variant">
                  Departure 12:55 PM
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Bullet train from Mishima Station to Kyoto Station.
                </p>
                <MapLink query="Mishima Station Shinkansen" />
              </div>
            </div>
          </div>

          {/* Shinkansen Kyoto to Tokyo */}
          <div className="rounded-xl bg-surface-container-lowest p-4 transition-all duration-400 hover:shadow-ambient">
            <div className="flex items-start gap-3">
              <Train className="h-4 w-4 mt-1 shrink-0 text-on-surface-variant" />
              <div className="flex-1 min-w-0 space-y-1">
                <div className="font-serif font-medium text-on-surface text-[15px]">
                  Shinkansen: Kyoto → Tokyo
                </div>
                <div className="mt-0.5 text-[11px] uppercase tracking-[0.15em] text-on-surface-variant">
                  Nozomi 252 &middot; 12:30 PM &middot; Ref# EAY107828
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  Return bullet train from Kyoto Station to Tokyo Station.
                </p>
                <MapLink query="Kyoto Station Shinkansen" />
              </div>
            </div>
          </div>

          {/* Car Rental */}
          <div className="rounded-xl bg-surface-container-lowest p-4 transition-all duration-400 hover:shadow-ambient">
            <div className="flex items-start gap-3">
              <Car className="h-4 w-4 mt-1 shrink-0 text-on-surface-variant" />
              <div className="flex-1 min-w-0 space-y-1.5">
                <div className="font-serif font-medium text-on-surface text-[15px]">
                  Car Rental
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    <span className="text-on-surface font-medium">Pickup:</span>{" "}
                    2-chome-26-2 Nishinippori
                  </p>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    <span className="text-on-surface font-medium">Return:</span>{" "}
                    Toyota Rent a Car Gotemba
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <MapLink query="2-chome-26-2 Nishinippori" />
                  <MapLink query="Toyota Rent a Car Gotemba" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Money Tips */}
      <div className="space-y-4">
        <h2 className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          <Banknote className="h-3.5 w-3.5" /> Money Tips
        </h2>
        <div className="space-y-2">
          <div className="rounded-xl bg-surface-container-lowest p-4 space-y-3">
            {[
              {
                title: "Tax-Free Shopping",
                desc: "Show your passport at participating stores. Minimum purchase of \u00a55,000 per store for tax exemption.",
              },
              {
                title: "Cash is King",
                desc: "Many izakayas, ramen shops, and smaller stores are cash only. Withdraw yen at 7-Eleven or post office ATMs.",
              },
              {
                title: "Coins for Vending Machines",
                desc: "Bring \u00a5100 coins — vending machines are everywhere and not all accept IC cards.",
              },
            ].map((tip) => (
              <div key={tip.title} className="space-y-0.5">
                <div className="font-serif font-medium text-on-surface text-[15px]">
                  {tip.title}
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed">
                  {tip.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Useful Japanese Phrases */}
      <div className="space-y-4">
        <h2 className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          <MessageCircle className="h-3.5 w-3.5" /> Useful Japanese Phrases
        </h2>
        <div className="rounded-xl bg-surface-container-lowest p-4">
          <div className="space-y-3">
            {phrases.map((p) => (
              <div key={p.japanese} className="flex items-baseline justify-between gap-4">
                <div className="font-serif font-medium text-on-surface text-[15px]">
                  {p.japanese}
                </div>
                <div className="text-sm text-on-surface-variant text-right shrink-0">
                  {p.english}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Emergency Info */}
      <div className="space-y-4">
        <h2 className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          <ShieldAlert className="h-3.5 w-3.5" /> Emergency Info
        </h2>
        <div className="rounded-xl bg-surface-container-lowest p-4 space-y-3">
          <div className="flex items-baseline justify-between gap-4">
            <div className="font-serif font-medium text-on-surface text-[15px]">
              Police
            </div>
            <a
              href="tel:110"
              className="text-sm text-on-surface-variant hover:text-on-surface border-b border-cherry/40 pb-0.5"
            >
              110
            </a>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <div className="font-serif font-medium text-on-surface text-[15px]">
              Ambulance / Fire
            </div>
            <a
              href="tel:119"
              className="text-sm text-on-surface-variant hover:text-on-surface border-b border-cherry/40 pb-0.5"
            >
              119
            </a>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <div className="font-serif font-medium text-on-surface text-[15px]">
              US Embassy Tokyo
            </div>
            <a
              href="tel:+81332245000"
              className="text-sm text-on-surface-variant hover:text-on-surface border-b border-cherry/40 pb-0.5"
            >
              03-3224-5000
            </a>
          </div>
        </div>
      </div>

      {/* Wi-Fi & Connectivity */}
      <div className="space-y-4">
        <h2 className="flex items-center gap-2.5 text-[11px] uppercase tracking-[0.2em] text-on-surface-variant">
          <Wifi className="h-3.5 w-3.5" /> Wi-Fi &amp; Connectivity
        </h2>
        <div className="rounded-xl bg-surface-container-lowest p-4 space-y-3">
          <div className="space-y-0.5">
            <div className="font-serif font-medium text-on-surface text-[15px]">
              Pocket Wi-Fi or eSIM
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Highly recommended for navigation and translation. Rent a pocket
              Wi-Fi at the airport or activate an eSIM before departure.
            </p>
          </div>
          <div className="space-y-0.5">
            <div className="font-serif font-medium text-on-surface text-[15px]">
              Free Wi-Fi
            </div>
            <p className="text-sm text-on-surface-variant leading-relaxed">
              Available at most konbinis (7-Eleven, Lawson, FamilyMart) and major
              train stations. Quality varies.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
