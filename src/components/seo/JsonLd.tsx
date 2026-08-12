import type { SiteSettings } from "@/lib/types";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL, absoluteUrl } from "@/lib/site";

/**
 * Date structurate schema.org. Google le folosește pentru rezultatele bogate
 * și pentru panoul de informații al firmei (nume, adresă, telefon, logo).
 *
 * Valorile de contact vin din setări, nu sunt scrise aici: altfel ar trebui
 * ținute manual în acord cu ce se editează în /admin.
 */

/** „Sălciilor 16, Satu Mare" -> stradă + oraș. */
function splitAddress(address: string): { street: string; city: string } {
  const parts = address
    .split(",")
    .map((p) => p.trim())
    .filter(Boolean);
  if (parts.length < 2) return { street: address.trim(), city: "Satu Mare" };
  return {
    street: parts.slice(0, -1).join(", "),
    city: parts[parts.length - 1],
  };
}

/** Câmpul de telefon poate conține mai multe numere separate prin „/". */
function splitPhones(phone: string): string[] {
  return phone
    .split("/")
    .map((p) => p.trim())
    .filter(Boolean);
}

function jsonLdScript(data: unknown) {
  return (
    <script
      type="application/ld+json"
      // Conținutul e generat de noi, nu vine din input nefiltrat de utilizator.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

/** Organizația + site-ul. Se randează o dată, în layout-ul public. */
export function OrganizationJsonLd({ settings }: { settings: SiteSettings }) {
  const { street, city } = splitAddress(settings.contact.address);
  const phones = splitPhones(settings.contact.phone);

  // Linkurile de social încă neconfigurate sunt „#" — nu le trimitem.
  const sameAs = [
    settings.social.facebook,
    settings.social.instagram,
    settings.social.linkedin,
  ].filter((u) => u && u !== "#" && u.startsWith("http"));

  const org = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE_URL}/#organizatie`,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    logo: absoluteUrl("/icon-512.png"),
    image: absoluteUrl("/opengraph-image.png"),
    address: {
      "@type": "PostalAddress",
      streetAddress: street,
      addressLocality: city,
      addressRegion: "Satu Mare",
      addressCountry: "RO",
    },
    ...(phones.length && { telephone: phones }),
    ...(settings.contact.email && { email: settings.contact.email }),
    areaServed: { "@type": "City", name: "Satu Mare" },
    ...(sameAs.length && { sameAs }),
  };

  const website = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#site`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: "ro-RO",
    publisher: { "@id": `${SITE_URL}/#organizatie` },
  };

  return (
    <>
      {jsonLdScript(org)}
      {jsonLdScript(website)}
    </>
  );
}

/** Un ansamblu rezidențial, pe pagina lui de detaliu. */
export function ProjectJsonLd({
  name,
  description,
  slug,
  location,
  images,
}: {
  name: string;
  description: string;
  slug: string;
  location: string;
  images: string[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "ApartmentComplex",
    name,
    description,
    url: absoluteUrl(`/proiecte/${slug}`),
    ...(images.length && { image: images }),
    address: {
      "@type": "PostalAddress",
      addressLocality: location,
      addressCountry: "RO",
    },
    provider: { "@id": `${SITE_URL}/#organizatie` },
  };

  return jsonLdScript(data);
}

/** Firimituri de navigare — Google le afișează în locul URL-ului brut. */
export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; path: string }[];
}) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };

  return jsonLdScript(data);
}
