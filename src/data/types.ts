export type ActivityCategory =
  | "sightseeing"
  | "food"
  | "shopping"
  | "nightlife"
  | "transport"
  | "hotel"
  | "training"
  | "experience";

export type BookingStatus = "booked" | "pending" | "walk-in" | "no-reservation";

export type RecSource = "asif" | "may-ann" | "personal" | null;

export type DayRhythm = "packed" | "moderate" | "chill" | "arrival" | "departure";

export interface TripMeta {
  title: string;
  startDate: string;
  endDate: string;
  group: string;
  totalDays: number;
}

export interface TripLeg {
  slug: string;
  title: string;
  icon: string;
  dates: string;
  startDate: string;
  endDate: string;
  accommodation: Accommodation;
  dayNumbers: number[];
}

export interface Accommodation {
  name: string;
  address: string;
  mapsQuery: string;
  rating?: number;
  highlights?: string[];
}

export interface TripDay {
  dayNumber: number;
  date: string;
  legSlug: string;
  title: string;
  subtitle: string;
  rhythm: DayRhythm;
  training?: TrainingOption;
  activities: Activity[];
}

export interface Activity {
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

export interface Shop {
  id: string;
  name: string;
  description: string;
  location: string;
  hours: string;
  legSlugs: string[];
  category: "luxury-resale" | "vintage" | "menswear" | "athletic" | "department" | "general";
  rating?: string;
  mapsQuery?: string;
  recSource?: RecSource;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  location: string;
  hours?: string;
  legSlugs: string[];
  cuisine: string;
  rating?: string;
  recSource: RecSource;
  bookingStatus: BookingStatus;
  bookingNotes?: string;
  mapsQuery?: string;
  price?: string;
}

export interface Bar {
  id: string;
  name: string;
  description: string;
  location: string;
  hours?: string;
  legSlugs: string[];
  recSource: RecSource;
  mapsQuery?: string;
  coverCharge?: string;
}

export interface ActionItem {
  id: string;
  text: string;
  legSlug: string;
  completed: boolean;
  bookingLink?: string;
  notes?: string;
}

export interface TrainingOption {
  type: "run" | "hyrox" | "rest";
  description: string;
  distance?: string;
  location?: string;
  timeWindow?: string;
}
