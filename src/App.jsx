import React, { useEffect, useMemo, useState } from "react";
import AnimatedLogo from "./components/AnimatedLogo.jsx";

/* ===== КОНТАКТЫ / НАСТРОЙКИ ===== */
const TELEGRAM_URL = "https://t.me/fizbit00";
const EMAIL_TO = "codeafm@gmail.com";
const FORMSPREE_ID = "your_form_id"; // если нет формы — будет mailto

/* helper для путей в /public */
const asset = (p) => `${import.meta.env.BASE_URL}${p.replace(/^\/+/, "")}`;

/* ===== SCROLL REVEAL ===== */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".scroll-fade");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("show"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("show");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ================= MODAL: Оставить заявку ================= */
function RequestModal({ open, onClose }) {
  const [step, setStep] = useState("choice");

  useEffect(() => {
    if (open) setStep("choice");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl rounded-[28px] bg-neutral-950 border border-white/10 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
          <div>
            <div className="text-xs uppercase tracking-[0.24em] text-emerald-300/70">
              Contact
            </div>
            <h3 className="mt-1 text-lg font-semibold">Оставить заявку</h3>
          </div>
          <button
            onClick={onClose}
            className="rounded-xl px-3 py-2 text-sm bg-white/[0.06] hover:bg-white/[0.1] transition"
          >
            ✕
          </button>
        </div>

        <div className="p-6">
          {step === "choice" && (
            <>
              <p className="text-neutral-300">Выберите удобный способ связи:</p>

              <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href={TELEGRAM_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-[24px] border border-white/10 bg-white/[0.03] p-5 hover:border-emerald-500/40 hover:bg-white/[0.05] transition flex items-center gap-3"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" className="opacity-90">
                    <path
                      fill="currentColor"
                      d="M9.04 15.314L8.86 19.27c.36 0 .52-.154.708-.34l1.7-1.63 3.52 2.58c.647.357 1.112.17 1.29-.6l2.34-10.98c.24-1.08-.39-1.5-1.02-1.24L4.44 10.2c-1.05.42-1.03 1.02-.18 1.29l4.22 1.32 9.81-6.18c.46-.28.87-.12.53.16z"
                    />
                  </svg>
                  <div>
                    <div className="font-semibold">Telegram</div>
                    <div className="text-sm text-neutral-400">Быстрая связь</div>
                  </div>
                </a>

                <button
                  onClick={() => setStep("email")}
                  className="group rounded-[24px] border border-white/10 bg-white/[0.03] p-5 hover:border-emerald-500/40 hover:bg-white/[0.05] transition flex items-center gap-3 text-left"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" className="opacity-90">
                    <path
                      fill="currentColor"
                      d="M20 4H4c-1.1 0-2 .9-2 2v1.2l10 5.8 10-5.8V6c0-1.1-.9-2-2-2Zm0 4.7l-8.65 5.01a1 1 0 0 1-1.7 0L1.99 8.71V18c0 1.1.9 2 2 2h16a2 2 0 0 0 2-2V8.7Z"
                    />
                  </svg>
                  <div>
                    <div className="font-semibold">Email</div>
                    <div className="text-sm text-neutral-400">Короткая форма</div>
                  </div>
                </button>
              </div>
            </>
          )}

          {step === "email" && (
            <>
              <p className="text-neutral-300">Заполните форму — я отвечу на почту.</p>

              {FORMSPREE_ID !== "your_form_id" ? (
                <form
                  className="mt-5 grid gap-4"
                  action={`https://formspree.io/f/${FORMSPREE_ID}`}
                  method="POST"
                >
                  <input
                    className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3 outline-none focus:border-emerald-400/40"
                    name="name"
                    placeholder="Ваше имя"
                    required
                  />
                  <input
                    className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3 outline-none focus:border-emerald-400/40"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required
                  />
                  <textarea
                    className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3 min-h-[130px] outline-none focus:border-emerald-400/40"
                    name="message"
                    placeholder="Опишите задачу, сроки, бюджет…"
                    required
                  />
                  <button className="btn-modern w-fit" type="submit">
                    Отправить
                  </button>
                </form>
              ) : (
                <EmailMailtoForm onDone={onClose} />
              )}

              <div className="mt-5 text-sm text-neutral-500">
                Или сразу напишите на{" "}
                <a className="underline hover:text-emerald-400" href={`mailto:${EMAIL_TO}`}>
                  {EMAIL_TO}
                </a>
                .
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function EmailMailtoForm({ onDone }) {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent("Заявка с сайта CodeAFM");
    const body = encodeURIComponent(
      `Имя: ${form.name}\nEmail: ${form.email}\n\nСообщение:\n${form.message}`
    );
    window.location.href = `mailto:${EMAIL_TO}?subject=${subject}&body=${body}`;
    onDone?.();
  };

  return (
    <form className="mt-5 grid gap-4" onSubmit={onSubmit}>
      <input
        className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3 outline-none focus:border-emerald-400/40"
        placeholder="Ваше имя"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        required
      />
      <input
        className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3 outline-none focus:border-emerald-400/40"
        type="email"
        placeholder="Email"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
        required
      />
      <textarea
        className="w-full rounded-2xl bg-white/[0.04] border border-white/10 px-4 py-3 min-h-[130px] outline-none focus:border-emerald-400/40"
        placeholder="Опишите задачу, сроки, бюджет…"
        value={form.message}
        onChange={(e) => setForm({ ...form, message: e.target.value })}
        required
      />
      <button className="btn-modern w-fit" type="submit">
        Отправить
      </button>
    </form>
  );
}

/* ===== Лайтбокс ===== */
function ScreenshotModal({ images = [], open, onClose, startIndex = 0 }) {
  const [i, setI] = useState(startIndex);

  useEffect(() => {
    if (!open) return;
    setI(startIndex);
  }, [open, startIndex]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((v) => (v + 1) % images.length);
      if (e.key === "ArrowLeft") setI((v) => (v - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, images.length, onClose]);

  if (!open || images.length === 0) return null;

  return (
    <div
      className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="relative max-w-[96vw] max-h-[92vh]" onClick={(e) => e.stopPropagation()}>
        <img
          src={images[i]}
          alt={`shot-${i + 1}`}
          className="max-w-[96vw] max-h-[92vh] object-contain rounded-2xl ring-1 ring-white/10"
        />

        <div className="absolute -top-11 left-0 text-sm text-neutral-300">
          {i + 1} / {images.length}
        </div>

        <button
          onClick={onClose}
          className="absolute -top-12 right-0 rounded-xl px-3 py-2 bg-white/[0.08] hover:bg-white/[0.14]"
        >
          ✕
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={() => setI((v) => (v - 1 + images.length) % images.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 hover:bg-black/65 px-4 py-3 text-xl"
            >
              ‹
            </button>
            <button
              onClick={() => setI((v) => (v + 1) % images.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/45 hover:bg-black/65 px-4 py-3 text-xl"
            >
              ›
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ================= ДАННЫЕ ПРОЕКТОВ ================= */
const projects = [
  {
    title: "TaskGram",
    category: "mobile",
    featured: true,
    type: "Android App",
    year: "2026",
    result: "Reward app with tasks, monetization and Firebase backend",
    desc: "Приложение для заработка на заданиях: подписки, видео, установки приложений, история операций, вывод средств и продуманная система монетизации.",
    tags: ["Android", "Firebase", "Ads", "Reward App"],
    icon: asset("icons/taskgram.png"),
    cover: asset("screenshots/taskgram/1.jpg"),
    links: [
      { label: "Скачать APK", href: asset("downloads/TaskGram_v1.0.apk"), download: true },
    ],
    screenshots: [
      asset("screenshots/taskgram/1.jpg"),
      asset("screenshots/taskgram/2.jpg"),
      asset("screenshots/taskgram/3.jpg"),
      asset("screenshots/taskgram/4.jpg"),
    ],
  },
  {
    title: "PrimeVPN",
    category: "mobile",
    featured: true,
    type: "Android App",
    year: "2026",
    result: "VPN app with premium locations and clean UX",
    desc: "VPN-приложение с бесплатными и премиум-локациями, современным интерфейсом, удобным подключением и готовой основой для подписок.",
    tags: ["Android", "OpenVPN", "Billing", "VPN"],
    icon: asset("icons/primevpn.png"),
    cover: asset("screenshots/primevpn/1.jpg"),
    links: [
      { label: "Скачать APK", href: asset("downloads/PrimeVPN_v1.0.apk"), download: true },
    ],
    screenshots: [
      asset("screenshots/primevpn/1.jpg"),
      asset("screenshots/primevpn/2.jpg"),
      asset("screenshots/primevpn/3.jpg"),
      asset("screenshots/primevpn/4.jpg"),
    ],
  },
  {
    title: "Durak 36",
    category: "game",
    featured: false,
    type: "Android Game",
    year: "2026",
    result: "Card game with online mode, rooms and polished table UX",
    desc: "Карточная игра Дурак 36 с красивым игровым столом, ботом, онлайн-комнатами, балансом и системой матчей.",
    tags: ["Game", "Android", "Cards", "Online"],
    icon: asset("icons/durak36.jpg"),
    cover: asset("screenshots/durak36/1.jpg"),
    links: [{ label: "Подробнее", action: true }],
    screenshots: [
      asset("screenshots/durak36/1.jpg"),
      asset("screenshots/durak36/2.jpg"),
      asset("screenshots/durak36/3.jpg"),
      asset("screenshots/durak36/4.jpg"),
    ],
  },
  {
    title: "Bubble Pop",
    category: "game",
    featured: false,
    type: "Android Game",
    year: "2026",
    result: "Arcade experience with smooth animation",
    desc: "Яркая мобильная аркада с плавной анимацией, визуальными эффектами и простым вовлекающим геймплеем.",
    tags: ["Game", "Android", "Arcade"],
    icon: asset("icons/bubblepop.png"),
    cover: asset("screenshots/bubblepop/1.png"),
    links: [
      { label: "Скачать APK", href: asset("downloads/BubblePop_v1.0.apk"), download: true },
    ],
    screenshots: [
      asset("screenshots/bubblepop/1.png"),
      asset("screenshots/bubblepop/2.png"),
      asset("screenshots/bubblepop/3.png"),
      asset("screenshots/bubblepop/4.png"),
    ],
  },
  {
    title: "2048 Game",
    category: "game",
    featured: false,
    type: "Android Game",
    year: "2026",
    result: "Classic puzzle rebuilt with modern polish",
    desc: "Классическая головоломка 2048 с плавной анимацией, звуками, UX-улучшениями и таблицей рекордов.",
    tags: ["Game", "Android", "Puzzle"],
    icon: asset("icons/2048.png"),
    cover: asset("screenshots/2048/1.jpg"),
    links: [{ label: "Скачать APK", href: asset("downloads/2048_v1.0.apk"), download: true }],
    screenshots: [
      asset("screenshots/2048/1.jpg"),
      asset("screenshots/2048/2.jpg"),
      asset("screenshots/2048/3.jpg"),
      asset("screenshots/2048/4.jpg"),
    ],
  },
  {
    title: "Dot Is Dead",
    category: "game",
    featured: false,
    type: "Android Game",
    year: "2026",
    result: "Fast arcade with rhythm and progression",
    desc: "Динамичная аркада с уровнями, ловушками, эффектами и таблицей рекордов.",
    tags: ["Game", "Android", "Rhythm"],
    icon: asset("icons/dotisdead.png"),
    cover: asset("screenshots/dotisdead/1.jpg"),
    links: [
      { label: "Скачать APK", href: asset("downloads/DotisDead_v1.0.apk"), download: true },
    ],
    screenshots: [
      asset("screenshots/dotisdead/1.jpg"),
      asset("screenshots/dotisdead/2.jpg"),
      asset("screenshots/dotisdead/3.jpg"),
      asset("screenshots/dotisdead/4.jpg"),
    ],
  },
  {
    title: "PDF Scanner",
    category: "mobile",
    featured: false,
    type: "Android Utility",
    year: "2026",
    result: "Document scanner with camera workflow and PDF export",
    desc: "Сканер документов с CameraX, автообрезкой, сохранением в PDF и просмотром документов внутри приложения.",
    tags: ["Android", "PDF", "CameraX", "Utility"],
    icon: asset("icons/pdfscanner.png"),
    cover: asset("screenshots/pdfscanner/1.png"),
    links: [{ label: "Подробнее", action: true }],
    screenshots: [
      asset("screenshots/pdfscanner/1.png"),
      asset("screenshots/pdfscanner/2.png"),
      asset("screenshots/pdfscanner/3.png"),
 
    ],
  },
  {
    title: "LiftTJ.com",
    category: "website",
    featured: true,
    type: "Client Website",
    year: "2026",
    result: "Business website for elevator sales and installation",
    desc: "Клиентский сайт по продаже, установке и обслуживанию лифтов. Современный деловой стиль, услуги, кейсы и контактные блоки.",
    tags: ["Website", "React", "Business", "Client"],
    icon: asset("icons/lifttj.png"),
    cover: asset("screenshots/lifttj/1.png"),
    links: [{ label: "Открыть сайт", href: "https://lifttj.com" }],
    screenshots: [
      asset("screenshots/lifttj/1.png"),
      asset("screenshots/lifttj/2.png"),
      asset("screenshots/lifttj/3.png"),
      asset("screenshots/lifttj/4.png"),
      asset("screenshots/lifttj/5.png"),
    ],
  },
  {
    title: "Irina-Visage.ru",
    category: "website",
    featured: false,
    type: "Client Website",
    year: "2026",
    result: "Premium beauty presentation website",
    desc: "Премиальный beauty-сайт с красивой подачей услуг, галереей и удобной связью с клиентами.",
    tags: ["Website", "Beauty", "Client"],
    icon: asset("icons/irina-visage.png"),
    cover: asset("screenshots/irinavisage/1.png"),
    links: [{ label: "Открыть сайт", href: "https://irina-visage.ru" }],
    screenshots: [
      asset("screenshots/irinavisage/1.png"),
      asset("screenshots/irinavisage/2.png"),
      asset("screenshots/irinavisage/3.png"),
      asset("screenshots/irinavisage/4.png"),
      asset("screenshots/irinavisage/5.png"),
      asset("screenshots/irinavisage/6.png"),
    ],
  },
  {
    title: "Kinokube.ru",
    category: "website",
    featured: false,
    type: "Client Website",
    year: "2026",
    result: "Modern content-focused web experience",
    desc: "Клиентский веб-проект с современным интерфейсом, адаптивной версткой и удобной подачей контента.",
    tags: ["Website", "Media", "Client"],
    icon: asset("icons/kinokube.png"),
    cover: asset("screenshots/kinokube/1.png"),
    links: [{ label: "Открыть сайт", href: "https://kinokube.ru" }],
    screenshots: [
      asset("screenshots/kinokube/1.png"),
      asset("screenshots/kinokube/2.png"),
      asset("screenshots/kinokube/3.png"),
    ],
  },
  {
    title: "Интеграции",
    category: "custom",
    featured: false,
    type: "Backend / API",
    year: "2026",
    result: "FCM, payments, analytics, Telegram and API integrations",
    desc: "Telegram/FCM, платежи, аналитика, webhooks, CRM и backend-интеграции под конкретный проект.",
    tags: ["Node.js", "Express", "Firestore", "API"],
    icon: asset("icons/integrations.png"),
    cover: asset("screenshots/taskgram/3.jpg"),
    links: [{ label: "Оставить заявку", action: true }],
    screenshots: [],
  },
  {
    title: "Кастом под ключ",
    category: "custom",
    featured: false,
    type: "Full Cycle",
    year: "2026",
    result: "Design → Code → Backend → Release",
    desc: "Полный цикл разработки: дизайн, frontend, backend, интеграции, публикация и поддержка продукта.",
    tags: ["Design", "Android", "Backend", "Release", "Web"],
    icon: asset("icons/custom.png"),
    cover: asset("screenshots/primevpn/2.jpg"),
    links: [{ label: "Оставить заявку", action: true }],
    screenshots: [],
  },
];

/* ================= UI ================= */
const filters = [
  { key: "all", label: "Все" },
  { key: "mobile", label: "Mobile Apps" },
  { key: "game", label: "Games" },
  { key: "website", label: "Websites" },
  { key: "custom", label: "Custom" },
];

const stats = [
  { n: "10+", l: "Проектов" },
  { n: "4+", l: "Года опыта" },
  { n: "Full", l: "Cycle Dev" },
  { n: "RU/EN", l: "Коммуникация" },
];

function Nav({ onRequest }) {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-neutral-950/75 backdrop-blur-xl">
      <nav className="container h-16 flex items-center justify-between">
        <a href="#" className="font-semibold tracking-[0.14em] text-sm sm:text-base">
          CODEAFM <span className="text-emerald-400">PORTFOLIO</span>
        </a>

        <ul className="hidden lg:flex items-center gap-6 text-sm text-neutral-300">
          <li><a className="hover:text-emerald-400" href="#featured">Избранное</a></li>
          <li><a className="hover:text-emerald-400" href="#projects">Проекты</a></li>
          <li><a className="hover:text-emerald-400" href="#services">Услуги</a></li>
          <li><a className="hover:text-emerald-400" href="#about">Обо мне</a></li>
          <li><a className="hover:text-emerald-400" href="#contact">Контакты</a></li>
        </ul>

        <button className="btn-modern" onClick={onRequest}>
          Заказать
        </button>
      </nav>
    </header>
  );
}

function Hero({ onRequest }) {
  return (
    <section className="relative overflow-hidden pt-16 md:pt-24 pb-14 md:pb-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-30 bg-emerald-500/20" />
        <div className="absolute right-0 top-1/3 h-[26rem] w-[26rem] rounded-full blur-3xl opacity-20 bg-cyan-500/10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_35%)]" />
      </div>

      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="scroll-fade flex justify-center">
            <AnimatedLogo />
          </div>

          <div className="mt-8 text-center scroll-fade" style={{ transitionDelay: ".12s" }}>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs uppercase tracking-[0.24em] text-emerald-300/85">
              Android • Games • Websites • Backend
            </div>

            <h1 className="mt-6 text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.04]">
              Разрабатываю приложения,игры,сайты
              <br />
              <span className="text-white/75">От идеи и дизайна до релиза и поддержки.</span>
            </h1>

        

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a href="#projects" className="btn-modern">Смотреть проекты</a>
              <button onClick={onRequest} className="btn-ghost">
                Обсудить проект
              </button>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 scroll-fade" style={{ transitionDelay: ".2s" }}>
            {stats.map((item) => (
              <div
                key={item.l}
                className="rounded-[24px] border border-white/10 bg-white/[0.04] px-5 py-5 text-center backdrop-blur-xl"
              >
                <div className="text-2xl md:text-3xl font-semibold">{item.n}</div>
                <div className="mt-1 text-sm text-neutral-400">{item.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedProjects({ onRequest }) {
  const featured = projects.filter((p) => p.featured);

  return (
    <section id="featured" className="py-16 md:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Selected Work"
          title="Избранные проекты"
          text="Ключевые приложения и клиентские сайты, которые лучше всего показывают уровень дизайна, архитектуры и продакшн-подхода."
        />

        <div className="mt-10 grid gap-8">
          {featured.map((project) => (
            <ProjectCard key={project.title} project={project} onRequest={onRequest} featured />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection({ onRequest }) {
  const [filter, setFilter] = useState("all");

  const filtered = useMemo(() => {
    if (filter === "all") return projects;
    return projects.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <section id="projects" className="py-16 md:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Portfolio"
          title="Все проекты"
          text="Мобильные приложения, игры, сайты для клиентов и кастомные решения. Все в одном современном showcase."
        />

        <div className="mt-8 flex flex-wrap gap-2 scroll-fade">
          {filters.map((item) => (
            <button
              key={item.key}
              onClick={() => setFilter(item.key)}
              className={`rounded-full px-4 py-2 text-sm border transition ${
                filter === item.key
                  ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                  : "border-white/10 bg-white/[0.03] text-neutral-300 hover:border-white/20"
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-7">
          {filtered.map((project) => (
            <ProjectCard key={project.title} project={project} onRequest={onRequest} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, onRequest, featured = false }) {
  const [lbOpen, setLbOpen] = useState(false);
  const [lbIndex, setLbIndex] = useState(0);

  return (
    <>
      <article
        className={`group overflow-hidden rounded-[30px] border border-white/10 bg-white/[0.03] backdrop-blur-xl hover:bg-white/[0.05] transition-all duration-300 scroll-fade ${
          featured ? "shadow-[0_10px_60px_rgba(16,185,129,0.06)]" : ""
        }`}
      >
        <div className="grid lg:grid-cols-[1.15fr_0.95fr]">
          <div className="relative min-h-[280px] md:min-h-[360px]">
            <img
              src={project.cover}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.14),transparent_30%)]" />

            <div className="absolute left-5 top-5 flex flex-wrap gap-2">
              <span className="rounded-full border border-emerald-400/25 bg-emerald-400/10 px-3 py-1 text-xs text-emerald-300">
                {project.type}
              </span>
              <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs text-white/80">
                {project.year}
              </span>
            </div>

            <div className="absolute left-5 right-5 bottom-5">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-2xl overflow-hidden ring-1 ring-white/10 bg-black/20 backdrop-blur">
                  <img src={project.icon} alt={project.title} className="h-full w-full object-contain" />
                </div>
                <div>
                  <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-sm md:text-base text-white/75">{project.result}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 md:p-7 lg:p-8">
            <p className="text-sm md:text-[15px] leading-7 text-neutral-300">
              {project.desc}
            </p>

            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs text-neutral-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {project.links.map(({ label, href, download, action }) =>
                action ? (
                  <button key={label} onClick={onRequest} className="btn-modern">
                    {label}
                  </button>
                ) : (
                  <a
                    key={label}
                    href={href}
                    className="btn-modern"
                    {...(download ? { download: true } : {})}
                    target={download ? undefined : "_blank"}
                    rel={download ? undefined : "noreferrer"}
                  >
                    {label}
                  </a>
                )
              )}

              {project.screenshots?.length > 0 && (
                <button
                  onClick={() => {
                    setLbIndex(0);
                    setLbOpen(true);
                  }}
                  className="btn-ghost"
                >
                  Галерея
                </button>
              )}
            </div>

            {project.screenshots?.length > 0 && (
              <div className="mt-6 grid grid-cols-3 gap-2">
                {project.screenshots.slice(0, 3).map((src, idx) => (
                  <button
                    key={`${project.title}-${idx}`}
                    onClick={() => {
                      setLbIndex(idx);
                      setLbOpen(true);
                    }}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-black/20"
                  >
                    <img
                      src={src}
                      alt={`${project.title}-${idx + 1}`}
                      className="h-24 md:h-28 w-full object-cover transition duration-300 group-hover:scale-[1.01]"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </article>

      <ScreenshotModal
        images={project.screenshots || []}
        open={lbOpen}
        onClose={() => setLbOpen(false)}
        startIndex={lbIndex}
      />
    </>
  );
}

function ProcessSection() {
  const items = [
    {
      t: "1. Анализ",
      d: "Разбираю задачу, цели продукта, аудиторию и оптимальный стек.",
    },
    {
      t: "2. Дизайн",
      d: "Делаю современную структуру интерфейса, акценты и удобный пользовательский сценарий.",
    },
    {
      t: "3. Разработка",
      d: "Собираю frontend / Android / backend, подключаю интеграции, оплату, уведомления и аналитику.",
    },
    {
      t: "4. Релиз",
      d: "Тестирование, сборка, деплой, публикация и дальнейшая поддержка.",
    },
  ];

  return (
    <section className="py-16 md:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Workflow"
          title="Как я работаю"
          text="Понятный процесс — от идеи до готового продукта."
        />

        <div className="mt-10 grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {items.map((item, i) => (
            <div
              key={item.t}
              className="scroll-fade rounded-[28px] border border-white/10 bg-white/[0.03] p-6"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="text-lg font-semibold">{item.t}</div>
              <p className="mt-3 text-sm leading-7 text-neutral-300">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Services() {
  const data = [
    {
      t: "Android Development",
      d: "Java/Kotlin, Firebase, уведомления, реклама, подписки, публикация.",
    },
    {
      t: "Game Development",
      d: "Игры под Android, UX/UI, оптимизация, монетизация и геймплейная логика.",
    },
    {
      t: "Websites & Landing Pages",
      d: "Современные сайты для клиентов: бизнес, портфолио, услуги, промо.",
    },
    {
      t: "Backend & Integrations",
      d: "Node.js, Express, Firestore, API, Telegram, webhooks, CRM и кастомная логика.",
    },
  ];

  return (
    <section id="services" className="py-16 md:py-20">
      <div className="container">
        <SectionHeading
          eyebrow="Services"
          title="Что могу сделать"
          text="Полный цикл разработки или отдельные этапы под твой проект."
        />

        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {data.map((item, i) => (
            <div
              key={item.t}
              className="scroll-fade rounded-[28px] border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.05] transition"
              style={{ transitionDelay: `${i * 90}ms` }}
            >
              <div className="text-xl font-semibold">{item.t}</div>
              <p className="mt-3 text-sm leading-7 text-neutral-300">{item.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="py-16 md:py-20">
      <div className="container">
        <div className="scroll-fade rounded-[32px] border border-white/10 bg-white/[0.03] p-7 md:p-10">
          <div className="text-xs uppercase tracking-[0.24em] text-emerald-300/70">About</div>
          <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">Обо мне</h2>

          <p className="mt-6 max-w-4xl text-neutral-300 leading-8">
            CODEAFM — Android / Web / Backend Developer. Делаю продукты целиком:
            от идеи и дизайна до релиза в сторах и технической поддержки.
            <br /><br />
            Работаю с Android-приложениями, играми, клиентскими сайтами, backend-логикой,
            уведомлениями, интеграциями, аналитикой и публикацией.
            <br /><br />
            Примеры работ: TaskGram, PrimeVPN, Durak 36, Bubble Pop, 2048, Dot Is Dead,
            Alien Shooter, PDF Scanner, LiftTJ.com, Irina-Visage.ru, Kinokube.ru.
            <br /><br />
            Формат работы: Remote/Worldwide, языки RU/EN, поэтапная прозрачная работа,
            понятные сроки и регулярный показ прогресса.
          </p>
        </div>
      </div>
    </section>
  );
}

function ContactCTA({ onRequest }) {
  return (
    <section id="contact" className="py-16 md:py-20">
      <div className="container">
        <div className="scroll-fade relative overflow-hidden rounded-[34px] border border-white/10 bg-gradient-to-br from-white/[0.05] to-white/[0.02] px-6 py-8 md:px-10 md:py-12">
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.18),transparent_30%)]" />

          <div className="max-w-3xl">
            <div className="text-xs uppercase tracking-[0.24em] text-emerald-300/70">
              Contact
            </div>
            <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">
              Готов обсудить ваш проект
            </h2>
            <p className="mt-4 text-neutral-300 leading-8">
              Нужен MVP, сайт для клиента, мобильное приложение, игра или backend-интеграции —
              напишите, и я предложу лучший путь по срокам и бюджету.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a className="btn-modern" href={TELEGRAM_URL} target="_blank" rel="noreferrer">
                Открыть Telegram
              </a>
              <a className="btn-ghost" href={`mailto:${EMAIL_TO}`}>
                Написать на Email
              </a>
              <button className="btn-ghost" onClick={onRequest}>
                Оставить заявку
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="container h-16 flex items-center justify-between text-sm text-neutral-400">
        <span>© {new Date().getFullYear()} CodeAFM</span>
        <a className="hover:text-emerald-400" href="#">
          Наверх ↑
        </a>
      </div>
    </footer>
  );
}

function SectionHeading({ eyebrow, title, text }) {
  return (
    <div className="scroll-fade">
      <div className="text-xs uppercase tracking-[0.24em] text-emerald-300/70">{eyebrow}</div>
      <h2 className="mt-3 text-3xl md:text-5xl font-semibold tracking-tight">{title}</h2>
      {text ? <p className="mt-4 max-w-3xl text-neutral-400 leading-8">{text}</p> : null}
    </div>
  );
}

/* ================= MAIN APP ================= */
export default function App() {
  useScrollReveal();
  const [requestOpen, setRequestOpen] = useState(false);

  return (
    <div className="min-h-screen bg-neutral-950 text-white selection:bg-emerald-400/25 selection:text-white">
      <StylePatch />
      <Nav onRequest={() => setRequestOpen(true)} />
      <Hero onRequest={() => setRequestOpen(true)} />
      <FeaturedProjects onRequest={() => setRequestOpen(true)} />
      <ProjectsSection onRequest={() => setRequestOpen(true)} />
      <ProcessSection />
      <Services />
      <About />
      <ContactCTA onRequest={() => setRequestOpen(true)} />
      <Footer />
      <RequestModal open={requestOpen} onClose={() => setRequestOpen(false)} />
    </div>
  );
}

/* ================= НЕБОЛЬШОЙ STYLE PATCH ПРЯМО В APP ================= */
function StylePatch() {
  return (
    <style>{`
      .container {
        width: min(1200px, calc(100% - 32px));
        margin-inline: auto;
      }

      .scroll-fade {
        opacity: 0;
        transform: translateY(18px);
        transition: opacity .65s ease, transform .65s ease;
      }

      .scroll-fade.show {
        opacity: 1;
        transform: translateY(0);
      }

      .btn-modern {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 46px;
        padding: 0 18px;
        border-radius: 16px;
        background: linear-gradient(180deg, rgba(16,185,129,.22), rgba(16,185,129,.12));
        border: 1px solid rgba(52,211,153,.28);
        color: white;
        transition: .22s ease;
        text-decoration: none;
        font-size: 14px;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(16,185,129,.08);
      }

      .btn-modern:hover {
        transform: translateY(-1px);
        background: linear-gradient(180deg, rgba(16,185,129,.28), rgba(16,185,129,.16));
        border-color: rgba(52,211,153,.42);
      }

      .btn-ghost {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-height: 46px;
        padding: 0 18px;
        border-radius: 16px;
        background: rgba(255,255,255,.03);
        border: 1px solid rgba(255,255,255,.10);
        color: white;
        transition: .22s ease;
        text-decoration: none;
        font-size: 14px;
        font-weight: 500;
      }

      .btn-ghost:hover {
        background: rgba(255,255,255,.06);
        border-color: rgba(255,255,255,.18);
        transform: translateY(-1px);
      }

      html {
        scroll-behavior: smooth;
      }

      body {
        background: #0a0a0a;
      }
    `}</style>
  );
}