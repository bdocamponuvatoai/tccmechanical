// Post-build checks on the static export in out/.
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve('out');
if (!fs.existsSync(root)) {
  console.error('out/ not found. Run `npm run build` first.');
  process.exit(1);
}

const pages = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(file);
    else if (entry.name.endsWith('.html')) pages.push(file);
  }
})(root);

const exists = (target) => {
  const local = path.join(root, decodeURIComponent(target));
  return fs.existsSync(local) || fs.existsSync(path.join(local, 'index.html'));
};

const errors = [];
for (const file of pages) {
  const html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(root, file);

  if ((html.match(/<h1(?:\s|>)/g) || []).length !== 1) errors.push(`${rel}: expected exactly one <h1>`);
  if (!/<html lang="/.test(html)) errors.push(`${rel}: missing <html lang>`);
  if (!/<meta name="viewport"/.test(html)) errors.push(`${rel}: missing viewport meta`);

  for (const [, target] of html.matchAll(/(?:href|src)="(\/[^"?#]*)[^"]*"/g)) {
    if (!target.startsWith('//') && !exists(target)) errors.push(`${rel}: missing ${target}`);
  }
  for (const [, srcset] of html.matchAll(/srcset="([^"]+)"/gi)) {
    for (const candidate of srcset.split(',')) {
      const url = candidate.trim().split(/\s+/)[0];
      if (url?.startsWith('/') && !exists(url)) errors.push(`${rel}: missing srcset ${url}`);
    }
  }
  for (const [img] of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\salt="/.test(img)) errors.push(`${rel}: <img> without alt: ${img.slice(0, 80)}`);
  }
  const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
  for (const id of new Set(ids.filter((id, i) => ids.indexOf(id) !== i))) errors.push(`${rel}: duplicate id "${id}"`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}
console.log(`PASS: ${pages.length} HTML pages — internal links, assets, srcset variants, alt text, unique ids, one H1 per page.`);
