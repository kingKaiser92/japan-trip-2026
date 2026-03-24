import type { Metadata, Viewport } from "next";
import { Inter, Noto_Serif } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { MobileNav } from "@/components/layout/MobileNav";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
});

const notoSerif = Noto_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Japan 2026 — Interactive Itinerary",
  description: "13 days across Tokyo, Mt. Fuji, Kyoto & Osaka. Temples, street food, hidden bars, and more.",
  manifest: "/manifest.json",
  openGraph: {
    title: "Japan 2026",
    description: "13 days across Tokyo, Mt. Fuji, Kyoto & Osaka.",
    siteName: "Japan Trip 2026",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Japan 2026",
    description: "13 days across Tokyo, Mt. Fuji, Kyoto & Osaka.",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Japan 2026",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf9f5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoSerif.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1 mx-auto w-full max-w-2xl px-5 pb-24 pt-8 md:pb-8">
          {children}
        </main>
        <MobileNav />
      </body>
    </html>
  );
}
