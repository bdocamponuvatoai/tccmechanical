// Generates the smaller responsive variants used by image-loader.ts.
// Source photos live in public/assets/photos/<name>.webp (1536px wide).
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const dir = path.resolve('public/assets/photos');
const widths = [640, 960];
let written = 0;

for (const file of fs.readdirSync(dir)) {
  // Variants carry a numeric suffix (home-640.webp), so this matches sources only.
  if (!/^[a-z-]+\.webp$/.test(file)) continue;
  const src = path.join(dir, file);
  const srcTime = fs.statSync(src).mtimeMs;
  for (const width of widths) {
    const out = path.join(dir, file.replace(/\.webp$/, `-${width}.webp`));
    if (fs.existsSync(out) && fs.statSync(out).mtimeMs >= srcTime) continue;
    await sharp(src).resize({ width, withoutEnlargement: true }).webp({ quality: 74 }).toFile(out);
    written++;
  }
}

console.log(`images: ${written} variant(s) written, others up to date.`);
