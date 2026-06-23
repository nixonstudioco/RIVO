// Creează un proiect Supabase nou pentru RIVO și așteaptă să fie activ.
// Necesită SUPABASE_ACCESS_TOKEN în mediu.
// Utilizare: node scripts/create-supabase-project.mjs <org_id> [region] [name]
// NU afișează parola DB / cheile.

import crypto from "node:crypto";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

const API = "https://api.supabase.com/v1";
const ACCESS = process.env.SUPABASE_ACCESS_TOKEN;
const org = process.argv[2];
const region = process.argv[3] || "eu-central-1";
const name = process.argv[4] || "RIVO Imobiliare";

if (!ACCESS || !org) {
  console.error("Utilizare: node scripts/create-supabase-project.mjs <org_id> [region] [name]");
  process.exit(1);
}

const headers = {
  Authorization: `Bearer ${ACCESS}`,
  "Content-Type": "application/json",
};

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const dbPass = crypto.randomBytes(18).toString("base64url");

  console.log(`→ Creez proiectul "${name}" în ${region}...`);
  const res = await fetch(`${API}/projects`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      organization_id: org,
      region,
      db_pass: dbPass,
    }),
  });
  if (!res.ok) {
    throw new Error(`creare eșuată (${res.status}): ${await res.text()}`);
  }
  const project = await res.json();
  const ref = project.id;
  console.log(`  ✓ proiect creat — ref: ${ref}`);

  // Salvăm ref + parola DB lângă tokenuri (gitignored, în home).
  const secretsPath = path.join(os.homedir(), ".rivo", "secrets.env");
  fs.appendFileSync(
    secretsPath,
    `\n# RIVO Imobiliare project\nSUPABASE_PROJECT_REF=${ref}\nSUPABASE_DB_PASSWORD=${dbPass}\n`
  );
  console.log("  ✓ ref + parola DB salvate în ~/.rivo/secrets.env");

  // Așteptăm să fie ACTIVE_HEALTHY (provisioning).
  console.log("→ Aștept provisionarea (poate dura 1-3 min)...");
  const start = Date.now();
  let status = project.status;
  while (Date.now() - start < 6 * 60 * 1000) {
    const r = await fetch(`${API}/projects/${ref}`, { headers });
    if (r.ok) {
      const p = await r.json();
      status = p.status;
      process.stdout.write(`  status: ${status}\r`);
      if (status === "ACTIVE_HEALTHY") break;
    }
    await sleep(8000);
  }
  console.log(`\n  ✓ status final: ${status}`);

  if (status !== "ACTIVE_HEALTHY") {
    console.log("  (Proiectul încă se inițializează — mai poți aștepta puțin.)");
  }

  console.log(`\nREF=${ref}`);
}

main().catch((e) => {
  console.error("EROARE:", e.message);
  process.exit(1);
});
