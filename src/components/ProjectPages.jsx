import { useMemo, useState } from "react";
import { projects } from "../data/projects.js";
import "./ProjectPages.css";

const categoryNames = { apps: "Приложения", games: "Игры", web: "Сайты" };
const serviceNames = { apps: "Android / iOS", games: "Игра", web: "Сайт" };
const projectHref = (project) => `/projects/${encodeURIComponent(project.id)}`;

function Arrow({ diagonal = false }) {
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function Breadcrumbs({ project }) {
  return <nav className="pp-breadcrumbs" aria-label="Хлебные крошки"><ol><li><a href="/">Главная</a></li><li>{project ? <a href="/projects">Проекты</a> : <span aria-current="page">Проекты</span>}</li>{project && <li><span aria-current="page">{project.title}</span></li>}</ol></nav>;
}

function ProjectLinkCard({ project, onSelect }) {
  return <article className="pp-link-card"><a href={projectHref(project)} className="pp-card-link" onClick={onSelect ? (event) => onSelect(project, event) : undefined}>
    <div className={`pp-card-art ${project.category === "web" || project.orientation === "landscape" ? "pp-card-art--wide" : ""}`} style={{ "--pp-card-color": project.color || "#bba6eb" }}>
      {project.screenshots?.[0] && <img className="pp-card-screen" src={project.screenshots[0]} alt="" loading="lazy" decoding="async" />}
      <img className="pp-card-icon" src={project.icon} alt="" width="48" height="48" loading="lazy" decoding="async" />
      <span className="pp-card-category">{categoryNames[project.category]}</span><span className="pp-card-arrow"><Arrow diagonal /></span>
    </div>
    <div className="pp-card-copy"><div><h3>{project.title}</h3><span>{project.status || categoryNames[project.category]}</span></div><p>{project.description}</p><span className="pp-card-discover">О проекте <Arrow /></span></div>
  </a></article>;
}

function RequestAction({ project, onRequest, className = "button button-primary" }) {
  return onRequest ? <button type="button" className={className} onClick={() => onRequest(serviceNames[project.category])}>Обсудить мой проект <Arrow diagonal /></button> : <a className={className} href="/#contact">Обсудить мой проект <Arrow diagonal /></a>;
}

export function ProjectPage({ project, onRequest }) {
  const related = projects.filter((item) => item.category === project.category && item.id !== project.id).slice(0, 3);
  const screenshots = project.screenshots || [];
  const wide = project.category === "web" || project.orientation === "landscape";

  return <div className="project-page">
    <div className="shell">
      <Breadcrumbs project={project} />
      <section className="pp-hero" aria-labelledby="project-page-title">
        <div className="pp-identity"><div className="pp-eyebrow"><span /> {categoryNames[project.category]} · CODEAFM</div><div className="pp-title-row"><img src={project.icon} alt="" width="88" height="88" decoding="async" /><h1 id="project-page-title">{project.title}</h1></div>{project.storeTitle && project.storeTitle !== project.title && <p className="pp-store-title">В RuStore: {project.storeTitle}</p>}<div className="pp-tags" aria-label="Технологии и тематики">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div></div>
        <div className="pp-intro"><p>{project.description}</p><dl className="pp-facts"><div><dt>Направление</dt><dd>{project.status || categoryNames[project.category]}</dd></div>{project.platform && <div><dt>Платформа</dt><dd>{project.platform}</dd></div>}</dl><div className="pp-hero-actions">{project.storeUrl && <a className="button button-dark" href={project.storeUrl} target="_blank" rel="noopener noreferrer">Открыть в RuStore <Arrow diagonal /></a>}{project.url && <a className="button button-dark" href={project.url} target="_blank" rel="noopener noreferrer">Открыть сайт <Arrow diagonal /></a>}<a className="pp-text-link" href="#project-screenshots">Смотреть скриншоты <span aria-hidden="true">↓</span></a></div></div>
      </section>
    </div>

    {screenshots.length > 0 && <section className="pp-gallery-section" id="project-screenshots" aria-labelledby="project-gallery-title"><div className="shell"><div className="pp-section-heading"><div><span className="pp-eyebrow"><span /> В ДЕТАЛЯХ</span><h2 id="project-gallery-title">Внутри проекта.</h2></div><p>{project.storeUrl ? "Скриншоты из официальной карточки приложения в RuStore." : "Страницы и интерфейс сайта."}</p></div><div className={`pp-gallery ${wide ? "pp-gallery--wide" : "pp-gallery--portrait"}`}>{screenshots.map((src, index) => <figure className="pp-shot" key={src}><a href={src} target="_blank" rel="noopener noreferrer" aria-label={`Открыть скриншот ${index + 1} проекта ${project.title}`}><img src={src} alt={`${project.title} — скриншот ${index + 1}`} loading={index === 0 ? "eager" : "lazy"} decoding="async" /></a><figcaption><span>Экран {String(index + 1).padStart(2, "0")}</span><span>{project.title}</span></figcaption></figure>)}</div>{project.storeUrl && <a className="pp-gallery-source" href={project.storeUrl} target="_blank" rel="noopener noreferrer">Приложение в RuStore <Arrow diagonal /></a>}</div></section>}

    <div className="shell">
      {(project.support || project.privacy) && <nav className="pp-resource-links" aria-label="Поддержка и документы проекта"><p>Для пользователей {project.title}</p><div>{project.support && <a href={project.support}>Поддержка <Arrow diagonal /></a>}{project.privacy && <a href={project.privacy}>Конфиденциальность <Arrow diagonal /></a>}</div></nav>}
      <section className="pp-request" aria-labelledby="project-request-title"><div><span className="pp-eyebrow">ОТ ИДЕИ К ВАШЕМУ ПРОДУКТУ</span><h2 id="project-request-title">Теперь — ваш проект.</h2><p>Расскажите, что хотите создать. Обсудим задачи, дизайн и разработку.</p></div><RequestAction project={project} onRequest={onRequest} className="button button-white" /></section>
      {related.length > 0 && <section className="pp-related" aria-labelledby="related-projects-title"><div className="pp-section-heading"><div><span className="pp-eyebrow"><span /> ЕЩЁ РАБОТЫ</span><h2 id="related-projects-title">Другие {categoryNames[project.category].toLowerCase()}.</h2></div><a className="pp-text-link" href="/projects">Все проекты <Arrow /></a></div><div className="pp-related-grid">{related.map((item) => <ProjectLinkCard key={item.id} project={item} />)}</div></section>}
    </div>
  </div>;
}

export function ProjectDirectory({ onSelect }) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const filteredProjects = useMemo(() => {
    const search = query.trim().toLocaleLowerCase("ru");
    return projects.filter((project) => (category === "all" || project.category === category) && (!search || [project.title, project.storeTitle, project.description, ...project.tags].filter(Boolean).join(" ").toLocaleLowerCase("ru").includes(search)));
  }, [category, query]);
  const filters = [{ id: "all", title: "Все проекты" }, ...Object.entries(categoryNames).map(([id, title]) => ({ id, title }))];

  return <div className="project-directory"><div className="shell"><Breadcrumbs /><header className="pd-heading"><div><span className="pp-eyebrow"><span /> ПОРТФОЛИО CODEAFM</span><h1>Идеи, которые<br /><span>стали продуктами.</span></h1></div><p>Мобильные приложения, игры и сайты.<br />Посмотрите интерфейсы, познакомьтесь с проектами<br className="pd-desktop-break" /> и найдите то, что близко вашей идее.</p></header><div className="pd-toolbar"><div className="pd-filters" role="group" aria-label="Категории проектов">{filters.map((filter) => <button key={filter.id} type="button" className={category === filter.id ? "active" : ""} aria-pressed={category === filter.id} onClick={() => setCategory(filter.id)}>{filter.title}<span>{filter.id === "all" ? projects.length : projects.filter((project) => project.category === filter.id).length}</span></button>)}</div><label className="pd-search"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.7" /><path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" /></svg><span className="pd-search-label">Найти проект</span><input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Найти проект" aria-label="Найти проект" /></label></div><p className="pd-results" role="status" aria-live="polite">Показано: {filteredProjects.length} из {projects.length}</p><div className="pd-grid">{filteredProjects.map((project) => <ProjectLinkCard key={project.id} project={project} onSelect={onSelect} />)}</div>{filteredProjects.length === 0 && <div className="pd-empty"><h2>Такого проекта пока нет.</h2><p>Попробуйте другое название или откройте весь каталог.</p><button type="button" className="button button-dark" onClick={() => { setCategory("all"); setQuery(""); }}>Показать все проекты <Arrow /></button></div>}<aside className="pd-contact"><p>Уже представляете свой следующий проект?</p><a href="/#contact">Давайте обсудим <Arrow diagonal /></a></aside></div></div>;
}
