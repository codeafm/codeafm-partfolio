import { build } from 'vite';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { getPages, getPage, renderHead, absoluteUrl, escapeHtml } from '../src/seo.js';
import { site } from '../src/data/site.js';

if (new URL(site.url).protocol !== 'https:') throw new Error('Set an HTTPS production domain in src/data/site.js.');
await build();
await build({
  build: {
    ssr: 'src/entry-server.jsx',
    outDir: '.tmp/ssr',
    copyPublicDir: false,
    rollupOptions: { output: { entryFileNames: 'entry-server.mjs' } },
  },
});
const { render } = await import(pathToFileURL(resolve('.tmp/ssr/entry-server.mjs')).href);
const template = await readFile('dist/index.html', 'utf8');
if (!template.includes('<!--app-html-->') || !template.includes('<!--seo:start-->')) throw new Error('Missing prerender markers in index.html.');
const pages = [...getPages(), getPage('/404')];
for (const page of pages) {
  const output = page.path === '/' ? 'dist/index.html' : `dist${page.path}.html`;
  const html = template
    .replace('<html lang="ru">', `<html lang="${page.lang || 'ru'}">`)
    .replace(/<!--seo:start-->[\s\S]*?<!--seo:end-->/, () => renderHead(page))
    .replace('<div id="root">', '<div id="root" data-prerendered="true">')
    .replace('<!--app-html-->', () => render(page.path));
  await mkdir(dirname(output), { recursive: true });
  await writeFile(output, html);
}
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${getPages().map(page => `  <url><loc>${escapeHtml(absoluteUrl(page.path))}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile('dist/sitemap.xml', sitemap);
await writeFile('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${site.url}/sitemap.xml\n`);
console.log(`Prerendered ${getPages().length} indexable pages and a 404 page. Generated sitemap.xml and robots.txt.`);
