// Actualizează motto-ul hero în Supabase (rivo_settings).
// Necesită SUPABASE_ACCESS_TOKEN + SUPABASE_PROJECT_REF în mediu.
const API = "https://api.supabase.com/v1";
const ACCESS = process.env.SUPABASE_ACCESS_TOKEN;
const ref = process.env.SUPABASE_PROJECT_REF;

const titleTop = process.argv[2] || "Construit în jurul";
const titleAccent = process.argv[3] || "viitorului tău";

const query = `
update rivo_settings
set data = jsonb_set(
  jsonb_set(data, '{hero,titleTop}', to_jsonb('${titleTop.replace(/'/g, "''")}'::text)),
  '{hero,titleAccent}', to_jsonb('${titleAccent.replace(/'/g, "''")}'::text)
)
where id = 1
returning data->'hero' as hero;
`;

const res = await fetch(`${API}/projects/${ref}/database/query`, {
  method: "POST",
  headers: {
    Authorization: `Bearer ${ACCESS}`,
    "Content-Type": "application/json",
  },
  body: JSON.stringify({ query }),
});
if (!res.ok) {
  console.error("EROARE:", res.status, await res.text());
  process.exit(1);
}
console.log("✓ hero actualizat:", JSON.stringify(await res.json()));
