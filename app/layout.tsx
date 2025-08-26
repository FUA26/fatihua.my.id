// app/layout.tsx
import type { Metadata, Viewport } from "next";
import {
  Geist_Mono,
  JetBrains_Mono,
  Nunito,
  Playpen_Sans,
} from "next/font/google";
import clsx from "clsx";
import "@/css/globals.css";
import { SITE_METADATA } from "@/data/site-metadata";


const FONT_PLAYPEN_SANS = Playpen_Sans({ subsets: ["latin"], display: "swap", weight: ["800"], variable: "--font-playpen-sans" });
const FONT_NUNITO = Nunito({ subsets: ["latin"], display: "swap", style: ["normal", "italic"], weight: ["400","500","600","700","800"], variable: "--font-nunito" });
const FONT_GEIST = Geist_Mono({ subsets: ["latin"], display: "swap", style: ["normal"], weight: ["400","500","600","700"], variable: "--font-geist" });
const FONT_JB_MONO = JetBrains_Mono({ weight: ["400","500","600"], subsets: ["latin"], style: ["normal","italic"], display: "swap", variable: "--font-jetbrains-mono" });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_METADATA.siteUrl),
  title: { default: SITE_METADATA.title, template: `%s | ${SITE_METADATA.title}` },
  description: SITE_METADATA.description,
  openGraph: {
    title: SITE_METADATA.title,
    description: SITE_METADATA.description,
    url: "/",
    siteName: SITE_METADATA.title,
    images: [SITE_METADATA.socialBanner],
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "/",
    types: { "application/rss+xml": `${SITE_METADATA.siteUrl}/feed.xml` },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_METADATA.title,
    images: [SITE_METADATA.socialBanner],
  },
  icons: {
    icon: [
      { url: "/static/favicons/favicon.ico", sizes: "any" },
      { url: "/static/favicons/favicon-32x32.png", type: "image/png", sizes: "32x32" },
      { url: "/static/favicons/favicon-16x16.png", type: "image/png", sizes: "16x16" },
    ],
    // Apple touch icon sebaiknya 180x180 PNG
    apple: [{ url: "/static/favicons/apple-touch-icon.png", sizes: "180x180" }],
    other: [{ rel: "mask-icon", url: "/static/favicons/safari-pinned-tab.svg", color: "#5bbad5" }],
  },
  manifest: "/static/favicons/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body
        className={clsx(
          "w-full overflow-x-hidden scroll-smooth antialiased",
          FONT_NUNITO.variable,
          FONT_JB_MONO.variable,
          FONT_PLAYPEN_SANS.variable,
          FONT_GEIST.variable,
        )}
      >
        {children}
      </body>
    </html>
  );
}
