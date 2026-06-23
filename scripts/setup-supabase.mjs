// Configurează un proiect Supabase pentru RIVO:
//  1. rulează schema SQL (tabele)
//  2. citește URL + service_role key
//  3. creează bucket-ul de storage (public)
//  4. scrie .env.local
//
// Necesită: SUPABASE_ACCESS_TOKEN în mediu (din ~/.rivo/secrets.env).
// Utilizare: node scripts/setup-supabase.mjs <project-ref>
//
// NU afișează cheile secrete în consolă.

import fs from "node:fs";
import path from "node:path";

const API = "https://api.supabase.com/v1";
const ACCESS = process.env.SUPABASE_ACCESS_TOKEN;
const ref = process.argv[2];

if (!ACCESS) {
  console.error("Lipsește SUPABASE_ACCESS_TOKEN în mediu.");
  process.exit(1);
}
if (!ref) {
  console.error("Utilizare: node scripts/setup-supabase.mjs <project-ref>");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${ACCESS}`,
  "Content-Type": "application/json",
};

async function runSql(query) {
  const res = await fetch(`${API}/projects/${ref}/database/query`, {
    method: "POST",
    headers,
    body: JSON.stringify({ query }),
  });
  if (!res.ok) {
    throw new Error(`SQL eșuat (${res.status}): ${await res.text()}`);
  }
}

async function getServiceKey() {
  const res = await fetch(`${API}/projects/${ref}/api-keys`, { headers });
  if (!res.ok) throw new Error(`api-keys eșuat: ${await res.text()}`);
  const keys = await res.json();
  const svc = keys.find((k) => k.name === "service_role");
  if (!svc) throw new Error("Nu am găsit cheia service_role.");
  return svc.api_key;
}

async function createBucket(url, serviceKey, bucket) {
  const res = await fetch(`${url}/storage/v1/bucket`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${serviceKey}`,
      apikey: serviceKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: bucket, name: bucket, public: true }),
  });
  if (res.ok) return "creat";
  const txt = await res.text();
  if (txt.includes("already exists") || res.status === 409) return "există deja";
  throw new Error(`bucket eșuat (${res.status}): ${txt}`);
}

async function main() {
  const bucket = process.env.SUPABASE_BUCKET || "rivo-media";
  const url = `https://${ref}.supabase.co`;

  console.log("→ Rulez schema SQL...");
  const schema = fs.readFileSync(
    path.join(process.cwd(), "supabase", "schema.sql"),
    "utf-8"
  );
  await runSql(schema);
  console.log("  ✓ tabele create");

  console.log("→ Citesc cheia service_role...");
  const serviceKey = await getServiceKey();
  console.log("  ✓ cheie obținută");

  console.log("→ Creez bucket-ul de storage...");
  const bucketStatus = await createBucket(url, serviceKey, bucket);
  console.log(`  ✓ bucket '${bucket}': ${bucketStatus}`);

  console.log("→ Scriu .env.local...");
  const env = [
    `NEXT_PUBLIC_SUPABASE_URL=${url}`,
    `SUPABASE_SERVICE_ROLE_KEY=${serviceKey}`,
    `SUPABASE_BUCKET=${bucket}`,
    "",
  ].join("\n");
  fs.writeFileSync(path.join(process.cwd(), ".env.local"), env, "utf-8");
  console.log("  ✓ .env.local scris (gitignored)");

  console.log("\n✓ Supabase configurat. Proiect:", url);
}

main().catch((e) => {
  console.error("EROARE:", e.message);
  process.exit(1);
});
