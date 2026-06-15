import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";

import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { CustomCursor } from "@/components/interactive/CustomCursor";
import { GrainOverlay } from "@/components/layout/GrainOverlay";
import { ParticleField } from "@/components/layout/ParticleField";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { RobotAssistant } from "@/components/assistant/RobotAssistant";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const space = Space_Grotesk({ variable: "--font-space", subsets: ["latin"], display: "swap" });

const SITE_URL = "https://forge.systems";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Forge — Intelligent Machines for the Physical World",
    template: "%s · Forge",
  },
  description:
    "Forge designs and builds intelligent robots for industry, healthcare, logistics, security, manufacturing and smart cities. Advanced hardware united with the Forge Cortex reasoning core.",
  keywords: [
    "robotics",
    "humanoid robot",
    "industrial automation",
    "artificial intelligence",
    "autonomous robots",
    "Forge robotics",
  ],
  authors: [{ name: "Forge Robotics" }],
  openGraph: {
    title: "Forge — Intelligent Machines for the Physical World",
    description: "Intelligent robots for industry, healthcare, logistics, security and smart cities.",
    url: SITE_URL,
    siteName: "Forge",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Forge Robotics",
    description: "Intelligent machines for the physical world.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050609",
  colorScheme: "dark",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${space.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-dvh bg-void text-ice antialiased">
        <SmoothScrollProvider>
          <ParticleField />
          <GrainOverlay />
          <ScrollProgress />
          <CustomCursor />
          <Navbar />
          <RobotAssistant />
          <div className="relative z-10">
            <main id="top">{children}</main>
            <Footer />
          </div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
