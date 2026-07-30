import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
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

const SITE_URL = "https://rivo-imobiliare.ro";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "RIVO Imobiliare — Dezvoltator rezidențial premium în Satu Mare",
    template: "%s · RIVO Imobiliare",
  },
  description:
    "RIVO Imobiliare dezvoltă proiecte rezidențiale și mixte premium în Satu Mare. Construim viitorul orașului — apartamente, case și ansambluri cu finisaje de calitate, predate la timp.",
  keywords: [
    "RIVO Imobiliare",
    "dezvoltator imobiliar Satu Mare",
    "apartamente noi Satu Mare",
    "proiecte rezidențiale Satu Mare",
    "case Satu Mare",
  ],
  authors: [{ name: "RIVO Imobiliare" }],
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: SITE_URL,
    siteName: "RIVO Imobiliare",
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
  robots: { index: true, follow: true },
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
