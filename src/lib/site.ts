/**
 * Constante despre site, folosite de metadate, robots.txt, sitemap și JSON-LD.
 * Fără dependențe de Node — se poate importa și din client.
 *
 * IMPORTANT: `SITE_URL` trebuie să fie domeniul care rezolvă efectiv în DNS.
 * Din el se generează canonical-urile și URL-urile din cardurile de share; un
 * domeniu greșit face ca previzualizările pe Facebook/WhatsApp să nu încarce.
 */
export const SITE_URL = "https://rivoimobiliare.com";

export const SITE_NAME = "RIVO Imobiliare";

export const SITE_DESCRIPTION =
  "RIVO Imobiliare dezvoltă proiecte rezidențiale și mixte premium în Satu Mare. Construim viitorul orașului — apartamente, case și ansambluri cu finisaje de calitate, predate la timp.";

/** URL absolut pentru o cale relativă din site. */
export function absoluteUrl(path = "/"): string {
  return new URL(path, SITE_URL).toString();
}
