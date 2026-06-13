import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Bodoni_Moda, Cormorant } from "next/font/google";
import "./globals.css";

import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/interactive/CustomCursor";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScrollProgress } from "@/components/layout/ScrollProgress";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});

const cormorant = Cormorant({
  variable: "--font-cormorant",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://crownandblade.studio";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Crown & Blade — The Art of the Modern Gentleman",
    template: "%s · Crown & Blade",
  },
  description:
    "Crown & Blade is an atelier of grooming craftsmanship. Precision cuts, hot-towel rituals and master barbers — an unforgettable luxury experience.",
  keywords: [
    "luxury barbershop",
    "men's grooming",
    "precision haircut",
    "hot towel shave",
    "master barber",
    "Crown & Blade",
  ],
  authors: [{ name: "Crown & Blade" }],
  openGraph: {
    title: "Crown & Blade — The Art of the Modern Gentleman",
    description:
      "An atelier of grooming craftsmanship. Precision, ritual and the pursuit of the perfect cut.",
    url: SITE_URL,
    siteName: "Crown & Blade",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Crown & Blade",
    description: "The Art of the Modern Gentleman.",
  },
};

export const viewport: Viewport = {
  themeColor: "#08080a",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${bodoni.variable} ${cormorant.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-obsidian text-bone antialiased">
        <SmoothScrollProvider>
          <GrainOverlay />
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <main id="top">{children}</main>
          <Footer />
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
