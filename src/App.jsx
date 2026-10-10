import { LastTowerPrivacy, LastTowerSupport } from './LastTower';
import { useEffect, useRef, useState } from 'react';
import { projects } from './data/projects';
import { BottleSortPrivacy, BottleSortSupport } from './BottleSort';
import { CrowdClashPrivacy, CrowdClashSupport } from './CrowdClash';
import { BubblePopPrivacy, BubblePopSupport } from './BubblePop';
import { PullRescuePrivacy, PullRescueSupport } from './PullRescue';
import ProjectRequest from './components/ProjectRequest';
import ProductStage from './components/ProductStage';
import FeaturedWork from './components/FeaturedWork';
import ProjectProcess from './components/ProjectProcess';
import ServiceIllustration from './components/ServiceIllustration';
import { ProjectPage, ProjectDirectory } from './components/ProjectPages';
import ServicePage from './components/ServicePage';
import { servicesData } from './data/services';
import { normalizePath } from './seo';
import './App.css';
import './Refinement.css';

const TELEGRAM = 'https://t.me/fizbit00';
const categories = [{ id: 'all', label: 'Все проекты' }, { id: 'apps', label: 'Приложения' }, { id: 'games', label: 'Игры' }, { id: 'web', label: 'Сайты' }];
const categoryNames = { apps: 'Приложение', games: 'Игра', web: 'Веб-сайт' };

function Icon({ name = 'arrow', size = 20, ...props }) {
  const paths = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    diagonal: <><path d="M6 18 18 6M6 6h12v12" /></>,
    code: <><path d="m8 7-5 5 5 5m8-10 5 5-5 5m-3-14-2 18" /></>,
    phone: <><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M10 18h4M10 5h4" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18" /></>,
    game: <><path d="M7 7h10c3 0 4 3 5 10 .3 2-2 3-3 1l-3-3H8l-3 3c-1 2-3.3 1-3-1 1-7 2-10 5-10Z" /><path d="M7 9v5m-2.5-2.5h5M16 10h.01M18 12h.01" /></>,
    search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
    close: <path d="m6 6 12 12M6 18 18 6" />,
    check: <path d="m5 12 4 4L19 6" />,
    mail: <><rect x="3" y="5" width="18" height="14" rx="3" /><path d="m3 7 9 6 9-6" /></>,
    telegram: <><path d="m21 3-4 18-6-5-4 3 1-6L3 11 21 3Z" /><path d="m8 13 9-6-6 9" /></>,
    layers: <><path d="m12 3 10 5-10 5L2 8l10-5Zm-9 9 9 5 9-5M3 16l9 5 9-5" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{paths[name] || paths.arrow}</svg>;
}

function Brand({ light = false }) {
  return <a href="/#top" className={`brand ${light ? 'brand-light' : ''}`} aria-label="CodeAFM — на главную"><img src="/brand-mark.svg" alt="" width="42" height="28" /><span>codeafm<span className="brand-period">.</span></span></a>;
}

function useReveal() {
  useEffect(() => {
    const elements = document.querySelectorAll('[data-reveal]');
    if (!('IntersectionObserver' in window) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('revealed'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    elements.forEach(element => { element.classList.add('will-reveal'); observer.observe(element); });
    return () => observer.disconnect();
  }, []);
}

function Header({ onRequest }) {
  const [menu, setMenu] = useState(false);
  useEffect(() => {
    if (!menu) return;
    const close = event => { if (event.key === 'Escape') setMenu(false); };
    window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [menu]);
  return <header className="site-header"><div className="shell header-inner">
    <Brand />
    <nav className={`main-nav ${menu ? 'is-open' : ''}`} aria-label="Главная навигация" id="main-nav">
      {[['projects', 'Проекты'], ['services', 'Услуги'], ['process', 'Как работаем'], ['about', 'О студии']].map(([id, label]) => <a key={id} href={id === 'projects' ? '/projects' : `/#${id}`} onClick={() => setMenu(false)}>{label}</a>)}
      <button className="mobile-request" onClick={() => { setMenu(false); onRequest(); }}>Обсудить проект <Icon name="diagonal" /></button>
    </nav>
    <button className="button button-dark header-request" onClick={() => onRequest()}>Обсудить проект <Icon name="diagonal" size={17} /></button>
    <button className={`menu-toggle ${menu ? 'is-open' : ''}`} aria-label={menu ? 'Закрыть меню' : 'Открыть меню'} aria-expanded={menu} aria-controls="main-nav" onClick={() => setMenu(!menu)}><span /><span /></button>
  </div></header>;
}

function Hero({ onRequest, onSelect }) {
  return <section className="hero shell hero-refined" id="top">
    <div className="hero-copy">
      <span className="availability"><span className="status-dot" /> Открыты к новым проектам</span>
      <h1>Ваша идея.<br />Наш код.<br /><span className="purple-text">Большие<br /><span className="hero-underlined">возможности.</span></span></h1>
      <p>Разрабатываем сайты, приложения<br className="desktop-break" /> для Android и iOS и мобильные игры.<br /><span className="hero-copy-detail">От первого «а давайте» до запуска.</span></p>
      <div className="hero-actions"><button className="button button-primary" onClick={() => onRequest()}>Создать мой проект <span className="button-arrow"><Icon name="diagonal" /></span></button><a href="#projects" className="text-link">Смотреть работы <Icon name="arrow" size={18} /></a></div>
      <div className="hero-proof"><div className="mini-apps">{['sweet-candy', 'bottle-sort', 'merge-market', '2048'].map(id => <img key={id} src={projects.find(project => project.id === id).icon} alt="" />)}</div><span><strong>{projects.filter(project => project.storeUrl).length} приложений · {projects.filter(project => project.category === 'web').length} сайта</strong><br />Созданы нами. Уже работают.</span></div>
    </div>
    <ProductStage projects={projects} onSelect={onSelect} />
    <div className="hero-capabilities">
      <div><span className="capability-icon"><Icon name="layers" size={22} /></span><span><strong>Дизайн с характером</strong><small>Чтобы вас запомнили</small></span></div>
      <div><span className="capability-icon"><Icon name="code" size={22} /></span><span><strong>Разработка под ключ</strong><small>Всё работает вместе</small></span></div>
      <div><span className="capability-icon"><Icon name="check" size={22} /></span><span><strong>Рядом после запуска</strong><small>Развиваем ваш продукт</small></span></div>
    </div>
  </section>;
}

function ProjectDetails({ project, onClose, onRequest }) {
  const dialog = useRef(null);
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const element = dialog.current;
    const previous = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    element.showModal();
    return () => { element.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  const images = project.screenshots || [];
  const move = direction => setIndex(current => (current + direction + images.length) % images.length);
  return <dialog ref={dialog} className="project-dialog" aria-labelledby="project-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }} onKeyDown={event => { if (images.length > 1 && event.key === 'ArrowRight') move(1); if (images.length > 1 && event.key === 'ArrowLeft') move(-1); }}>
    <div className="project-dialog-content"><button className="close-button" onClick={onClose} aria-label="Закрыть проект" autoFocus><Icon name="close" /></button>
      <div className="project-dialog-heading"><img src={project.icon} alt="" /><div><span className="section-kicker">{categoryNames[project.category]}</span><h2 id="project-title">{project.title}</h2></div></div>
      <p className="project-description">{project.description}</p><div className="tags">{project.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
      {images.length > 0 ? <div className="project-gallery"><div className="gallery-stage"><img key={index} src={images[index]} alt={`${project.title} — скриншот ${index + 1} из ${images.length}`} /></div>{images.length > 1 && <div className="gallery-controls"><button className="round-button" onClick={() => move(-1)} aria-label="Предыдущий скриншот">←</button><span aria-live="polite">{index + 1} / {images.length}</span><button className="round-button" onClick={() => move(1)} aria-label="Следующий скриншот">→</button></div>}</div> : <div className="project-placeholder"><img src={project.icon} alt={project.title} /><span>Скриншоты появятся позже</span></div>}
      {images.length > 1 && <div className="gallery-thumbnails" role="group" aria-label="Выбрать скриншот">{images.map((src, imageIndex) => <button key={src} aria-label={`Скриншот ${imageIndex + 1}`} aria-pressed={index === imageIndex} onClick={() => setIndex(imageIndex)}><img src={src} alt="" loading="lazy" /></button>)}</div>}<a className="project-permalink" href={`/projects/${project.id}`}>Страница проекта <Icon name="diagonal" size={16} /></a><div className="project-dialog-actions">{project.storeUrl && <a className="button button-dark" href={project.storeUrl} target="_blank" rel="noreferrer">Скачать в RuStore <Icon name="diagonal" /></a>}{project.url && <a className="button button-dark" href={project.url} target="_blank" rel="noreferrer">Открыть сайт <Icon name="diagonal" /></a>}<button className="button button-primary" onClick={() => onRequest(project.category === 'games' ? 'Игра' : project.category === 'web' ? 'Сайт' : 'Android / iOS')}>Хочу похожий проект <Icon name="arrow" /></button></div>
      {(project.privacy || project.support) && <div className="project-legal-links">{project.support && <a href={project.support}>Поддержка</a>}{project.privacy && <a href={project.privacy}>Конфиденциальность</a>}</div>}
    </div>
  </dialog>;
}

function ProjectCard({ project, onSelect, index }) {
  return <article className="project-card" style={{ '--card-color': project.color || '#eee7ff', '--card-delay': `${index % 6 * 55}ms` }}>
    <button className={`project-art project-art-${project.category}`} onClick={() => onSelect(project)} aria-label={`Подробнее: ${project.title}`}>
      <span className="project-type">{categoryNames[project.category]}</span><span className="project-open"><Icon name="diagonal" size={20} /></span>
      <div className="art-orbit" />
      {project.category === 'web' && project.screenshots.length ? <div className="web-preview"><div><i /><i /><i /></div><img src={project.screenshots[0]} alt={`Превью сайта ${project.title}`} loading="lazy" /></div> : <><img className="project-app-icon" src={project.icon} alt="" loading="lazy" />{project.screenshots.length > 0 && <div className={`project-screen ${project.orientation === 'landscape' ? 'screen-landscape' : ''}`}><img src={project.screenshots[0]} alt={`Превью ${project.title}`} loading="lazy" /></div>}<span className="art-project-name">{project.title}</span></>}
    </button>
    <div className="project-card-info"><div><h3><a href={`/projects/${project.id}`}>{project.title}</a></h3><span>{project.tags.slice(0, 3).join(' · ')}</span></div><button onClick={() => onSelect(project)} className="card-details" aria-label={`Открыть ${project.title}`}><Icon name="diagonal" size={18} /></button></div>
  </article>;
}

function Catalog({ onSelect }) {
  const [category, setCategory] = useState('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(false);
  const filtered = projects.filter(project => (category === 'all' || project.category === category) && `${project.title} ${project.description} ${project.tags.join(' ')}`.toLowerCase().includes(search.toLowerCase().trim()));
  const visible = expanded || category !== 'all' || search ? filtered : filtered.slice(0, 6);
  return <section className="projects-section section-space" id="projects"><div className="shell"><FeaturedWork projects={projects} onSelect={onSelect} />
    <div className="section-heading catalog-heading" data-reveal><div><span className="section-kicker"><span /> КАТАЛОГ CODEAFM</span><h2>Всё, что мы <span className="muted-heading">создали.</span></h2></div><p>Найдите то, что вдохновит<br />на ваш следующий проект.</p></div>
    <div className="catalog-toolbar"><div className="category-tabs" role="group" aria-label="Категория проектов">{categories.map(item => <button key={item.id} className={category === item.id ? 'active' : ''} aria-pressed={category === item.id} onClick={() => { setCategory(item.id); setExpanded(false); }}>{item.label}<span>{item.id === 'all' ? projects.length : projects.filter(project => project.category === item.id).length}</span></button>)}</div><label className="catalog-search"><Icon name="search" size={18} /><input type="search" placeholder="Найти проект" aria-label="Найти проект" value={search} onChange={event => setSearch(event.target.value)} /></label></div>
    <div className="project-grid" aria-live="polite">{visible.map((project, index) => <ProjectCard key={project.id} project={project} index={index} onSelect={onSelect} />)}</div>
    {filtered.length === 0 && <div className="empty-catalog"><Icon name="search" size={32} /><h3>Пока ничего не нашлось</h3><p>Попробуйте другое название или категорию.</p><button className="button button-outline" onClick={() => { setSearch(''); setCategory('all'); }}>Сбросить фильтры</button></div>}
    {filtered.length > visible.length && <div className="catalog-more"><button className="button button-outline" onClick={() => setExpanded(true)}>Все {projects.length} проектов <span>↗</span></button><span>Есть ещё кое-что интересное</span></div>}<a className="catalog-store-link" href="/projects">Открыть полный каталог <Icon name="arrow" size={15} /></a><a className="catalog-store-link" href="https://www.rustore.ru/catalog/developer/c67e0343" target="_blank" rel="noreferrer">Наши приложения в RuStore <Icon name="diagonal" size={15} /></a>
  </div></section>;
}

const services = [
  { slug: 'web-development', number: '01', icon: 'globe', title: 'Сайты, которые\nвпечатляют.', description: 'От выразительного лендинга до полноценного веб-сервиса. Быстро, удобно и с характером вашего бренда.', tags: ['Лендинги', 'Интернет-магазины', 'Веб-сервисы'], service: 'Сайт' },
  { slug: 'mobile-development', number: '02', icon: 'phone', title: 'Приложения, которые\nвсегда рядом.', description: 'Android и iOS. Продумываем каждый экран, подключаем нужные сервисы и помогаем с публикацией.', tags: ['Android', 'iOS', 'Flutter'], service: 'Android / iOS' },
  { slug: 'game-development', number: '03', icon: 'game', title: 'Игры, в которые\nхочется вернуться.', description: 'Живые механики, плавные анимации и увлекательный игровой опыт. От первого уровня до релиза.', tags: ['Казуальные игры', 'Головоломки', 'Аркады'], service: 'Игра' },
];
function Services({ onRequest }) {
  return <section className="services-section section-space" id="services"><div className="shell"><div className="section-heading" data-reveal><div><span className="section-kicker"><span /> ЧЕМ МЫ МОЖЕМ ПОМОЧЬ</span><h2>Вы придумываете.<br /><span className="muted-heading">Мы воплощаем.</span></h2></div><p>Дизайн, разработка и запуск —<br />всё в одном месте.</p></div><div className="services-grid">{services.map(service => <article key={service.number} className="service-card" data-reveal><ServiceIllustration type={service.icon} /><div className="service-card-top"><span className="service-icon"><Icon name={service.icon} size={30} /></span><span>{service.number} /</span></div><h3>{service.title}</h3><p>{service.description}</p><div className="service-tags">{service.tags.map(tag => <span key={tag}>{tag}</span>)}</div><a className="service-read-more" href={`/services/${service.slug}`}>Подробнее об услуге <Icon name="arrow" size={16} /></a><button onClick={() => onRequest(service.service)}>Обсудить задачу <span><Icon name="diagonal" size={20} /></span></button></article>)}</div><div className="integration-note"><Icon name="layers" size={20} /><p>Нужно больше? <span>Подключим API, платежи, Telegram-бота и личный кабинет.</span></p><button onClick={() => onRequest('Другое')}>Давайте обсудим <Icon name="arrow" size={17} /></button></div></div></section>;
}

function About() {
  return <section className="about-section" id="about"><div className="shell about-inner"><div className="about-copy" data-reveal><span className="section-kicker"><span /> НЕ ПРОСТО ПИШЕМ КОД</span><h2>Думаем о людях,<br />которые будут<br /><em>им пользоваться.</em></h2><p>CodeAFM — независимая студия цифровых продуктов. Мы создаём собственные приложения и помогаем бизнесу превращать идеи в полезные сервисы.</p><p>Нам важен весь опыт: от первого впечатления до той самой мелочи, которая делает продукт удобным.</p><a href="#contact" className="text-link">Познакомимся ближе <Icon name="diagonal" /></a></div><div className="about-art" aria-hidden="true"><div className="about-art-ring ring-a" /><div className="about-art-ring ring-b" /><div className="about-art-ring ring-c" /><div className="about-logo-tile"><img src="/brand-mark.svg" alt="" /></div><span className="about-art-label label-design">Дизайн с характером</span><span className="about-art-label label-code">Код со смыслом</span><span className="about-art-caption">CRAFTED WITH CARE. BUILT TO WORK.</span></div></div><div className="shell about-values"><div><strong>{projects.length}</strong><span>проектов в портфолио</span></div><div><strong>Web + Mobile</strong><span>единый подход к продукту</span></div><div><strong>От А до Я</strong><span>от идеи до поддержки</span></div></div></section>;
}


function FAQ() {
  const questions = [
    ['Сколько стоит разработка?', 'Стоимость зависит от функциональности, дизайна и интеграций. Расскажите о задаче — мы предложим подходящий объём работ и подготовим оценку до начала разработки.'],
    ['У меня только идея. С чего начать?', 'Этого достаточно для первого разговора. Вместе определим, для кого ваш продукт, какую задачу он решает и какие функции нужны в первой версии.'],
    ['Вы делаете приложения и для Android, и для iOS?', 'Да. Разрабатываем мобильные приложения для обеих платформ. На этапе обсуждения подберём подходящую технологию и учтём требования магазинов приложений.'],
    ['Что будет после запуска?', 'Договоримся о формате поддержки: исправления, обновления, новые функции и развитие продукта. Условия и объём поддержки согласуем отдельно.'],
    ['Можно заказать только сайт или отдельную доработку?', 'Да. Можно начать с лендинга, отдельной функции, дизайна или интеграции. Изучим текущий проект и предложим следующий шаг.'],
  ];
  return <section className="faq-section shell"><div data-reveal><span className="section-kicker"><span /> ХОРОШИЙ ВОПРОС</span><h2>Давайте<br /><span className="muted-heading">проясним.</span></h2><p>Не нашли свой ответ?<br /><a href={TELEGRAM} target="_blank" rel="noreferrer">Напишите нам <Icon name="diagonal" size={16} /></a></p></div><div className="faq-list">{questions.map(([question, answer]) => <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>)}</div></section>;
}

function Contact({ onRequest }) {
  return <section className="contact-section shell" id="contact"><div className="contact-panel" data-reveal><div className="contact-orbit" /><span className="section-kicker">СЛЕДУЮЩИЙ КЛАССНЫЙ ПРОЕКТ — ВАШ</span><h2>Давайте создадим<br /><span>что-то особенное.</span></h2><p>Расскажите о своей идее. Вместе найдём лучший способ её воплотить.</p><div className="contact-actions"><button className="button button-white" onClick={() => onRequest()}>Обсудить мой проект <Icon name="diagonal" /></button><a href={TELEGRAM} target="_blank" rel="noreferrer"><Icon name="telegram" /> Написать в Telegram <Icon name="diagonal" size={16} /></a></div><span className="contact-note">Большой продукт начинается с простого «привет».</span><img className="contact-watermark" src="/brand-mark.svg" alt="" /></div></section>;
}

function Footer() {
  return <footer className="site-footer shell"><div className="footer-top"><div><Brand /><p>Создаём цифровое. Делаем по-человечески.</p></div><div className="footer-contact"><a href="mailto:codeafm@gmail.com">codeafm@gmail.com <Icon name="diagonal" size={18} /></a><a href={TELEGRAM} target="_blank" rel="noreferrer">Telegram <Icon name="diagonal" size={16} /></a></div></div><nav className="footer-services" aria-label="Услуги CodeAFM"><a href="/projects">Все проекты</a><a href="/services/web-development">Разработка сайтов</a><a href="/services/mobile-development">Приложения Android и iOS</a><a href="/services/game-development">Разработка игр</a></nav><div className="footer-bottom"><span>© {new Date().getFullYear()} CodeAFM</span><nav aria-label="Поддержка приложений"><a href="/bottle-sort/support">Bottle Sort · Поддержка</a><a href="/crowd-clash/support">Crowd Clash · Поддержка</a><a href="/bubble-pop/support">Bubble Pop · Поддержка</a><a href="/pull-rescue/support">Pull &amp; Rescue · Поддержка</a><a href="/last-tower/support">Last Tower · Поддержка</a></nav><a href="#top">Наверх ↑</a></div><div className="footer-signature" aria-hidden="true"><img src="/brand-mark.svg" alt="" /><span>codeafm<span>.</span></span></div></footer>;
}

function Home() {
  useReveal();
  const [request, setRequest] = useState(null);
  const [project, setProject] = useState(null);
  const openRequest = (service = 'Сайт') => { setProject(null); setRequest(service); };
  return <><a href="#projects" className="skip-link">Перейти к проектам</a><Header onRequest={openRequest} /><main><Hero onRequest={openRequest} onSelect={setProject} /><Catalog onSelect={setProject} /><Services onRequest={openRequest} /><About /><ProjectProcess /><FAQ /><Contact onRequest={openRequest} /></main><Footer />{project && <ProjectDetails project={project} onClose={() => setProject(null)} onRequest={openRequest} />}{request && <ProjectRequest initialService={request} onClose={() => setRequest(null)} />}</>;
}

function InnerPage({ project, service, directory = false }) {
  useReveal();
  const [request, setRequest] = useState(null);
  const openRequest = (value = 'Сайт') => setRequest(value);
  return <><a href="#page-content" className="skip-link">Перейти к содержимому</a><Header onRequest={openRequest} /><main id="page-content">{directory ? <ProjectDirectory /> : project ? <ProjectPage project={project} onRequest={openRequest} /> : service ? <ServicePage service={service} onRequest={openRequest} /> : <section className="not-found shell"><span className="section-kicker">404</span><h1>Здесь пока ничего нет.</h1><p>Возможно, адрес изменился. Наши сайты, приложения и игры — в каталоге.</p><div><a href="/" className="button button-primary">На главную</a><a href="/projects" className="button button-outline">Смотреть проекты</a></div></section>}</main><Footer />{request && <ProjectRequest initialService={request} onClose={() => setRequest(null)} />}</>;
}

export default function App({ pathname = '/' }) {
  const path = normalizePath(pathname);
  if (path === '/bottle-sort/privacy' || path === '/privacy') return <BottleSortPrivacy />;
  if (path === '/bottle-sort/support' || path === '/support') return <BottleSortSupport />;
  if (path === '/crowd-clash/privacy') return <CrowdClashPrivacy />;
  if (path === '/crowd-clash/support') return <CrowdClashSupport />;
  if (path === '/bubble-pop/privacy') return <BubblePopPrivacy />;
  if (path === '/bubble-pop/support') return <BubblePopSupport />;
  if (path === '/pull-rescue/privacy') return <PullRescuePrivacy />;
  if (path === '/pull-rescue/support') return <PullRescueSupport />;
  if (path === '/last-tower/privacy') return <LastTowerPrivacy />;
  if (path === '/last-tower/support') return <LastTowerSupport />;
  if (path === '/') return <Home />;
  if (path === '/projects') return <InnerPage directory />;
  const project = projects.find(item => path === '/projects/' + item.id);
  if (project) return <InnerPage project={project} />;
  const service = servicesData.find(item => path === '/services/' + item.id);
  if (service) return <InnerPage service={service} />;
  return <InnerPage />;
}
