// Rasterizes public/icon.svg into the fallbacks browsers and devices still ask for.
// Run after editing the SVG: `npm run icons`.
import fs from 'node:fs';
import sharp from 'sharp';

const svg = fs.readFileSync('public/icon.svg');
const png = (size) => sharp(svg, { density: 72 * (size / 64) * 2 }).resize(size, size).png().toBuffer();

// favicon.ico: transparent PNG entries at 16/32/48 (PNG-in-ICO is supported by all current browsers).
const sizes = [16, 32, 48];
const images = await Promise.all(sizes.map(png));
const header = Buffer.alloc(6);
header.writeUInt16LE(0, 0);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = 6 + 16 * sizes.length;
const entries = sizes.map((size, i) => {
  const entry = Buffer.alloc(16);
  entry.writeUInt8(size, 0);
  entry.writeUInt8(size, 1);
  entry.writeUInt16LE(1, 4);
  entry.writeUInt16LE(32, 6);
  entry.writeUInt32LE(images[i].length, 8);
  entry.writeUInt32LE(offset, 12);
  offset += images[i].length;
  return entry;
});
fs.writeFileSync('public/favicon.ico', Buffer.concat([header, ...entries, ...images]));

// Apple touch icon: iOS paints transparent pixels black, so this one alone gets a white tile.
const mark = await sharp(svg, { density: 400 }).resize(124, 124).png().toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#ffffff' } })
  .composite([{ input: mark, gravity: 'center' }])
  .png()
  .toFile('public/apple-icon.png');

console.log('icons: favicon.ico (16/32/48) and apple-icon.png written.');
