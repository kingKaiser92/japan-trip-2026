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
  // TOKYO FIRST LEG — Day 2 (food)
  // ═══════════════════════════════════════
  "gyukatsu motomura": { lat: 35.6598, lng: 139.6985 },
  "steak rice center": { lat: 35.6924, lng: 139.6940 },
  "hikiniku to come": { lat: 35.6570, lng: 139.6970 },
  "shinjuku sushi bar nigirite": { lat: 35.6905, lng: 139.7005 },

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
  "yoroniku": { lat: 35.6650, lng: 139.7135 },
  "ginza happo shinjuku": { lat: 35.6930, lng: 139.7055 },

  // Harajuku food
  "micasadeco & cafe": { lat: 35.6700, lng: 139.7040 },
  "micasadeco cafe": { lat: 35.6700, lng: 139.7040 },
  "cafe reissue": { lat: 35.6685, lng: 139.7050 },
  "oreryu shio ramen": { lat: 35.6690, lng: 139.7035 },

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
  "espresso d works yellow": { lat: 35.6601, lng: 139.6990 },

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
  "sanzen-in no sato": { lat: 35.0040, lng: 135.7750 },
  "men-ya inoichi": { lat: 35.0045, lng: 135.7690 },
  "gokago": { lat: 35.0055, lng: 135.7665 },
  "chao chao gyoza": { lat: 35.0040, lng: 135.7680 },
  "400°c pizza": { lat: 35.0260, lng: 135.7570 },

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
  "bee's knees": { lat: 35.0045, lng: 135.7695 },
  "bee\u2019s knees": { lat: 35.0045, lng: 135.7695 },
  "good morning record bar": { lat: 35.0050, lng: 135.7680 },
  "wife & husband": { lat: 35.0310, lng: 135.7640 },
  "wife and husband": { lat: 35.0310, lng: 135.7640 },

  // ═══════════════════════════════════════
  // KYOTO — Day 3
  // ═══════════════════════════════════════
  "arashiyama bamboo grove": { lat: 35.0168, lng: 135.6713 },
  "arashiyama": { lat: 35.0145, lng: 135.6720 },
  "sagano romantic train": { lat: 35.0195, lng: 135.6770 },
  "hozugawa river boat": { lat: 34.9960, lng: 135.6440 },
  "fushimi inari taisha": { lat: 34.9671, lng: 135.7727 },
  "fushimi inari": { lat: 34.9671, lng: 135.7727 },
  "badu": { lat: 35.0050, lng: 135.7600 },

  // Kyoto shopping
  "three star kyoto": { lat: 35.0035, lng: 135.7660 },
  "teramachi": { lat: 35.0060, lng: 135.7665 },
  "shinkyogoku": { lat: 35.0055, lng: 135.7660 },
  "2nd street kyoto hachijo": { lat: 34.9855, lng: 135.7555 },
  "goldwin kyoto": { lat: 35.0050, lng: 135.7610 },
  "le labo kyoto": { lat: 35.0045, lng: 135.7690 },
  "mizuno": { lat: 34.9860, lng: 135.7580 },
  "descente": { lat: 35.0030, lng: 135.7625 },

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
  "hozenji yamakazu": { lat: 34.6690, lng: 135.5035 },
  "shimada sake store": { lat: 34.6695, lng: 135.5020 },
  "takoyaki wanaka": { lat: 34.6680, lng: 135.5020 },
  "joroku ramen": { lat: 34.6685, lng: 135.5010 },
  "usamitei matsubaya": { lat: 34.6692, lng: 135.5025 },
  "semba center building": { lat: 34.6810, lng: 135.5070 },

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

  "age.3 ginza": { lat: 35.6708, lng: 139.7635 },
  "tonkatsu ginza bairin": { lat: 35.6698, lng: 139.7625 },
  "fukurokuju": { lat: 35.6720, lng: 139.7680 },
  "savoy": { lat: 35.6538, lng: 139.7370 },

  // Ginza shopping
  "brand off ginza": { lat: 35.6718, lng: 139.7645 },
  "onitsuka tiger": { lat: 35.6652, lng: 139.7121 },
  "goldwin marunouchi": { lat: 35.6812, lng: 139.7649 },
  "asics run tokyo marunouchi": { lat: 35.6820, lng: 139.7641 },
  "the north face purple label": { lat: 35.6650, lng: 139.7120 },
  "whitesville": { lat: 35.6600, lng: 139.6980 },
  "imperial palace": { lat: 35.6852, lng: 139.7528 },
  "komehyo shinjuku": { lat: 35.6938, lng: 139.7006 },

  // ═══════════════════════════════════════
  // TRAINING LOCATIONS
  // ═══════════════════════════════════════
  "crossfit roppongi": { lat: 35.6621, lng: 139.7316 },
  "club 360": { lat: 35.6605, lng: 139.7330 },
  "kamo river": { lat: 35.0100, lng: 135.7710 },
  "sumida river": { lat: 35.7050, lng: 139.7940 },

  // ═══════════════════════════════════════
  // BRANDON'S RECS — Kyoto
  // ═══════════════════════════════════════
  "bar krft tiki": { lat: 35.0037, lng: 135.7762 },
  "bar krft tiki, higashiyama, kyoto": { lat: 35.0037, lng: 135.7762 },
  "scotch & branch": { lat: 35.0048, lng: 135.7668 },
  "scotch & branch, nakagyo ward, kyoto": { lat: 35.0048, lng: 135.7668 },
  "cafe & bar benikoumori": { lat: 35.0032, lng: 135.7756 },
  "cafe & bar benikoumori, higashiyama, kyoto": { lat: 35.0032, lng: 135.7756 },
  "ebisugawa-gyoza nakajima donguri": { lat: 35.0060, lng: 135.7710 },
  "ebisugawa-gyoza nakajima donguri, higashiyama, kyoto": { lat: 35.0060, lng: 135.7710 },
  "pizzeria mama": { lat: 34.9965, lng: 135.6780 },
  "pizzeria mama, arashiyama, kyoto": { lat: 34.9965, lng: 135.6780 },

  // ═══════════════════════════════════════
  // BRANDON'S RECS — Osaka
  // ═══════════════════════════════════════
  "bar shiki": { lat: 34.6715, lng: 135.5025 },
  "bar shiki, higashi-shinsaibashi, osaka": { lat: 34.6715, lng: 135.5025 },
  "hollow bar": { lat: 34.6720, lng: 135.4985 },
  "hollow bar, nishi-shinsaibashi, osaka": { lat: 34.6720, lng: 135.4985 },
};
