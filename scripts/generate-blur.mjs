#!/usr/bin/env node
/**
 * Build-time blur-placeholder generator.
 *
 * Reads every image under /public/images, downsamples it to a tiny JPEG via
 * sharp, base64-encodes it, and emits a JSON map { "/images/foo.jpg": "data:..." }
 * to /src/lib/generated/blur-map.json. The runtime <Image placeholder="blur">
 * wrapper imports that map.
 *
 * Idempotent: re-running overwrites the JSON. Safe to wire into prebuild.
 */
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const IMAGES_DIR = path.join(projectRoot, "public", "images");
const OUTPUT_DIR = path.join(projectRoot, "src", "lib", "generated");
const OUTPUT_FILE = path.join(OUTPUT_DIR, "blur-map.json");

const ACCEPTED = new Set([".jpg", ".jpeg", ".png", ".webp"]);

async function main() {
  const entries = await fs.readdir(IMAGES_DIR, { withFileTypes: true });
  const files = entries
    .filter((e) => e.isFile() && ACCEPTED.has(path.extname(e.name).toLowerCase()))
    .map((e) => e.name);

  if (files.length === 0) {
    console.warn(`[blur] no images found in ${IMAGES_DIR}`);
    return;
  }

  const map = {};
  for (const file of files) {
    const abs = path.join(IMAGES_DIR, file);
    try {
      const buf = await sharp(abs)
        .resize(16, 16, { fit: "inside" })
        .jpeg({ quality: 50 })
        .toBuffer();
      const dataUri = `data:image/jpeg;base64,${buf.toString("base64")}`;
      map[`/images/${file}`] = dataUri;
    } catch (err) {
      console.error(`[blur] failed for ${file}:`, err.message);
    }
  }

  await fs.mkdir(OUTPUT_DIR, { recursive: true });
  await fs.writeFile(OUTPUT_FILE, JSON.stringify(map, null, 2) + "\n");
  console.log(`[blur] wrote ${Object.keys(map).length} placeholders → ${path.relative(projectRoot, OUTPUT_FILE)}`);
}

main().catch((err) => {
  console.error("[blur] fatal:", err);
  process.exit(1);
});
