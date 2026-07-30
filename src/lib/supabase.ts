import "server-only";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

/**
 * Client Supabase server-only (folosește service role key — NU se expune în client).
 * Dacă variabilele de mediu lipsesc, aplicația rămâne pe store-ul bazat pe fișier
 * (vezi `@/lib/store`), ca să funcționeze și local fără Supabase.
 */

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

export const SUPABASE_BUCKET =
  process.env.SUPABASE_BUCKET || "rivo-media";

export function isSupabaseConfigured(): boolean {
  return Boolean(URL && SERVICE_KEY);
}

let client: SupabaseClient | null = null;

export function getSupabaseAdmin(): SupabaseClient {
  if (!isSupabaseConfigured()) {
    throw new Error("Supabase nu este configurat (lipsesc variabilele de mediu).");
  }
  if (!client) {
    client = createClient(URL!, SERVICE_KEY!, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        // Evită cache-ul de fetch al Next.js — citirile trebuie să fie mereu proaspete
        // (altfel modificările din /admin nu apar imediat pe site).
        fetch: (input, init) =>
          fetch(input as RequestInfo, { ...init, cache: "no-store" }),
      },
    });
  }
  return client;
}
