/**
 * Écrit CONTENU.md : la liste des informations à demander à Tzach, puis tous les textes du site
 * dans les 4 langues, section par section, pour validation.
 *
 *   npm run contenu
 */
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const ROOT = path.resolve(import.meta.dirname, "..");
const LANGS = ["he", "en", "fr", "es"];
const NAMES = { he: "Hébreu (par défaut)", en: "Anglais", fr: "Français", es: "Espagnol" };
const L = Object.fromEntries(await Promise.all(LANGS.map(async (l) => [l, JSON.parse(await readFile(path.join(ROOT, `locales/${l}.json`), "utf8"))])));

const SKIP = new Set(["lang", "dir", "label", "locale", "ui", "alts", "waLabels"]);
function walk(obj, prefix = "") {
  const rows = [];
  for (const [k, v] of Object.entries(obj)) {
    if (SKIP.has(k)) continue;
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === "string") rows.push([key, v]);
    else if (Array.isArray(v)) v.forEach((item, i) => (typeof item === "string" ? rows.push([`${key}.${i + 1}`, item]) : rows.push(...walk(item, `${key}.${i + 1}`))));
    else rows.push(...walk(v, key));
  }
  return rows;
}

const todo = `# CONTENU · Tzach Zrihan Wedding Productions

Textes du site dans les 4 langues, à faire valider par Tzach. Les textes se modifient dans \`locales/<langue>.json\`, puis \`npm run gen\` (ou un simple push : Vercel régénère le site).

## Informations à demander à Tzach

1. **Chiffres clés** : nombre de mariages produits, économies moyennes réalisées par les couples. Tant qu'ils ne sont pas confirmés, le bloc reste masqué (\`data/site.json\` → \`stats\`). Aucun chiffre n'a été inventé : le site n'affiche que les durées réelles tirées de ses posts (10 mois Eden & Tevel, 8 mois Shir & Tal, 5 mois Yuval & Idan).
2. **Régions couvertes** : toute l'Israël ? Mariages à l'étranger ? (le formulaire propose les régions + « autre / étranger »).
3. **Formules et tarifs**, ou confirmation du « sur rendez-vous » (réponse actuelle de la FAQ « combien ça coûte »).
4. **Réponses de la FAQ** : les 5 réponses sont rédigées à partir de ses propres posts. À relire, en particulier :
   - en / fr / es : « organiser un mariage en Israël depuis l'étranger » (WhatsApp, visio, visites sur place) ;
   - he : « אירועים מיוחדים ».
5. **Autorisation des couples** pour leurs prénoms, photos et vidéos : Sivan & Daniel, Yuval & Idan, Limor & Oded, Mr & Mrs Digmi, Ofir & Or, Shachar & Eyal, Eden & Tevel, Shir & Tal, Lian & Arnold, et May & Harel (film « The 90's are back » utilisé dans la vidéo d'accueil).
6. **Crédits photographes** à confirmer : Ilan Magen pour @niv_brig_photography (Sivan & Daniel), @nadav_margalit_wed et @meni_shitrit (Yuval & Idan), @rb_social_ (Ofir & Or), @ayelet.digmi (Digmi). Les autres mariages n'ont pas de crédit connu.
7. **Vidéos en bonne qualité** (fichiers originaux, pas les versions Instagram) : témoignages, films de mariage, reels des coulisses. Préciser si la musique des reels est libre de droits pour un site web.
8. **Témoignages écrits** : quelques phrases de couples (avec leur accord) pour compléter la vidéo de Lian & Arnold.
9. **Photos manquantes** : les posts de Shir & Tal et d'Eden & Tevel n'ont pas pu être récupérés (Instagram bloque l'accès sans compte) ; ils apparaissent pour l'instant en citation, sans photo.
10. **Logo** : s'il en a un. Sinon, le logo typographique et le monogramme TZ du site sont dans \`public/brand/\`.
11. **Domaine** : nom de domaine souhaité (aujourd'hui https://tzach-zrihan.vercel.app).

`;

const sections = LANGS.map((l) => {
  const rows = walk(L[l]).map(([k, v]) => `| \`${k}\` | ${v.replace(/\n/g, "<br>").replace(/\|/g, "\\|")} |`).join("\n");
  return `## ${NAMES[l]} (${l})\n\n| Clé | Texte |\n| --- | --- |\n${rows}\n`;
}).join("\n");

await writeFile(path.join(ROOT, "CONTENU.md"), todo + sections, "utf8");
console.log("✓ CONTENU.md");
