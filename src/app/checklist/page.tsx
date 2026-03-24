"use client";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { legs } from "@/data/legs";
import { CheckSquare, Square } from "lucide-react";

interface ChecklistItem {
  id: string;
  text: string;
  legSlug: string;
  defaultCompleted: boolean;
}

const items: ChecklistItem[] = [
  // Tokyo First Leg
  { id: "t1-teamlab", text: "Book teamLab Borderless tickets", legSlug: "tokyo-1", defaultCompleted: false },
  { id: "t1-sushi", text: "Reserve Sushi Edomaru Asakusa", legSlug: "tokyo-1", defaultCompleted: false },
  { id: "t1-suica", text: "Download Suica/Pasmo for transit", legSlug: "tokyo-1", defaultCompleted: false },
  { id: "t1-hikiniku", text: "Pre-book Hikiniku to Come on TableCheck", legSlug: "tokyo-1", defaultCompleted: false },
  { id: "t1-nigirite", text: "Reserve Shinjuku Sushi Bar Nigirite", legSlug: "tokyo-1", defaultCompleted: false },
  { id: "t1-yoroniku", text: "Book Yoroniku (beef omakase)", legSlug: "tokyo-1", defaultCompleted: false },
  { id: "t1-tokimeki", text: "Reserve Tokimeki in Koenji", legSlug: "tokyo-1", defaultCompleted: false },
  // Fuji
  { id: "f-robata", text: "Book Robata OYAMA dinner", legSlug: "fuji", defaultCompleted: true },
  { id: "f-track", text: "Check if track experience available Apr 14/15", legSlug: "fuji", defaultCompleted: false },
  { id: "f-transport", text: "Plan transport to Kyoto — Shinkansen", legSlug: "fuji", defaultCompleted: true },
  // Kyoto
  { id: "k-geisha", text: "Book Geisha Show at Gion MAIKOYA", legSlug: "kyoto", defaultCompleted: false },
  { id: "k-tea", text: "Kimono Tea Ceremony at MAIKOYA (Apr 16)", legSlug: "kyoto", defaultCompleted: true },
  { id: "k-badu", text: "Badu reservation (Apr 17)", legSlug: "kyoto", defaultCompleted: true },
  { id: "k-sanzen", text: "Reserve Sanzen-in no Sato omakase", legSlug: "kyoto", defaultCompleted: false },
  { id: "k-train", text: "Book Sagano Romantic Train e-tickets", legSlug: "kyoto", defaultCompleted: false },
  { id: "k-boat", text: "Book Hozugawa River Boat Ride", legSlug: "kyoto", defaultCompleted: false },
  { id: "k-wife", text: "Reserve Wife & Husband Cafe", legSlug: "kyoto", defaultCompleted: false },
  { id: "k-eel", text: "Book Hozenji Yamakazu (Osaka eel dinner)", legSlug: "kyoto", defaultCompleted: false },
  { id: "k-ic", text: "Get IC cards loaded for Kyoto buses + JR trains", legSlug: "kyoto", defaultCompleted: false },
  { id: "k-shinkansen", text: "Check Shinkansen schedule Apr 20 Kyoto → Tokyo", legSlug: "kyoto", defaultCompleted: false },
  // Tokyo Ginza
  { id: "g-fukumimi", text: "Reserve FUKUMIMI Ginza 6 for arrival dinner", legSlug: "tokyo-ginza", defaultCompleted: false },
  { id: "g-barhigh5", text: "Check Bar High Five hours (closed Fri/Sun)", legSlug: "tokyo-ginza", defaultCompleted: false },
  { id: "g-toyosu", text: "Confirm Toyosu Market open Apr 21 (closed Wed/Sun)", legSlug: "tokyo-ginza", defaultCompleted: false },
  { id: "g-terminal", text: "Check Haneda terminal for AA 168", legSlug: "tokyo-ginza", defaultCompleted: false },
  { id: "g-shipping", text: "Consider shipping extra bags via Yamato", legSlug: "tokyo-ginza", defaultCompleted: false },
  { id: "g-yoroniku2", text: "Book Yoroniku (if not booked in first leg)", legSlug: "tokyo-ginza", defaultCompleted: false },
];

export default function ChecklistPage() {
  const [checked, setChecked] = useLocalStorage<string[]>("checklist-checked",
    items.filter(i => i.defaultCompleted).map(i => i.id)
  );

  const toggle = (id: string) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const completedCount = checked.length;
  const totalCount = items.length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">
          Booking Checklist
        </h1>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {completedCount}/{totalCount} completed
        </p>
        {/* Progress bar */}
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800">
          <div
            className="h-full rounded-full bg-red-600 transition-all duration-300"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {legs.map((leg) => {
        const legItems = items.filter((i) => i.legSlug === leg.slug);
        if (legItems.length === 0) return null;
        return (
          <div key={leg.slug} className="space-y-2">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
              <span>{leg.icon}</span> {leg.title}
            </h2>
            <div className="space-y-1">
              {legItems.map((item) => {
                const isChecked = checked.includes(item.id);
                return (
                  <button
                    key={item.id}
                    onClick={() => toggle(item.id)}
                    className="flex w-full items-start gap-3 rounded-lg px-3 py-2.5 text-left transition-colors hover:bg-gray-100 dark:hover:bg-gray-800"
                  >
                    {isChecked ? (
                      <CheckSquare className="h-5 w-5 shrink-0 text-green-600 dark:text-green-400" />
                    ) : (
                      <Square className="h-5 w-5 shrink-0 text-gray-400" />
                    )}
                    <span
                      className={`text-sm ${
                        isChecked
                          ? "text-gray-400 line-through dark:text-gray-500"
                          : "text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {item.text}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
