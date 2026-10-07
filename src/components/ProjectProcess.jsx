import { useId, useRef, useState } from 'react';
import './ProjectProcess.css';

const steps = [
  {
    title: 'Знакомимся',
    hint: 'Идея и задачи',
    headline: 'Сначала — самое важное.',
    description: 'Обсуждаем вашу идею, аудиторию и задачи. Вместе определяем объём работ, сроки и стоимость — до начала разработки.',
    outcome: 'Понятная задача и общий план',
    document: 'Бриф проекта',
    documentHint: 'Отправная точка',
    items: [
      ['Задача', 'Что создаём и какую проблему решаем'],
      ['Аудитория', 'Для кого будет работать продукт'],
      ['Приоритеты', 'Что нужно в первой версии'],
    ],
    note: 'Вы знаете, с чего начинаем и к чему идём.',
  },
  {
    title: 'Проектируем',
    hint: 'Структура и дизайн',
    headline: 'Будущий продукт уже виден.',
    description: 'Собираем структуру и создаём дизайн. Продумываем путь пользователя, обсуждаем экраны и уточняем детали вместе с вами.',
    outcome: 'Согласованный образ продукта',
    document: 'Прототип и дизайн',
    documentHint: 'Форма вашей идеи',
    items: [
      ['Структура', 'Разделы и связи между экранами'],
      ['Сценарии', 'Путь от первого экрана до цели'],
      ['Дизайн', 'Внешний вид и ключевые состояния'],
    ],
    note: 'Вы видите продукт до начала разработки.',
  },
  {
    title: 'Разрабатываем',
    hint: 'Код и проверка',
    headline: 'Превращаем дизайн в действие.',
    description: 'Пишем код, подключаем нужные сервисы и тестируем. Показываем работающие функции, чтобы вы могли следить за результатом.',
    outcome: 'Рабочая версия для проверки',
    document: 'Сборка продукта',
    documentHint: 'Всё соединяется',
    items: [
      ['Интерфейс', 'Экраны, действия и переходы'],
      ['Интеграции', 'Сервисы и данные вашего продукта'],
      ['Проверка', 'Основные сценарии и исправления'],
    ],
    note: 'Вы пробуете продукт и делитесь обратной связью.',
  },
  {
    title: 'Запускаем',
    hint: 'Публикация и развитие',
    headline: 'Готово встретиться с людьми.',
    description: 'Публикуем сайт или приложение. Помогаем с обновлениями и обсуждаем дальнейшее развитие: какие функции нужны следующими.',
    outcome: 'Продукт, которым можно пользоваться',
    document: 'План запуска',
    documentHint: 'Следующая глава',
    items: [
      ['Публикация', 'Выход сайта или приложения'],
      ['Поддержка', 'Согласованный формат помощи'],
      ['Развитие', 'Следующие идеи и улучшения'],
    ],
    note: 'Запуск — начало жизни вашего продукта.',
  },
];

function WorkflowArrow({ check = false }) {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d={check ? 'm5 12 4 4L19 6' : 'M5 12h14m-6-6 6 6-6 6'} stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

export default function ProjectProcess() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef([]);
  const uid = useId();
  const active = steps[selected];

  function navigateTabs(event, index) {
    let next;
    if (event.key === 'ArrowRight') next = (index + 1) % steps.length;
    else if (event.key === 'ArrowLeft') next = (index - 1 + steps.length) % steps.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = steps.length - 1;
    else return;
    event.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  }

  return <section className="workflow-section shell section-space" id="process" aria-labelledby={`${uid}-heading`}>
    <div className="workflow-heading">
      <div><span className="workflow-eyebrow"><span /> ПРОЗРАЧНО НА КАЖДОМ ЭТАПЕ</span><h2 id={`${uid}-heading`}>От «а что, если…»<br /><span>до «уже работает».</span></h2></div>
      <p>Вы всегда знаете, что происходит<br />с вашим проектом и что будет дальше.</p>
    </div>
    <div className="workflow-tabs" role="tablist" aria-label="Этапы работы над проектом">
      {steps.map((step, index) => <button
        key={step.title}
        ref={element => { tabRefs.current[index] = element; }}
        className={`workflow-tab${selected === index ? ' workflow-tab-active' : ''}`}
        type="button"
        role="tab"
        id={`${uid}-tab-${index}`}
        aria-controls={`${uid}-panel-${index}`}
        aria-selected={selected === index}
        tabIndex={selected === index ? 0 : -1}
        onClick={() => setSelected(index)}
        onKeyDown={event => navigateTabs(event, index)}
      ><span className="workflow-step-marker"><span>0{index + 1}</span><WorkflowArrow check={index === 3} /></span><strong>{step.title}</strong><span className="workflow-tab-hint">{step.hint}</span></button>)}
    </div>
    {steps.map((step, index) => <div key={step.title} className="workflow-panel" role="tabpanel" id={`${uid}-panel-${index}`} aria-labelledby={`${uid}-tab-${index}`} tabIndex={0} hidden={selected !== index}>
      {selected === index && <div className="workflow-panel-layout" key={selected}>
        <div className="workflow-copy">
          <span className="workflow-current">ЭТАП 0{selected + 1} <span>/ 04</span></span>
          <h3>{active.headline}</h3>
          <p>{active.description}</p>
          <div className="workflow-result"><span className="workflow-result-icon"><WorkflowArrow check /></span><div><span>В результате</span><strong>{active.outcome}</strong></div></div>
        </div>
        <div className="workflow-preview">
          <div className="workflow-paper">
            <div className="workflow-paper-top"><span className="workflow-paper-brand"><span /> codeafm</span><span>0{selected + 1} / 04</span></div>
            <div className="workflow-paper-heading"><span>{active.documentHint}</span><strong>{active.document}</strong></div>
            <div className="workflow-deliverables">{active.items.map(([title, description], itemIndex) => <div className="workflow-deliverable" key={title}><span className="workflow-item-marker">{selected === 3 ? <WorkflowArrow check /> : `0${itemIndex + 1}`}</span><div><strong>{title}</strong><p>{description}</p></div></div>)}</div>
            <div className="workflow-paper-footer"><span className="workflow-paper-track"><i style={{ width: `${(selected + 1) * 25}%` }} /></span><span>{selected + 1} из 4 этапов</span></div>
          </div>
          <p className="workflow-preview-note"><WorkflowArrow check />{active.note}</p>
        </div>
      </div>}
    </div>)}
  </section>;
}
