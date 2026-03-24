import {
  Landmark,
  Utensils,
  ShoppingBag,
  Wine,
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
  nightlife: Wine,
  transport: Train,
  hotel: Hotel,
  training: Dumbbell,
  experience: Sparkles,
};

export function CategoryIcon({ category, className = "h-4 w-4" }: { category: ActivityCategory; className?: string }) {
  const Icon = icons[category];
  return <Icon className={`${className} text-on-surface-variant`} />;
}
