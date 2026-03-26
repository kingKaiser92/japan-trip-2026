/**
 * Hero images for each day, keyed by day number.
 * Uses free-to-use Unsplash images of iconic Japan locations.
 * Each image represents the "main event" of that day.
 */

export interface DayImage {
  url: string;
  alt: string;
  credit: string; // Unsplash photographer
}

export const dayImages: Record<number, DayImage> = {
  1: {
    url: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=600&q=80",
    alt: "Tokyo skyline at night",
    credit: "Jezael Melgoza",
  },
  2: {
    url: "https://images.unsplash.com/photo-1583766395091-2eb9994ed094?w=600&q=80",
    alt: "Sensō-ji Temple, Asakusa",
    credit: "Ryoji Iwata",
  },
  3: {
    url: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?w=600&q=80",
    alt: "Shibuya Crossing",
    credit: "Jezael Melgoza",
  },
  4: {
    url: "https://images.unsplash.com/photo-1536098561742-ca998e48cbcc?w=600&q=80",
    alt: "Tsukiji Fish Market",
    credit: "Clay Banks",
  },
  5: {
    url: "https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=600&q=80",
    alt: "Mount Fuji at sunrise",
    credit: "David Edelstein",
  },
  6: {
    url: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
    alt: "Fushimi Inari torii gates",
    credit: "Lin Mei",
  },
  7: {
    url: "https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=600&q=80",
    alt: "Kiyomizu-dera Temple",
    credit: "Su San Lee",
  },
  8: {
    url: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&q=80",
    alt: "Arashiyama Bamboo Grove",
    credit: "Sora Sagano",
  },
  9: {
    url: "https://images.unsplash.com/photo-1624601573012-efb68f3b28c6?w=600&q=80",
    alt: "Nara deer park",
    credit: "Jérémy Stenuit",
  },
  10: {
    url: "https://images.unsplash.com/photo-1590559899731-a382839e5549?w=600&q=80",
    alt: "Osaka Shinsekai — Tsutenkaku Tower",
    credit: "Alex Knight",
  },
  11: {
    url: "https://images.unsplash.com/photo-1551641506-ee5bf4cb45f1?w=600&q=80",
    alt: "Kyoto departure — train platform",
    credit: "Hugh Han",
  },
  12: {
    url: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=600&q=80",
    alt: "Ginza district, Tokyo",
    credit: "Louie Martinez",
  },
  13: {
    url: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=600&q=80",
    alt: "Tokyo Tower at sunset",
    credit: "Jezael Melgoza",
  },
};
