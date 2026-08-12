import type { MetadataRoute } from "next";
import { getProjects } from "@/lib/store";
import { absoluteUrl } from "@/lib/site";

// Proiectele se editează din /admin, deci sitemap-ul se compune la cerere.
export const dynamic = "force-dynamic";

/**
 * /sitemap.xml — paginile publice plus câte o intrare per proiect.
 *
 * `lastModified` e omis intenționat: nu avem o dată reală de modificare per
 * pagină, iar a trimite mereu „acum" ar fi o informație falsă pentru crawleri.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/proiecte"), changeFrequency: "weekly", priority: 0.9 },
    { url: absoluteUrl("/despre"), changeFrequency: "monthly", priority: 0.6 },
    { url: absoluteUrl("/contact"), changeFrequency: "monthly", priority: 0.6 },
  ];

  let projectPages: MetadataRoute.Sitemap = [];
  try {
    const projects = await getProjects();
    projectPages = projects.map((p) => ({
      url: absoluteUrl(`/proiecte/${p.slug}`),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // Dacă store-ul nu răspunde, livrăm măcar paginile statice — un sitemap
    // parțial e preferabil unui 500 pentru crawler.
  }

  return [...staticPages, ...projectPages];
}
