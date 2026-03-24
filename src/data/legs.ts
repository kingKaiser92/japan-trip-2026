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
      name: "Fuji Speedway Hotel (Hyatt Unbound)",
      address: "",
      mapsQuery: "Fuji Speedway Hotel (Hyatt Unbound)",
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
      name: "Fuji Speedway Hotel — The Unbound Collection by Hyatt",
      address: "645 Omika, Oyama, Sunto District, Shizuoka 410-1308",
      mapsQuery: "Fuji Speedway Hotel — The Unbound Collection by Hyatt",
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
      name: "Accommodation in Nakagyo Ward, Kyoto",
      address: "Nakagyo Ward — central Kyoto, walkable to Nishiki Market, Pontocho, and Gion",
      mapsQuery: "Accommodation in Nakagyo Ward, Kyoto",
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
    },
    dayNumbers: [10, 11, 12, 13],
  },
];
