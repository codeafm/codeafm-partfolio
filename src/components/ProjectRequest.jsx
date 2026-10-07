import { useEffect, useRef, useState } from 'react';
import './ProjectRequest.css';

const SERVICES = ['Сайт', 'Android / iOS', 'Игра', 'Другое'];
const EMAIL = 'codeafm@gmail.com';
const TELEGRAM = 'https://t.me/fizbit00';

function ArrowIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-6-6 6 6-6 6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function ProjectRequest({ initialService = 'Сайт', onClose }) {
  const dialogRef = useRef(null);
  const nameRef = useRef(null);
  const [service, setService] = useState(SERVICES.includes(initialService) ? initialService : 'Сайт');
  const [channel, setChannel] = useState('telegram');
  const [prepared, setPrepared] = useState(null);
  const [copyStatus, setCopyStatus] = useState('');

  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
    nameRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  function handleBackdrop(event) {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onClose();
  }

  function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    for (const field of ['name', 'contact', 'description']) {
      const input = form.elements.namedItem(field);
      input.setCustomValidity(input.value.trim() ? '' : 'Пожалуйста, заполните это поле.');
    }
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const brief = [
      'Здравствуйте, команда codeafm! Хочу обсудить проект.',
      '',
      `Проект: ${service}`,
      `Имя: ${data.get('name').trim()}`,
      `Контакт: ${data.get('contact').trim()}`,
      `Бюджет: ${data.get('budget')}`,
      '',
      'Идея проекта:',
      data.get('description').trim(),
    ].join('\n');
    const emailUrl = `mailto:${EMAIL}?subject=${encodeURIComponent(`Новый проект: ${service}`)}&body=${encodeURIComponent(brief)}`;
    const telegramUrl = `${TELEGRAM}?text=${encodeURIComponent(brief)}`;
    setPrepared({ brief, emailUrl, telegramUrl, channel });
    setCopyStatus('');
    if (channel === 'telegram') {
      window.open(telegramUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = emailUrl;
    }
  }

  async function copyBrief() {
    try {
      await navigator.clipboard.writeText(prepared.brief);
      setCopyStatus('Текст скопирован — вставьте его в сообщение.');
    } catch {
      setCopyStatus('Выделите и скопируйте текст ниже.');
    }
  }

  function handleChange(event) {
    if (typeof event.target.setCustomValidity === 'function') event.target.setCustomValidity('');
    if (prepared) setPrepared(null);
    if (copyStatus) setCopyStatus('');
  }

  return (
    <dialog ref={dialogRef} className="request-dialog" aria-labelledby="request-title" aria-describedby="request-intro" onCancel={(event) => { event.preventDefault(); onClose(); }} onClick={handleBackdrop}>
      <button className="request-close" type="button" aria-label="Закрыть форму" onClick={onClose}>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" /></svg>
      </button>
      <div className="request-heading">
        <span className="request-eyebrow"><span /> ВАШ СЛЕДУЮЩИЙ ПРОЕКТ</span>
        <h2 id="request-title">Расскажите<br />о вашей идее<span>.</span></h2>
        <p id="request-intro">Поможем превратить её в удобный сайт, приложение или игру. Начнём с знакомства.</p>
      </div>
      <form className="request-form" onSubmit={handleSubmit} onChange={handleChange}>
        <fieldset className="request-fieldset">
          <legend>Что создаём?</legend>
          <div className="request-service-options">
            {SERVICES.map((item) => <label className={`request-choice${service === item ? ' is-selected' : ''}`} key={item}>
              <input type="radio" name="service" value={item} checked={service === item} onChange={() => setService(item)} />
              <span>{item}</span>
            </label>)}
          </div>
        </fieldset>
        <div className="request-field-row">
          <label className="request-field">Ваше имя <span aria-hidden="true">*</span><input ref={nameRef} name="name" autoComplete="name" placeholder="Как к вам обращаться?" maxLength={100} required /></label>
          <label className="request-field">Как с вами связаться <span aria-hidden="true">*</span><input name="contact" autoComplete="email" placeholder="Email или @telegram" maxLength={180} required /></label>
        </div>
        <label className="request-field">Пара слов о проекте <span aria-hidden="true">*</span><textarea name="description" placeholder="Что хотите создать? Для кого и какую задачу это решит?" rows={3} maxLength={1800} required /></label>
        <label className="request-field">Ориентир по бюджету <span className="request-optional">— необязательно</span><select name="budget" defaultValue="Обсудим вместе">
          <option>Обсудим вместе</option><option>До $1 000</option><option>$1 000 – $3 000</option><option>$3 000 – $10 000</option><option>От $10 000</option>
        </select></label>
        <fieldset className="request-fieldset request-channel-fieldset">
          <legend>Где продолжим разговор?</legend>
          <div className="request-channel-options">
            <label className={`request-channel${channel === 'telegram' ? ' is-selected' : ''}`}><input type="radio" name="channel" checked={channel === 'telegram'} onChange={() => setChannel('telegram')} /><span>Telegram</span></label>
            <label className={`request-channel${channel === 'email' ? ' is-selected' : ''}`}><input type="radio" name="channel" checked={channel === 'email'} onChange={() => setChannel('email')} /><span>Email</span></label>
          </div>
        </fieldset>
        <button type="submit" className="request-submit">{channel === 'telegram' ? 'Продолжить в Telegram' : 'Подготовить письмо'}<ArrowIcon /></button>
        <p className="request-note">{channel === 'telegram' ? 'Откроется Telegram с текстом заявки. Проверьте его и отправьте сообщение самостоятельно.' : 'Откроется ваша почта с текстом заявки. Проверьте письмо и нажмите «Отправить».'}</p>
      </form>
      {prepared && <section className="request-prepared" aria-label="Подготовленная заявка">
        <p className="request-prepared-title" role="status">Заявка подготовлена. Осталось отправить.</p>
        <p>Если {prepared.channel === 'telegram' ? 'Telegram не открылся или текст не подставился' : 'почтовая программа не открылась'}, скопируйте текст и отправьте его нам.</p>
        <div className="request-prepared-actions"><button type="button" onClick={copyBrief}>Скопировать заявку</button><a href={prepared.channel === 'telegram' ? prepared.telegramUrl : prepared.emailUrl} target={prepared.channel === 'telegram' ? '_blank' : undefined} rel="noopener noreferrer">Открыть {prepared.channel === 'telegram' ? 'Telegram' : 'почту'} ↗</a></div>
        {copyStatus && <p className="request-copy-status" role="status">{copyStatus}</p>}
        <details><summary>Показать текст заявки</summary><textarea aria-label="Текст заявки для копирования" readOnly value={prepared.brief} rows={7} onFocus={(event) => event.target.select()} /></details>
        <a className="request-email" href={prepared.emailUrl}>{EMAIL}</a>
      </section>}
    </dialog>
  );
}
