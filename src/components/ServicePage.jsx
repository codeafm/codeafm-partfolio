import { projects } from '../data/projects.js';
import { servicesData } from '../data/services.js';
import './ServicePage.css';

function Arrow({ diagonal = false }) {
  return <svg viewBox="0 0 24 24" width="20" height="20" fill="none" aria-hidden="true"><path d={diagonal ? 'M6 18 18 6M6 6h12v12' : 'M5 12h14m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function ServicePage({ service, onRequest }) {
  if (!service) return null;
  const examples = service.projectIds.map(id => projects.find(project => project.id === id)).filter(Boolean);
  const heroProject = examples[0];
  const relatedServices = servicesData.filter(item => item.id !== service.id);

  return <section className={`service-page service-page-${service.id}`}>
    <div className="service-page-container">
      <nav className="service-page-breadcrumbs" aria-label="Хлебные крошки"><a href="/">Главная</a><span aria-hidden="true">/</span><a href="/#services">Услуги</a><span aria-hidden="true">/</span><span aria-current="page">{service.title}</span></nav>
      <section className="service-page-hero" aria-labelledby="service-page-title">
        <div className="service-page-hero-copy">
          <span className="service-page-kicker"><span />{service.eyebrow}</span>
          <h1 id="service-page-title">{service.title}<span>.</span></h1>
          <p className="service-page-lead">{service.intro}</p>
          <p className="service-page-introduction">{service.text}</p>
          <div className="service-page-formats">{service.formats.map(format => <span key={format}>{format}</span>)}</div>
          <button type="button" className="service-page-primary" onClick={() => onRequest(service.requestService)}>Обсудить проект <Arrow diagonal /></button>
        </div>
        {heroProject && <a href={`/projects/${heroProject.id}`} className="service-page-preview" aria-label={`Посмотреть проект ${heroProject.title}`}>
          <span className="service-page-preview-label">ИЗ НАШЕГО ПОРТФОЛИО <Arrow diagonal /></span>
          <span className="service-page-preview-image"><img src={heroProject.screenshots[0]} alt={`Интерфейс ${heroProject.title}`} width={heroProject.orientation === 'portrait' ? '900' : '1600'} height={heroProject.orientation === 'portrait' ? '1600' : '1000'} fetchPriority="high" /></span>
          <span className="service-page-preview-caption"><img src={heroProject.icon} alt="" width="40" height="40" /><span><strong>{heroProject.title}</strong><span>{heroProject.status}</span></span><Arrow diagonal /></span>
        </a>}
      </section>
      <section className="service-page-included service-page-section" aria-labelledby="service-included-title">
        <div className="service-page-section-heading"><div><span className="service-page-kicker"><span />СОСТАВ РАБОТ</span><h2 id="service-included-title">Что входит в разработку</h2></div><p>Конкретный набор функций<br />согласуем под вашу задачу.</p></div>
        <div className="service-page-included-grid">{service.included.map((item, index) => <article key={item.title}><span className="service-page-item-mark" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><h3>{item.title}</h3><p>{item.text}</p></article>)}</div>
      </section>
      <section className="service-page-process service-page-section" aria-labelledby="service-process-title">
        <div className="service-page-section-heading"><div><span className="service-page-kicker"><span />ПОНЯТНЫЙ ПРОЦЕСС</span><h2 id="service-process-title">От обсуждения до запуска</h2></div></div>
        <ol className="service-page-steps">{service.steps.map((step, index) => <li key={step.title}><span className="service-page-step-top"><span>{String(index + 1).padStart(2, '0')}</span><Arrow /></span><h3>{step.title}</h3><p>{step.text}</p></li>)}</ol>
      </section>
      <section className="service-page-brief service-page-section" aria-labelledby="service-brief-title">
        <div><span className="service-page-kicker"><span />НАЧНЁМ С ЗНАКОМСТВА</span><h2 id="service-brief-title">{service.briefTitle}</h2><p>{service.note}</p><button type="button" className="service-page-primary" onClick={() => onRequest(service.requestService)}>Расскажите о вашей идее <Arrow diagonal /></button></div>
        <ul>{service.brief.map(item => <li key={item}><span aria-hidden="true">↗</span>{item}</li>)}</ul>
      </section>
      <section className="service-page-examples service-page-section" aria-labelledby="service-examples-title">
        <div className="service-page-section-heading"><div><span className="service-page-kicker"><span />РЕАЛЬНЫЕ ПРОЕКТЫ</span><h2 id="service-examples-title">{service.relatedIntro}</h2></div><a href="/#projects" className="service-page-text-link">Всё портфолио <Arrow /></a></div>
        <div className="service-page-example-grid">{examples.map(project => <a key={project.id} href={`/projects/${project.id}`} className="service-page-example"><span className={`service-page-example-image service-page-example-${project.category}${project.orientation === 'landscape' ? ' is-landscape' : ''}`}><img src={project.screenshots[0]} alt={`Скриншот ${project.title}`} loading="lazy" width="800" height="500" /><span className="service-page-example-open"><Arrow diagonal /></span></span><span className="service-page-example-copy"><img src={project.icon} alt="" loading="lazy" width="40" height="40" /><span><strong>{project.title}</strong><span>{project.status}</span></span></span><p>{project.description}</p></a>)}</div>
      </section>
      <section className="service-page-related service-page-section" aria-labelledby="service-related-title"><h2 id="service-related-title">Другие направления</h2><div>{relatedServices.map(item => <a key={item.id} href={`/services/${item.id}`}><span>{item.title}</span><Arrow diagonal /></a>)}</div></section>
    </div>
  </section>;
}
