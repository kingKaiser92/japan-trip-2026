import {
  Landmark,
  Utensils,
  ShoppingBag,
  Beer,
  Train,
  Hotel,
  Dumbbell,
  Sparkles,
} from "lucide-react";
import type { ActivityCategory } from "@/data/types";

const icons: Record<ActivityCategory, typeof Landmark> = {
  sightseeing: Landmark,
  food: Utensils,
  shopping: ShoppingBag,
  nightlife: Beer,
  transport: Train,
  hotel: Hotel,
  training: Dumbbell,
  experience: Sparkles,
};

const colors: Record<ActivityCategory, string> = {
  sightseeing: "text-blue-500",
  food: "text-orange-500",
  shopping: "text-pink-500",
  nightlife: "text-purple-500",
  transport: "text-gray-500",
  hotel: "text-slate-500",
  training: "text-green-500",
  experience: "text-amber-500",
};

export function CategoryIcon({ category, className = "h-4 w-4" }: { category: ActivityCategory; className?: string }) {
  const Icon = icons[category];
  return <Icon className={`${className} ${colors[category]}`} />;
}

export function getCategoryColor(category: ActivityCategory): string {
  return colors[category];
}
