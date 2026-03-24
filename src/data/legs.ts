import { TripLeg } from "./types";

export const legs: TripLeg[] = [
  {
    slug: "tokyo-1",
    title: "Tokyo First Leg",
    icon: "🗼",
    dates: "Apr 11–14",
    startDate: "2026-04-11",
    endDate: "2026-04-14",
    accommodation: {
      name: "JR-East Hotel Mets Akihabara",
      address: "1-17-4 Sotokanda, Chiyoda-ku, Tokyo",
      mapsQuery: "JR-East Hotel Mets Akihabara, Chiyoda-ku, Tokyo",
      highlights: ["Right by Akihabara Station"],
    },
    dayNumbers: [1, 2, 3, 4],
  },
  {
    slug: "fuji",
    title: "Fuji Speedway Overnight",
    icon: "🏎️",
    dates: "Apr 14–15",
    startDate: "2026-04-14",
    endDate: "2026-04-15",
    accommodation: {
      name: "Fuji Speedway Hotel (Hyatt Unbound)",
      address: "645 Omika, Oyama, Sunto District, Shizuoka 410-1308",
      mapsQuery: "Fuji Speedway Hotel, Oyama, Shizuoka",
      rating: 4.7,
      highlights: [
        "Motorsports Museum",
        "Mt. Fuji views from room",
        "World-class onsen with outdoor baths",
      ],
    },
    dayNumbers: [4, 5],
  },
  {
    slug: "kyoto",
    title: "Kyoto",
    icon: "⛩️",
    dates: "Apr 15–20",
    startDate: "2026-04-15",
    endDate: "2026-04-20",
    accommodation: {
      name: "Accommodation in Nakagyo Ward",
      address: "Nakagyo Ward, Kyoto",
      mapsQuery: "Nakagyo Ward, Kyoto, Japan",
      highlights: [
        "Central Kyoto",
        "Walkable to Nishiki Market, Pontocho, and Gion",
      ],
    },
    dayNumbers: [5, 6, 7, 8, 9, 10],
  },
  {
    slug: "tokyo-ginza",
    title: "Tokyo Ginza Final Leg",
    icon: "💫",
    dates: "Apr 20–23",
    startDate: "2026-04-20",
    endDate: "2026-04-23",
    accommodation: {
      name: "Hotel Grand Bach Tokyo Ginza",
      address: "5-13-12 Ginza, Chuo-ku, Tokyo",
      mapsQuery: "Hotel Grand Bach Tokyo Ginza",
      highlights: ["Heart of Ginza", "Walking distance to GINZA SIX, Dover Street Market"],
    },
    dayNumbers: [10, 11, 12, 13],
  },
];
