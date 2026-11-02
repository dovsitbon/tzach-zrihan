/**
 * Tzach Zrihan — comportements du site :
 * intro (une fois par session), défilement doux, en-tête, menu mobile, apparitions,
 * vidéo du hero, aperçus des reels, fenêtres des couples et lecteur vidéo, formulaire → WhatsApp.
 */
import Lenis from "lenis";

const root = document.documentElement;
root.classList.add("js");
const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
const canHover = matchMedia("(hover: hover) and (pointer: fine)").matches;
const rtl = root.dir === "rtl";
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const store = (k, v) => { try { v === undefined ? sessionStorage.getItem(k) : sessionStorage.setItem(k, v); } catch {} };

/* ---------- Langue mémorisée ---------- */
$$("[data-lang]").forEach((a) => a.addEventListener("click", () => { try { localStorage.setItem("tz-lang", a.dataset.lang); } catch {} }));

/* ---------- Défilement doux ---------- */
const lenis = reduced ? null : new Lenis({ lerp: 0.09, smoothWheel: true });
if (lenis) requestAnimationFrame(function raf(t) { lenis.raf(t); requestAnimationFrame(raf); });
const hdrH = () => $("[data-header]")?.offsetHeight || 0;
document.addEventListener("click", (e) => {
  const a = e.target.closest('a[href*="#"]');
  if (!a) return;
  const url = new URL(a.href, location.href);
  if (url.pathname !== location.pathname || url.hash.length < 2) return;
  const target = document.getElementById(url.hash.slice(1));
  if (!target) return;
  e.preventDefault();
  closeMenu();
  if (lenis) lenis.scrollTo(target, { offset: -hdrH() + 1, duration: 1.5 });
  else target.scrollIntoView();
  history.replaceState(null, "", url.hash);
});

/* ---------- Intro ---------- */
const intro = $("[data-intro]");
function endIntro() {
  if (!root.classList.contains("intro-on")) return;
  store("tz-intro", "1");
  intro?.classList.add("is-done");
  setTimeout(() => { root.classList.remove("intro-on"); intro?.remove(); lenis?.start(); }, 700);
  startHero();
}
if (root.classList.contains("intro-on") && intro) {
  lenis?.stop();
  $("[data-intro-skip]", intro).addEventListener("click", endIntro);
  $(".heart", intro).addEventListener("animationend", () => setTimeout(endIntro, 350));
  setTimeout(endIntro, 4500);
} else {
  root.classList.remove("intro-on");
  intro?.remove();
}

/* ---------- Vidéo du hero ---------- */
const heroVideo = $("[data-hero-video]");
let heroStarted = false;
function startHero() {
  if (heroStarted || !heroVideo || reduced || navigator.connection?.saveData) return;
  heroStarted = true;
  const portrait = matchMedia(heroVideo.dataset.portrait).matches;
  $$("source[data-src]", heroVideo).forEach((s) => (s.src = portrait ? s.dataset.srcV : s.dataset.src));
  heroVideo.load();
  heroVideo.addEventListener("playing", () => heroVideo.classList.add("is-playing"), { once: true });
  heroVideo.play().catch(() => {});
}
if (!root.classList.contains("intro-on")) {
  if (document.readyState === "complete") startHero();
  else addEventListener("load", startHero, { once: true });
}
const heroToggle = $("[data-hero-toggle]");
let heroPaused = false;
if (heroVideo) {
  heroVideo.addEventListener("playing", () => (heroToggle.hidden = false), { once: true });
  new IntersectionObserver(([e]) => { if (!heroStarted || heroPaused) return; e.isIntersecting ? heroVideo.play().catch(() => {}) : heroVideo.pause(); }).observe(heroVideo);
  heroToggle?.addEventListener("click", () => {
    heroPaused = !heroPaused;
    heroPaused ? heroVideo.pause() : heroVideo.play().catch(() => {});
    heroToggle.setAttribute("aria-pressed", String(heroPaused));
    heroToggle.setAttribute("aria-label", heroPaused ? heroToggle.dataset.resume : heroToggle.dataset.pause);
  });
}

/* ---------- En-tête ---------- */
const header = $("[data-header]");
let lastY = 0;
function onScroll() {
  const y = scrollY;
  header?.classList.toggle("is-scrolled", y > 40);
  header?.classList.toggle("is-hidden", y > 700 && y > lastY + 4 && !root.classList.contains("menu-open"));
  if (y < lastY - 4 || y < 700) header?.classList.remove("is-hidden");
  lastY = y;
}
addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------- Menu mobile ---------- */
const menu = $("[data-menu]");
const burger = $("[data-menu-open]");
function openMenu() {
  if (!menu) return;
  menu.hidden = false;
  requestAnimationFrame(() => menu.classList.add("is-open"));
  root.classList.add("menu-open");
  burger.setAttribute("aria-expanded", "true");
  lenis?.stop();
  $("a", menu)?.focus();
}
function closeMenu() {
  if (!menu || menu.hidden) return;
  menu.classList.remove("is-open");
  root.classList.remove("menu-open");
  burger.setAttribute("aria-expanded", "false");
  lenis?.start();
  setTimeout(() => (menu.hidden = true), 400);
}
burger?.addEventListener("click", () => (menu.hidden ? openMenu() : closeMenu()));
addEventListener("keydown", (e) => { if (e.key === "Escape" && !menu?.hidden) { closeMenu(); burger.focus(); } });

/* ---------- Apparitions ---------- */
const io = new IntersectionObserver((entries) => entries.forEach((e) => {
  if (e.isIntersecting) { e.target.classList.add("is-in"); io.unobserve(e.target); }
}), { rootMargin: "0px 0px -8% 0px" });
$$(".reveal").forEach((el) => io.observe(el));

/* ---------- Aperçu des reels au survol ---------- */
if (canHover && !reduced) {
  $$("[data-preview]").forEach((btn) => {
    const v = $("video", btn);
    btn.addEventListener("pointerenter", () => {
      if (!v.src) v.src = btn.dataset.play;
      v.currentTime = 0;
      v.play().then(() => v.classList.add("is-playing")).catch(() => {});
    });
    btn.addEventListener("pointerleave", () => { v.pause(); v.classList.remove("is-playing"); });
  });
}

/* ---------- Fenêtres ---------- */
let lastFocus = null;
function openDialog(d) {
  lastFocus = document.activeElement;
  d.showModal();
  lenis?.stop();
  $$("video[data-src]", d).forEach((v) => { if (!v.src) v.src = v.dataset.src; });
}
$$("dialog").forEach((d) => {
  d.addEventListener("click", (e) => { if (e.target === d || e.target.closest("[data-close]")) d.close(); });
  d.addEventListener("close", () => {
    $$("video", d).forEach((v) => v.pause());
    if (d.id === "player") { const v = $("video", d); v.removeAttribute("src"); v.load(); }
    lenis?.start();
    lastFocus?.focus();
  });
});
$$("[data-open]").forEach((b) => b.addEventListener("click", () => {
  const d = document.getElementById(b.dataset.open);
  if (d) { openDialog(d); $("[data-slides]", d).scrollLeft = 0; }
}));

const player = $("#player");
$$("[data-play]").forEach((b) => b.addEventListener("click", () => {
  if (!player) return;
  const v = $("video", player);
  v.src = b.dataset.play;
  openDialog(player);
  v.play().catch(() => {});
}));

$$("[data-slide]").forEach((b) => b.addEventListener("click", () => {
  const list = $("[data-slides]", b.closest(".dlg__media"));
  const count = list.children.length;
  const w = list.clientWidth;
  const current = Math.round(Math.abs(list.scrollLeft) / w);
  const next = (current + Number(b.dataset.slide) + count) % count;
  list.scrollTo({ left: next * w * (rtl ? -1 : 1), behavior: reduced ? "auto" : "smooth" });
  $$("video", list).forEach((v) => v.pause());
}));

/* ---------- Formulaire → WhatsApp ---------- */
const form = $("[data-form]");
form?.addEventListener("submit", (e) => {
  e.preventDefault();
  const names = form.elements.names;
  const err = $("#f-names-err");
  if (!names.value.trim()) {
    names.setAttribute("aria-invalid", "true");
    err.hidden = false;
    names.focus();
    return;
  }
  names.removeAttribute("aria-invalid");
  err.hidden = true;
  const labels = JSON.parse(form.dataset.labels);
  const label = (name) => labels[name];
  const value = (name) => {
    const v = (form.elements[name].value || "").trim();
    if (name === "date" && /^\d{4}-\d{2}$/.test(v)) {
      const [y, m] = v.split("-").map(Number);
      return new Intl.DateTimeFormat(form.dataset.lang, { month: "long", year: "numeric" }).format(new Date(y, m - 1, 1));
    }
    return v;
  };
  const lines = [form.dataset.greeting, ""];
  for (const n of ["names", "date", "region", "guests", "budget", "venue"]) { const v = value(n); if (v) lines.push(`${label(n)}: ${v}`); }
  const msg = value("message");
  if (msg) lines.push("", msg);
  window.open(`https://wa.me/${form.dataset.wa}?text=${encodeURIComponent(lines.join("\n"))}`, "_blank", "noopener");
});
form?.elements.names.addEventListener("input", (e) => { if (e.target.value.trim()) { e.target.removeAttribute("aria-invalid"); $("#f-names-err").hidden = true; } });
