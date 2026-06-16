import type { Metadata, Viewport } from "next";
import { Sora, JetBrains_Mono, Bricolage_Grotesque, Hanken_Grotesk } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { PROFILE } from "@/data/content";
import "./globals.css";

const sora = Sora({ subsets: ["latin"], variable: "--font-sora", display: "swap" });
const jetbrains = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains", display: "swap" });
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://vishvam.dev"),
  title: {
    default: `${PROFILE.name} — Engineer`,
    template: `%s · ${PROFILE.name}`,
  },
  description: PROFILE.name + " — AI, backend, and full-stack engineer. Python, FastAPI, Next.js, Kubernetes.",
  authors: [{ name: PROFILE.name }],
  openGraph: {
    title: `${PROFILE.name} — Engineer`,
    description: "AI · Backend · Full-Stack engineer.",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#07070d",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVars = [
    sora.variable,
    jetbrains.variable,
    bricolage.variable,
    hanken.variable,
    GeistSans.variable,
    GeistMono.variable,
  ].join(" ");
  return (
    <html lang="en" className={fontVars}>
      <body>{children}</body>
    </html>
  );
}
