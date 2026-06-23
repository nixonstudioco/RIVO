// Setează secrete în repo-ul GitHub (criptate cu cheia publică a repo-ului).
// Necesită GITHUB_TOKEN, NETLIFY_TOKEN, NETLIFY_SITE_ID în mediu.
// NU afișează valorile.

import sodium from "libsodium-wrappers";

const REPO = "nixonstudioco/RIVO";
const GH = process.env.GITHUB_TOKEN;

const secrets = {
  NETLIFY_AUTH_TOKEN: process.env.NETLIFY_TOKEN,
  NETLIFY_SITE_ID: process.env.NETLIFY_SITE_ID,
};

if (!GH || !secrets.NETLIFY_AUTH_TOKEN || !secrets.NETLIFY_SITE_ID) {
  console.error("Lipsesc GITHUB_TOKEN / NETLIFY_TOKEN / NETLIFY_SITE_ID.");
  process.exit(1);
}

const ghHeaders = {
  Authorization: `Bearer ${GH}`,
  Accept: "application/vnd.github+json",
  "Content-Type": "application/json",
};

async function main() {
  await sodium.ready;

  const keyRes = await fetch(
    `https://api.github.com/repos/${REPO}/actions/secrets/public-key`,
    { headers: ghHeaders }
  );
  if (!keyRes.ok) throw new Error(`public-key: ${keyRes.status} ${await keyRes.text()}`);
  const { key, key_id } = await keyRes.json();

  for (const [name, value] of Object.entries(secrets)) {
    const binkey = sodium.from_base64(key, sodium.base64_variants.ORIGINAL);
    const binsec = sodium.from_string(value);
    const enc = sodium.crypto_box_seal(binsec, binkey);
    const encrypted_value = sodium.to_base64(enc, sodium.base64_variants.ORIGINAL);

    const res = await fetch(
      `https://api.github.com/repos/${REPO}/actions/secrets/${name}`,
      {
        method: "PUT",
        headers: ghHeaders,
        body: JSON.stringify({ encrypted_value, key_id }),
      }
    );
    if (!res.ok) throw new Error(`set ${name}: ${res.status} ${await res.text()}`);
    console.log(`✓ secret setat: ${name}`);
  }
}

main().catch((e) => {
  console.error("EROARE:", e.message);
  process.exit(1);
});
