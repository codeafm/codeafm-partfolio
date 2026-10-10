import { projects } from './data/projects.js';
import { servicesData } from './data/services.js';
import { site } from './data/site.js';

export const aliases = { '/privacy': '/bottle-sort/privacy', '/support': '/bottle-sort/support' };
const legalPages = [
  { path: '/last-tower/privacy', title: 'Последняя башня — Политика конфиденциальности | CodeAFM', description: 'Как Last Tower обрабатывает данные профиля, игровой прогресс, сетевые сессии, рекламу и обращения игроков. Контакты разработчика и запросы об удалении данных.', lang: 'ru' },
  { path: '/last-tower/support', title: 'Последняя башня — Поддержка игры | CodeAFM', description: 'Помощь с Last Tower на iPhone и Android: сетевые бои, герои, сохранение прогресса, реклама и связь с разработчиком.', lang: 'ru' },
  { path: '/pull-rescue/privacy', title: 'Pull & Rescue 3D — Политика конфиденциальности | CodeAFM', description: 'Политика конфиденциальности Pull & Rescue 3D для Android и iOS: сохранение прогресса, реклама, настройки конфиденциальности и обращения в поддержку.', lang: 'ru' },
  { path: '/pull-rescue/support', title: 'Pull & Rescue 3D — Поддержка игры | CodeAFM', description: 'Помощь с Pull & Rescue 3D: запуск игры, уровни, сохранение прогресса, звук, реклама и связь с разработчиком CodeAFM.', lang: 'ru' },
  { path: '/bottle-sort/privacy', title: 'Bottle Sort — Privacy Policy | CodeAFM', description: 'Privacy policy for Bottle Sort by CodeAFM. Learn how the app handles information, advertising, permissions and support requests.', lang: 'en' },
  { path: '/bottle-sort/support', title: 'Bottle Sort — Support | CodeAFM', description: 'Get help with Bottle Sort by CodeAFM. Find troubleshooting guidance and contact the developer about the puzzle game.', lang: 'en' },
  { path: '/crowd-clash/privacy', title: 'Crowd Clash — Privacy Policy | CodeAFM', description: 'Privacy policy for Crowd Clash by CodeAFM. Information about accounts, advertising, data handling and your privacy choices.', lang: 'en' },
  { path: '/crowd-clash/support', title: 'Crowd Clash — Support | CodeAFM', description: 'Contact CodeAFM for Crowd Clash support. Troubleshoot the game, report a problem or send feedback to the developer.', lang: 'en' },
  { path: '/bubble-pop/privacy', title: 'Bubble Pop — Privacy Policy | CodeAFM', description: 'Privacy policy for Bubble Pop by CodeAFM: local progress, Yandex and Unity advertising, support requests and your privacy choices.', lang: 'en' },
  { path: '/bubble-pop/support', title: 'Bubble Pop — Support | CodeAFM', description: 'Get help with Bubble Pop on iPhone and Android. Contact CodeAFM about gameplay, saved progress, advertisements and technical problems.', lang: 'en' },
];
export const projectPath = project => `/projects/${project.id}`;
export function normalizePath(path = '/') {
  return path.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
}
export const absoluteUrl = path => new URL(path, `${site.url}/`).href;

export function getPages() {
  return [
    { path: '/', title: 'CodeAFM — разработка сайтов и приложений Android и iOS', description: site.description, kind: 'home' },
    { path: '/projects', title: 'Каталог приложений, игр и сайтов CodeAFM', description: `Все ${projects.length} проекта CodeAFM: приложения, мобильные игры и сайты. Скриншоты, описание и ссылки на RuStore и работающие веб-проекты.`, kind: 'directory' },
    ...projects.map(project => ({ path: projectPath(project), title: `${project.title} — ${project.category === 'web' ? 'сайт' : `${project.category === 'games' ? 'игра' : 'приложение'} для ${project.platform?.includes('iOS') ? 'Android и iOS' : 'Android'}`} | CodeAFM`, description: project.description, project, kind: 'project' })),
    ...servicesData.map(service => ({ path: `/services/${service.id}`, title: service.seoTitle, description: service.description, service, kind: 'service' })),
    ...legalPages,
  ];
}
export function getPage(pathname) {
  const path = normalizePath(pathname);
  return getPages().find(page => page.path === (aliases[path] || path)) || {
    path, title: 'Страница не найдена | CodeAFM', description: 'Эта страница не найдена. Перейдите на главную CodeAFM или в каталог наших проектов.', noindex: true, kind: 'not-found',
  };
}
function breadcrumbs(page) {
  const items = [{ name: 'CodeAFM', item: absoluteUrl('/') }];
  if (page.project) items.push({ name: 'Проекты', item: absoluteUrl('/projects') });
  items.push({ name: page.project?.title || page.service?.title || (page.kind === 'directory' ? 'Проекты' : page.title.split(' | ')[0]), item: absoluteUrl(page.path) });
  return { '@type': 'BreadcrumbList', itemListElement: items.map((item, index) => ({ '@type': 'ListItem', position: index + 1, ...item })) };
}
export function structuredData(page) {
  if (page.noindex) return null;
  const organizationId = `${site.url}/#organization`;
  const websiteId = `${site.url}/#website`;
  const url = absoluteUrl(page.path);
  const graph = [
    { '@type': 'Organization', '@id': organizationId, name: site.name, url: absoluteUrl('/'), logo: { '@type': 'ImageObject', url: absoluteUrl(site.logo), width: 512, height: 512 }, email: site.email, sameAs: [site.developerUrl, site.telegram] },
    { '@type': 'WebSite', '@id': websiteId, name: site.name, url: absoluteUrl('/'), inLanguage: 'ru', publisher: { '@id': organizationId } },
    { '@type': page.kind === 'directory' ? 'CollectionPage' : 'WebPage', '@id': `${url}#webpage`, url, name: page.title, description: page.description, inLanguage: page.lang || 'ru', isPartOf: { '@id': websiteId } },
  ];
  if (page.path !== '/') graph.push(breadcrumbs(page));
  if (page.kind === 'directory') graph.push({ '@type': 'ItemList', name: 'Проекты CodeAFM', itemListElement: projects.map((project, index) => ({ '@type': 'ListItem', position: index + 1, name: project.title, url: absoluteUrl(projectPath(project)) })) });
  if (page.project?.storeUrl) {
    const project = page.project;
    graph.push({ '@type': 'SoftwareApplication', '@id': `${url}#application`, name: project.title, url, description: project.description, operatingSystem: project.platform || 'Android', applicationCategory: project.category === 'games' ? 'GameApplication' : 'MobileApplication', image: absoluteUrl(project.icon), screenshot: project.screenshots.map(absoluteUrl), downloadUrl: project.storeUrl, author: { '@id': organizationId }, mainEntityOfPage: { '@id': `${url}#webpage` } });
  }
  if (page.service) graph.push({ '@type': 'Service', '@id': `${url}#service`, name: page.service.title, serviceType: page.service.title, description: page.description, url, provider: { '@id': organizationId }, mainEntityOfPage: { '@id': `${url}#webpage` } });
  return { '@context': 'https://schema.org', '@graph': graph };
}
export function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}
function tagsFor(page) {
  const image = absoluteUrl(site.image);
  return [
    ['name', 'description', page.description],
    ['name', 'robots', page.noindex ? 'noindex, follow' : 'index, follow, max-image-preview:large'],
    ['property', 'og:type', 'website'], ['property', 'og:site_name', site.name],
    ['property', 'og:title', page.title], ['property', 'og:description', page.description],
    ['property', 'og:url', absoluteUrl(page.path)], ['property', 'og:locale', page.lang === 'en' ? 'en_US' : 'ru_RU'],
    ['property', 'og:image', image], ['property', 'og:image:width', '1200'], ['property', 'og:image:height', '630'],
    ['property', 'og:image:alt', 'CodeAFM — разработка сайтов, приложений и игр'],
    ['name', 'twitter:card', 'summary_large_image'], ['name', 'twitter:title', page.title],
    ['name', 'twitter:description', page.description], ['name', 'twitter:image', image],
    ['name', 'twitter:image:alt', 'CodeAFM — разработка сайтов, приложений и игр'],
  ];
}
export function renderHead(page) {
  const data = structuredData(page);
  return [
    `<title>${escapeHtml(page.title)}</title>`,
    ...tagsFor(page).map(([key, name, content]) => `<meta ${key}="${name}" content="${escapeHtml(content)}" />`),
    ...(!page.noindex ? [`<link rel="canonical" href="${escapeHtml(absoluteUrl(page.path))}" />`] : []),
    ...(data ? [`<script type="application/ld+json" id="structured-data">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`] : []),
  ].join('\n    ');
}

// Development uses client rendering; production receives the same metadata in HTML.
export function applyMetadata(pathname) {
  const page = getPage(pathname);
  document.title = page.title;
  document.documentElement.lang = page.lang || 'ru';
  for (const [key, name, content] of tagsFor(page)) {
    let element = document.head.querySelector(`meta[${key}="${name}"]`);
    if (!element) { element = document.createElement('meta'); element.setAttribute(key, name); document.head.append(element); }
    element.content = content;
  }
  let canonical = document.head.querySelector('link[rel="canonical"]');
  if (page.noindex) canonical?.remove();
  else {
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.append(canonical); }
    canonical.href = absoluteUrl(page.path);
  }
  document.getElementById('structured-data')?.remove();
  const data = structuredData(page);
  if (data) {
    const script = document.createElement('script');
    script.type = 'application/ld+json'; script.id = 'structured-data'; script.textContent = JSON.stringify(data); document.head.append(script);
  }
}
