/**
 * Génère les pages statiques du site Tzach Zrihan (4 langues).
 * Dossiers : /he/, /en/, /fr/, /es/ + /index.html (redirect)
 * Textes   : locales/<lang>.json
 *
 * npm run gen   (lancé automatiquement par npm run dev / npm run build)
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const ROOT   = path.resolve(import.meta.dirname, "..");
const SITE   = (process.env.SITE_URL || "https://tzach-zrihan.vercel.app").replace(/\/$/, "");
const LANGS  = ["he", "en", "fr", "es"];
const WA_NUM = "972549814740";
const IG_URL = "https://www.instagram.com/tzach___productions/";
const THREADS_URL = "https://www.threads.net/@tzach___productions";

const read  = async (p) => JSON.parse(await readFile(path.join(ROOT, p), "utf8"));
const write = async (p, html) => {
  await mkdir(path.dirname(path.join(ROOT, p)), { recursive: true });
  await writeFile(path.join(ROOT, p), html, "utf8");
  console.log("✓", p);
};

// Charger les locales
const L = {};
for (const l of LANGS) L[l] = await read(`locales/${l}.json`);

const esc  = (s = "") => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
const nl2br = (s = "") => String(s).replace(/\n/g, "<br>");

/* ── Icônes SVG inline ──────────────────────────────────── */
const icon = {
  wa: `<svg viewBox="0 0 24 24" aria-hidden="true" role="img"><path d="M20 11.6A8.3 8.3 0 0 1 7.8 19L4 20l1-3.7a8.3 8.3 0 1 1 15-4.7Z"/><path d="M9 8.6c.2-.5.5-.5.8-.5h.5c.2 0 .4 0 .5.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.1-.2.3 0 .5.6 1 1.4 1.8 2.5 2.4.2.1.4.1.5 0l.6-.7c.2-.2.4-.2.6-.1l1.6.8c.2.1.3.2.3.4 0 .5-.2 1.2-.7 1.5-.5.3-1.4.6-2.6.2-1.3-.4-2.7-1.4-3.8-2.6-1-1.1-1.6-2.3-1.8-3.2-.1-.8.2-1.5.5-1.9Z"/></svg>`,
  ig: `<svg viewBox="0 0 24 24" aria-hidden="true" role="img"><rect x="3.5" y="3.5" width="17" height="17" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.3" cy="6.7" r=".6" fill="currentColor" stroke="none"/></svg>`,
  threads: `<svg viewBox="0 0 24 24" aria-hidden="true" role="img"><path d="M12.001 2.5c-2.76 0-4.75.93-6.08 2.36-1.35 1.46-2 3.47-2.07 5.91-.07 2.44.5 4.5 1.73 5.97 1.27 1.52 3.13 2.26 5.42 2.26 1.59 0 2.98-.4 4.02-1.2 1.07-.82 1.69-2 1.78-3.46.04-.6.02-1.22-.06-1.85-.1-.76-.3-1.46-.6-2.06a5.77 5.77 0 0 0-1.18-1.61 5.03 5.03 0 0 0-1.68-.98c-.62-.2-1.28-.3-1.97-.27-.7.03-1.37.2-1.93.49-.52.27-.94.66-1.22 1.14-.13.22-.22.45-.28.7a2.45 2.45 0 0 0 .93 2.5c.48.34 1.1.53 1.82.56h.13c.5 0 .97-.1 1.37-.31.36-.19.65-.47.82-.8.16-.32.22-.67.15-1.02-.06-.33-.23-.63-.47-.86a1.7 1.7 0 0 0-.8-.44 1.87 1.87 0 0 0-.88 0"/></svg>`,
  pin: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s7-6.7 7-12a7 7 0 0 0-14 0c0 5.3 7 12 7 12Z"/><circle cx="12" cy="9" r="2.4"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>`,
  plus: `<svg viewBox="0 0 24 24" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>`,
  play: `<svg viewBox="0 0 24 24" aria-hidden="true"><polygon points="5 3 19 12 5 21 5 3" fill="currentColor" stroke="none"/>`,
};

/* ── Logo SVG (typographique) ───────────────────────────── */
function logoSvg(t) {
  const isHe = t.lang === "he";
  return `<span class="header-logo" translate="no">
    <span class="logo-name">${esc(t.logo.name)}</span>
    <span class="logo-sub">${esc(t.logo.sub)}</span>
  </span>`;
}

/* ── SVG anneaux intro ──────────────────────────────────── */
const ringsSvg = `<svg id="intro-rings" viewBox="0 0 160 80" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <path class="ring-draw" d="M50 40 m-28,0 a28,28 0 1,1 56,0 a28,28 0 1,1 -56,0" stroke="#1A1715" stroke-width="1.2" fill="none"/>
  <path class="ring-draw" d="M110 40 m-28,0 a28,28 0 1,1 56,0 a28,28 0 1,1 -56,0" stroke="#1A1715" stroke-width="1.2" fill="none"/>
</svg>`;

/* ── Alternate hreflang ─────────────────────────────────── */
const hreflang = LANGS.map(l =>
  `<link rel="alternate" hreflang="${l}" href="${SITE}/${l}/">`
).join("\n  ") + `\n  <link rel="alternate" hreflang="x-default" href="${SITE}/he/">`;

/* ── Fonts ──────────────────────────────────────────────── */
const FONTS = `<link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=Frank+Ruhl+Libre:wght@300;400&family=Heebo:wght@200;300;400&family=Jost:wght@200;300;400&display=swap">`;

/* ══════════════════════════════════════════════════════════
   BUILDER DE PAGE
══════════════════════════════════════════════════════════ */
function buildPage(lang) {
  const t = L[lang];
  const dir = t.dir;
  const isRtl = dir === "rtl";

  /* ── Sélecteur de langue ── */
  const langSwitcher = LANGS.map(l => {
    const active = l === lang ? " active" : "";
    return `<button class="lang-btn${active}" data-lang="${l}" onclick="location.href='/${l}/';" lang="${l}">${esc(L[l].langLabel)}</button>`;
  }).join(`<span class="lang-sep" aria-hidden="true">·</span>`);

  /* ── Nav header ── */
  const navLinks = Object.entries(t.nav).map(([key, label]) =>
    `<a href="#${key}">${esc(label)}</a>`
  ).join("\n");

  /* ── Mobile nav ── */
  const mobileNav = Object.entries(t.nav).map(([key, label]) =>
    `<a href="#${key}">${esc(label)}</a>`
  ).join("\n");

  /* ── Promesses ── */
  const promiseCards = t.promises.items.map((p, i) => `
    <article class="promise-card" data-reveal data-delay="${i+1}">
      <div class="promise-img">
        <div class="promise-img-placeholder" aria-label="${esc(t.alts.hero)}">${esc(t.promises.items[i].num)}</div>
        <!-- Remplacer par une vraie photo de mariage : <img src="/media/promise-${i+1}.webp" alt="${esc(t.alts.hero)}" loading="lazy"> -->
      </div>
      <div class="promise-body">
        <span class="t-num">${esc(p.num)}</span>
        <p class="promise-label">${esc(p.label)}</p>
        <h3 class="t-h3">${esc(p.title)}</h3>
        <p class="t-body">${esc(p.body)}</p>
      </div>
    </article>`
  ).join("");

  /* ── Stats ── */
  const statsItems = t.stats.items.map((s, i) => `
    <div class="stat-item" data-reveal data-delay="${i+1}">
      <span class="stat-value">${esc(s.value)}</span>
      <span class="stat-label">${esc(s.label)}</span>
    </div>`
  ).join("");

  /* ── Process steps ── */
  const processSteps = t.process.steps.map((s, i) => `
    <div class="process-step" data-reveal data-delay="${i+1}">
      <span class="step-num">${esc(s.num)}</span>
      <h3 class="t-h3">${esc(s.title)}</h3>
      <p class="t-body">${esc(s.body)}</p>
    </div>`
  ).join("");

  /* ── Couples gallery ── */
  const coupleCards = t.weddings_section.couples.map((c, i) => `
    <article class="couple-card" data-reveal data-delay="${(i % 3) + 1}">
      <div class="couple-img">
        <div class="couple-img-placeholder" aria-label="${esc(c.names)}">${esc(c.names)}</div>
        <!-- Remplacer : <img src="/media/couples/${c.id}/hero.webp" alt="${esc(c.names)}" loading="lazy"> -->
      </div>
      <div class="couple-info">
        <p class="couple-names">${esc(c.names)}</p>
        <div class="couple-meta">
          <span>${icon.pin} ${esc(c.location)}</span>
          <span>${icon.clock} ${c.months} ${esc(t.weddings_section.months_label)}</span>
        </div>
      </div>
    </article>`
  ).join("");

  /* ── FAQ ── */
  const faqItems = t.faq.items.map((item, i) => `
    <div class="faq-item" id="faq-${i}">
      <button class="faq-q" aria-expanded="false" aria-controls="faq-a-${i}">
        <span>${esc(item.q)}</span>
        <span class="faq-icon" aria-hidden="true">${icon.plus}</span>
      </button>
      <div class="faq-a" id="faq-a-${i}" role="region">
        <div class="faq-a-inner">
          <p class="faq-a-text">${item.a.startsWith("<!--") ? `<em style="color:var(--c-border)">À compléter par Tzach</em>` : esc(item.a)}</p>
        </div>
      </div>
    </div>`
  ).join("");

  /* ── Contact form ── */
  const waTpl = esc(t.contact.wa_message);
  const f = t.contact.fields;

  /* ── Données structurées LocalBusiness ── */
  const schema = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE}/#tzach`,
    "name": "Tzach Zrihan Wedding Productions",
    "alternateName": "צח זריהן מפיק חתונות",
    "description": t.meta.desc,
    "url": `${SITE}/${lang}/`,
    "telephone": "+972549814740",
    "sameAs": [IG_URL, THREADS_URL],
    "areaServed": { "@type": "Country", "name": "Israel" },
    "serviceType": ["Wedding Planning", "Event Production", "Wedding Coordination"],
    "priceRange": "$$",
    "inLanguage": [lang]
  });

  return `<!doctype html>
<html lang="${lang}" dir="${dir}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${esc(t.meta.title)}</title>
  <meta name="description" content="${esc(t.meta.desc)}">
  <meta name="keywords" content="${esc(t.meta.keywords)}">
  <meta name="robots" content="index, follow">
  <meta property="og:type" content="website">
  <meta property="og:title" content="${esc(t.meta.og_title)}">
  <meta property="og:description" content="${esc(t.meta.og_desc)}">
  <meta property="og:url" content="${SITE}/${lang}/">
  <meta property="og:image" content="${SITE}/og-${lang}.jpg">
  <meta name="twitter:card" content="summary_large_image">
  <link rel="canonical" href="${SITE}/${lang}/">
  ${hreflang}
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  ${FONTS}
  <link rel="stylesheet" href="/src/styles/main.css">
  <script type="application/ld+json">${schema}</script>
</head>
<body>

<!-- ══ INTRO ══════════════════════════════════════════════ -->
<div id="intro" role="dialog" aria-modal="true" aria-label="${lang === "he" ? "פתיחה" : "Intro"}">
  ${ringsSvg}
  <div id="intro-monogram">
    <span class="intro-tz" translate="no">TZ</span>
    <span class="intro-sub">${lang === "he" ? "צח זריהן · WEDDING PRODUCTIONS" : "TZACH ZRIHAN · WEDDING PRODUCTIONS"}</span>
  </div>
  <span id="intro-heart" aria-hidden="true">♥</span>
</div>
<button class="intro-skip" aria-label="${esc(t.skip)}">${esc(t.skip)}</button>

<!-- ══ MOBILE MENU ════════════════════════════════════════ -->
<div id="mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
  <nav class="mobile-nav" aria-label="Navigation">
    ${mobileNav}
  </nav>
  <div class="lang-switcher">${langSwitcher}</div>
</div>

<!-- ══ HEADER ═════════════════════════════════════════════ -->
<header id="header" role="banner">
  ${isRtl ? `
  <!-- RTL: nav droite, logo centre, actions gauche -->
  <nav class="header-nav" aria-label="${esc(t.nav.story)}">
    ${navLinks}
  </nav>` : `
  <!-- LTR: nav gauche, logo centre, actions droite -->
  <nav class="header-nav" aria-label="Navigation">
    ${navLinks}
  </nav>`}

  <a href="/${lang}/" class="header-logo" aria-label="${esc(t.alts.logo)}" translate="no">
    ${logoSvg(t)}
  </a>

  <div class="header-actions">
    <div class="lang-switcher" aria-label="Language / שפה">
      ${langSwitcher}
    </div>
    <a href="${IG_URL}" target="_blank" rel="noopener noreferrer" class="ig-link" aria-label="Instagram">
      ${icon.ig}
    </a>
    <button class="menu-toggle" aria-label="Menu" aria-expanded="false" aria-controls="mobile-menu">
      <span></span><span></span><span></span>
    </button>
  </div>
</header>

<main id="main" tabindex="-1">

<!-- ══ 1. HERO ════════════════════════════════════════════ -->
<section id="hero" aria-labelledby="hero-title">
  <div class="hero-media">
    <!-- Remplacer par une vraie vidéo de mariage -->
    <!-- <video muted loop playsinline autoplay preload="metadata" aria-hidden="true">
      <source src="/media/hero/hero.webm" type="video/webm">
      <source src="/media/hero/hero.mp4" type="video/mp4">
    </video> -->
    <!-- Fallback image -->
    <img src="/media/hero/hero.webp"
         alt="${esc(t.alts.hero)}"
         fetchpriority="high"
         style="filter:brightness(.7)">
  </div>
  <div class="hero-content">
    <p class="hero-tag t-tag" aria-hidden="true">${esc(t.hero.tag)}</p>
    <h1 id="hero-title" class="hero-title">${nl2br(esc(t.hero.h1))}</h1>
    <a href="#contact" class="btn-outline hero-cta">${esc(t.hero.cta)}</a>
  </div>
  <div class="hero-scroll" aria-hidden="true"></div>
</section>

<!-- ══ 2. MANIFESTE ═══════════════════════════════════════ -->
<section id="story" class="section" aria-labelledby="manifesto-h2">
  <div class="container">
    <div class="manifesto-inner">
      <p class="t-tag" data-reveal>${esc(t.manifesto.tag)}</p>
      <h2 id="manifesto-h2" class="t-h2" data-reveal data-delay="1">${nl2br(esc(t.manifesto.h2))}</h2>
      <p class="t-body" data-reveal data-delay="2" style="max-width:560px;text-align:center">${nl2br(esc(t.manifesto.body))}</p>
      <a href="#story" class="manifesto-link" data-reveal data-delay="3">${esc(t.manifesto.link)}</a>
    </div>
  </div>
</section>

<!-- ══ 3. LES 3 PROMESSES ═════════════════════════════════ -->
<section id="services" class="section" aria-labelledby="promises-h2">
  <div class="container">
    <p class="t-tag" data-reveal>${esc(t.promises.tag)}</p>
    <div class="promises-grid">
      ${promiseCards}
    </div>
  </div>
</section>

<!-- ══ 4. CHIFFRES CLÉS ═══════════════════════════════════ -->
<section id="stats" class="section" aria-labelledby="stats-h2">
  <div class="container">
    <p class="t-tag" data-reveal>${esc(t.stats.tag)}</p>
    <h2 id="stats-h2" class="t-h2" data-reveal data-delay="1">${nl2br(esc(t.stats.h2))}</h2>
    <div class="stats-grid">
      ${statsItems}
    </div>
    <p class="stats-note">${esc(t.stats.note)}</p>
  </div>
</section>

<!-- ══ 5. COMMENT ÇA MARCHE ══════════════════════════════ -->
<section id="process" class="section" aria-labelledby="process-h2">
  <div class="container">
    <p class="t-tag" data-reveal>${esc(t.process.tag)}</p>
    <h2 id="process-h2" class="t-h2" data-reveal data-delay="1">${nl2br(esc(t.process.h2))}</h2>
    <div class="process-steps">
      ${processSteps}
    </div>
  </div>
</section>

<!-- ══ 6. FULL-WIDTH DÉTAILS ══════════════════════════════ -->
<section id="details" aria-labelledby="details-h2">
  <div class="details-media" aria-hidden="true">
    <!-- Remplacer par une photo de chuppah/cérémonie en noir et blanc -->
    <img src="/media/details/chuppah.webp" alt="">
  </div>
  <div class="details-content">
    <h2 id="details-h2" class="t-h2" data-reveal>${nl2br(esc(t.details.h2))}</h2>
    <p class="t-body" data-reveal data-delay="1">${nl2br(esc(t.details.body))}</p>
  </div>
</section>

<!-- ══ 7. GALERIE MARIAGES ════════════════════════════════ -->
<section id="weddings" class="section" aria-labelledby="weddings-h2">
  <div class="container">
    <p class="t-tag" data-reveal>${esc(t.weddings_section.tag)}</p>
    <h2 id="weddings-h2" class="t-h2" data-reveal data-delay="1">${nl2br(esc(t.weddings_section.h2))}</h2>
    <div class="weddings-grid">
      ${coupleCards}
    </div>
  </div>
</section>

<!-- ══ 8. TÉMOIGNAGES ════════════════════════════════════ -->
<section id="testimonials" class="section" aria-labelledby="testimonials-h2">
  <div class="container">
    <p class="t-tag" data-reveal>${esc(t.testimonials.tag)}</p>
    <h2 id="testimonials-h2" class="t-h2" data-reveal data-delay="1">${esc(t.testimonials.h2)}</h2>

    <div class="testimonials-grid" style="margin-top:3rem">
      <!-- Témoignage vidéo : Lian et Arnold -->
      <div class="testimonial-video" data-reveal>
        <!-- À REMPLIR avec la vraie vidéo de Lian et Arnold (DbTBO8rNmDN) -->
        <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--c-beige);flex-direction:column;gap:1rem">
          <p class="t-tag">Lian &amp; Arnold</p>
          <p class="t-body" style="text-align:center;font-size:.75rem"><!-- Vidéo témoignage à fournir par le client --></p>
        </div>
        <div class="video-overlay" role="button" tabindex="0" aria-label="Lire la vidéo">
          <div class="play-btn">${icon.play}</div>
        </div>
      </div>

      <!-- Emplacement pour d'autres témoignages vidéo -->
      <div class="testimonial-video" data-reveal data-delay="1">
        <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;background:var(--c-beige);flex-direction:column;gap:1rem;padding:2rem">
          ${lang === "he"
            ? `<p class="t-tag">המלצות · עדויות</p><p class="t-body" style="text-align:center;font-size:.75rem"><!-- להוסיף עדות וידאו --></p>`
            : `<p class="t-tag">${esc(t.testimonials.tag)}</p><p class="t-body" style="text-align:center;font-size:.75rem"><!-- Add video testimonial here --></p>`
          }
        </div>
      </div>

      <!-- Témoignages texte (à remplir) -->
      <!-- À REMPLIR avec de vrais témoignages des couples -->
    </div>

    <!-- Portrait Tzach avec citation -->
    <div style="display:flex;flex-direction:column;align-items:center;gap:2rem;margin-top:5rem;padding-top:4rem;border-top:1px solid var(--c-border);text-align:center" data-reveal>
      <div style="width:120px;height:120px;border-radius:50%;overflow:hidden;background:var(--c-beige)">
        <!-- Portrait : <img src="/media/portrait/tzach.webp" alt="${esc(t.alts.portrait)}" loading="lazy"> -->
        <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:.6rem;letter-spacing:.1em;color:var(--c-taupe)">TZACH</div>
      </div>
      <blockquote class="t-quote" style="max-width:600px">
        ${lang === "he"
          ? "\"מפיק החתונות הכי שמח שתפגשו — ואני לא אתן לכם לשלם כסף שאתם לא צריכים.\""
          : lang === "fr"
          ? "\"Le coordinateur de mariage le plus joyeux que vous rencontrerez — et je ne vous laisserai pas payer ce dont vous n'avez pas besoin.\""
          : lang === "es"
          ? "\"El organizador de bodas más alegre que conoceréis — y no os dejaré pagar por lo que no necesitáis.\""
          : "\"The happiest wedding producer you'll ever meet — and I won't let you pay for what you don't need.\""
        }
      </blockquote>
      <p class="t-tag">Tzach Zrihan</p>
    </div>
  </div>
</section>

<!-- ══ 9. COULISSES (BTS) ═════════════════════════════════ -->
<section id="bts" class="section" aria-labelledby="bts-h2">
  <div class="container">
    <div class="bts-grid">
      <div class="bts-content" data-reveal>
        <p class="t-tag">${esc(t.bts.tag)}</p>
        <h2 id="bts-h2" class="t-h2">${nl2br(esc(t.bts.h2))}</h2>
        <p class="t-body">${esc(t.bts.body)}</p>
        <a href="${IG_URL}" target="_blank" rel="noopener noreferrer" class="manifesto-link">
          @tzach___productions
        </a>
      </div>
      <div class="bts-videos" data-reveal data-delay="1">
        <!-- Vidéos Instagram de Tzach (DfC4MVjNtN4 et autres) -->
        <div class="bts-media" style="background:var(--c-beige);display:flex;align-items:center;justify-content:center">
          <p class="t-tag" style="font-size:.55rem">DfC4MVjNtN4</p>
          <!-- <video muted loop playsinline data-autoplay poster="/media/coulisses/bts1.webp">
            <source data-src="/media/coulisses/bts1.webm" type="video/webm">
            <source data-src="/media/coulisses/bts1.mp4" type="video/mp4">
          </video> -->
        </div>
        <div class="bts-media" style="background:var(--c-beige);display:flex;align-items:center;justify-content:center">
          <p class="t-tag" style="font-size:.55rem">De9gNm6Nyca</p>
          <!-- <video muted loop playsinline data-autoplay poster="/media/coulisses/bts2.webp">
            <source data-src="/media/coulisses/bts2.webm" type="video/webm">
            <source data-src="/media/coulisses/bts2.mp4" type="video/mp4">
          </video> -->
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ══ 10. FAQ ════════════════════════════════════════════ -->
<section id="faq" class="section" aria-labelledby="faq-h2">
  <div class="container">
    <p class="t-tag" data-reveal>${esc(t.faq.tag)}</p>
    <h2 id="faq-h2" class="t-h2" data-reveal data-delay="1">${nl2br(esc(t.faq.h2))}</h2>
    <div class="faq-list" role="list" style="max-width:860px;margin-top:3rem">
      ${faqItems}
    </div>
  </div>
</section>

<!-- ══ 11. PREMIER RENDEZ-VOUS ════════════════════════════ -->
<section id="contact" class="section" aria-labelledby="contact-h2">
  <div class="container">
    <div class="contact-inner">
      <div class="contact-aside" data-reveal>
        <p class="t-tag">${esc(t.contact.tag)}</p>
        <h2 id="contact-h2" class="t-h2">${nl2br(esc(t.contact.h2))}</h2>
        <p class="t-body">${esc(t.contact.body)}</p>
        <div style="display:flex;flex-direction:column;gap:.75rem">
          <a href="https://wa.me/${WA_NUM}" target="_blank" rel="noopener noreferrer"
             style="display:flex;align-items:center;gap:.5rem;font-size:.75rem;color:var(--c-taupe)">
            ${icon.wa} +972 54-981-4740
          </a>
          <a href="${IG_URL}" target="_blank" rel="noopener noreferrer"
             style="display:flex;align-items:center;gap:.5rem;font-size:.75rem;color:var(--c-taupe)">
            ${icon.ig} @tzach___productions
          </a>
        </div>
      </div>

      <form id="contact-form" data-wa-tpl="${waTpl}" data-reveal data-delay="1" novalidate>
        <div class="form-grid">
          <div class="form-group">
            <label class="form-label" for="f-bride">${esc(f.bride)}</label>
            <input class="form-input" type="text" id="f-bride" name="bride" autocomplete="given-name" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="f-groom">${esc(f.groom)}</label>
            <input class="form-input" type="text" id="f-groom" name="groom" autocomplete="given-name" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="f-date">${esc(f.date)}</label>
            <input class="form-input" type="text" id="f-date" name="date" placeholder="${lang === "he" ? "חודש/שנה" : "MM/YYYY"}">
          </div>
          <div class="form-group">
            <label class="form-label" for="f-region">${esc(f.region)}</label>
            <input class="form-input" type="text" id="f-region" name="region" required>
          </div>
          <div class="form-group">
            <label class="form-label" for="f-guests">${esc(f.guests)}</label>
            <input class="form-input" type="number" id="f-guests" name="guests" min="1">
          </div>
          <div class="form-group">
            <label class="form-label" for="f-budget">${esc(f.budget)}</label>
            <input class="form-input" type="text" id="f-budget" name="budget">
          </div>
          <div class="form-group full">
            <label class="form-label">${esc(f.venue)}</label>
            <div class="form-radio-group">
              <label class="form-radio-label">
                <input type="radio" name="venue" value="${esc(f.venue_yes)}"> ${esc(f.venue_yes)}
              </label>
              <label class="form-radio-label">
                <input type="radio" name="venue" value="${esc(f.venue_no)}" checked> ${esc(f.venue_no)}
              </label>
            </div>
          </div>
          <div class="form-group full">
            <label class="form-label" for="f-message">${esc(f.message)}</label>
            <textarea class="form-textarea" id="f-message" name="message" rows="4"></textarea>
          </div>
        </div>
        <button type="submit" class="btn-wa">
          ${icon.wa}
          ${esc(f.submit)}
        </button>
      </form>
    </div>
  </div>
</section>

</main><!-- /main -->

<!-- ══ FOOTER ════════════════════════════════════════════ -->
<footer id="footer" role="contentinfo">
  <div class="container">
    <div class="footer-inner">
      <span class="footer-logo-name" translate="no">${esc(t.logo.name)}</span>
      <p class="footer-tagline">${esc(t.footer.tagline)}</p>
      <div class="footer-social">
        <a href="https://wa.me/${WA_NUM}" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
          ${icon.wa}
        </a>
        <a href="${IG_URL}" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
          ${icon.ig}
        </a>
        <a href="${THREADS_URL}" target="_blank" rel="noopener noreferrer" aria-label="Threads">
          ${icon.threads}
        </a>
      </div>
      <div class="footer-links">
        ${LANGS.filter(l => l !== lang).map(l =>
          `<a href="/${l}/" lang="${l}">${esc(L[l].langLabel)}</a>`
        ).join("")}
        <a href="#" onclick="return false;">${esc(t.footer.legal)}</a>
      </div>
      <p class="footer-copy">© ${new Date().getFullYear()} Tzach Zrihan. ${esc(t.footer.rights)}.</p>
    </div>
  </div>
</footer>

<!-- ══ BOUTON WA FLOTTANT ════════════════════════════════ -->
<div id="wa-float">
  <span class="wa-float-label" aria-hidden="true">${esc(t.wa_float_label)}</span>
  <a href="https://wa.me/${WA_NUM}"
     target="_blank" rel="noopener noreferrer"
     class="wa-float-btn"
     aria-label="WhatsApp — ${esc(t.wa_float_label)}">
    ${icon.wa}
  </a>
</div>

<script type="module" src="/src/main.js"></script>
</body>
</html>`;
}

/* ══════════════════════════════════════════════════════════
   REDIRECT INDEX
══════════════════════════════════════════════════════════ */
const redirect = `<!doctype html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8">
  <title>Tzach Zrihan — Wedding Productions</title>
  <meta name="robots" content="noindex">
  <meta http-equiv="refresh" content="0;url=/he/">
  ${FONTS.split("\n").slice(0,2).join("\n")}
  <script>
    (function() {
      try {
        var langs = ${JSON.stringify(LANGS)};
        var saved = localStorage.getItem("tz-lang");
        if (saved && langs.includes(saved)) { location.replace("/" + saved + "/"); return; }
        var nav = navigator.language || navigator.userLanguage || "";
        nav = nav.split("-")[0].toLowerCase();
        if (langs.includes(nav)) { location.replace("/" + nav + "/"); return; }
      } catch(e) {}
      location.replace("/he/");
    })();
  </script>
</head>
<body style="background:#FAF8F5;display:flex;align-items:center;justify-content:center;min-height:100vh;font-family:sans-serif;">
  <a href="/he/" style="color:#1A1715;font-size:.7rem;letter-spacing:.2em;text-transform:uppercase;text-decoration:none">
    TZACH ZRIHAN · WEDDING PRODUCTIONS
  </a>
</body>
</html>`;

/* ══════════════════════════════════════════════════════════
   SITEMAP
══════════════════════════════════════════════════════════ */
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${LANGS.map(l => `  <url>
    <loc>${SITE}/${l}/</loc>
    <changefreq>monthly</changefreq>
    <priority>${l === "he" ? "1.0" : "0.8"}</priority>
    ${LANGS.map(al => `<xhtml:link rel="alternate" hreflang="${al}" href="${SITE}/${al}/"/>`).join("\n    ")}
  </url>`).join("\n")}
</urlset>`;

/* ══════════════════════════════════════════════════════════
   ROBOTS
══════════════════════════════════════════════════════════ */
const robots = `User-agent: *
Allow: /
Sitemap: ${SITE}/sitemap.xml`;

/* ══════════════════════════════════════════════════════════
   FAVICON SVG (monogramme TZ)
══════════════════════════════════════════════════════════ */
const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" fill="#1A1715"/>
  <text x="16" y="22" text-anchor="middle" font-family="Jost,sans-serif" font-weight="200" font-size="16" fill="#FAF8F5" letter-spacing="1">TZ</text>
</svg>`;

/* ══════════════════════════════════════════════════════════
   ÉCRITURE DES FICHIERS
══════════════════════════════════════════════════════════ */
await write("index.html", redirect);

for (const lang of LANGS) {
  await write(`${lang}/index.html`, buildPage(lang));
}

await write("public/sitemap.xml", sitemap);
await write("public/robots.txt", robots);
await write("public/favicon.svg", favicon);

console.log("✓ Génération terminée —", LANGS.length, "langues");
