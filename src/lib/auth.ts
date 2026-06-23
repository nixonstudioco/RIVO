/**
 * Autentificare admin (simplă, pentru o instanță locală cu un singur utilizator).
 * NOTĂ: credențialele sunt hardcodate la cererea clientului. Pentru producție,
 * mută-le în variabile de mediu și folosește un sistem de sesiuni real.
 *
 * Acest fișier NU folosește fs / Node API-uri — poate fi importat și din middleware (edge).
 */

export const ADMIN_USERNAME = "rivoimobiliare";
export const ADMIN_PASSWORD = "R!v01m0b1l1ar3";

export const AUTH_COOKIE = "rivo_admin_session";

/**
 * Token de sesiune fix (cookie httpOnly). E suficient pentru un admin local cu
 * credențiale fixe. Schimbă-l ca să invalidezi toate sesiunile existente.
 */
export const SESSION_TOKEN =
  "rivo.7f3c1a9e8b2d4f60a5e1c9d72b8a40f3.session";

export function verifyCredentials(username: string, password: string): boolean {
  return username === ADMIN_USERNAME && password === ADMIN_PASSWORD;
}
