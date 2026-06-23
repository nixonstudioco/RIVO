// Setează variabilele de mediu Supabase pe site-ul Netlify (build + functions + runtime).
// Necesită NETLIFY_TOKEN în mediu. Citește valorile din .env.local.
// Utilizare: node scripts/netlify-env.mjs <account_slug_or_id> <site_id>
// NU afișează valorile.

import fs from "node:fs";
import path from "node:path";

const TOKEN = process.env.NETLIFY_TOKEN;
const account = process.argv[2];
const siteId = process.argv[3];

if (!TOKEN || !account || !siteId) {
  console.error("Utilizare: node scripts/netlify-env.mjs <account> <site_id>");
  process.exit(1);
}

// Parsează .env.local
const envFile = fs.readFileSync(path.join(process.cwd(), ".env.local"), "utf-8");
const env = {};
for (const line of envFile.split(/\r?\n/)) {
  const m = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (m) env[m[1]] = m[2];
}

const keys = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_SERVICE_ROLE_KEY",
  "SUPABASE_BUCKET",
];

const body = keys
  .filter((k) => env[k])
  .map((k) => ({
    key: k,
    scopes: ["builds", "functions", "runtime", "post_processing"],
    values: [{ value: env[k], context: "all" }],
  }));

const res = await fetch(
  `https://api.netlify.com/api/v1/accounts/${account}/env?site_id=${siteId}`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  }
);

if (!res.ok) {
  console.error("EROARE env:", res.status, await res.text());
  process.exit(1);
}
console.log("✓ variabile setate pe Netlify:", body.map((b) => b.key).join(", "));
