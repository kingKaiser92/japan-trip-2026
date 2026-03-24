import { MapPin } from "lucide-react";
import { getGoogleMapsUrl } from "@/lib/maps";

export function MapLink({ query }: { query: string }) {
  return (
    <a
      href={getGoogleMapsUrl(query)}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 text-sm text-on-surface-variant hover:text-on-surface border-b border-cherry/40 pb-0.5"
    >
      <MapPin className="h-3.5 w-3.5" />
      <span>Open in Maps</span>
    </a>
  );
}
