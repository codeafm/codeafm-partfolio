import { site } from './data/site';
import { pullRescuePrivacy } from './data/pullRescuePrivacy';
import './legal.css';

function PullRescuePage({ title, children }) {
  return <main className="legal-page" lang="ru"><div className="legal-container">
    <a className="back-link" href="/">← На главную CodeAFM</a>
    <header className="legal-header">
      <img src="/icons/pull-rescue.png" alt="Pull & Rescue 3D" className="legal-app-icon" width="74" height="74" />
      <div><p className="eyebrow">Pull &amp; Rescue 3D · CodeAFM</p><h1>{title}</h1></div>
    </header>
    {children}
    <footer className="legal-footer">© {new Date().getFullYear()} CodeAFM.</footer>
  </div></main>;
}

export function PullRescuePrivacy() {
  return <PullRescuePage title="Политика конфиденциальности">
    <p className="updated">Обновлено 8 октября 2026 года. Android и iOS.</p>
    {pullRescuePrivacy.map(section => <section key={section.title}>
      <h2>{section.title}</h2>
      {section.paragraphs.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
      {section.title.startsWith('4.') && <>
        <a className="legal-secondary-link" href="https://yandex.ru/legal/confidential/">Политика конфиденциальности Яндекса</a>
        <a className="legal-secondary-link" href="https://unity.com/legal/game-player-and-app-user-privacy-policy">Политика Unity для игроков и пользователей приложений</a>
      </>}
      {section.title.startsWith('10.') && <>
        <a className="legal-button" href={`mailto:${site.email}?subject=Pull%20Rescue%20Privacy`}>Написать на {site.email}</a>
        <a className="legal-secondary-link" href="/pull-rescue/support">Поддержка Pull &amp; Rescue 3D</a>
      </>}
    </section>)}
  </PullRescuePage>;
}

export function PullRescueSupport() {
  return <PullRescuePage title="Поддержка игры">
    <p className="updated">Помощь с Pull &amp; Rescue 3D для Android и iOS</p>
    <section><h2>Связаться с разработчиком</h2>
      <p>Напишите в CodeAFM, если нужна помощь с игрой или вы заметили ошибку. Укажите модель устройства, версию операционной системы и игры, номер уровня и описание проблемы.</p>
      <a className="legal-button" href={`mailto:${site.email}?subject=Pull%20Rescue%20Support`}>Написать на {site.email}</a>
      <p>При необходимости приложите скриншот без личных данных. Не отправляйте пароли, коды подтверждения или платёжные сведения.</p>
    </section>
    <section><h2>Головоломки и управление</h2>
      <p>Осмотрите комнату, продумайте порядок действий и вытягивайте нужные штифты. Управляйте водой и механизмами, тушите огонь, активируйте руны и открывайте безопасный путь для героя.</p>
      <p>Если задача кажется сложной, воспользуйтесь подсказкой или начните комнату заново.</p>
    </section>
    <section><h2>Решение частых проблем</h2>
      <div className="faq-item"><h3>Игра не запускается</h3><p>Закройте и снова откройте игру, перезапустите устройство, проверьте обновления и наличие свободного места.</p></div>
      <div className="faq-item"><h3>Не слышно музыку или звуки</h3><p>Проверьте громкость устройства и настройки музыки и эффектов в игре.</p></div>
      <div className="faq-item"><h3>Прогресс и сохранения</h3><p>Прогресс сохраняется на устройстве. Обратитесь в поддержку до удаления игры или очистки её данных: локальные сохранения могут быть потеряны. В текущей игре нет аккаунта и собственного сервера синхронизации между устройствами.</p></div>
      <div className="faq-item"><h3>Реклама или награда недоступны</h3><p>Для загрузки рекламы нужны интернет и доступное объявление. Награда за видео выдаётся после подтверждения просмотра рекламным SDK. Если награда не появилась, сообщите номер уровня, примерное время и что произошло.</p></div>
    </section>
    <section><h2>Конфиденциальность</h2>
      <p>По вопросам данных или удаления переписки с поддержкой напишите на адрес выше. Для прохождения игры регистрация не требуется.</p>
      <a className="legal-secondary-link" href="/pull-rescue/privacy">Политика конфиденциальности Pull &amp; Rescue 3D</a>
    </section>
  </PullRescuePage>;
}
