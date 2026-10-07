import { useState } from 'react';
import './ProductStage.css';

const views = [
  { id: 'web', label: 'Сайты', project: 'tojmarket', second: 'tojmarket', detail: 'Маркетплейс с характером', caption: 'Большие идеи. На любом экране.' },
  { id: 'apps', label: 'Приложения', project: 'taskgram', second: 'pdf-scanner', detail: 'Продукты на каждый день', caption: 'Всегда под рукой.' },
  { id: 'games', label: 'Игры', project: 'last-tower', second: 'sweet-candy', detail: 'Миры, в которые хочется вернуться', caption: 'Ещё один уровень?' },
];
function Arrow() {
  return <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" /></svg>;
}
function Phone({ src, className = '' }) {
  return <span className={`stage-phone ${className}`}><span className="stage-phone-camera" /><img src={src} alt="" /><span className="stage-phone-home" /></span>;
}

export default function ProductStage({ projects, onSelect }) {
  const [viewId, setViewId] = useState('web');
  const view = views.find(item => item.id === viewId);
  const project = projects.find(item => item.id === view.project);
  const second = projects.find(item => item.id === view.second);

  function move(event) {
    if (!window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    event.currentTarget.style.setProperty('--stage-rx', `${-y * 6}deg`);
    event.currentTarget.style.setProperty('--stage-ry', `${x * 8}deg`);
  }
  function reset(event) {
    event.currentTarget.style.setProperty('--stage-rx', '0deg');
    event.currentTarget.style.setProperty('--stage-ry', '0deg');
  }

  return <div className="product-stage">
    <div className="stage-aura" aria-hidden="true" />
    <div className="stage-topline"><span className="stage-dot" /> Маленькая часть большой работы</div>
    <div className="stage-tabs" role="group" aria-label="Тип проекта в витрине">
      {views.map(item => <button key={item.id} aria-pressed={viewId === item.id} onClick={() => setViewId(item.id)} className={viewId === item.id ? 'is-selected' : ''}>{item.label}</button>)}
    </div>
    <button className={`stage-canvas stage-canvas-${view.id}`} onPointerMove={move} onPointerLeave={reset} onClick={() => onSelect(project)} aria-label={`Посмотреть проект ${project.title}`}>
      <span className="stage-halo halo-one" /><span className="stage-halo halo-two" />
      <span className="stage-orbit-dot" />
      <span className="stage-scene" key={viewId}>
        {viewId !== 'apps' ? <span className="stage-browser"><span className="stage-browser-bar"><i /><i /><i /><span>{viewId === 'web' ? 'tojmarket.tj' : 'Last Tower'}</span><span className="stage-browser-mark">↗</span></span><img src={project.screenshots[0]} alt="" /></span> : <Phone src={project.screenshots[0]} className="stage-phone-main" />}
        <Phone src={viewId === 'web' ? second.screenshots[2] : second.screenshots[0]} className="stage-phone-secondary" />
        <span className="stage-app-tile"><img src={project.icon} alt="" /></span>
        <span className="stage-note"><span className="stage-note-check">✓</span>{view.caption}</span>
      </span>
      <span className="stage-view-hint"><Arrow /></span>
    </button>
    <div className="stage-caption" aria-live="polite"><div><span>{view.detail}</span><strong>{project.title}</strong></div><button onClick={() => onSelect(project)}>Посмотреть <Arrow /></button></div>
  </div>;
}
