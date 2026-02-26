import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { SkipToContent } from "@/components/ui/SkipToContent";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { BackToTop } from "@/components/ui/BackToTop";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Preloader } from "@/components/ui/Preloader";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Vishvam Patel | Software Developer",
    template: "%s | Vishvam Patel",
  },
  description:
    "Software Developer specializing in Python, React, and Full Stack Development. Building scalable backend systems and modern web experiences.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  ),
  openGraph: {
    title: "Vishvam Patel | Software Developer",
    description:
      "Software Developer specializing in Python, React, and Full Stack Development.",
    url: "/",
    siteName: "Vishvam Patel",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Vishvam Patel | Software Developer",
    description:
      "Software Developer specializing in Python, React, and Full Stack Development.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange={false}
        >
          <SmoothScroll>
            <SkipToContent />
            <Preloader />
            <Navbar />
            <CustomCursor />
            <main id="main-content">{children}</main>
            <Footer />
            <BackToTop />
            <Toaster position="bottom-right" richColors closeButton />
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}
