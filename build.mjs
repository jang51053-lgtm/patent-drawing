// Builds the offline single-file version: inlines the CDN libraries from vendor/.
// Usage: node build.mjs
import fs from 'node:fs';

const libs = {
  'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js': 'vendor/three.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js': 'vendor/jspdf.umd.min.js',
};

let html = fs.readFileSync('index.html', 'utf8');
for (const [url, file] of Object.entries(libs)) {
  const tag = `<script src="${url}"></script>`;
  if (!html.includes(tag)) throw new Error(`script tag not found: ${url}`);
  const code = fs.readFileSync(file, 'utf8').replace(/<\/script/gi, '<\\/script');
  html = html.replace(tag, () => `<script>${code}</script>`);
}
const out = '특허도면변환기.html';
fs.writeFileSync(out, html);
console.log(`${out} (${(html.length / 1024).toFixed(0)} KB)`);
