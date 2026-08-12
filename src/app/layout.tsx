import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["opsz"],
});

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: { canonical: "/" },
  title: {
    default: `${SITE_NAME} — Dezvoltator rezidențial premium în Satu Mare`,
    template: `%s · ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "RIVO Imobiliare",
    "dezvoltator imobiliar Satu Mare",
    "apartamente noi Satu Mare",
    "proiecte rezidențiale Satu Mare",
    "case Satu Mare",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  applicationName: SITE_NAME,
  category: "real estate",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "RIVO Imobiliare — Construit în jurul viitorului tău",
    description:
      "Proiecte rezidențiale și mixte premium în Satu Mare. Descoperă ansamblurile RIVO.",
  },
  twitter: {
    card: "summary_large_image",
    title: "RIVO Imobiliare — Construit în jurul viitorului tău",
    description:
      "Proiecte rezidențiale și mixte premium în Satu Mare. Descoperă ansamblurile RIVO.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      // Fără limită la lungimea descrierii și mărimea previzualizărilor.
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#0e0e10",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
