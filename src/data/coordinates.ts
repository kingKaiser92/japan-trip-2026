/**
 * Lat/lng coordinates for key locations across the trip.
 * Keyed by a normalized version of the activity name or mapsQuery.
 * Used by the interactive map to place pins.
 */

export interface LatLng {
  lat: number;
  lng: number;
}

// Fuzzy lookup: tries exact match first, then substring match
export function getCoords(query: string): LatLng | null {
  const q = query.toLowerCase().trim();

  // Exact match
  if (coordsMap[q]) return coordsMap[q];

  // Substring match — find the first key that the query contains, or vice versa
  for (const [key, coords] of Object.entries(coordsMap)) {
    if (q.includes(key) || key.includes(q)) return coords;
  }

  return null;
}

const coordsMap: Record<string, LatLng> = {
  // ═══════════════════════════════════════
  // TOKYO — Hotels
  // ═══════════════════════════════════════
  "jr-east hotel mets akihabara": { lat: 35.7005, lng: 139.7715 },
  "hotel grand bach tokyo ginza": { lat: 35.6693, lng: 139.7636 },

  // ═══════════════════════════════════════
  // TOKYO FIRST LEG — Day 1
  // ═══════════════════════════════════════
  "udon shin": { lat: 35.6836, lng: 139.7013 },
  "kyushu jangara akihabara": { lat: 35.6986, lng: 139.7712 },

  // ═══════════════════════════════════════
  // TOKYO FIRST LEG — Day 2
  // ═══════════════════════════════════════
  "sensō-ji": { lat: 35.7148, lng: 139.7967 },
  "senso-ji": { lat: 35.7148, lng: 139.7967 },
  "sensō-ji temple": { lat: 35.7148, lng: 139.7967 },
  "sakaba totoya": { lat: 35.7129, lng: 139.7945 },
  "hoppy street": { lat: 35.7129, lng: 139.7945 },
  "sushi edomaru asakusa": { lat: 35.7118, lng: 139.7952 },
  "ueno park": { lat: 35.7146, lng: 139.7734 },
  "noyaki ueno": { lat: 35.7084, lng: 139.7745 },

  // ═══════════════════════════════════════
  // TOKYO FIRST LEG — Day 3
  // ═══════════════════════════════════════
  "meiji jingu": { lat: 35.6764, lng: 139.6993 },
  "meiji shrine": { lat: 35.6764, lng: 139.6993 },
  "takeshita street": { lat: 35.6706, lng: 139.7028 },
  "shibuya crossing": { lat: 35.6595, lng: 139.7005 },
  "omoide yokocho": { lat: 35.6935, lng: 139.6990 },
  "memory lane": { lat: 35.6935, lng: 139.6990 },
  "shinjuku golden gai": { lat: 35.6938, lng: 139.7047 },
  "golden gai": { lat: 35.6938, lng: 139.7047 },

  // Harajuku shopping
  "beams harajuku": { lat: 35.6699, lng: 139.7049 },
  "united arrows harajuku": { lat: 35.6697, lng: 139.7063 },
  "kindal harajuku": { lat: 35.6692, lng: 139.7055 },
  "public tokyo jingumae": { lat: 35.6688, lng: 139.7058 },
  "ragtag harajuku": { lat: 35.6695, lng: 139.7045 },

  // Shibuya shopping
  "rinkan shibuya": { lat: 35.6611, lng: 139.6988 },
  "2nd street shibuya": { lat: 35.6600, lng: 139.6975 },
  "ragtag shibuya": { lat: 35.6608, lng: 139.6982 },

  // Vintage districts
  "koenji": { lat: 35.7063, lng: 139.6495 },
  "shimokitazawa": { lat: 35.6613, lng: 139.6680 },

  // ═══════════════════════════════════════
  // TOKYO FIRST LEG — Day 4
  // ═══════════════════════════════════════
  "tsukiji outer market": { lat: 35.6654, lng: 139.7707 },
  "tsukiji": { lat: 35.6654, lng: 139.7707 },
  "kindal ginza": { lat: 35.6713, lng: 139.7651 },
  "dover street market ginza": { lat: 35.6710, lng: 139.7640 },
  "teamlab borderless": { lat: 35.6600, lng: 139.7312 },
  "teamlab": { lat: 35.6600, lng: 139.7312 },

  // ═══════════════════════════════════════
  // FUJI
  // ═══════════════════════════════════════
  "fuji speedway hotel": { lat: 35.3722, lng: 138.9275 },
  "fuji speedway": { lat: 35.3722, lng: 138.9275 },
  "robata oyama": { lat: 35.3722, lng: 138.9275 },
  "gotemba premium outlets": { lat: 35.2939, lng: 138.9572 },
  "oshino hakkai": { lat: 35.4486, lng: 138.8267 },

  // ═══════════════════════════════════════
  // KYOTO — Day 1
  // ═══════════════════════════════════════
  "nakagyo ward": { lat: 35.0084, lng: 135.7589 },
  "nishiki market": { lat: 35.0050, lng: 135.7649 },
  "kindal kyoto": { lat: 35.0055, lng: 135.7640 },
  "pontocho alley": { lat: 35.0068, lng: 135.7704 },
  "pontocho": { lat: 35.0068, lng: 135.7704 },
  "kaidan-no-sono-saki": { lat: 35.0065, lng: 135.7700 },

  // ═══════════════════════════════════════
  // KYOTO — Day 2
  // ═══════════════════════════════════════
  "kiyomizu-dera": { lat: 34.9949, lng: 135.7850 },
  "kiyomizu-dera temple": { lat: 34.9949, lng: 135.7850 },
  "higashiyama": { lat: 34.9990, lng: 135.7810 },
  "gion shinbashi": { lat: 35.0042, lng: 135.7748 },
  "gion": { lat: 35.0042, lng: 135.7748 },
  "maikoya karasuma shijo": { lat: 35.0020, lng: 135.7590 },
  "maikoya": { lat: 35.0020, lng: 135.7590 },
  "philosopher's path": { lat: 35.0171, lng: 135.7943 },
  "kinkaku-ji": { lat: 35.0394, lng: 135.7292 },
  "golden pavilion": { lat: 35.0394, lng: 135.7292 },
  "gion maikoya": { lat: 35.0033, lng: 135.7788 },
  "bar rocking chair": { lat: 35.0380, lng: 135.7430 },

  // ═══════════════════════════════════════
  // KYOTO — Day 3
  // ═══════════════════════════════════════
  "arashiyama bamboo grove": { lat: 35.0168, lng: 135.6713 },
  "arashiyama": { lat: 35.0145, lng: 135.6720 },
  "fushimi inari taisha": { lat: 34.9671, lng: 135.7727 },
  "fushimi inari": { lat: 34.9671, lng: 135.7727 },
  "badu": { lat: 35.0050, lng: 135.7600 },

  // ═══════════════════════════════════════
  // NARA (Day trip)
  // ═══════════════════════════════════════
  "nara park": { lat: 34.6851, lng: 135.8430 },
  "nara": { lat: 34.6851, lng: 135.8430 },
  "tōdai-ji": { lat: 34.6890, lng: 135.8398 },
  "todai-ji": { lat: 34.6890, lng: 135.8398 },
  "kasuga taisha": { lat: 34.6812, lng: 135.8498 },
  "kiyamachi street": { lat: 35.0040, lng: 135.7694 },

  // ═══════════════════════════════════════
  // OSAKA (Day trip)
  // ═══════════════════════════════════════
  "osaka castle": { lat: 34.6873, lng: 135.5262 },
  "dotonbori": { lat: 34.6687, lng: 135.5013 },
  "shinsaibashi": { lat: 34.6745, lng: 135.5008 },
  "amerikamura": { lat: 34.6720, lng: 135.4980 },

  // ═══════════════════════════════════════
  // KYOTO — Day 6 (departure)
  // ═══════════════════════════════════════
  "kyoto station": { lat: 34.9858, lng: 135.7588 },

  // ═══════════════════════════════════════
  // TOKYO GINZA FINAL LEG
  // ═══════════════════════════════════════
  "ginza six": { lat: 35.6700, lng: 139.7636 },
  "ginza six rooftop": { lat: 35.6700, lng: 139.7636 },
  "fukumimi ginza": { lat: 35.6700, lng: 139.7625 },
  "bar high five": { lat: 35.6712, lng: 139.7660 },
  "bar high five ginza": { lat: 35.6712, lng: 139.7660 },
  "toyosu fish market": { lat: 35.6455, lng: 139.7829 },
  "toyosu": { lat: 35.6455, lng: 139.7829 },
  "hibiya park": { lat: 35.6738, lng: 139.7565 },
  "tokyo tower": { lat: 35.6586, lng: 139.7454 },
  "ginza toshi": { lat: 35.6705, lng: 139.7630 },
  "roppongi hills": { lat: 35.6605, lng: 139.7292 },
  "yanaka ginza": { lat: 35.7274, lng: 139.7663 },
  "nakameguro": { lat: 35.6436, lng: 139.6987 },
  "haneda airport": { lat: 35.5494, lng: 139.7798 },
  "haneda": { lat: 35.5494, lng: 139.7798 },

  // Ginza shopping
  "brand off ginza": { lat: 35.6718, lng: 139.7645 },
  "onitsuka tiger": { lat: 35.6652, lng: 139.7121 },
  "goldwin marunouchi": { lat: 35.6812, lng: 139.7649 },
  "asics run tokyo marunouchi": { lat: 35.6820, lng: 139.7641 },
  "imperial palace": { lat: 35.6852, lng: 139.7528 },
  "komehyo shinjuku": { lat: 35.6938, lng: 139.7006 },

  // ═══════════════════════════════════════
  // TRAINING LOCATIONS
  // ═══════════════════════════════════════
  "crossfit roppongi": { lat: 35.6621, lng: 139.7316 },
  "club 360": { lat: 35.6605, lng: 139.7330 },
  "kamo river": { lat: 35.0100, lng: 135.7710 },
  "sumida river": { lat: 35.7050, lng: 139.7940 },
};
