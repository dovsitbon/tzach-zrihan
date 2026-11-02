/**
 * Génère le site statique, une page par langue :
 *   /index.html (redirection vers la langue mémorisée ou celle du navigateur)
 *   /he/ (par défaut, RTL), /en/, /fr/, /es/ + page légale de chaque langue
 *   public/sitemap.xml, robots.txt, llms.txt, favicon
 * Textes : locales/<langue>.json · Données : data/site.json · Médias : src/data/media.json (npm run media)
 *
 *   npm run gen   (lancé automatiquement par npm run dev et npm run build)
 */
import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const read = async (p) => JSON.parse(await readFile(path.join(ROOT, p), "utf8"));
const LANGS = ["he", "en", "fr", "es"];
const L = Object.fromEntries(await Promise.all(LANGS.map(async (l) => [l, await read(`locales/${l}.json`)])));
const S = await read("data/site.json");
const M = await read("src/data/media.json");
const SITE = (process.env.SITE_URL || S.url).replace(/\/$/, "");
const WA = `https://wa.me/${S.wa}`;

const LEGAL = { he: "privacy/", en: "privacy/", fr: "mentions-legales/", es: "aviso-legal/" };
const FONTS = {
  he: "family=Heebo:wght@300;400;500&family=Frank+Ruhl+Libre:wght@300;400&family=Jost:wght@300;400",
  latin: "family=Jost:wght@300;400;500&family=Cormorant+Garamond:ital,wght@0,400;1,300;1,400",
};

const esc = (s = "") => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const br = (s = "") => esc(s).replace(/\n/g, "<br>");
const num = (i) => String(i + 1).padStart(3, "0");

/* ---------- Médias ---------- */
function pic(key, alt, { sizes = "100vw", cls = "", eager = false } = {}) {
  const m = M[key];
  if (!m) throw new Error(`Média manquant : ${key} (lancer npm run media)`);
  const set = (ext) => m.widths.map((w) => `/media/${key}-${w}.${ext} ${w}w`).join(", ");
  const last = m.widths[m.widths.length - 1];
  const h = Math.round((m.h / m.w) * last);
  return `<picture${cls ? ` class="${cls}"` : ""}><source type="image/avif" srcset="${set("avif")}" sizes="${sizes}"><img src="/media/${key}-${last}.webp" srcset="${set("webp")}" sizes="${sizes}" width="${last}" height="${h}" alt="${esc(alt)}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async"></picture>`;
}
/** Affiche du hero : verticale sur téléphone, horizontale ailleurs (même règle que la vidéo, data-portrait). */
const PORTRAIT = "(max-aspect-ratio: 4/5)";
function heroPoster(alt) {
  const set = (key, ext) => M[key].widths.map((w) => `/media/${key}-${w}.${ext} ${w}w`).join(", ");
  const h = M["hero/poster"], last = h.widths[h.widths.length - 1];
  return `<picture class="hero__poster"><source media="${PORTRAIT}" type="image/avif" srcset="${set("hero/poster-v", "avif")}" sizes="100vw"><source media="${PORTRAIT}" type="image/webp" srcset="${set("hero/poster-v", "webp")}" sizes="100vw"><source type="image/avif" srcset="${set("hero/poster", "avif")}" sizes="100vw"><img src="/media/hero/poster-${last}.webp" srcset="${set("hero/poster", "webp")}" sizes="100vw" width="${last}" height="${Math.round((h.h / h.w) * last)}" alt="${esc(alt)}" fetchpriority="high" decoding="async"></picture>`;
}
const src = (key, w) => `/media/${key}-${w ?? M[key].widths[M[key].widths.length - 1]}.webp`;

/* ---------- Icônes et marque ---------- */
const icon = {
  wa: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 11.6A8.3 8.3 0 0 1 7.8 19L4 20l1-3.7a8.3 8.3 0 1 1 15-4.7Z"/><path d="M9 8.6c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.6 1 1.4 1.8 2.5 2.4.2.1.4.1.5 0l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.2.3.4 0 .5-.2 1.2-.7 1.5-.5.3-1.4.6-2.6.2-1.3-.4-2.7-1.4-3.8-2.6-1-1.1-1.6-2.3-1.8-3.2-.1-.8.2-1.5.5-1.9Z"/></svg>',
  ig: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".7"/></svg>',
  threads: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M16.6 11.2c-.3-2.4-1.9-3.6-4.3-3.6-1.7 0-3 .7-3.7 1.9"/><path d="M15.8 11.4c-3.5-.8-6.6.1-6.6 2.6 0 1.4 1.2 2.4 2.9 2.3 2.4-.1 3.6-1.9 3.7-5.4.1-3.9-1.6-6.6-5.6-6.6-4 0-6.2 2.8-6.2 7.6s2.3 7.4 6.6 7.4c3.6 0 6-2.1 6-4.6 0-1.6-.9-2.8-2.4-3.3"/></svg>',
  play: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5.5v13l10.5-6.5Z"/></svg>',
  close: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>',
  prev: '<svg class="i flip" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7"/></svg>',
  next: '<svg class="i flip" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7"/></svg>',
  plus: '<svg class="i" viewBox="0 0 24 24" aria-hidden="true"><path class="v" d="M12 5v14"/><path d="M5 12h14"/></svg>',
  arrow: '<svg class="i flip" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
};
/** Monogramme TZ en traits fins (fichier autonome : public/brand/monogram.svg). */
const MONO_PATHS = '<path d="M12 21h20M22 21v23"/><path d="M30 21h22L30 44h22"/>';
const monogram = (cls = "") => `<svg class="mono ${cls}" viewBox="0 0 64 64" aria-hidden="true">${MONO_PATHS}</svg>`;
/** Logo typographique : remplaçable par un vrai logo en changeant cette fonction. */
const logo = (t, cls = "") => `<span class="logo ${cls}" translate="no"><span class="logo__name">${esc(t.brand.name)}</span><span class="logo__sub">${esc(t.brand.sub)}</span></span>`;
const heart = '<svg class="heart" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.2s-7.4-4.5-7.4-10a4.2 4.2 0 0 1 7.4-2.8 4.2 4.2 0 0 1 7.4 2.8c0 5.5-7.4 10-7.4 10Z"/></svg>';

/* ---------- Données structurées ---------- */
function schema(lang) {
  const t = L[lang];
  const url = `${SITE}/${lang}/`;
  const business = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE}/#business`,
    name: "Tzach Zrihan Wedding Productions",
    alternateName: ["צח זריהן מפיק חתונות", "Tzach Productions"],
    description: t.meta.description,
    url,
    image: `${SITE}/og.jpg`,
    logo: `${SITE}/brand/monogram.png`,
    telephone: "+972549814740",
    areaServed: { "@type": "Country", name: "Israel" },
    knowsLanguage: ["he", "en"],
    serviceType: t.services.items.map((s) => s.title),
    founder: { "@type": "Person", name: "Tzach Zrihan", alternateName: "צח זריהן", jobTitle: lang === "he" ? "מפיק חתונות" : "Wedding producer" },
    sameAs: [S.instagram, S.threads],
    contactPoint: { "@type": "ContactPoint", telephone: "+972549814740", contactType: "customer service", availableLanguage: ["Hebrew"] },
  };
  const faq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: t.faq.items.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };
  const site = { "@context": "https://schema.org", "@type": "WebSite", name: "Tzach Zrihan", url: `${SITE}/`, inLanguage: LANGS };
  return [business, faq, site].map((o) => `<script type="application/ld+json">${JSON.stringify(o).replace(/</g, "\\u003c")}</script>`).join("\n");
}

/* ---------- Gabarit commun ---------- */
function head(lang, { title, description, pathFor, noindex = false }) {
  const t = L[lang];
  const fonts = lang === "he" ? FONTS.he : FONTS.latin;
  const alternates = LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE}${pathFor(l)}">`).join("\n  ");
  return `<!doctype html>
<html lang="${lang}" dir="${t.dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(description)}">
  ${noindex ? '<meta name="robots" content="noindex">' : ""}
  <link rel="canonical" href="${SITE}${pathFor(lang)}">
  ${alternates}
  <link rel="alternate" hreflang="x-default" href="${SITE}${pathFor("he")}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Tzach Zrihan Wedding Productions">
  <meta property="og:title" content="${esc(title)}">
  <meta property="og:description" content="${esc(description)}">
  <meta property="og:url" content="${SITE}${pathFor(lang)}">
  <meta property="og:image" content="${SITE}/og.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="${t.locale}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#FAF8F5">
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?${fonts}&display=swap">
  <link rel="stylesheet" href="/src/styles/main.css">
  <script>try{if(!sessionStorage.getItem("tz-intro")&&!matchMedia("(prefers-reduced-motion: reduce)").matches&&document.documentElement.dataset.page==null)document.documentElement.classList.add("intro-on")}catch(e){}</script>`;
}

function langSwitch(lang, pathFor, cls = "") {
  const t = L[lang];
  return `<nav class="langs ${cls}" aria-label="${esc(t.ui.language)}">${LANGS.map((l) =>
    `<a href="${pathFor(l)}" hreflang="${l}" lang="${l}" data-lang="${l}"${l === lang ? ' aria-current="true"' : ""}>${esc(L[l].label)}</a>`,
  ).join('<span aria-hidden="true">·</span>')}</nav>`;
}

function header(lang, pathFor, home) {
  const t = L[lang];
  const base = home ? "" : `/${lang}/`;
  const main = ["story", "services", "weddings", "testimonials", "faq"];
  const links = (keys) => keys.map((k) => `<a href="${base}#${k}">${esc(t.nav[k])}</a>`).join("");
  return `<a class="skip" href="#main">${esc(t.ui.skipToContent)}</a>
<header class="hdr${home ? " hdr--over" : ""}" data-header>
  <nav class="hdr__nav" aria-label="${esc(t.ui.menu)}">${links(main)}</nav>
  <a class="hdr__logo" href="/${lang}/" aria-label="${esc(t.brand.name)} · ${esc(t.brand.sub)}">${logo(t)}</a>
  <div class="hdr__end">
    ${langSwitch(lang, pathFor)}
    <a class="hdr__ig" href="${S.instagram}" target="_blank" rel="noopener" aria-label="Instagram ${esc(S.instagramHandle)}">${icon.ig}</a>
    <button class="hdr__burger" type="button" aria-expanded="false" aria-controls="menu" data-menu-open><span class="sr">${esc(t.ui.menu)}</span><i></i><i></i></button>
  </div>
</header>
<div class="menu" id="menu" data-menu hidden>
  <nav class="menu__nav" aria-label="${esc(t.ui.menu)}">${[...main, "contact"].map((k, i) => `<a href="${base}#${k}" style="--i:${i}">${esc(t.nav[k])}</a>`).join("")}</nav>
  <div class="menu__foot">${langSwitch(lang, pathFor)}<a href="${S.instagram}" target="_blank" rel="noopener">${esc(S.instagramHandle)}</a></div>
</div>`;
}

function footer(lang, pathFor) {
  const t = L[lang];
  return `<footer class="ftr">
  <div class="wrap ftr__in">
    ${monogram("ftr__mono")}
    ${logo(t, "logo--ftr")}
    <p class="ftr__tag">${esc(t.footer.tagline)}</p>
    <ul class="ftr__social">
      <li><a href="${WA}" target="_blank" rel="noopener">${icon.wa}<span>${esc(S.phoneIntl)}</span></a></li>
      <li><a href="${S.instagram}" target="_blank" rel="noopener">${icon.ig}<span>Instagram</span></a></li>
      <li><a href="${S.threads}" target="_blank" rel="noopener">${icon.threads}<span>Threads</span></a></li>
    </ul>
    <div class="ftr__bottom">
      ${langSwitch(lang, pathFor)}
      <a href="/${lang}/${LEGAL[lang]}">${esc(t.footer.legal)}</a>
      <span>© ${new Date().getFullYear()} Tzach Zrihan · ${esc(t.ui.rights)}</span>
    </div>
  </div>
</footer>
<a class="wa-float" href="${WA}?text=${encodeURIComponent(t.contact.waGreeting)}" target="_blank" rel="noopener" aria-label="${esc(t.ui.waFloat)}">${icon.wa}</a>`;
}

/* ---------- Page d'accueil ---------- */
function home(lang) {
  const t = L[lang];
  const pathFor = (l) => `/${l}/`;
  const cardSizes = "(max-width: 760px) 86vw, 30vw";

  const promises = t.promises.items.map((p, i) => `
      <article class="card reveal" style="--i:${i}">
        ${pic(["promise/precision", "promise/savings", "promise/calm"][i], t.alts[["precision", "savings", "calm"][i]], { sizes: cardSizes, cls: "card__img" })}
        <p class="card__num">${num(i)}</p>
        <h3 class="card__title">${esc(p.title)}</h3>
        <p class="card__label" lang="he-Latn">${esc(p.label)}</p>
        <p class="card__text">${esc(p.text)}</p>
      </article>`).join("");

  const services = t.services.items.map((s, i) => `
      <li class="svc reveal" style="--i:${i % 3}">
        <span class="svc__num">${String(i + 1).padStart(2, "0")}</span>
        <h3 class="svc__title">${esc(s.title)}</h3>
        <p class="svc__text">${esc(s.text)}</p>
      </li>`).join("");

  const steps = t.process.steps.map((s, i) => `
      <li class="step reveal" style="--i:${i}">
        <span class="step__num">${String(i + 1).padStart(2, "0")}</span>
        <h3 class="step__title">${esc(s.title)}</h3>
        <p class="step__text">${esc(s.text)}</p>
      </li>`).join("");

  const couples = S.couples.map((c, i) => {
    const ct = t.weddings.couples[c.id];
    return `
      <li class="couple reveal" style="--i:${i % 3}">
        <button class="couple__btn" type="button" data-open="couple-${c.id}" aria-haspopup="dialog">
          ${pic(`couples/${c.id}/cover`, "", { sizes: cardSizes, cls: "couple__img" })}
          <span class="couple__meta">
            <span class="couple__num">${num(i)}</span>
            <span class="couple__names">${esc(ct.names)}</span>
            <span class="couple__place">${esc(ct.place)}${c.months ? ` · ${c.months} ${esc(t.ui.monthsWith)}` : ""}</span>
          </span>
        </button>
      </li>`;
  }).join("");

  const coupleDialogs = S.couples.map((c) => {
    const ct = t.weddings.couples[c.id];
    const slides = c.gallery.map((g) => `<li>${pic(`couples/${c.id}/${g}`, `${t.alts.gallery} ${ct.names}`, { sizes: c.landscape ? "(max-width: 900px) 92vw, 62vw" : "(max-width: 900px) 80vw, 36vw" })}</li>`).join("");
    const video = c.video ? `<li class="slide-video${c.videoLandscape ? " is-wide" : ""}"><video controls playsinline preload="none" poster="${src(`couples/${c.id}/${c.gallery[0]}`, M[`couples/${c.id}/${c.gallery[0]}`].widths[0])}" data-src="/media/video/${c.video}.mp4" aria-label="${esc(ct.names)}"></video></li>` : "";
    return `
<dialog class="dlg dlg--couple" id="couple-${c.id}" aria-labelledby="couple-${c.id}-t" data-lenis-prevent>
  <div class="dlg__in">
    <button class="dlg__close" type="button" data-close aria-label="${esc(t.ui.close)}">${icon.close}</button>
    <div class="dlg__media${c.landscape ? " is-wide" : ""}">
      <ul class="slides" data-slides tabindex="0" aria-label="${esc(ct.names)}">${slides}${video}</ul>
      <div class="slides__nav">
        <button type="button" data-slide="-1" aria-label="${esc(t.ui.prev)}">${icon.prev}</button>
        <button type="button" data-slide="1" aria-label="${esc(t.ui.next)}">${icon.next}</button>
      </div>
    </div>
    <div class="dlg__text">
      <p class="tag">${esc(ct.place)}</p>
      <h3 class="dlg__title" id="couple-${c.id}-t">${esc(ct.names)}</h3>
      ${c.months ? `<p class="dlg__months"><strong>${c.months}</strong> ${esc(t.ui.monthsWith)}</p>` : ""}
      <p class="dlg__story">${esc(ct.story)}</p>
      ${c.credit ? `<p class="dlg__credit"><span>${esc(t.ui.credits)}</span> <bdi dir="ltr">${esc(c.credit)}</bdi></p>` : ""}
      <a class="link" href="${c.post}" target="_blank" rel="noopener">${esc(t.ui.viewPost)}</a>
    </div>
  </div>
</dialog>`;
  }).join("");

  const months = S.months.map((m, i) => {
    const mt = t.months.items[m.couple];
    return `
      <li class="month reveal" style="--i:${i}">
        <p class="month__value"><span>${m.value}</span> ${esc(t.months.unit)}</p>
        <blockquote class="month__quote"><p>${esc(mt.quote)}</p></blockquote>
        <p class="month__names"><a href="${m.post}" target="_blank" rel="noopener">${esc(mt.names)}</a></p>
      </li>`;
  }).join("");
  const stats = [
    S.stats.weddings != null && `<li><span>${esc(S.stats.weddings)}</span>${esc(t.months.weddings)}</li>`,
    S.stats.savings != null && `<li><span>${esc(S.stats.savings)}</span>${esc(t.months.savings)}</li>`,
  ].filter(Boolean).join("");

  const bts = S.bts.map((b, i) => `
      <li class="reel reveal" style="--i:${i}">
        <button class="reel__btn" type="button" data-play="/media/video/${b.video}.mp4" data-preview aria-label="${esc(t.ui.play)} : ${esc(t.bts.items[b.id])}">
          ${pic(b.poster, "", { sizes: "(max-width: 760px) 44vw, 22vw", cls: "reel__img" })}
          <video class="reel__preview" muted loop playsinline preload="none" aria-hidden="true" tabindex="-1"></video>
          <span class="reel__play">${icon.play}</span>
        </button>
        <p class="reel__title">${esc(t.bts.items[b.id])}</p>
      </li>`).join("");

  const faq = t.faq.items.map((f) => `
      <details class="qa reveal">
        <summary><span>${esc(f.q)}</span>${icon.plus}</summary>
        <p>${esc(f.a)}</p>
      </details>`).join("");

  const f = t.contact.fields;
  const opts = (arr) => `<option value="">—</option>` + arr.map((o) => `<option>${esc(o)}</option>`).join("");

  return `${head(lang, { title: t.meta.title, description: t.meta.description, pathFor })}
  ${schema(lang)}
</head>
<body>
<div class="intro" data-intro aria-hidden="true">
  <svg class="intro__rings" viewBox="0 0 160 120">
    <circle class="ring ring--a" cx="64" cy="60" r="34"/>
    <circle class="ring ring--b" cx="96" cy="60" r="34"/>
    <g class="intro__mono" transform="translate(64 44) scale(.5)">${MONO_PATHS}</g>
  </svg>
  <p class="intro__line" translate="no">${esc(t.intro.line)}</p>
  ${heart}
  <button class="intro__skip" type="button" data-intro-skip>${esc(t.ui.skip)}</button>
</div>
${header(lang, pathFor, true)}
<main id="main">

<section class="hero" aria-labelledby="hero-t">
  <div class="hero__media">
    ${heroPoster(t.alts.hero)}
    <video class="hero__video" muted loop playsinline preload="none" aria-hidden="true" data-hero-video data-portrait="${PORTRAIT}">
      <source data-src="/media/video/hero.webm" data-src-v="/media/video/hero-v.webm" type="video/webm">
      <source data-src="/media/video/hero.mp4" data-src-v="/media/video/hero-v.mp4" type="video/mp4">
    </video>
  </div>
  <div class="hero__content">
    <h1 class="tag tag--light" id="hero-t">${esc(t.hero.tag)}</h1>
    <p class="hero__title">${br(t.hero.title)}</p>
    <a class="btn btn--light" href="#contact">${esc(t.hero.cta)}</a>
  </div>
  <button class="hero__toggle" type="button" data-hero-toggle aria-pressed="false" data-pause="${esc(t.ui.pause)}" data-resume="${esc(t.ui.resume)}" aria-label="${esc(t.ui.pause)}" hidden><i></i><i></i></button>
  <span class="hero__line" aria-hidden="true"></span>
</section>

<section class="manifesto wrap" aria-labelledby="manifesto-t">
  <p class="tag reveal">${esc(t.manifesto.tag)}</p>
  <h2 class="h2 reveal" id="manifesto-t">${br(t.manifesto.title)}</h2>
  <p class="lead reveal">${esc(t.manifesto.text)}</p>
  <a class="link reveal" href="#story">${esc(t.manifesto.link)}</a>
</section>

<section class="promises wrap" aria-labelledby="promises-t">
  <div class="sec-head"><h2 class="tag" id="promises-t">${esc(t.promises.tag)}</h2><span class="sec-head__rule"></span></div>
  <div class="cards">${promises}
  </div>
</section>

<section class="about" id="story" aria-labelledby="about-t">
  <div class="wrap about__grid">
    <div class="about__media reveal">
      ${pic("portrait/tzach", t.alts.portrait, { sizes: "(max-width: 900px) 70vw, 30vw", cls: "about__portrait" })}
      <button class="about__video" type="button" data-play="/media/video/pitch.mp4" aria-label="${esc(t.ui.play)} : ${esc(t.about.videoLabel)}">
        ${pic("video/pitch", "", { sizes: "160px" })}
        <span class="reel__play">${icon.play}</span>
      </button>
    </div>
    <div class="about__text">
      <p class="tag reveal">${esc(t.about.tag)}</p>
      <h2 class="h2 reveal" id="about-t">${br(t.about.title)}</h2>
      ${t.about.paras.map((p) => `<p class="reveal">${esc(p)}</p>`).join("")}
      <blockquote class="quote reveal"><p>${esc(t.about.quote)}</p><footer>${esc(t.about.sign)}</footer></blockquote>
      <div class="define reveal">
        <h3>${esc(t.about.definitionTitle)}</h3>
        <p>${esc(t.about.definition)}</p>
      </div>
    </div>
  </div>
</section>

<section class="services wrap" id="services" aria-labelledby="services-t">
  <p class="tag reveal">${esc(t.services.tag)}</p>
  <h2 class="h2 reveal" id="services-t">${br(t.services.title)}</h2>
  <ul class="svc-grid">${services}
  </ul>
</section>

<section class="process" aria-labelledby="process-t">
  <div class="wrap">
    <p class="tag tag--light reveal">${esc(t.process.tag)}</p>
    <h2 class="h2 reveal" id="process-t">${br(t.process.title)}</h2>
    <ol class="steps">${steps}
    </ol>
  </div>
</section>

<section class="details" aria-labelledby="details-t">
  ${pic("details/chuppah", t.alts.chuppah, { cls: "details__img" })}
  <div class="details__content">
    <h2 class="h2 reveal" id="details-t">${br(t.details.title)}</h2>
    <p class="reveal">${esc(t.details.text)}</p>
  </div>
</section>

<section class="weddings wrap" id="weddings" aria-labelledby="weddings-t">
  <p class="tag reveal">${esc(t.weddings.tag)}</p>
  <h2 class="h2 reveal" id="weddings-t">${br(t.weddings.title)}</h2>
  <ul class="couples">${couples}
  </ul>
</section>

<section class="months" aria-labelledby="months-t">
  <div class="wrap">
    <p class="tag reveal">${esc(t.months.tag)}</p>
    <h2 class="h2 reveal" id="months-t">${br(t.months.title)}</h2>
    <ol class="months__list">${months}
    </ol>
    ${stats ? `<ul class="stats">${stats}</ul>` : "<!-- Chiffres clés (nombre de mariages, économies moyennes) : à renseigner dans data/site.json une fois confirmés par Tzach -->"}
  </div>
</section>

<section class="testimonials wrap" id="testimonials" aria-labelledby="testimonials-t">
  <div class="testimonials__grid">
    <div class="testimonials__text">
      <p class="tag reveal">${esc(t.testimonials.tag)}</p>
      <h2 class="h2 reveal" id="testimonials-t">${esc(t.testimonials.title)}</h2>
      <p class="reveal"><strong>${esc(t.testimonials.lian.names)}</strong><br>${esc(t.testimonials.lian.caption)}</p>
      <a class="link reveal" href="${S.instagram}" target="_blank" rel="noopener">${esc(t.testimonials.more)}</a>
      <!-- À REMPLIR avec de vrais témoignages (texte ou vidéo) fournis par Tzach et validés par les couples -->
    </div>
    <button class="testimonials__video reveal" type="button" data-play="/media/video/lian-arnold.mp4" aria-label="${esc(t.ui.play)} : ${esc(t.testimonials.lian.names)}">
      ${pic("video/lian-arnold", "", { sizes: "(max-width: 760px) 70vw, 28vw" })}
      <span class="reel__play reel__play--lg">${icon.play}</span>
    </button>
  </div>
</section>

<section class="bts" aria-labelledby="bts-t">
  <div class="wrap">
    <p class="tag reveal">${esc(t.bts.tag)}</p>
    <h2 class="h2 reveal" id="bts-t">${br(t.bts.title)}</h2>
    <p class="lead lead--start reveal">${esc(t.bts.text)}</p>
    <ul class="reels">${bts}
    </ul>
  </div>
</section>

<section class="faq wrap" id="faq" aria-labelledby="faq-t">
  <div class="faq__head">
    <p class="tag reveal">${esc(t.faq.tag)}</p>
    <h2 class="h2 reveal" id="faq-t">${br(t.faq.title)}</h2>
  </div>
  <div class="faq__list">${faq}
  </div>
</section>

<section class="contact" id="contact" aria-labelledby="contact-t">
  <div class="wrap contact__grid">
    <div class="contact__intro">
      <p class="tag reveal">${esc(t.contact.tag)}</p>
      <h2 class="h2 reveal" id="contact-t">${br(t.contact.title)}</h2>
      <p class="reveal">${esc(t.contact.text)}</p>
      <p class="contact__direct reveal">${esc(t.contact.direct)} : <a href="${WA}" target="_blank" rel="noopener"><bdi dir="ltr">${esc(S.phoneIntl)}</bdi></a></p>
    </div>
    <form class="form reveal" data-form novalidate data-wa="${S.wa}" data-greeting="${esc(t.contact.waGreeting)}" data-labels="${esc(JSON.stringify(t.contact.waLabels))}" data-lang="${lang}">
      <div class="field field--full">
        <label for="f-names">${esc(f.names)}</label>
        <input id="f-names" name="names" autocomplete="off" placeholder="${esc(f.namesHint)}" required aria-describedby="f-names-err">
        <p class="field__err" id="f-names-err" role="alert" hidden>${esc(f.required)}</p>
      </div>
      <div class="field">
        <label for="f-date">${esc(f.date)}</label>
        <input id="f-date" name="date" type="month" min="${new Date().toISOString().slice(0, 7)}">
      </div>
      <div class="field">
        <label for="f-region">${esc(f.region)}</label>
        <select id="f-region" name="region">${opts(t.contact.regions)}</select>
      </div>
      <div class="field">
        <label for="f-guests">${esc(f.guests)}</label>
        <input id="f-guests" name="guests" type="number" inputmode="numeric" min="10" max="2000" step="10">
      </div>
      <div class="field">
        <label for="f-budget">${esc(f.budget)}</label>
        <select id="f-budget" name="budget">${opts(t.contact.budgets)}</select>
      </div>
      <fieldset class="field field--full field--radio">
        <legend>${esc(f.venue)}</legend>
        <label><input type="radio" name="venue" value="${esc(f.venueYes)}"> ${esc(f.venueYes)}</label>
        <label><input type="radio" name="venue" value="${esc(f.venueNo)}"> ${esc(f.venueNo)}</label>
      </fieldset>
      <div class="field field--full">
        <label for="f-message">${esc(f.message)}</label>
        <textarea id="f-message" name="message" rows="3"></textarea>
      </div>
      <button class="btn btn--dark" type="submit">${icon.wa}<span>${esc(f.submit)}</span></button>
    </form>
  </div>
</section>

</main>
${footer(lang, pathFor)}
${coupleDialogs}
<dialog class="dlg dlg--player" id="player" aria-label="${esc(t.ui.play)}" data-lenis-prevent>
  <button class="dlg__close" type="button" data-close aria-label="${esc(t.ui.close)}">${icon.close}</button>
  <video controls playsinline preload="none" data-player></video>
</dialog>
<script type="module" src="/src/main.js"></script>
</body>
</html>
`;
}

/* ---------- Page légale ---------- */
function legal(lang) {
  const t = L[lang];
  const pathFor = (l) => `/${l}/${LEGAL[l]}`;
  return `${head(lang, { title: t.meta.legalTitle, description: t.meta.description, pathFor })}
</head>
<body class="page-legal">
${header(lang, pathFor, false)}
<main id="main" class="legal wrap">
  <h1 class="h2">${esc(t.legal.title)}</h1>
  ${t.legal.sections.map((s) => `<section><h2>${esc(s.h)}</h2><p>${esc(s.p)}</p></section>`).join("\n  ")}
  <p><a class="link" href="/${lang}/">${esc(t.ui.home)}</a></p>
</main>
${footer(lang, pathFor)}
<script type="module" src="/src/main.js"></script>
</body>
</html>
`;
}

/* ---------- Redirection racine ---------- */
const root = `<!doctype html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tzach Zrihan · Wedding Productions</title>
  <meta name="description" content="${esc(L.he.meta.description)}">
  <link rel="canonical" href="${SITE}/he/">
  ${LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${SITE}/${l}/">`).join("\n  ")}
  <link rel="icon" href="/favicon.svg" type="image/svg+xml">
  <script>
    (function () {
      var langs = ${JSON.stringify(LANGS)}, l = null;
      try { l = localStorage.getItem("tz-lang"); } catch (e) {}
      if (langs.indexOf(l) < 0) {
        var nav = (navigator.languages || [navigator.language || ""]).map(function (x) { return String(x).slice(0, 2).toLowerCase(); });
        for (var i = 0; i < nav.length && !l; i++) if (nav[i] === "iw") l = "he"; else if (langs.indexOf(nav[i]) >= 0) l = nav[i];
      }
      location.replace("/" + (langs.indexOf(l) >= 0 ? l : "he") + "/" + location.hash);
    })();
  </script>
  <style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#FAF8F5;color:#1A1715;font:14px/1.6 system-ui,sans-serif}nav{display:flex;gap:1.5rem}a{color:inherit}</style>
</head>
<body>
  <nav>${LANGS.map((l) => `<a href="/${l}/" lang="${l}">${esc(L[l].label)}</a>`).join("")}</nav>
</body>
</html>
`;

/* ---------- Fichiers publics ---------- */
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${[["", "1.0"], ["legal", "0.2"]].flatMap(([kind, prio]) => LANGS.map((l) => {
  const p = (x) => `${SITE}/${x}/${kind ? LEGAL[x] : ""}`;
  return `  <url>
    <loc>${p(l)}</loc>
    <lastmod>${new Date().toISOString().slice(0, 10)}</lastmod>
    <priority>${prio}</priority>
${LANGS.map((x) => `    <xhtml:link rel="alternate" hreflang="${x}" href="${p(x)}"/>`).join("\n")}
    <xhtml:link rel="alternate" hreflang="x-default" href="${p("he")}"/>
  </url>`;
})).join("\n")}
</urlset>
`;

const robots = `User-agent: *
Allow: /

Sitemap: ${SITE}/sitemap.xml
`;

const llms = `# Tzach Zrihan · Wedding Productions (צח זריהן · מפיק חתונות)

> Independent wedding producer (in Hebrew: mafik chatunot chitzoni) based in Israel. Tzach accompanies engaged couples for several months (typically 5 to 10), chooses and negotiates the venue and vendors on their behalf so they do not pay for what they do not need, plans the budget, timeline and chuppah briefing, and runs the wedding on the day itself.

- Languages of the website: Hebrew (default), English, French, Spanish
- Area served: Israel (couples living abroad welcome)
- Contact: WhatsApp ${S.phoneIntl} (${WA}) · Instagram ${S.instagramHandle} (${S.instagram})
- Pricing: on request, after a first meeting

## Pages
- [עברית](${SITE}/he/)
- [English](${SITE}/en/)
- [Français](${SITE}/fr/)
- [Español](${SITE}/es/)

## Real examples (from Tzach's Instagram)
- Eden & Tevel: 10 months of planning
- Shir & Tal: 8 months of planning
- Yuval & Idan: 5 months of planning (Kav HaMaim)
- Limor & Oded: second wedding on Poleg Beach, personal branding, open meat buffet
`;

const MONO_SVG = (stroke, bg, w = 2) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${bg ? `<rect width="64" height="64" fill="${bg}"/>` : ""}<g fill="none" stroke="${stroke}" stroke-width="${w}" stroke-linecap="square">${MONO_PATHS}</g></svg>`;

/* ---------- Écriture ---------- */
const out = async (p, s) => {
  const f = path.join(ROOT, p);
  await mkdir(path.dirname(f), { recursive: true });
  await writeFile(f, s, "utf8");
};
await out("index.html", root);
for (const l of LANGS) {
  await out(`${l}/index.html`, home(l));
  await out(`${l}/${LEGAL[l]}index.html`, legal(l));
}
await out("public/sitemap.xml", sitemap);
await out("public/robots.txt", robots);
await out("public/llms.txt", llms);
await out("public/favicon.svg", MONO_SVG("#FAF8F5", "#1A1715", 3.2));
await out("public/brand/monogram.svg", MONO_SVG("#1A1715", null, 1.6));
await out("public/brand/logo-he.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 80"><text x="160" y="40" text-anchor="middle" font-family="Heebo, Arial, sans-serif" font-weight="400" font-size="30" letter-spacing="3" fill="#1A1715">צח זריהן</text><text x="160" y="66" text-anchor="middle" font-family="Jost, Arial, sans-serif" font-weight="400" font-size="10" letter-spacing="5" fill="#8E857A">WEDDING PRODUCTIONS</text></svg>`);
await out("public/brand/logo-latin.svg", `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 80"><text x="180" y="40" text-anchor="middle" font-family="Jost, Arial, sans-serif" font-weight="400" font-size="24" letter-spacing="9" fill="#1A1715">TZACH ZRIHAN</text><text x="180" y="66" text-anchor="middle" font-family="Jost, Arial, sans-serif" font-weight="400" font-size="10" letter-spacing="5" fill="#8E857A">WEDDING PRODUCTIONS</text></svg>`);

// Icônes PNG (une seule fois : elles sont versionnées avec le site).
const has = (p) => access(path.join(ROOT, p)).then(() => true, () => false);
if (!(await has("public/apple-touch-icon.png")) || !(await has("public/brand/monogram.png"))) {
  const { default: sharp } = await import("sharp");
  await sharp(Buffer.from(MONO_SVG("#FAF8F5", "#1A1715", 2.6))).resize(180).png().toFile(path.join(ROOT, "public/apple-touch-icon.png"));
  await sharp(Buffer.from(MONO_SVG("#1A1715", "#FAF8F5", 1.8))).resize(512).png().toFile(path.join(ROOT, "public/brand/monogram.png"));
}
console.log(`✓ pages générées : ${LANGS.join(", ")} (+ pages légales, sitemap, robots, llms.txt)`);
