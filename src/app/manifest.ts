import type { MetadataRoute } from "next";
import { SITE_DESCRIPTION, SITE_NAME } from "@/lib/site";

/**
 * Web app manifest — iconul și numele folosite când site-ul e adăugat pe
 * ecranul de start (în special pe Android).
 *
 * Iconurile sunt servite din `public/`, nu din `app/icon.png`: acela primește
 * un hash de cache în URL, iar manifestul are nevoie de o cale stabilă.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: "RIVO",
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#0e0e10",
    theme_color: "#0e0e10",
    lang: "ro",
    icons: [
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
