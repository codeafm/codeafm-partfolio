import './FeaturedWork.css';

function OpenArrow() {
  return <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M6 18 18 6M6 6h12v12" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function FeaturedWork({ projects, onSelect }) {
  const marketplace = projects.find(project => project.id === 'tojmarket');
  const game = projects.find(project => project.id === 'last-tower');
  if (!marketplace && !game) return null;

  return <section className="featured-work" aria-labelledby="featured-heading">
    <div className="featured-heading" data-reveal>
      <div>
        <span className="featured-eyebrow"><span /> В ФОКУСЕ</span>
        <h2 id="featured-heading">За каждым экраном —<br /><span>своя история.</span></h2>
      </div>
      <p>Разные задачи. Свой характер.<br />Внимание к каждой детали.</p>
    </div>
    <div className={`featured-grid${!marketplace || !game ? ' featured-grid-single' : ''}`}>
      {marketplace && <button type="button" className="featured-card featured-marketplace" onClick={() => onSelect(marketplace)} aria-label={`Посмотреть проект ${marketplace.title}`} data-reveal>
        <span className="featured-card-copy">
          <span className="featured-category">ПЛОЩАДКА ОБЪЯВЛЕНИЙ</span>
          <span className="featured-project-title">{marketplace.title}<span className="featured-title-dot">.</span></span>
          <span className="featured-project-summary">Находить нужное. Быть ближе.</span>
        </span>
        <span className="featured-open"><OpenArrow /></span>
        <span className="featured-browser-scene" aria-hidden="true">
          <span className="featured-browser-layer" />
          <span className="featured-browser">
            <span className="featured-browser-bar"><span className="featured-browser-dots"><i /><i /><i /></span><span>tojmarket.tj</span><svg width="10" height="10" viewBox="0 0 12 12" fill="none"><rect x="2.5" y="5" width="7" height="5" rx="1" stroke="currentColor" /><path d="M4 5V3a2 2 0 0 1 4 0v2" stroke="currentColor" /></svg></span>
            <img src={marketplace.screenshots[0]} alt="" loading="lazy" width="1440" height="1000" />
          </span>
        </span>
        <span className="featured-card-bottom"><span>Сайт · Маркетплейс</span><span className="featured-discover">Смотреть проект <span aria-hidden="true">↗</span></span></span>
      </button>}
      {game && <button type="button" className="featured-card featured-game" onClick={() => onSelect(game)} aria-label={`Посмотреть проект ${game.title}`} data-reveal>
        <span className="featured-card-copy">
          <span className="featured-category">МОБИЛЬНАЯ ИГРА</span>
          <span className="featured-game-heading"><img src={game.icon} alt="" loading="lazy" width="48" height="48" /><span><span className="featured-project-title">{game.title}</span><span className="featured-project-summary">Тактическая битва башен.</span></span></span>
        </span>
        <span className="featured-open"><OpenArrow /></span>
        <span className="featured-game-scene" aria-hidden="true"><span className="featured-game-halo" /><span className="featured-game-screen"><img src={game.screenshots[0]} alt="" loading="lazy" width="1672" height="941" /></span></span>
        <span className="featured-card-bottom"><span>Android · Стратегия</span><span className="featured-discover">Смотреть проект <span aria-hidden="true">↗</span></span></span>
      </button>}
    </div>
  </section>;
}
