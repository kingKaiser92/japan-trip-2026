export type BookingCategory =
  | "flight"
  | "hotel"
  | "transport"
  | "experience"
  | "restaurant";

export type BookingConfirmationStatus = "confirmed" | "pending";

export interface Booking {
  id: string;
  name: string;
  category: BookingCategory;
  status: BookingConfirmationStatus;
  date: string;
  dateEnd?: string;
  time?: string;
  confirmationCode?: string;
  location?: string;
  mapsQuery?: string;
  notes?: string;
  bookedUnder?: string;
  price?: string;
}

export const bookings: Booking[] = [
  // ═══════════════════════════════════════════════════
  // FLIGHTS
  // ═══════════════════════════════════════════════════
  {
    id: "flight-out-pr2040",
    name: "Flight Out — PR 2040",
    category: "flight",
    status: "confirmed",
    date: "2026-04-10",
    time: "9:45 PM ET",
    location: "Haneda Airport (HND)",
    mapsQuery: "Haneda Airport HND Tokyo",
    notes: "Departs Apr 10, 9:45 PM ET. Arrives Apr 11 ~8 PM JST.",
  },
  {
    id: "flight-home-aa168",
    name: "Flight Home — AA 168",
    category: "flight",
    status: "confirmed",
    date: "2026-04-23",
    time: "~5:45 PM JST",
    location: "Haneda Airport (HND)",
    mapsQuery: "Haneda Airport HND Tokyo",
    notes: "Departs Apr 23 ~5:45 PM JST. Arrives ~6:10 PM ET same day.",
  },

  // ═══════════════════════════════════════════════════
  // HOTELS
  // ═══════════════════════════════════════════════════
  {
    id: "hotel-mets-akihabara",
    name: "JR-East Hotel Mets Akihabara",
    category: "hotel",
    status: "confirmed",
    date: "2026-04-11",
    dateEnd: "2026-04-14",
    location: "1-17-4 Sotokanda, Chiyoda-ku, Tokyo",
    mapsQuery: "JR-East Hotel Mets Akihabara",
    notes: "3 nights. Right by Akihabara Station.",
  },
  {
    id: "hotel-fuji-speedway",
    name: "Fuji Speedway Hotel (Hyatt Unbound)",
    category: "hotel",
    status: "confirmed",
    date: "2026-04-14",
    dateEnd: "2026-04-15",
    location: "645 Omika, Oyama, Shizuoka",
    mapsQuery: "Fuji Speedway Hotel Hyatt Unbound",
    notes: "1 night. Onsen, Mt. Fuji views, motorsport vibes.",
  },
  {
    id: "hotel-kyoto-nakagyo",
    name: "Kyoto Nakagyo Ward Accommodation",
    category: "hotel",
    status: "confirmed",
    date: "2026-04-15",
    dateEnd: "2026-04-20",
    location: "Nakagyo Ward, Kyoto",
    mapsQuery: "Nakagyo Ward Kyoto",
    notes: "5 nights. Central Kyoto base.",
  },
  {
    id: "hotel-grand-bach-ginza",
    name: "Hotel Grand Bach Tokyo Ginza",
    category: "hotel",
    status: "confirmed",
    date: "2026-04-20",
    dateEnd: "2026-04-23",
    location: "5-13-12 Ginza, Chuo-ku, Tokyo",
    mapsQuery: "Hotel Grand Bach Tokyo Ginza",
    notes: "3 nights. Final Tokyo leg.",
  },

  // ═══════════════════════════════════════════════════
  // TRANSPORT
  // ═══════════════════════════════════════════════════
  {
    id: "car-rental-pickup",
    name: "Car Rental Pickup",
    category: "transport",
    status: "confirmed",
    date: "2026-04-14",
    location: "2-chome-26-2 Nishinippori, Arakawa City",
    mapsQuery: "2-chome-26-2 Nishinippori Arakawa City Tokyo",
    notes: "Pick up car for drive to Fuji Speedway Hotel.",
  },
  {
    id: "car-rental-return",
    name: "Car Rental Return",
    category: "transport",
    status: "confirmed",
    date: "2026-04-15",
    time: "10:00 AM",
    location: "Toyota Rent a Car, 1850-6 Niihashi, Gotemba",
    mapsQuery: "Toyota Rent a Car 1850-6 Niihashi Gotemba",
    notes: "Return car before heading to Mishima for Shinkansen.",
  },
  {
    id: "shinkansen-mishima-kyoto",
    name: "Shinkansen Mishima to Kyoto",
    category: "transport",
    status: "confirmed",
    date: "2026-04-15",
    time: "12:55 PM",
    location: "Mishima Station",
    mapsQuery: "Mishima Station Shizuoka",
    notes: "Departs 12:55 PM. Head to Kyoto.",
  },
  {
    id: "shinkansen-kyoto-tokyo",
    name: "Shinkansen Kyoto to Tokyo",
    category: "transport",
    status: "confirmed",
    date: "2026-04-20",
    time: "12:30 PM",
    confirmationCode: "EAY107828",
    location: "Kyoto Station",
    mapsQuery: "Kyoto Station",
    notes: "Nozomi 252. Green Car 8, Seats 10-A / 10-B / 11-A.",
  },

  // ═══════════════════════════════════════════════════
  // EXPERIENCES
  // ═══════════════════════════════════════════════════
  {
    id: "kimono-tea-ceremony",
    name: "Kimono Tea Ceremony at MAIKOYA",
    category: "experience",
    status: "confirmed",
    date: "2026-04-16",
    time: "1:30 PM",
    location: "MAIKOYA Karasuma Shijo branch, Kyoto",
    mapsQuery: "MAIKOYA Karasuma Shijo Kyoto",
    notes: "3 adults. Total cost: \u00a527,720.",
    price: "\u00a527,720",
  },
  {
    id: "teamlab-borderless",
    name: "teamLab Borderless",
    category: "experience",
    status: "pending",
    date: "2026-04-12",
    location: "Azabudai Hills, Tokyo",
    mapsQuery: "teamLab Borderless Azabudai Hills Tokyo",
    notes: "Book ASAP -- tickets sell out fast.",
  },
  {
    id: "geisha-show-gion-maikoya",
    name: "Geisha Show at Gion MAIKOYA",
    category: "experience",
    status: "pending",
    date: "2026-04-17",
    location: "Gion, Kyoto",
    mapsQuery: "Gion MAIKOYA Kyoto",
    notes: "Evening show. Check availability.",
  },
  {
    id: "sagano-romantic-train",
    name: "Sagano Romantic Train",
    category: "experience",
    status: "pending",
    date: "2026-04-18",
    location: "Saga-Arashiyama Station, Kyoto",
    mapsQuery: "Sagano Romantic Train Kyoto",
    notes: "\u00a5880 per adult. Book in advance.",
    price: "\u00a5880/adult",
  },
  {
    id: "hozugawa-river-boat",
    name: "Hozugawa River Boat Ride",
    category: "experience",
    status: "pending",
    date: "2026-04-18",
    location: "Kameoka, Kyoto",
    mapsQuery: "Hozugawa River Boat Ride Kyoto",
    notes: "\u00a56,000 per adult. Pairs with Sagano Train.",
    price: "\u00a56,000/adult",
  },

  // ═══════════════════════════════════════════════════
  // RESTAURANTS
  // ═══════════════════════════════════════════════════
  {
    id: "badu-kyoto",
    name: "Badu (Kyoto)",
    category: "restaurant",
    status: "confirmed",
    date: "2026-04-17",
    time: "4:00 PM",
    confirmationCode: "SZEQVH",
    location: "Kyoto",
    mapsQuery: "Badu restaurant Kyoto",
    notes: "3 people. Booked under Asif Chowdhury.",
    bookedUnder: "Asif Chowdhury",
  },
  {
    id: "robata-oyama",
    name: "Robata OYAMA",
    category: "restaurant",
    status: "confirmed",
    date: "2026-04-14",
    location: "Fuji Speedway Hotel",
    mapsQuery: "Robata OYAMA Fuji Speedway Hotel",
    notes: "Hotel restaurant dinner.",
  },
  {
    id: "sanzenin-no-sato",
    name: "Sanzen-in no Sato Omakase",
    category: "restaurant",
    status: "pending",
    date: "2026-04-19",
    location: "Kyoto",
    mapsQuery: "Sanzen-in no Sato Kyoto",
    notes: "Omakase dinner. Need to reserve.",
  },
  {
    id: "fukumimi-ginza-6",
    name: "FUKUMIMI Ginza 6",
    category: "restaurant",
    status: "pending",
    date: "2026-04-20",
    location: "Ginza, Tokyo",
    mapsQuery: "FUKUMIMI Ginza 6 Tokyo",
    notes: "Arrival dinner for final Tokyo leg. Need to reserve.",
  },
  {
    id: "yoroniku",
    name: "Yoroniku Yakiniku Omakase",
    category: "restaurant",
    status: "pending",
    date: "2026-04-21",
    location: "Minami-Aoyama, Tokyo",
    mapsQuery: "Yoroniku Minami-Aoyama Tokyo",
    notes: "Popular beef omakase (\u00a58,800+ sets). Book well in advance. Open 5 PM--12 AM.",
    price: "\u00a58,800+",
  },
  {
    id: "hikiniku-to-come",
    name: "Hikiniku to Come",
    category: "restaurant",
    status: "pending",
    date: "2026-04-12",
    location: "Tokyo",
    mapsQuery: "Hikiniku to Come Tokyo",
    notes: "Pre-book on TableCheck (adds \u00a51,000 but walk-ins get turned away). Closed Wednesdays.",
  },
  {
    id: "shinjuku-sushi-nigirite",
    name: "Shinjuku Sushi Bar Nigirite",
    category: "restaurant",
    status: "pending",
    date: "2026-04-13",
    location: "Shinjuku, Tokyo",
    mapsQuery: "Shinjuku Sushi Bar Nigirite Tokyo",
    notes: "Reserve at least 1 week ahead. Tiny spot with limited seats.",
  },
];
