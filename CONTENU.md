# CONTENU · Tzach Zrihan Wedding Productions

Textes du site dans les 4 langues, à faire valider par Tzach. Les textes se modifient dans `locales/<langue>.json`, puis `npm run gen` (ou un simple push : Vercel régénère le site).

## Informations à demander à Tzach

1. **Chiffres clés** : nombre de mariages produits, économies moyennes réalisées par les couples. Tant qu'ils ne sont pas confirmés, le bloc reste masqué (`data/site.json` → `stats`). Aucun chiffre n'a été inventé : le site n'affiche que les durées réelles tirées de ses posts (10 mois Eden & Tevel, 8 mois Shir & Tal, 5 mois Yuval & Idan).
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
10. **Logo** : s'il en a un. Sinon, le logo typographique et le monogramme TZ du site sont dans `public/brand/`.
11. **Domaine** : nom de domaine souhaité (aujourd'hui https://tzach-zrihan.vercel.app).

## Hébreu (par défaut) (he)

| Clé | Texte |
| --- | --- |
| `meta.title` | צח זריהן \| מפיק חתונות – הפקת חתונה ברמת דיוק גבוהה |
| `meta.description` | צח זריהן, מפיק חתונות חיצוני: ליווי זוגות לאורך חודשים, משא ומתן מול ספקים כדי שלא תשלמו על מה שלא צריך, וניהול האירוע ביום עצמו. בואו נכיר. |
| `meta.legalTitle` | מדיניות פרטיות ותנאי שימוש \| צח זריהן |
| `nav.story` | הסיפור שלי |
| `nav.services` | השירותים |
| `nav.weddings` | חתונות |
| `nav.testimonials` | המלצות |
| `nav.faq` | שאלות ותשובות |
| `nav.contact` | בואו נכיר |
| `brand.name` | צח זריהן |
| `brand.sub` | Wedding Productions |
| `intro.line` | צח זריהן · מפיק חתונות |
| `hero.tag` | צח זריהן · מפיק חתונות בישראל |
| `hero.title` | החתונה שתמיד חלמתם,<br>בלי לחץ ובלי הפתעות. |
| `hero.cta` | בואו נכיר |
| `manifesto.tag` | התארסתם? |
| `manifesto.title` | ההתרגשות גוברת.<br>וכל אחד מציע משהו אחר. |
| `manifesto.text` | סדר וארגון, חיסכון בכסף וראש שקט, עם המון אהבה וחברות ביני לבין הזוגות. ככה מגיעים לאירוע שתמיד רציתם, בלי להתפשר, בצעדים נכונים ובטוחים וללא הפתעות. |
| `manifesto.link` | הסיפור שלי |
| `promises.tag` | שלוש הבטחות |
| `promises.items.1.title` | דיוק |
| `promises.items.1.text` | הפקה ברמת דיוק גבוהה. כל ספק, כל לו״ז וכל פרט קטן, מתוכננים מראש. |
| `promises.items.2.title` | חיסכון |
| `promises.items.2.text` | לא אתן לכם לשלם כסף שאתם לא צריכים. אני יושב מול הספקים בשבילכם. |
| `promises.items.3.title` | ראש שקט |
| `promises.items.3.text` | ביום עצמו אני מנהל את האירוע. אתם רק נהנים מהחתונה שלכם. |
| `about.tag` | הסיפור שלי |
| `about.title` | מפיק החתונות<br>הכי שמח שתפגשו. |
| `about.paras.1` | אני צח. אני מלווה זוגות מהרגע שהם מתארסים ועד הריקוד האחרון, לפעמים חמישה חודשים, לפעמים עשרה. בתקופה הזו אנחנו בונים יחד את האירוע, צעד אחרי צעד, בלי לחץ. |
| `about.paras.2` | אני יושב מול האולמות והספקים, משווה הצעות ושואל את השאלות שלא תמיד נעים לשאול. וביום החתונה אני שם מהרגע הראשון: מתדריך החופה ועד הדברים שהבאתם מהבית. |
| `about.definitionTitle` | מה זה מפיק חתונות חיצוני? |
| `about.definition` | מפיק חתונות חיצוני (נקרא גם מפיק אירועים חיצוני) הוא איש מקצוע עצמאי שאינו עובד של האולם. הוא עובד בשביל הזוג בלבד: עוזר לבחור אולם וספקים, מנהל משא ומתן, בונה את התקציב ואת לו״ז הערב, ומנהל את האירוע ביום עצמו. |
| `about.quote` | הרעיון כמפיק חיצוני זה לשים לב לפרטים שבחיים לא הייתם חושבים עליהם. |
| `about.sign` | צח זריהן |
| `about.videoLabel` | התארסתם? צח מסביר איך זה עובד |
| `services.tag` | השירותים |
| `services.title` | מה אני עושה<br>בשבילכם. |
| `services.items.1.title` | הפקת חתונה מלאה |
| `services.items.1.text` | ליווי מא׳ ועד ת׳ לאורך חודשי ההכנות, עם איש קשר אחד לכל שאלה. |
| `services.items.2.title` | אולם וספקים |
| `services.items.2.text` | בחירת המקום והספקים המתאימים, משא ומתן וחיסכון אמיתי בעלויות. |
| `services.items.3.title` | תכנון ותקציב |
| `services.items.3.text` | לו״ז הערב, התפריט (למשל תפריט מסעדה בלי הפסקות) ותוכנית מסודרת לכל שלב. |
| `services.items.4.title` | תדריך חופה |
| `services.items.4.text` | חזרה מסודרת על הטקס, כדי שתגיעו לחופה רגועים ויודעים בדיוק מה קורה. |
| `services.items.5.title` | ניהול יום האירוע |
| `services.items.5.text` | תיאום הספקים, הזמנים והאורחים, ומי שמטפל בדברים שהבאתם מהבית. |
| `services.items.6.title` | אירועים מיוחדים |
| `services.items.6.text` | חתונה על החוף, נישואים שניים, ערב בסגנון The 90’s are back. כל רעיון מקבל הפקה משלו. |
| `process.tag` | איך זה עובד |
| `process.title` | ארבעה שלבים,<br>בלי הפתעות. |
| `process.steps.1.title` | פגישת היכרות |
| `process.steps.1.text` | מדברים על החלום, על התקציב ועל מה שבאמת חשוב לכם. |
| `process.steps.2.title` | אולם וספקים |
| `process.steps.2.text` | בוחרים יחד, ואני מנהל את המשא ומתן כדי שלא תשלמו שקל מיותר. |
| `process.steps.3.title` | חודשי התכנון |
| `process.steps.3.text` | ליווי צמוד: לו״ז, תפריט, תוכנית הערב ותדריך החופה. |
| `process.steps.4.title` | היום הגדול |
| `process.steps.4.text` | אני מנהל את האירוע מההתחלה ועד הסוף. אתם רוקדים. |
| `details.title` | לשים לב לפרטים<br>שלא הייתם חושבים עליהם. |
| `details.text` | אבל מי ידאג לנו לדברים שהבאנו מהבית? ברור שאני. |
| `weddings.tag` | חתונות |
| `weddings.title` | כל חתונה,<br>סיפור אחר. |
| `weddings.couples.sivan-daniel.names` | סיון ודניאל |
| `weddings.couples.sivan-daniel.place` | צילומי זוגיות ביער |
| `weddings.couples.sivan-daniel.story` | יום שהתחיל באור הזהוב של בין העצים ונגמר ברחבה מלאה. |
| `weddings.couples.yuval-idan.names` | יובל ועידן |
| `weddings.couples.yuval-idan.place` | קו המים |
| `weddings.couples.yuval-idan.story` | את יובל ועידן ליוויתי במשך חמישה חודשים, והייתה להם הפקה מהממת. |
| `weddings.couples.limor-oded.names` | לימור ועודד |
| `weddings.couples.limor-oded.place` | חוף פולג |
| `weddings.couples.limor-oded.story` | נישואים שניים אחרי 13 שנה ביחד, על החוף: מיתוג אישי, ארוחת בשר בסגנון בופה פתוח וחופה מרגשת ושמחה. |
| `weddings.couples.digmi.names` | Mr & Mrs Digmi |
| `weddings.couples.digmi.place` | שדרת ברושים |
| `weddings.couples.digmi.story` | חתונה לבנה, נקייה ומדויקת, בין הברושים. |
| `weddings.couples.ofir-or.names` | אופיר ואור |
| `weddings.couples.ofir-or.place` | The Wedding Day |
| `weddings.couples.ofir-or.story` | בוקר החתונה בבית, החברים ליד הבריכה, והרגע הראשון על הדשא. |
| `weddings.couples.shachar-eyal.names` | שחר ואייל |
| `weddings.couples.shachar-eyal.place` | רגע לפני הכניסה |
| `weddings.couples.shachar-eyal.story` | שמפניה, צחוקים ומגדל כוסות. תודה לכם על הזכות. |
| `months.tag` | במספרים |
| `months.title` | הפקה היא תהליך,<br>לא ערב אחד. |
| `months.unit` | חודשים |
| `months.items.eden-tevel.names` | עדן ותבל |
| `months.items.eden-tevel.quote` | אחרי תקופה של עשרה חודשים, לראות שהכל היה בול כמו שתכננו. |
| `months.items.shir-tal.names` | שיר וטל |
| `months.items.shir-tal.quote` | תודה לכם על הזכות להפיק לכם את החתונה במשך שמונה חודשים. |
| `months.items.yuval-idan.names` | יובל ועידן |
| `months.items.yuval-idan.quote` | ליוויתי אותם חמישה חודשים, והייתה להם הפקה מהממת. |
| `months.weddings` | חתונות שהפקתי |
| `months.savings` | חיסכון ממוצע לזוג |
| `testimonials.tag` | המלצות |
| `testimonials.title` | מה הזוגות מספרים. |
| `testimonials.lian.names` | ליאן וארנולד |
| `testimonials.lian.caption` | הזמנתי את ליאן וארנולד לספר על החוויה שלהם בהפקת החתונה. חלק 1: החיסכון בכסף. |
| `testimonials.more` | עוד המלצות בהיילייט ״המלצות״ באינסטגרם |
| `bts.tag` | מאחורי הקלעים |
| `bts.title` | אני וההורים שלכם<br>הולכים להיות חברים. |
| `bts.text` | הרבה הומור, הרבה אהבה, ומלא פרטים קטנים. ככה זה נראה מבפנים. |
| `bts.items.parents` | אני וההורים שלכם |
| `bts.items.briefing` | תדריך חופה |
| `bts.items.details` | הפרטים הקטנים |
| `bts.items.order` | סדר וארגון |
| `faq.tag` | שאלות ותשובות |
| `faq.title` | מה שכולם<br>שואלים אותי. |
| `faq.items.1.q` | למה צריך מפיק חיצוני אם יש מנהל אירוע באולם? |
| `faq.items.1.a` | מנהל האירוע של האולם עובד בשביל האולם. מפיק חיצוני עובד רק בשבילכם: הוא מכיר את כל הספקים, משווה הצעות, מנהל משא ומתן ושומר על התקציב שלכם, וביום עצמו דואג שהכל יקרה בזמן ובדיוק כמו שתכננתם. |
| `faq.items.2.q` | כמה זמן לפני החתונה כדאי לפנות? |
| `faq.items.2.a` | כמה שיותר מוקדם. בדרך כלל אני מלווה זוגות בין חמישה לעשרה חודשים לפני האירוע. ככה יש זמן לבחור אולם וספקים בלי לחץ ולסגור את התנאים הכי טובים. |
| `faq.items.3.q` | איך אתה עוזר לנו לחסוך? |
| `faq.items.3.a` | אני יודע מה באמת צריך ומה מיותר, ואני יושב מול הספקים בשבילכם. אני לא אתן לכם לשלם כסף שאתם לא צריכים: משווים הצעות, מוותרים על מה שלא חשוב לכם ומשקיעים במה שכן. |
| `faq.items.4.q` | כמה עולה הפקה? |
| `faq.items.4.a` | המחיר תלוי בהיקף הליווי ובאופי האירוע. בפגישת ההיכרות נבין מה אתם צריכים ותקבלו הצעה ברורה, בלי אותיות קטנות. |
| `faq.items.5.q` | אתה מפיק גם אירועים מיוחדים? |
| `faq.items.5.a` | כן. חתונות על החוף, נישואים שניים, ערבי נושא ועוד. כל אירוע מקבל תוכנית משלו. |
| `contact.tag` | בואו נכיר |
| `contact.title` | ספרו לי<br>על החתונה שלכם. |
| `contact.text` | פגישת היכרות ראשונה, בלי התחייבות. ממלאים כמה פרטים, וההודעה נפתחת אצלכם בוואטסאפ, מוכנה לשליחה. |
| `contact.fields.names` | השמות שלכם |
| `contact.fields.namesHint` | למשל: נועה ואיתי… |
| `contact.fields.date` | תאריך משוער |
| `contact.fields.region` | אזור |
| `contact.fields.guests` | מספר מוזמנים |
| `contact.fields.budget` | תקציב משוער |
| `contact.fields.venue` | כבר סגרתם אולם? |
| `contact.fields.venueYes` | כן |
| `contact.fields.venueNo` | עדיין לא |
| `contact.fields.message` | משהו שחשוב לכם שאדע |
| `contact.fields.submit` | שליחה בוואטסאפ |
| `contact.fields.required` | נשמח לשמות שלכם כדי להתחיל |
| `contact.regions.1` | צפון |
| `contact.regions.2` | חיפה והקריות |
| `contact.regions.3` | שרון |
| `contact.regions.4` | מרכז |
| `contact.regions.5` | ירושלים |
| `contact.regions.6` | שפלה |
| `contact.regions.7` | דרום |
| `contact.regions.8` | אחר / חו״ל |
| `contact.budgets.1` | עד 100 אלף ₪ |
| `contact.budgets.2` | 100–200 אלף ₪ |
| `contact.budgets.3` | 200–300 אלף ₪ |
| `contact.budgets.4` | מעל 300 אלף ₪ |
| `contact.budgets.5` | עוד לא יודעים |
| `contact.waGreeting` | היי צח! הגענו מהאתר ונשמח להכיר. |
| `contact.direct` | או ישירות |
| `footer.tagline` | מפיק החתונות הכי שמח שתפגשו. |
| `footer.legal` | פרטיות ותנאי שימוש |
| `legal.title` | פרטיות ותנאי שימוש |
| `legal.sections.1.h` | מי אנחנו |
| `legal.sections.1.p` | האתר שייך לצח זריהן, מפיק חתונות (Tzach Zrihan Wedding Productions). ליצירת קשר: וואטסאפ 054-981-4740. |
| `legal.sections.2.h` | המידע שאתם שולחים |
| `legal.sections.2.p` | טופס ההיכרות לא שומר מידע באתר. הפרטים שתמלאו מרכיבים הודעה שנפתחת באפליקציית וואטסאפ שלכם, ואתם מחליטים אם לשלוח אותה. המידע משמש רק כדי לחזור אליכם. |
| `legal.sections.3.h` | עוגיות |
| `legal.sections.3.p` | האתר לא משתמש בעוגיות מעקב או פרסום. בדפדפן נשמרת רק הבחירה בשפה ובפתיח, כדי לא להציג אותו שוב. |
| `legal.sections.4.h` | תמונות וסרטונים |
| `legal.sections.4.p` | התמונות והסרטונים באתר צולמו באירועים שצח הפיק. הקרדיטים לצלמים מופיעים ליד כל חתונה. אין להעתיק אותם בלי רשות. |
| `legal.sections.5.h` | אחסון |
| `legal.sections.5.p` | האתר מאוחסן אצל Vercel Inc. הגופנים נטענים מ-Google Fonts. |

## Anglais (en)

| Clé | Texte |
| --- | --- |
| `meta.title` | Tzach Zrihan \| Wedding Planner & Producer in Israel |
| `meta.description` | Tzach Zrihan is an independent wedding producer in Israel. He plans with couples for months, negotiates with venues and vendors so you never overpay, and runs the wedding on the day. |
| `meta.legalTitle` | Privacy & terms \| Tzach Zrihan |
| `nav.story` | About |
| `nav.services` | Services |
| `nav.weddings` | Weddings |
| `nav.testimonials` | Reviews |
| `nav.faq` | FAQ |
| `nav.contact` | Let’s meet |
| `brand.name` | Tzach Zrihan |
| `brand.sub` | Wedding Productions |
| `intro.line` | Tzach Zrihan · Wedding Productions |
| `hero.tag` | Tzach Zrihan · Wedding Planner in Israel |
| `hero.title` | The wedding you always dreamed of,<br>without the stress or surprises. |
| `hero.cta` | Let’s meet |
| `manifesto.tag` | Just engaged? |
| `manifesto.title` | The excitement builds.<br>And everyone has advice. |
| `manifesto.text` | Order and organisation, real savings and peace of mind, with a lot of love and genuine friendship between me and my couples. That is how you get to the wedding you always wanted: no compromises, steady steps, no surprises. |
| `manifesto.link` | My story |
| `promises.tag` | Three promises |
| `promises.items.1.title` | Precision |
| `promises.items.1.text` | High-precision production. Every vendor, every timing, every small detail is planned ahead. |
| `promises.items.2.title` | Savings |
| `promises.items.2.text` | I won’t let you pay money you don’t need to. I sit across from the vendors for you. |
| `promises.items.3.title` | Peace of mind |
| `promises.items.3.text` | On the day itself I run the event. All you have to do is enjoy your wedding. |
| `about.tag` | About |
| `about.title` | The happiest wedding producer<br>you will ever meet. |
| `about.paras.1` | I’m Tzach. I walk alongside couples from the engagement to the last dance: sometimes five months, sometimes ten. Over that time we build the wedding together, one step at a time, without the pressure. |
| `about.paras.2` | I deal with the venues and vendors, compare quotes and ask the questions that aren’t always comfortable to ask. And on the wedding day I’m there from the first minute, from the chuppah briefing to the things you brought from home. |
| `about.definitionTitle` | What is an independent wedding producer? |
| `about.definition` | An independent wedding producer (in Hebrew, mafik chatunot chitzoni) is a professional who does not work for the venue. They work only for the couple: choosing the venue and vendors, negotiating prices, building the budget and the evening’s schedule, and running the wedding on the day. |
| `about.quote` | Being an independent producer means noticing the details you would never have thought of. |
| `about.sign` | Tzach Zrihan |
| `about.videoLabel` | Just engaged? Tzach explains how it works (in Hebrew) |
| `services.tag` | Services |
| `services.title` | What I do<br>for you. |
| `services.items.1.title` | Full wedding production |
| `services.items.1.text` | From A to Z across the months of preparation, with a single person to call for every question. |
| `services.items.2.title` | Venue & vendors |
| `services.items.2.text` | Finding the right place and the right vendors, negotiating, and saving where it counts. |
| `services.items.3.title` | Planning & budget |
| `services.items.3.text` | The evening’s timeline, the menu (a non-stop restaurant-style menu, for instance) and a clear plan for every stage. |
| `services.items.4.title` | Chuppah briefing |
| `services.items.4.text` | A calm rehearsal of the ceremony, so you walk to the chuppah relaxed and knowing exactly what happens. |
| `services.items.5.title` | Running the day |
| `services.items.5.text` | Vendors, timings, guests, and someone who takes care of the things you brought from home. |
| `services.items.6.title` | Special celebrations |
| `services.items.6.text` | Beach weddings, second weddings, a ‘The 90’s are back’ night. Every idea gets its own production. |
| `process.tag` | How it works |
| `process.title` | Four steps,<br>no surprises. |
| `process.steps.1.title` | First meeting |
| `process.steps.1.text` | We talk about the dream, the budget and what really matters to you. |
| `process.steps.2.title` | Venue & vendors |
| `process.steps.2.text` | We choose together, and I negotiate so you don’t spend a shekel more than needed. |
| `process.steps.3.title` | The planning months |
| `process.steps.3.text` | Close follow-up: timeline, menu, the evening’s programme and the chuppah briefing. |
| `process.steps.4.title` | The big day |
| `process.steps.4.text` | I run the event from start to finish. You dance. |
| `details.title` | Noticing the details<br>you would never think of. |
| `details.text` | But who will look after the things we brought from home? Me, of course. |
| `weddings.tag` | Weddings |
| `weddings.title` | Every wedding,<br>a different story. |
| `weddings.couples.sivan-daniel.names` | Sivan & Daniel |
| `weddings.couples.sivan-daniel.place` | Couple session in the woods |
| `weddings.couples.sivan-daniel.story` | A day that began in golden light between the trees and ended on a full dance floor. |
| `weddings.couples.yuval-idan.names` | Yuval & Idan |
| `weddings.couples.yuval-idan.place` | Kav HaMaim |
| `weddings.couples.yuval-idan.story` | I walked with Yuval and Idan for five months, and their wedding was stunning. |
| `weddings.couples.limor-oded.names` | Limor & Oded |
| `weddings.couples.limor-oded.place` | Poleg Beach |
| `weddings.couples.limor-oded.story` | A second wedding after 13 years together, on the beach: personal branding, an open meat buffet and the most moving, joyful chuppah. |
| `weddings.couples.digmi.names` | Mr & Mrs Digmi |
| `weddings.couples.digmi.place` | The cypress alley |
| `weddings.couples.digmi.story` | A white wedding, clean and precise, between the cypress trees. |
| `weddings.couples.ofir-or.names` | Ofir & Or |
| `weddings.couples.ofir-or.place` | The Wedding Day |
| `weddings.couples.ofir-or.story` | Getting ready at home, friends by the pool, and the first look on the lawn. |
| `weddings.couples.shachar-eyal.names` | Shachar & Eyal |
| `weddings.couples.shachar-eyal.place` | Right before the entrance |
| `weddings.couples.shachar-eyal.story` | Champagne, laughter and a tower of glasses. Thank you for the privilege. |
| `months.tag` | In numbers |
| `months.title` | A production is a journey,<br>not one evening. |
| `months.unit` | months |
| `months.items.eden-tevel.names` | Eden & Tevel |
| `months.items.eden-tevel.quote` | After ten months, seeing that everything was exactly as we planned. |
| `months.items.shir-tal.names` | Shir & Tal |
| `months.items.shir-tal.quote` | Thank you for the privilege of producing your wedding over eight months. |
| `months.items.yuval-idan.names` | Yuval & Idan |
| `months.items.yuval-idan.quote` | I walked with them for five months, and their wedding was stunning. |
| `months.weddings` | weddings produced |
| `months.savings` | average saving per couple |
| `testimonials.tag` | Reviews |
| `testimonials.title` | What couples say. |
| `testimonials.lian.names` | Lian & Arnold |
| `testimonials.lian.caption` | I invited Lian and Arnold to talk about their experience. Part 1: saving money. (In Hebrew) |
| `testimonials.more` | More reviews in the ‘Reviews’ highlight on Instagram |
| `bts.tag` | Behind the scenes |
| `bts.title` | Your parents and I<br>are going to be friends. |
| `bts.text` | A lot of humour, a lot of love, and plenty of small details. This is what it looks like from the inside. |
| `bts.items.parents` | Your parents and me |
| `bts.items.briefing` | Chuppah briefing |
| `bts.items.details` | The small details |
| `bts.items.order` | Order and organisation |
| `faq.tag` | FAQ |
| `faq.title` | What everyone<br>asks me. |
| `faq.items.1.q` | Why hire an independent producer if the venue has an event manager? |
| `faq.items.1.a` | The venue’s event manager works for the venue. An independent producer works only for you: he knows the vendors, compares quotes, negotiates and protects your budget, and on the day makes sure everything happens on time and exactly as planned. |
| `faq.items.2.q` | How long before the wedding should we get in touch? |
| `faq.items.2.a` | As early as you can. I usually accompany couples for five to ten months before the wedding. That leaves time to choose the venue and vendors calmly and to secure the best terms. |
| `faq.items.3.q` | How do you help us save money? |
| `faq.items.3.a` | I know what you really need and what you don’t, and I sit across from the vendors for you. I won’t let you pay for things you don’t need: we compare offers, drop what doesn’t matter to you and invest in what does. |
| `faq.items.4.q` | How much does it cost? |
| `faq.items.4.a` | It depends on the scope of the planning and the kind of event. At our first meeting we work out what you need, and you get a clear proposal with no small print. |
| `faq.items.5.q` | Can you plan a wedding in Israel if we live abroad? |
| `faq.items.5.a` | Yes. Much of the work happens over WhatsApp and video calls, and I handle the venue visits and vendor meetings on the ground. You arrive for a wedding that is ready. |
| `contact.tag` | Let’s meet |
| `contact.title` | Tell me<br>about your wedding. |
| `contact.text` | A first meeting, with no commitment. Fill in a few details and the message opens in your WhatsApp, ready to send. |
| `contact.fields.names` | Your names |
| `contact.fields.namesHint` | e.g. Noa & Itay… |
| `contact.fields.date` | Approximate date |
| `contact.fields.region` | Region |
| `contact.fields.guests` | Number of guests |
| `contact.fields.budget` | Approximate budget |
| `contact.fields.venue` | Have you booked a venue? |
| `contact.fields.venueYes` | Yes |
| `contact.fields.venueNo` | Not yet |
| `contact.fields.message` | Anything you’d like me to know |
| `contact.fields.submit` | Send on WhatsApp |
| `contact.fields.required` | Your names, so we can get started |
| `contact.regions.1` | North |
| `contact.regions.2` | Haifa area |
| `contact.regions.3` | Sharon |
| `contact.regions.4` | Center / Tel Aviv |
| `contact.regions.5` | Jerusalem |
| `contact.regions.6` | Shfela |
| `contact.regions.7` | South |
| `contact.regions.8` | Other / abroad |
| `contact.budgets.1` | Up to ₪100k |
| `contact.budgets.2` | ₪100k–200k |
| `contact.budgets.3` | ₪200k–300k |
| `contact.budgets.4` | Over ₪300k |
| `contact.budgets.5` | Not sure yet |
| `contact.waGreeting` | Hi Tzach! We found you through your website and would love to meet. |
| `contact.direct` | Or directly |
| `footer.tagline` | The happiest wedding producer you will ever meet. |
| `footer.legal` | Privacy & terms |
| `legal.title` | Privacy & terms |
| `legal.sections.1.h` | Who we are |
| `legal.sections.1.p` | This website belongs to Tzach Zrihan, wedding producer (Tzach Zrihan Wedding Productions). Contact: WhatsApp +972 54-981-4740. |
| `legal.sections.2.h` | What you send us |
| `legal.sections.2.p` | The contact form does not store anything on this website. The details you enter build a message that opens in your own WhatsApp app, and you decide whether to send it. It is used only to get back to you. |
| `legal.sections.3.h` | Cookies |
| `legal.sections.3.p` | This website uses no tracking or advertising cookies. Your browser only remembers your language choice and whether you have seen the intro. |
| `legal.sections.4.h` | Photos and videos |
| `legal.sections.4.p` | The photos and videos come from weddings produced by Tzach. Photographers are credited next to each wedding. Please do not reuse them without permission. |
| `legal.sections.5.h` | Hosting |
| `legal.sections.5.p` | The website is hosted by Vercel Inc. Fonts are loaded from Google Fonts. |

## Français (fr)

| Clé | Texte |
| --- | --- |
| `meta.title` | Tzach Zrihan \| Organisateur de mariage en Israël |
| `meta.description` | Tzach Zrihan est organisateur de mariage indépendant en Israël. Il accompagne les couples pendant des mois, négocie avec la salle et les prestataires pour que vous ne payiez pas l’inutile, et gère le jour J. |
| `meta.legalTitle` | Mentions légales et confidentialité \| Tzach Zrihan |
| `nav.story` | Mon histoire |
| `nav.services` | Services |
| `nav.weddings` | Mariages |
| `nav.testimonials` | Témoignages |
| `nav.faq` | FAQ |
| `nav.contact` | Faisons connaissance |
| `brand.name` | Tzach Zrihan |
| `brand.sub` | Wedding Productions |
| `intro.line` | Tzach Zrihan · Wedding Productions |
| `hero.tag` | Tzach Zrihan · Organisateur de mariage en Israël |
| `hero.title` | Le mariage dont vous avez toujours rêvé,<br>sans stress ni mauvaise surprise. |
| `hero.cta` | Faisons connaissance |
| `manifesto.tag` | Vous êtes fiancés ? |
| `manifesto.title` | L’émotion monte.<br>Et chacun vous dit autre chose. |
| `manifesto.text` | De l’ordre et de l’organisation, des économies et l’esprit tranquille, avec beaucoup d’amour et une vraie amitié entre les couples et moi. C’est comme ça qu’on arrive au mariage dont vous avez toujours rêvé : sans compromis, par étapes sûres, sans mauvaise surprise. |
| `manifesto.link` | Mon histoire |
| `promises.tag` | Trois promesses |
| `promises.items.1.title` | Précision |
| `promises.items.1.text` | Une production d’une grande précision. Chaque prestataire, chaque horaire, chaque petit détail est prévu à l’avance. |
| `promises.items.2.title` | Économies |
| `promises.items.2.text` | Je ne vous laisserai pas payer ce dont vous n’avez pas besoin. Je négocie face aux prestataires à votre place. |
| `promises.items.3.title` | Sérénité |
| `promises.items.3.text` | Le jour J, c’est moi qui gère l’événement. Vous, vous profitez de votre mariage. |
| `about.tag` | Mon histoire |
| `about.title` | L’organisateur de mariage<br>le plus joyeux que vous rencontrerez. |
| `about.paras.1` | Je m’appelle Tzach. J’accompagne les couples des fiançailles jusqu’à la dernière danse : parfois cinq mois, parfois dix. Pendant ce temps, on construit le mariage ensemble, étape par étape, sans pression. |
| `about.paras.2` | Je m’occupe des salles et des prestataires, je compare les devis et je pose les questions qu’on n’ose pas toujours poser. Et le jour du mariage, je suis là dès la première minute, du briefing de la houppa aux affaires que vous avez apportées de la maison. |
| `about.definitionTitle` | Qu’est-ce qu’un organisateur de mariage indépendant ? |
| `about.definition` | En Israël, le « mafik chatounot chitsoni » est un organisateur de mariage indépendant de la salle. Il travaille uniquement pour le couple : il aide à choisir la salle et les prestataires, négocie les prix, construit le budget et le déroulé de la soirée, puis dirige le mariage le jour J. |
| `about.quote` | Le rôle d’un organisateur indépendant, c’est de penser aux détails auxquels vous n’auriez jamais pensé. |
| `about.sign` | Tzach Zrihan |
| `about.videoLabel` | Vous êtes fiancés ? Tzach explique comment ça se passe (en hébreu) |
| `services.tag` | Services |
| `services.title` | Ce que je fais<br>pour vous. |
| `services.items.1.title` | Organisation complète |
| `services.items.1.text` | De A à Z pendant les mois de préparation, avec un seul interlocuteur pour toutes vos questions. |
| `services.items.2.title` | Salle et prestataires |
| `services.items.2.text` | Trouver le bon lieu et les bons prestataires, négocier, et économiser là où ça compte. |
| `services.items.3.title` | Planning et budget |
| `services.items.3.text` | Le déroulé de la soirée, le menu (par exemple un menu restaurant sans temps morts) et un plan clair pour chaque étape. |
| `services.items.4.title` | Briefing de la houppa |
| `services.items.4.text` | Une répétition calme de la cérémonie, pour arriver sous la houppa détendus et sûrs de chaque moment. |
| `services.items.5.title` | Gestion du jour J |
| `services.items.5.text` | Prestataires, horaires, invités, et quelqu’un qui veille sur les affaires que vous avez apportées de la maison. |
| `services.items.6.title` | Mariages à part |
| `services.items.6.text` | Mariage sur la plage, remariage, soirée « The 90’s are back ». Chaque idée a droit à sa propre production. |
| `process.tag` | Comment ça marche |
| `process.title` | Quatre étapes,<br>zéro mauvaise surprise. |
| `process.steps.1.title` | La rencontre |
| `process.steps.1.text` | On parle du rêve, du budget et de ce qui compte vraiment pour vous. |
| `process.steps.2.title` | Salle et prestataires |
| `process.steps.2.text` | On choisit ensemble, et je négocie pour que vous ne dépensiez pas un shekel de trop. |
| `process.steps.3.title` | Les mois de préparation |
| `process.steps.3.text` | Un suivi rapproché : planning, menu, déroulé de la soirée et briefing de la houppa. |
| `process.steps.4.title` | Le grand jour |
| `process.steps.4.text` | Je dirige l’événement du début à la fin. Vous, vous dansez. |
| `details.title` | Voir les détails<br>auxquels vous n’auriez jamais pensé. |
| `details.text` | Mais qui s’occupera des affaires qu’on a apportées de la maison ? Moi, évidemment. |
| `weddings.tag` | Mariages |
| `weddings.title` | Chaque mariage,<br>une autre histoire. |
| `weddings.couples.sivan-daniel.names` | Sivan & Daniel |
| `weddings.couples.sivan-daniel.place` | Séance couple en forêt |
| `weddings.couples.sivan-daniel.story` | Une journée commencée dans la lumière dorée des arbres, terminée sur une piste de danse pleine. |
| `weddings.couples.yuval-idan.names` | Yuval & Idan |
| `weddings.couples.yuval-idan.place` | Kav HaMaim |
| `weddings.couples.yuval-idan.story` | J’ai accompagné Yuval et Idan pendant cinq mois, et leur mariage était magnifique. |
| `weddings.couples.limor-oded.names` | Limor & Oded |
| `weddings.couples.limor-oded.place` | Plage de Poleg |
| `weddings.couples.limor-oded.story` | Un second mariage après 13 ans de vie commune, sur la plage : branding personnalisé, buffet de viandes à volonté et une houppa aussi émouvante que joyeuse. |
| `weddings.couples.digmi.names` | Mr & Mrs Digmi |
| `weddings.couples.digmi.place` | L’allée de cyprès |
| `weddings.couples.digmi.story` | Un mariage blanc, épuré et précis, entre les cyprès. |
| `weddings.couples.ofir-or.names` | Ofir & Or |
| `weddings.couples.ofir-or.place` | The Wedding Day |
| `weddings.couples.ofir-or.story` | Les préparatifs à la maison, les amis au bord de la piscine, et le premier regard sur la pelouse. |
| `weddings.couples.shachar-eyal.names` | Shachar & Eyal |
| `weddings.couples.shachar-eyal.place` | Juste avant l’entrée |
| `weddings.couples.shachar-eyal.story` | Champagne, fous rires et pyramide de coupes. Merci pour ce privilège. |
| `months.tag` | En chiffres |
| `months.title` | Un mariage se prépare<br>sur des mois, pas en une soirée. |
| `months.unit` | mois |
| `months.items.eden-tevel.names` | Eden & Tevel |
| `months.items.eden-tevel.quote` | Après dix mois, voir que tout était exactement comme prévu. |
| `months.items.shir-tal.names` | Shir & Tal |
| `months.items.shir-tal.quote` | Merci pour le privilège de produire votre mariage pendant huit mois. |
| `months.items.yuval-idan.names` | Yuval & Idan |
| `months.items.yuval-idan.quote` | Je les ai accompagnés cinq mois, et leur mariage était magnifique. |
| `months.weddings` | mariages organisés |
| `months.savings` | d’économies en moyenne par couple |
| `testimonials.tag` | Témoignages |
| `testimonials.title` | Ce que racontent les couples. |
| `testimonials.lian.names` | Lian & Arnold |
| `testimonials.lian.caption` | J’ai invité Lian et Arnold à raconter leur expérience. Partie 1 : les économies. (En hébreu) |
| `testimonials.more` | D’autres témoignages dans la story à la une « המלצות » sur Instagram |
| `bts.tag` | Dans les coulisses |
| `bts.title` | Vos parents et moi,<br>on va devenir amis. |
| `bts.text` | Beaucoup d’humour, beaucoup d’amour, et une foule de petits détails. Voilà à quoi ça ressemble de l’intérieur. |
| `bts.items.parents` | Vos parents et moi |
| `bts.items.briefing` | Briefing de la houppa |
| `bts.items.details` | Les petits détails |
| `bts.items.order` | Ordre et organisation |
| `faq.tag` | FAQ |
| `faq.title` | Ce que tout le monde<br>me demande. |
| `faq.items.1.q` | Pourquoi un organisateur indépendant si la salle a déjà un responsable ? |
| `faq.items.1.a` | Le responsable de la salle travaille pour la salle. Un organisateur indépendant travaille uniquement pour vous : il connaît les prestataires, compare les devis, négocie et protège votre budget, puis veille le jour J à ce que tout se passe à l’heure et comme prévu. |
| `faq.items.2.q` | Combien de temps avant le mariage faut-il vous contacter ? |
| `faq.items.2.a` | Le plus tôt possible. J’accompagne en général les couples de cinq à dix mois avant le mariage. Cela laisse le temps de choisir la salle et les prestataires sereinement, et d’obtenir les meilleures conditions. |
| `faq.items.3.q` | Comment nous faites-vous économiser ? |
| `faq.items.3.a` | Je sais ce dont vous avez vraiment besoin et ce qui est superflu, et je négocie face aux prestataires à votre place. Je ne vous laisserai pas payer l’inutile : on compare les offres, on renonce à ce qui ne compte pas pour vous et on investit dans ce qui compte. |
| `faq.items.4.q` | Combien coûte votre accompagnement ? |
| `faq.items.4.a` | Cela dépend de l’étendue de l’accompagnement et du type d’événement. Lors du premier rendez-vous, on définit vos besoins et vous recevez une proposition claire, sans petites lignes. |
| `faq.items.5.q` | Peut-on organiser un mariage en Israël en vivant en France ? |
| `faq.items.5.a` | Oui. Une grande partie du travail se fait sur WhatsApp et en visio, et je m’occupe sur place des visites de salles et des rendez-vous avec les prestataires. Vous arrivez pour un mariage prêt. |
| `contact.tag` | Faisons connaissance |
| `contact.title` | Parlez-moi<br>de votre mariage. |
| `contact.text` | Un premier rendez-vous, sans engagement. Remplissez quelques champs : le message s’ouvre dans votre WhatsApp, prêt à être envoyé. |
| `contact.fields.names` | Vos prénoms |
| `contact.fields.namesHint` | ex. Noa & Itay… |
| `contact.fields.date` | Date approximative |
| `contact.fields.region` | Région |
| `contact.fields.guests` | Nombre d’invités |
| `contact.fields.budget` | Budget indicatif |
| `contact.fields.venue` | Salle déjà réservée ? |
| `contact.fields.venueYes` | Oui |
| `contact.fields.venueNo` | Pas encore |
| `contact.fields.message` | Ce que vous aimeriez que je sache |
| `contact.fields.submit` | Envoyer sur WhatsApp |
| `contact.fields.required` | Vos prénoms, pour commencer |
| `contact.regions.1` | Nord |
| `contact.regions.2` | Haïfa et environs |
| `contact.regions.3` | Sharon |
| `contact.regions.4` | Centre / Tel-Aviv |
| `contact.regions.5` | Jérusalem |
| `contact.regions.6` | Shfela |
| `contact.regions.7` | Sud |
| `contact.regions.8` | Autre / étranger |
| `contact.budgets.1` | Jusqu’à 100 000 ₪ |
| `contact.budgets.2` | 100 000 – 200 000 ₪ |
| `contact.budgets.3` | 200 000 – 300 000 ₪ |
| `contact.budgets.4` | Plus de 300 000 ₪ |
| `contact.budgets.5` | Pas encore défini |
| `contact.waGreeting` | Bonjour Tzach ! Nous avons trouvé votre site et aimerions faire connaissance. |
| `contact.direct` | Ou directement |
| `footer.tagline` | L’organisateur de mariage le plus joyeux que vous rencontrerez. |
| `footer.legal` | Mentions légales |
| `legal.title` | Mentions légales et confidentialité |
| `legal.sections.1.h` | Éditeur |
| `legal.sections.1.p` | Ce site appartient à Tzach Zrihan, organisateur de mariage (Tzach Zrihan Wedding Productions). Contact : WhatsApp +972 54-981-4740. |
| `legal.sections.2.h` | Vos informations |
| `legal.sections.2.p` | Le formulaire n’enregistre rien sur ce site. Les informations saisies composent un message qui s’ouvre dans votre propre application WhatsApp, et c’est vous qui décidez de l’envoyer. Elles servent uniquement à vous répondre. |
| `legal.sections.3.h` | Cookies |
| `legal.sections.3.p` | Ce site n’utilise aucun cookie de suivi ni de publicité. Votre navigateur garde seulement en mémoire la langue choisie et le fait d’avoir vu l’introduction. |
| `legal.sections.4.h` | Photos et vidéos |
| `legal.sections.4.p` | Les photos et vidéos proviennent de mariages organisés par Tzach. Les photographes sont crédités à côté de chaque mariage. Merci de ne pas les réutiliser sans autorisation. |
| `legal.sections.5.h` | Hébergement |
| `legal.sections.5.p` | Le site est hébergé par Vercel Inc. Les polices sont chargées depuis Google Fonts. |

## Espagnol (es)

| Clé | Texte |
| --- | --- |
| `meta.title` | Tzach Zrihan \| Organizador de bodas en Israel |
| `meta.description` | Tzach Zrihan es organizador de bodas independiente en Israel. Acompaña a las parejas durante meses, negocia con el salón y los proveedores para que no paguen de más y dirige la boda el gran día. |
| `meta.legalTitle` | Aviso legal y privacidad \| Tzach Zrihan |
| `nav.story` | Mi historia |
| `nav.services` | Servicios |
| `nav.weddings` | Bodas |
| `nav.testimonials` | Testimonios |
| `nav.faq` | Preguntas |
| `nav.contact` | Conozcámonos |
| `brand.name` | Tzach Zrihan |
| `brand.sub` | Wedding Productions |
| `intro.line` | Tzach Zrihan · Wedding Productions |
| `hero.tag` | Tzach Zrihan · Organizador de bodas en Israel |
| `hero.title` | La boda que siempre soñaron,<br>sin estrés ni sorpresas. |
| `hero.cta` | Conozcámonos |
| `manifesto.tag` | ¿Se comprometieron? |
| `manifesto.title` | La emoción crece.<br>Y cada uno les dice algo distinto. |
| `manifesto.text` | Orden y organización, ahorro y tranquilidad, con mucho cariño y una amistad real entre las parejas y yo. Así se llega a la boda que siempre quisieron: sin renunciar a nada, con pasos seguros y sin sorpresas. |
| `manifesto.link` | Mi historia |
| `promises.tag` | Tres promesas |
| `promises.items.1.title` | Precisión |
| `promises.items.1.text` | Una producción de gran precisión. Cada proveedor, cada horario y cada pequeño detalle, planificados de antemano. |
| `promises.items.2.title` | Ahorro |
| `promises.items.2.text` | No voy a dejar que paguen lo que no necesitan. Yo me siento frente a los proveedores por ustedes. |
| `promises.items.3.title` | Tranquilidad |
| `promises.items.3.text` | El día de la boda yo dirijo el evento. Ustedes solo disfrutan. |
| `about.tag` | Mi historia |
| `about.title` | El organizador de bodas<br>más alegre que van a conocer. |
| `about.paras.1` | Soy Tzach. Acompaño a las parejas desde el compromiso hasta el último baile: a veces cinco meses, a veces diez. En ese tiempo construimos la boda juntos, paso a paso y sin presión. |
| `about.paras.2` | Me ocupo de los salones y los proveedores, comparo presupuestos y hago las preguntas que no siempre es cómodo hacer. Y el día de la boda estoy desde el primer minuto, desde el ensayo de la jupá hasta las cosas que trajeron de casa. |
| `about.definitionTitle` | ¿Qué es un organizador de bodas independiente? |
| `about.definition` | En Israel, el «mafik jatunot jitzoni» es un organizador de bodas independiente del salón. Trabaja solo para la pareja: ayuda a elegir salón y proveedores, negocia los precios, arma el presupuesto y el cronograma de la noche, y dirige la boda ese día. |
| `about.quote` | La idea de un organizador independiente es fijarse en los detalles en los que ustedes nunca habrían pensado. |
| `about.sign` | Tzach Zrihan |
| `about.videoLabel` | ¿Se comprometieron? Tzach explica cómo funciona (en hebreo) |
| `services.tag` | Servicios |
| `services.title` | Lo que hago<br>por ustedes. |
| `services.items.1.title` | Producción completa |
| `services.items.1.text` | De la A a la Z durante los meses de preparación, con una sola persona para todas sus preguntas. |
| `services.items.2.title` | Salón y proveedores |
| `services.items.2.text` | Encontrar el lugar y los proveedores adecuados, negociar y ahorrar donde importa. |
| `services.items.3.title` | Planificación y presupuesto |
| `services.items.3.text` | El cronograma de la noche, el menú (por ejemplo, un menú tipo restaurante sin pausas) y un plan claro para cada etapa. |
| `services.items.4.title` | Ensayo de la jupá |
| `services.items.4.text` | Un repaso tranquilo de la ceremonia, para llegar a la jupá relajados y sabiendo qué pasa en cada momento. |
| `services.items.5.title` | Dirección del gran día |
| `services.items.5.text` | Proveedores, horarios, invitados, y alguien que cuida las cosas que trajeron de casa. |
| `services.items.6.title` | Celebraciones especiales |
| `services.items.6.text` | Bodas en la playa, segundas bodas, una noche «The 90’s are back». Cada idea tiene su propia producción. |
| `process.tag` | Cómo funciona |
| `process.title` | Cuatro pasos,<br>sin sorpresas. |
| `process.steps.1.title` | Primera reunión |
| `process.steps.1.text` | Hablamos del sueño, del presupuesto y de lo que de verdad les importa. |
| `process.steps.2.title` | Salón y proveedores |
| `process.steps.2.text` | Elegimos juntos, y yo negocio para que no gasten ni un shekel de más. |
| `process.steps.3.title` | Los meses de preparación |
| `process.steps.3.text` | Seguimiento cercano: cronograma, menú, programa de la noche y ensayo de la jupá. |
| `process.steps.4.title` | El gran día |
| `process.steps.4.text` | Dirijo el evento de principio a fin. Ustedes bailan. |
| `details.title` | Fijarse en los detalles<br>en los que nunca pensarían. |
| `details.text` | Pero ¿quién se va a ocupar de las cosas que trajimos de casa? Yo, por supuesto. |
| `weddings.tag` | Bodas |
| `weddings.title` | Cada boda,<br>una historia distinta. |
| `weddings.couples.sivan-daniel.names` | Sivan & Daniel |
| `weddings.couples.sivan-daniel.place` | Sesión de pareja en el bosque |
| `weddings.couples.sivan-daniel.story` | Un día que empezó con la luz dorada entre los árboles y terminó con la pista llena. |
| `weddings.couples.yuval-idan.names` | Yuval & Idan |
| `weddings.couples.yuval-idan.place` | Kav HaMaim |
| `weddings.couples.yuval-idan.story` | Acompañé a Yuval e Idan durante cinco meses, y su boda fue preciosa. |
| `weddings.couples.limor-oded.names` | Limor & Oded |
| `weddings.couples.limor-oded.place` | Playa de Poleg |
| `weddings.couples.limor-oded.story` | Una segunda boda después de 13 años juntos, en la playa: imagen personalizada, bufé libre de carnes y la jupá más emotiva y alegre. |
| `weddings.couples.digmi.names` | Mr & Mrs Digmi |
| `weddings.couples.digmi.place` | El paseo de cipreses |
| `weddings.couples.digmi.story` | Una boda blanca, limpia y precisa, entre los cipreses. |
| `weddings.couples.ofir-or.names` | Ofir & Or |
| `weddings.couples.ofir-or.place` | The Wedding Day |
| `weddings.couples.ofir-or.story` | La preparación en casa, los amigos junto a la piscina y la primera mirada en el césped. |
| `weddings.couples.shachar-eyal.names` | Shachar & Eyal |
| `weddings.couples.shachar-eyal.place` | Justo antes de la entrada |
| `weddings.couples.shachar-eyal.story` | Champán, risas y una torre de copas. Gracias por el privilegio. |
| `months.tag` | En números |
| `months.title` | Una boda se prepara<br>en meses, no en una noche. |
| `months.unit` | meses |
| `months.items.eden-tevel.names` | Eden & Tevel |
| `months.items.eden-tevel.quote` | Después de diez meses, ver que todo salió exactamente como lo planeamos. |
| `months.items.shir-tal.names` | Shir & Tal |
| `months.items.shir-tal.quote` | Gracias por el privilegio de producir su boda durante ocho meses. |
| `months.items.yuval-idan.names` | Yuval & Idan |
| `months.items.yuval-idan.quote` | Los acompañé cinco meses, y su boda fue preciosa. |
| `months.weddings` | bodas producidas |
| `months.savings` | de ahorro medio por pareja |
| `testimonials.tag` | Testimonios |
| `testimonials.title` | Lo que cuentan las parejas. |
| `testimonials.lian.names` | Lian & Arnold |
| `testimonials.lian.caption` | Invité a Lian y Arnold a contar su experiencia. Parte 1: el ahorro. (En hebreo) |
| `testimonials.more` | Más testimonios en la historia destacada «המלצות» de Instagram |
| `bts.tag` | Detrás de escena |
| `bts.title` | Sus padres y yo<br>vamos a ser amigos. |
| `bts.text` | Mucho humor, mucho cariño y un montón de pequeños detalles. Así se ve desde adentro. |
| `bts.items.parents` | Sus padres y yo |
| `bts.items.briefing` | Ensayo de la jupá |
| `bts.items.details` | Los pequeños detalles |
| `bts.items.order` | Orden y organización |
| `faq.tag` | Preguntas |
| `faq.title` | Lo que todos<br>me preguntan. |
| `faq.items.1.q` | ¿Por qué un organizador independiente si el salón ya tiene coordinador? |
| `faq.items.1.a` | El coordinador del salón trabaja para el salón. Un organizador independiente trabaja solo para ustedes: conoce a los proveedores, compara presupuestos, negocia y cuida su presupuesto, y el día de la boda se asegura de que todo pase a tiempo y como lo planearon. |
| `faq.items.2.q` | ¿Con cuánta anticipación conviene contactarte? |
| `faq.items.2.a` | Lo antes posible. Normalmente acompaño a las parejas entre cinco y diez meses antes de la boda. Así hay tiempo para elegir salón y proveedores con calma y conseguir las mejores condiciones. |
| `faq.items.3.q` | ¿Cómo nos ayudas a ahorrar? |
| `faq.items.3.a` | Sé qué necesitan de verdad y qué sobra, y me siento frente a los proveedores por ustedes. No voy a dejar que paguen lo que no necesitan: comparamos ofertas, dejamos lo que no les importa e invertimos en lo que sí. |
| `faq.items.4.q` | ¿Cuánto cuesta? |
| `faq.items.4.a` | Depende del alcance del acompañamiento y del tipo de evento. En la primera reunión vemos qué necesitan y reciben una propuesta clara, sin letra pequeña. |
| `faq.items.5.q` | ¿Se puede organizar una boda en Israel viviendo en el exterior? |
| `faq.items.5.a` | Sí. Gran parte del trabajo se hace por WhatsApp y videollamada, y yo me encargo en persona de las visitas a salones y las reuniones con proveedores. Ustedes llegan a una boda lista. |
| `contact.tag` | Conozcámonos |
| `contact.title` | Cuéntenme<br>sobre su boda. |
| `contact.text` | Una primera reunión, sin compromiso. Completen algunos datos: el mensaje se abre en su WhatsApp, listo para enviar. |
| `contact.fields.names` | Sus nombres |
| `contact.fields.namesHint` | p. ej. Noa & Itay… |
| `contact.fields.date` | Fecha aproximada |
| `contact.fields.region` | Región |
| `contact.fields.guests` | Cantidad de invitados |
| `contact.fields.budget` | Presupuesto aproximado |
| `contact.fields.venue` | ¿Ya reservaron salón? |
| `contact.fields.venueYes` | Sí |
| `contact.fields.venueNo` | Todavía no |
| `contact.fields.message` | Algo que quieran que sepa |
| `contact.fields.submit` | Enviar por WhatsApp |
| `contact.fields.required` | Sus nombres, para empezar |
| `contact.regions.1` | Norte |
| `contact.regions.2` | Haifa y alrededores |
| `contact.regions.3` | Sharón |
| `contact.regions.4` | Centro / Tel Aviv |
| `contact.regions.5` | Jerusalén |
| `contact.regions.6` | Shfelá |
| `contact.regions.7` | Sur |
| `contact.regions.8` | Otro / exterior |
| `contact.budgets.1` | Hasta 100.000 ₪ |
| `contact.budgets.2` | 100.000 – 200.000 ₪ |
| `contact.budgets.3` | 200.000 – 300.000 ₪ |
| `contact.budgets.4` | Más de 300.000 ₪ |
| `contact.budgets.5` | Todavía no sabemos |
| `contact.waGreeting` | ¡Hola Tzach! Te encontramos por tu sitio web y nos encantaría conocerte. |
| `contact.direct` | O directamente |
| `footer.tagline` | El organizador de bodas más alegre que van a conocer. |
| `footer.legal` | Aviso legal |
| `legal.title` | Aviso legal y privacidad |
| `legal.sections.1.h` | Titular |
| `legal.sections.1.p` | Este sitio pertenece a Tzach Zrihan, organizador de bodas (Tzach Zrihan Wedding Productions). Contacto: WhatsApp +972 54-981-4740. |
| `legal.sections.2.h` | Sus datos |
| `legal.sections.2.p` | El formulario no guarda nada en este sitio. Los datos que completan forman un mensaje que se abre en su propia aplicación de WhatsApp, y ustedes deciden si lo envían. Solo se usan para responderles. |
| `legal.sections.3.h` | Cookies |
| `legal.sections.3.p` | Este sitio no usa cookies de seguimiento ni de publicidad. El navegador solo recuerda el idioma elegido y si ya vieron la introducción. |
| `legal.sections.4.h` | Fotos y videos |
| `legal.sections.4.p` | Las fotos y los videos provienen de bodas producidas por Tzach. Los fotógrafos aparecen junto a cada boda. Por favor, no los reutilicen sin permiso. |
| `legal.sections.5.h` | Alojamiento |
| `legal.sections.5.p` | El sitio está alojado por Vercel Inc. Las tipografías se cargan desde Google Fonts. |
