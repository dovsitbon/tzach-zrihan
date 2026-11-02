/**
 * Prépare les médias du site à partir de assets/raw/ (visuels Instagram de Tzach) :
 *   photos et images extraites des reels → public/media/<clé>-<largeur>.avif|webp
 *   vidéos (hero, reels, films de couples) → public/media/video/<nom>.mp4|webm + affiche
 *   tailles → src/data/media.json (lu par generate.mjs)
 *
 *   npm run media
 */
import { mkdir, writeFile, readFile, access } from "node:fs/promises";
import { execFileSync } from "node:child_process";
import path from "node:path";
import sharp from "sharp";
import ffmpegPath from "ffmpeg-static";

const ROOT = path.resolve(import.meta.dirname, "..");
const RAW = path.join(ROOT, "assets/raw");
const OUT = path.join(ROOT, "public/media");
const TMP = path.join(ROOT, "assets/frames");
const ff = (args) => execFileSync(ffmpegPath, ["-hide_banner", "-v", "error", "-y", ...args], { stdio: ["ignore", "ignore", "inherit"] });
const raw = (f) => path.join(RAW, f);
const exists = (p) => access(p).then(() => true, () => false);

// Filigrane « RB SOCIAL » en bas du film d'Ofir & Or : on garde le haut de l'image.
const CROP_RB = "crop=iw:ih*0.86:0:0";

/* Images extraites des vidéos : [nom, vidéo, seconde, filtre éventuel] */
const FRAMES = [
  ["hero-poster", "ig_DexBm86Rylk_00001.mp4", 28.4],
  ["hero-poster-v", "ig_Deb2XsQNAq9_00001.mp4", 1.4],
  ["limor-1", "ig_Deb2XsQNAq9_00001.mp4", 6.0],
  ["limor-2", "ig_Deb2XsQNAq9_00001.mp4", 3.0],
  ["limor-3", "ig_Deb2XsQNAq9_00001.mp4", 8.6],
  ["limor-bamba", "ig_Deb2XsQNAq9_00001.mp4", 17.2],
  ["ofir-1", "ig_DdPJIymtCPa_00001.mp4", 15.2, CROP_RB],
  ["ofir-2", "ig_DdPJIymtCPa_00001.mp4", 42.6, CROP_RB],
  ["ofir-3", "ig_DdPJIymtCPa_00001.mp4", 39.4, CROP_RB],
  ["ofir-4", "ig_DdPJIymtCPa_00001.mp4", 36.2, CROP_RB],
  ["shachar-2", "ig_DfCSNjWjTSr_00002.mp4", 16.0],
  ["may-1", "ig_DexBm86Rylk_00001.mp4", 24.2],
  ["may-2", "ig_DexBm86Rylk_00001.mp4", 12.4],
  ["poster-parents", "ig_DfC4MVjNtN4_00001.mp4", 2.4],
  ["poster-briefing", "ig_DdWMdT_NXku_00001.mp4", 18.0],
  ["poster-briefing2", "ig_De9gNm6Nyca_00001.mp4", 49.0],
  ["poster-details", "ig_Dc8WvIftJ8O_00001.mp4", 3.2],
  ["poster-order", "ig_DcGSlOcN0Ai_00001.mp4", 65.0],
  ["poster-pitch", "ig_De-Fx_oxM4Y_00001.mp4", 17.0],
  ["poster-lian", "ig_DbTBO8rNmDN_00001.mp4", 31.0],
];

/* Photos : [clé publiée, fichier source, largeurs, options] */
const PHOTOS = [
  ["hero/poster", "frame:hero-poster", [800, 1280, 1920]],
  ["hero/poster-v", "frame:hero-poster-v", [540, 828, 1080], { ratio: 9 / 16 }],
  ["portrait/tzach", "tzach-productions_photo-profil.jpg", [480, 720]],
  ["promise/precision", "ig_De4yrNbgOxf_01.jpg", [480, 800, 1200], { ratio: 3 / 4 }],
  ["promise/savings", "ig_De_5y3cjNIC_09.jpg", [480, 800, 1200], { ratio: 3 / 4 }],
  ["promise/calm", "ig_De_5y3cjNIC_05.jpg", [480, 800, 1200], { ratio: 3 / 4 }],
  ["details/chuppah", "ig_DcN-z4ijRha_04.jpg", [800, 1400, 2200], { grey: true }],
  ["about/briefing", "frame:poster-briefing2", [480, 800], { ratio: 3 / 4 }],

  ["couples/sivan-daniel/cover", "ig_De_5y3cjNIC_02.jpg", [480, 800, 1200], { ratio: 2 / 3 }],
  ["couples/sivan-daniel/1", "ig_De_5y3cjNIC_01.jpg", [480, 900, 1400]],
  ["couples/sivan-daniel/2", "ig_De_5y3cjNIC_03.jpg", [480, 900, 1400]],
  ["couples/sivan-daniel/3", "ig_De_5y3cjNIC_07.jpg", [480, 900, 1400]],
  ["couples/sivan-daniel/4", "ig_De_5y3cjNIC_10.jpg", [480, 900, 1400]],
  ["couples/sivan-daniel/5", "ig_De_5y3cjNIC_11.jpg", [480, 900, 1400]],

  ["couples/digmi/cover", "ig_De4yrNbgOxf_03.jpg", [480, 800, 1200], { ratio: 2 / 3 }],
  ["couples/digmi/1", "ig_De4yrNbgOxf_01.jpg", [480, 900, 1400]],
  ["couples/digmi/2", "ig_De4yrNbgOxf_04.jpg", [480, 900, 1400]],
  ["couples/digmi/3", "ig_De4yrNbgOxf_02.jpg", [480, 900, 1400]],

  ["couples/yuval-idan/cover", "ig_DcN-z4ijRha_03.jpg", [480, 800, 1200], { ratio: 2 / 3, position: "attention" }],
  ["couples/yuval-idan/1", "ig_DcN-z4ijRha_01.jpg", [600, 1200, 1800]],
  ["couples/yuval-idan/2", "ig_DcN-z4ijRha_02.jpg", [600, 1200, 1800]],
  ["couples/yuval-idan/3", "ig_DcN-z4ijRha_04.jpg", [600, 1200, 1800]],

  ["couples/shachar-eyal/cover", "ig_DfCSNjWjTSr_01.jpg", [480, 800, 1080], { ratio: 2 / 3 }],
  ["couples/shachar-eyal/1", "frame:shachar-2", [480, 900]],

  ["couples/limor-oded/cover", "frame:limor-1", [480, 800, 1080], { ratio: 2 / 3 }],
  ["couples/limor-oded/1", "frame:limor-2", [480, 900]],
  ["couples/limor-oded/2", "frame:limor-3", [480, 900]],
  ["couples/limor-oded/3", "frame:limor-bamba", [480, 900]],

  ["couples/ofir-or/cover", "frame:ofir-1", [480, 800, 1080], { ratio: 2 / 3, position: "attention" }],
  ["couples/ofir-or/1", "frame:ofir-2", [600, 1200, 1600]],
  ["couples/ofir-or/2", "frame:ofir-3", [600, 1200, 1600]],
  ["couples/ofir-or/3", "frame:ofir-4", [600, 1200, 1600]],

  ["bts/parents", "frame:poster-parents", [400, 720], { ratio: 9 / 16 }],
  ["bts/briefing", "frame:poster-briefing", [400, 720], { ratio: 9 / 16 }],
  ["bts/details", "frame:poster-details", [400, 720], { ratio: 9 / 16 }],
  ["bts/order", "frame:poster-order", [400, 720], { ratio: 9 / 16 }],
  ["video/pitch", "frame:poster-pitch", [400, 720], { ratio: 9 / 16 }],
  ["video/lian-arnold", "frame:poster-lian", [400, 720], { ratio: 9 / 16 }],
  ["og/cover", "frame:hero-poster", [1200], { ratio: 1200 / 630 }],
];

/* Vidéos verticales (avec le son, lues à la demande) : [nom, source, filtre] */
const REELS = [
  ["pitch", "ig_De-Fx_oxM4Y_00001.mp4"],
  ["lian-arnold", "ig_DbTBO8rNmDN_00001.mp4"],
  ["parents", "ig_DfC4MVjNtN4_00001.mp4"],
  ["briefing", "ig_DdWMdT_NXku_00001.mp4"],
  ["details", "ig_Dc8WvIftJ8O_00001.mp4"],
  ["order", "ig_DcGSlOcN0Ai_00001.mp4"],
  ["limor-oded", "ig_Deb2XsQNAq9_00001.mp4"],
  ["shachar-eyal", "ig_DfCSNjWjTSr_00002.mp4"],
];
/* Films horizontaux */
const FILMS = [["ofir-or", "ig_DdPJIymtCPa_00001.mp4", CROP_RB]];

/* Montage du hero : extraits muets du film « The 90's are back » et du film d'Ofir & Or */
const HERO = [
  ["ig_DexBm86Rylk_00001.mp4", 21.8, 4.2],
  ["ig_DdPJIymtCPa_00001.mp4", 39.2, 3.2, CROP_RB],
  ["ig_DexBm86Rylk_00001.mp4", 26.6, 3.8],
  ["ig_DdPJIymtCPa_00001.mp4", 42.3, 3.0, CROP_RB],
  ["ig_DexBm86Rylk_00001.mp4", 12.0, 3.2],
  ["ig_DexBm86Rylk_00001.mp4", 30.4, 2.4],
];

/* Version verticale pour les téléphones : reels de la plage de Poleg et de Shachar & Eyal (1080×1440, recadré). */
const HERO_V = [
  ["ig_Deb2XsQNAq9_00001.mp4", 0.6, 2.8],
  ["ig_DfCSNjWjTSr_00002.mp4", 9.0, 3.4],
  ["ig_Deb2XsQNAq9_00001.mp4", 5.2, 3.0],
  ["ig_DfCSNjWjTSr_00002.mp4", 20.0, 3.0],
  ["ig_Deb2XsQNAq9_00001.mp4", 10.0, 3.0],
];

const sizes = {};

async function frames() {
  await mkdir(TMP, { recursive: true });
  for (const [name, src, t, vf] of FRAMES) {
    ff(["-ss", String(t), "-i", raw(src), "-frames:v", "1", ...(vf ? ["-vf", vf] : []), "-q:v", "2", path.join(TMP, `${name}.jpg`)]);
  }
  console.log("✓ images extraites des vidéos :", FRAMES.length);
}

async function photos() {
  for (const [key, src, widths, opt = {}] of PHOTOS) {
    const file = src.startsWith("frame:") ? path.join(TMP, `${src.slice(6)}.jpg`) : raw(src);
    let base = sharp(file).rotate();
    const meta = await base.metadata();
    let w = meta.width, h = meta.height;
    if (opt.ratio) {
      const target = opt.ratio;
      if (w / h > target) w = Math.round(h * target); else h = Math.round(w / target);
      base = base.resize(w, h, { fit: "cover", position: opt.position || "centre" });
    }
    if (opt.grey) base = base.grayscale().linear(1.08, -6);
    const buf = await base.toBuffer();
    const list = widths.filter((x) => x <= w);
    if (!list.length) list.push(w);
    const dir = path.join(OUT, path.dirname(key));
    await mkdir(dir, { recursive: true });
    for (const width of list) {
      const r = sharp(buf).resize({ width });
      await r.clone().avif({ quality: 52, effort: 5 }).toFile(path.join(OUT, `${key}-${width}.avif`));
      await r.clone().webp({ quality: 74 }).toFile(path.join(OUT, `${key}-${width}.webp`));
    }
    if (key === "og/cover") await sharp(buf).resize({ width: 1200 }).jpeg({ quality: 80 }).toFile(path.join(ROOT, "public/og.jpg"));
    sizes[key] = { w, h, widths: list };
  }
  console.log("✓ photos :", PHOTOS.length);
}

async function videos() {
  const dir = path.join(OUT, "video");
  await mkdir(dir, { recursive: true });
  const enc = async (name, src, vf, { audio = true, w = 540, h = 960 } = {}) => {
    const scale = `${vf ? vf + "," : ""}scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h},fps=30`;
    const mp4 = path.join(dir, `${name}.mp4`);
    if (await exists(mp4)) return;
    ff(["-i", raw(src), "-vf", scale, "-c:v", "libx264", "-preset", "slow", "-crf", "28", "-maxrate", "1100k", "-bufsize", "2200k", "-pix_fmt", "yuv420p", "-movflags", "+faststart",
      ...(audio ? ["-c:a", "aac", "-b:a", "96k", "-ac", "2"] : ["-an"]), mp4]);
    console.log("  vidéo", name);
  };
  for (const [name, src] of REELS) await enc(name, src);
  for (const [name, src, vf] of FILMS) await enc(name, src, vf, { w: 960, h: 540 });

  // Hero : extraits concaténés, sans son, MP4 + WebM (horizontal pour les grands écrans, vertical pour les téléphones).
  const montage = async (name, clips, w, h) => {
    const parts = [];
    for (const [i, [src, start, dur, vf]] of clips.entries()) {
      const p = path.join(TMP, `${name}-${i}.mp4`);
      ff(["-ss", String(start), "-t", String(dur), "-i", raw(src), "-vf", `${vf ? vf + "," : ""}scale=${w}:${h}:force_original_aspect_ratio=increase,crop=${w}:${h},fps=30`,
        "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "18", "-pix_fmt", "yuv420p", p]);
      parts.push(p);
    }
    const list = path.join(TMP, `${name}.txt`);
    await writeFile(list, parts.map((p) => `file '${p.replace(/\\/g, "/")}'`).join("\n"));
    ff(["-f", "concat", "-safe", "0", "-i", list, "-c:v", "libx264", "-preset", "slow", "-crf", "29", "-maxrate", "1200k", "-bufsize", "2400k", "-pix_fmt", "yuv420p", "-movflags", "+faststart", "-an", path.join(dir, `${name}.mp4`)]);
    ff(["-f", "concat", "-safe", "0", "-i", list, "-c:v", "libvpx-vp9", "-b:v", "950k", "-maxrate", "1200k", "-bufsize", "2400k", "-row-mt", "1", "-deadline", "good", "-an", path.join(dir, `${name}.webm`)]);
  };
  if (!(await exists(path.join(dir, "hero.mp4")))) await montage("hero", HERO, 1280, 720);
  if (!(await exists(path.join(dir, "hero-v.mp4")))) await montage("hero-v", HERO_V, 720, 1280);
  console.log("✓ vidéos : hero (2 formats) +", REELS.length + FILMS.length);
}

const only = process.argv[2];
await frames();
if (!only || only === "photos") await photos();
else Object.assign(sizes, JSON.parse(await readFile(path.join(ROOT, "src/data/media.json"), "utf8")));
if (!only || only === "videos") await videos();
await mkdir(path.join(ROOT, "src/data"), { recursive: true });
if (!only || only === "photos") await writeFile(path.join(ROOT, "src/data/media.json"), JSON.stringify(sizes, null, 1));
console.log("✓ src/data/media.json");
