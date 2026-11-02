/**
 * Tzach Zrihan — Wedding Productions
 * Comportements : intro animée, Lenis, header, menu mobile,
 * révélations au scroll, vidéos auto-play, FAQ accordion, formulaire WhatsApp.
 */
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const STORAGE_KEY = "tz-lang";
const INTRO_KEY   = "tz-intro";
const LANG        = root.getAttribute("lang") || "he";
const WA_NUM      = "972549814740";

/* ═════════════════════════════════════════════
   LANGUE MÉMORISÉE
═════════════════════════════════════════════ */
$$("[data-lang]").forEach((btn) =>
  btn.addEventListener("click", () => {
    try { localStorage.setItem(STORAGE_KEY, btn.dataset.lang); } catch {}
  })
);

/* ═════════════════════════════════════════════
   LENIS (défilement doux)
═════════════════════════════════════════════ */
let lenis = null;
if (!reduced) {
  lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add((t) => lenis.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
}

const scrollTo = (target, offset = 0) => {
  const el = typeof target === "string" ? $(target) : target;
  if (!el) return;
  const hdr = parseInt(getComputedStyle(root).getPropertyValue("--header")) || 72;
  if (lenis) lenis.scrollTo(el, { offset: -hdr + offset, duration: 1.6 });
  else el.scrollIntoView({ behavior: "smooth" });
};

document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href^="#"]');
  if (!a || a.getAttribute("href").length < 2) return;
  const el = $(a.getAttribute("href"));
  if (!el) return;
  e.preventDefault();
  closeMobileMenu();
  scrollTo(el);
  history.replaceState(null, "", a.getAttribute("href"));
});

/* ═════════════════════════════════════════════
   INTRO ANIMÉE
═════════════════════════════════════════════ */
function runIntro() {
  const intro = $("#intro");
  if (!intro || reduced) {
    intro?.remove();
    return;
  }

  let shown = false;
  try { shown = sessionStorage.getItem(INTRO_KEY) === "1"; } catch {}
  if (shown) { intro.remove(); return; }

  lenis?.stop();
  root.style.overflow = "hidden";

  const skip = $(".intro-skip");
  const rings = $("#intro-rings");
  const monogram = $("#intro-monogram");
  const heart = $("#intro-heart");

  const done = () => {
    try { sessionStorage.setItem(INTRO_KEY, "1"); } catch {}
    gsap.to(intro, {
      opacity: 0,
      duration: .6,
      ease: "power2.inOut",
      onComplete: () => {
        intro.remove();
        lenis?.start();
        root.style.overflow = "";
        // Lancer l'animation hero après l'intro
        animateHero();
      }
    });
  };

  // Bouton skip
  setTimeout(() => skip?.classList.add("visible"), 400);
  skip?.addEventListener("click", done);

  if (reduced) { done(); return; }

  const tl = gsap.timeline({ onComplete: done, delay: .2 });

  // 1. Anneaux se dessinent
  tl.to(rings, { opacity: 1, duration: .3, ease: "power1.out" });

  const path = $("path.ring-draw", rings);
  if (path) {
    const len = path.getTotalLength?.() || 300;
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    tl.to(path, { strokeDashoffset: 0, duration: 1.4, ease: "power2.inOut" }, "<");
  }

  // 2. Monogramme apparaît
  tl.to(monogram, { opacity: 1, y: 0, duration: .7, ease: "power2.out" }, "-=.4");

  // 3. Cœur pulse
  tl.to(heart, { opacity: 1, scale: 1, duration: .3, ease: "back.out(2)" }, "-=.1")
    .to(heart, { scale: 1.15, duration: .15, ease: "power2.in" }, "+=.1")
    .to(heart, { scale: 1, duration: .15, ease: "power2.out" });

  // 4. Pause, puis fade out
  tl.to({}, { duration: .6 });
}

/* ═════════════════════════════════════════════
   ANIMATION HERO
═════════════════════════════════════════════ */
function animateHero() {
  if (reduced) return;
  const tag   = $(".hero-tag");
  const title = $(".hero-title");
  const cta   = $(".hero-cta");
  if (!tag) return;
  gsap.from([tag, title, cta], {
    opacity: 0, y: 30, duration: 1, ease: "power2.out",
    stagger: .15, delay: .1
  });
}

/* ═════════════════════════════════════════════
   HEADER SCROLL
═════════════════════════════════════════════ */
const header = $("#header");
if (header) {
  const onScroll = () => {
    const scrolled = window.scrollY > 60;
    header.classList.toggle("scrolled", scrolled);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();
}

/* ═════════════════════════════════════════════
   MENU MOBILE
═════════════════════════════════════════════ */
const mobileMenu = $("#mobile-menu");
const menuToggle = $(".menu-toggle");

function openMobileMenu() {
  mobileMenu?.classList.add("open");
  menuToggle?.setAttribute("aria-expanded", "true");
  lenis?.stop();
}
function closeMobileMenu() {
  mobileMenu?.classList.remove("open");
  menuToggle?.setAttribute("aria-expanded", "false");
  lenis?.start();
}
menuToggle?.addEventListener("click", () => {
  mobileMenu?.classList.contains("open") ? closeMobileMenu() : openMobileMenu();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && mobileMenu?.classList.contains("open")) closeMobileMenu();
});

/* ═════════════════════════════════════════════
   RÉVÉLATIONS AU SCROLL
═════════════════════════════════════════════ */
function initReveal() {
  if (reduced) {
    $$("[data-reveal]").forEach((el) => el.classList.add("revealed"));
    return;
  }
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 }
  );
  $$("[data-reveal]").forEach((el) => observer.observe(el));
}

/* ═════════════════════════════════════════════
   VIDÉOS AUTO-PLAY AU SCROLL
═════════════════════════════════════════════ */
function initVideos() {
  const videos = $$("video[data-autoplay]");
  if (!videos.length) return;

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        const v = e.target;
        // Charger les sources lazy
        if (e.isIntersecting) {
          $$("source[data-src]", v).forEach((s) => {
            if (!s.src) { s.src = s.dataset.src; }
          });
          if (v.readyState === 0) v.load();
          v.play().catch(() => {});
        } else {
          v.pause();
        }
      });
    },
    { threshold: 0.3 }
  );
  videos.forEach((v) => obs.observe(v));
}

/* ═════════════════════════════════════════════
   FAQ ACCORDION
═════════════════════════════════════════════ */
function initFaq() {
  $$(".faq-item").forEach((item) => {
    const btn = $(".faq-q", item);
    btn?.addEventListener("click", () => {
      const open = item.classList.contains("open");
      // Fermer tous
      $$(".faq-item.open").forEach((i) => i.classList.remove("open"));
      if (!open) item.classList.add("open");
    });
  });
}

/* ═════════════════════════════════════════════
   FORMULAIRE → WHATSAPP
═════════════════════════════════════════════ */
function initContactForm() {
  const form = $("#contact-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const get = (id) => (form.querySelector(`#${id}`)?.value || "").trim();
    const radio = form.querySelector('[name="venue"]:checked');

    const bride   = get("f-bride");
    const groom   = get("f-groom");
    const date    = get("f-date");
    const region  = get("f-region");
    const guests  = get("f-guests");
    const budget  = get("f-budget");
    const venue   = radio?.value || "";
    const message = get("f-message");

    // Récupérer le template du dataset (mis dans data-wa-template par generate.mjs)
    let tmpl = form.dataset.waTpl || "";
    const msg = tmpl
      .replace("{bride}",   bride   || "—")
      .replace("{groom}",   groom   || "—")
      .replace("{date}",    date    || "—")
      .replace("{region}",  region  || "—")
      .replace("{guests}",  guests  || "—")
      .replace("{budget}",  budget  || "—")
      .replace("{venue}",   venue   || "—")
      .replace("{message}", message || "");

    window.open(
      `https://wa.me/${WA_NUM}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer"
    );
  });
}

/* ═════════════════════════════════════════════
   PLAY VIDÉO TÉMOIGNAGE (click overlay)
═════════════════════════════════════════════ */
function initVideoOverlays() {
  $$(".video-overlay").forEach((overlay) => {
    overlay.addEventListener("click", () => {
      const video = overlay.closest(".testimonial-video")?.querySelector("video");
      if (!video) return;
      overlay.style.display = "none";
      video.controls = true;
      $$("source[data-src]", video).forEach((s) => { if (!s.src) s.src = s.dataset.src; });
      if (video.readyState === 0) video.load();
      video.play().catch(() => {});
    });
  });
}

/* ═════════════════════════════════════════════
   WA FLOAT BUTTON
═════════════════════════════════════════════ */
const waFloat = $("#wa-float a, #wa-float button");
// Le lien est déjà dans le HTML — rien à faire

/* ═════════════════════════════════════════════
   INIT
═════════════════════════════════════════════ */
runIntro();
initReveal();
initVideos();
initFaq();
initContactForm();
initVideoOverlays();

// Si pas d'intro (déjà vue), animer le hero directement
try {
  if (sessionStorage.getItem(INTRO_KEY) === "1") {
    setTimeout(animateHero, 100);
  }
} catch {}
