import { MapPin } from "lucide-react";
import { getGoogleMapsUrl } from "@/lib/maps";

export function MapLink({ query }: { query: string }) {
  return (
    <a
      href={getGoogleMapsUrl(query)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1 text-sm text-red-600 hover:text-red-700 dark:text-red-400 font-medium"
    >
      <MapPin className="h-3.5 w-3.5" />
      Open in Maps
    </a>
  );
}
