import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { getPages, getPage, renderHead, structuredData, absoluteUrl, aliases } from '../src/seo.js';
import { projects } from '../src/data/projects.js';
import { site } from '../src/data/site.js';

const pages = getPages();
const paths = new Set(pages.map(page => page.path));
const titles = new Set();
const descriptions = new Set();
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
assert.equal(paths.size, pages.length, 'Unique page paths');
assert.equal((sitemap.match(/<loc>/g) || []).length, pages.length, 'Sitemap lists every canonical page');
for (const page of pages) {
  const html = await readFile(page.path === '/' ? 'dist/index.html' : `dist${page.path}.html`, 'utf8');
  assert(html.includes('data-prerendered="true"'), `${page.path}: static content marker`);
  assert.equal((html.match(/<h1(?:\s|>)/g) || []).length, 1, `${page.path}: exactly one H1 in raw HTML`);
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, `${page.path}: exactly one canonical`);
  assert(html.includes(`rel="canonical" href="${absoluteUrl(page.path)}"`), `${page.path}: canonical URL`);
  assert(html.includes(`<html lang="${page.lang || 'ru'}">`), `${page.path}: language`);
  assert(html.includes(renderHead(page)), `${page.path}: full metadata present without JavaScript`);
  assert(!html.includes('noindex'), `${page.path}: indexable`);
  assert(!/primevpn/i.test(html), `${page.path}: excluded project absent`);
  assert(!titles.has(page.title), `${page.path}: unique title`);
  assert(!descriptions.has(page.description), `${page.path}: unique description`);
  titles.add(page.title); descriptions.add(page.description);
  const jsonLd = html.match(/<script type="application\/ld\+json" id="structured-data">([\s\S]*?)<\/script>/)?.[1];
  assert.deepEqual(JSON.parse(jsonLd), structuredData(page), `${page.path}: valid structured data`);
  assert(sitemap.includes(`<loc>${absoluteUrl(page.path)}</loc>`), `${page.path}: in sitemap`);
  for (const [, href] of html.matchAll(/(?:href|src)="(\/[^"#?]*)[^\"]*"/g)) {
    if (href === '/' || paths.has(href) || aliases[href]) continue;
    await access(`dist${decodeURIComponent(href)}`).catch(() => { throw new Error(`${page.path}: missing internal link or asset ${href}`); });
  }
}
const directory = await readFile('dist/projects.html', 'utf8');
for (const project of projects) assert(directory.includes(`href="/projects/${project.id}"`), `Crawlable link: ${project.id}`);
const missing = await readFile('dist/404.html', 'utf8');
assert(missing.includes('noindex, follow') && !missing.includes('rel="canonical"'), '404 must not be indexed or canonicalized to home');
assert(getPage('/does-not-exist').noindex, 'Unknown routes marked noindex');
for (const [alias, canonical] of Object.entries(aliases)) {
  assert.equal(getPage(alias).path, canonical);
  assert(!sitemap.includes(`<loc>${absoluteUrl(alias)}</loc>`));
}
const robots = await readFile('dist/robots.txt', 'utf8');
assert(robots.includes('Allow: /') && robots.includes(`Sitemap: ${site.url}/sitemap.xml`));
const config = JSON.parse((await readFile('vercel.json', 'utf8')).replace(/^\uFEFF/, ''));
assert(config.cleanUrls && config.trailingSlash === false && !config.rewrites, 'Vercel serves real static routes and 404');
for (const [source, destination] of Object.entries(aliases)) assert(config.redirects.some(rule => rule.source === source && rule.destination === destination && rule.permanent));
const unsafe = renderHead({ ...getPage('/'), title: '<script>"&</script>', description: '</script><script>alert(1)</script>' });
assert(!unsafe.includes('<script>alert(1)</script>'), 'Metadata safely escapes untrusted text');
console.log(`SEO checks passed: ${pages.length} prerendered pages, unique metadata, canonical URLs, structured data, assets and links, full catalog, robots/sitemap, aliases and 404.`);
