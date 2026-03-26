/**
 * Haversine distance between two lat/lng points.
 * Returns distance in meters.
 */
export function haversineDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6_371_000; // Earth radius in meters
  const toRad = (deg: number) => (deg * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;

  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

/**
 * Format meters as a human-readable distance string.
 */
export function formatDistance(meters: number): string {
  if (meters < 1000) return `${Math.round(meters)}m`;
  return `${(meters / 1000).toFixed(1)}km`;
}

/**
 * Convert meters to estimated walking time (~80m/min ≈ 5 km/h).
 * Returns a human-readable string like "2 min walk" or "25 min walk".
 */
export function formatWalkingTime(meters: number): string {
  const minutes = Math.round(meters / 80);
  if (minutes < 1) return "1 min walk";
  return `${minutes} min walk`;
}
