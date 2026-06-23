// Generează variantele optimizate ale logo-ului RIVO din sursa în brand/.
// Rulează: node scripts/process-logo.mjs
import sharp from "sharp";
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const SRC = path.join(ROOT, "brand", "RIVO-OFFICIAL-source.png");
const PUBLIC = path.join(ROOT, "public");
const APP = path.join(ROOT, "src", "app");

const INK = "#0E0E10";

async function main() {
  // 1) Lockup complet, decupat (alb, transparent)
  const lockup = await sharp(SRC).trim().toBuffer();
  const lm = await sharp(lockup).metadata();
  console.log(`lockup trim: ${lm.width}x${lm.height}`);

  await sharp(lockup)
    .resize({ height: 360 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC, "logo-rivo.png"));

  // 2) Marca (clădirile) — decupez partea stângă apoi trim
  const cropW = Math.round(lm.width * 0.3);
  const mark = await sharp(lockup)
    .extract({ left: 0, top: 0, width: cropW, height: lm.height })
    .trim()
    .toBuffer();
  const mm = await sharp(mark).metadata();
  console.log(`mark trim: ${mm.width}x${mm.height}`);

  await sharp(mark)
    .resize({ height: 320 })
    .png({ compressionLevel: 9 })
    .toFile(path.join(PUBLIC, "logo-rivo-mark.png"));

  // Preview marcă pe ink (pentru verificare)
  const markH = (await sharp(mark).metadata()).height;
  await sharp({
    create: {
      width: 400,
      height: 400,
      channels: 4,
      background: INK,
    },
  })
    .composite([{ input: await sharp(mark).resize({ height: 220 }).toBuffer(), gravity: "center" }])
    .png()
    .toFile(path.join(ROOT, "_mark_preview.png"));

  // 3) Favicon / app icon — marca pe pătrat ink rotunjit
  const makeIcon = async (size, out) => {
    const radius = Math.round(size * 0.22);
    const roundedMask = Buffer.from(
      `<svg width="${size}" height="${size}"><rect width="${size}" height="${size}" rx="${radius}" ry="${radius}"/></svg>`
    );
    const base = await sharp({
      create: { width: size, height: size, channels: 4, background: INK },
    })
      .composite([
        {
          input: await sharp(mark)
            .resize({ height: Math.round(size * 0.5) })
            .toBuffer(),
          gravity: "center",
        },
      ])
      .png()
      .toBuffer();
    await sharp(base)
      .composite([{ input: roundedMask, blend: "dest-in" }])
      .png()
      .toFile(out);
  };

  await makeIcon(512, path.join(APP, "icon.png"));
  await makeIcon(180, path.join(APP, "apple-icon.png"));

  // 4) Imagine OpenGraph (1200x630) — lockup centrat pe ink + linie bronz
  const ogW = 1200;
  const ogH = 630;
  const accentLine = Buffer.from(
    `<svg width="${ogW}" height="${ogH}"><rect x="${ogW / 2 - 60}" y="515" width="120" height="3" fill="#B8956A"/></svg>`
  );
  await sharp({
    create: { width: ogW, height: ogH, channels: 4, background: INK },
  })
    .composite([
      {
        input: await sharp(lockup).resize({ width: 620 }).toBuffer(),
        top: 200,
        left: Math.round((ogW - 620) / 2),
      },
      { input: accentLine, top: 0, left: 0 },
    ])
    .png()
    .toFile(path.join(APP, "opengraph-image.png"));

  console.log("✓ assets generate: logo-rivo.png, logo-rivo-mark.png, icon.png, apple-icon.png, opengraph-image.png");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
