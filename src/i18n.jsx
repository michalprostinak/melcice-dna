import { SITE } from './data/site';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const Ctx = createContext({ lang: 'sk', setLang: () => {}, t: (v) => v });
export const useLang = () => useContext(Ctx);

/* All fixed UI copy. Content copy (people, events…) lives in data/site.js. */
export const UI = {
  title: { sk: SITE.name, en: SITE.name },
  description: {
    sk: 'Hack Club Melčice: študentská komunita, ktorá tvorí veci pomocou kódu, hardvéru a zvedavosti. Melčice-Lieskové, Slovensko.',
    en: 'Hack Club Melčice: a student-built community creating things with code, hardware, and curiosity. Melčice-Lieskové, Slovakia.',
  },
  skip: { sk: 'Preskočiť na obsah', en: 'Skip to content' },
  navHome: { sk: 'Domov', en: 'Home' },
  navPeople: { sk: 'Ľudia', en: 'People' },
  navEvents: { sk: 'Udalosti', en: 'Events' },
  menu: { sk: 'MENU', en: 'MENU' },
  close: { sk: 'ZAVRIEŤ', en: 'CLOSE' },
  language: { sk: 'Jazyk', en: 'Language' },
  navPrimary: { sk: 'Hlavná navigácia', en: 'Main navigation' },
  navSections: { sk: 'Sekcie stránky', en: 'Page sections' },
  navFooter: { sk: 'Navigácia v pätičke', en: 'Footer navigation' },
  technologies: { sk: 'Technológie', en: 'Technologies' },
  menuPanel: { sk: 'Menu so sekciami', en: 'Section menu' },
  backTop: { sk: 'späť hore', en: 'back to top' },
  heroPlace: { sk: 'Melčice-Lieskové, Slovensko', en: 'Melčice-Lieskové, Slovakia' },
  heroLead: {
    sk: 'Študentská komunita, ktorá tvorí veci pomocou kódu, hardvéru a zvedavosti.',
    en: 'A student-built community creating things with code, hardware, and curiosity.',
  },
  explore: { sk: 'PRESKÚMAJ DNA', en: 'EXPLORE THE DNA' },
  scrollHint: { sk: 'Skroluj a vstúp do DNA', en: 'Scroll to enter the DNA' },
  dragHint: { sk: 'Ťahaj prstom na otočenie. Skroluj.', en: 'Drag to spin. Scroll to enter.' },
  madeInShort: { sk: 'Vyrobené v Melčiciach', en: 'Made in Melčice' },
  codeStatement: {
    sk: 'Programovanie sa nielen učíme.\nPoužívame ho na tvorbu vecí.',
    en: "We don't just learn programming.\nWe use it to make things.",
  },
  createLine: {
    sk: 'Nápady začínajú náčrtom, drôtom alebo prázdnym súborom.',
    en: 'Ideas start as a sketch, a wire, a blank file.',
  },
  learnLine: {
    sk: 'Nikto nezačína ako expert. Každý začína tým, že skúša.',
    en: 'Nobody starts as an expert. Everyone starts by trying.',
  },
  shareLine: {
    sk: 'Ukáž kód. Vysvetli ho. Pomôž ďalšiemu.',
    en: 'Show the code. Explain it. Help the next person.',
  },
  shipLine: {
    sk: 'Projekt sa počíta, až keď ho môže použiť niekto iný.',
    en: 'A project counts when someone else can use it.',
  },
  peopleTitle: { sk: 'ĽUDIA\nSÚ DNA.', en: 'THE PEOPLE\nARE THE DNA.' },
  country: { sk: 'SLOVENSKO', en: 'SLOVAKIA' },
  originLead: {
    sk: 'Technologická komunita vedená študentmi z malej slovenskej školy.',
    en: 'A student-led technology community from a small Slovak school.',
  },
  countdownLabel: { sk: 'Do začiatku', en: 'Starts in' },
  upcoming: { sk: 'NADCHÁDZAJÚCA UDALOSŤ', en: 'UPCOMING EVENT' },
  past: { sk: 'MINULÁ UDALOSŤ', en: 'PAST EVENT' },
  time: { sk: 'ČAS', en: 'TIME' },
  place: { sk: 'MIESTO', en: 'PLACE' },
  tba: { sk: 'bude upresnené', en: 'TBA' },
  openEvent: { sk: 'UDALOSŤ V KALENDÁRI', en: 'EVENT IN CALENDAR' },
  hackTitle: { sk: 'MIESTNE.\nPREPOJENÉ.', en: 'LOCAL.\nCONNECTED.' },
  hackLead: {
    sk: 'Hack Club Melčice je súčasťou Hack Clubu, celosvetovej komunity mladých ľudí, ktorí sa učia tvorbou.',
    en: 'Hack Club Melčice is part of Hack Club, a worldwide community of young people who learn by building.',
  },
  footerTag: { sk: 'Vyrobené v Melčiciach. Postavené študentmi.', en: 'Made in Melčice. Built by students.' },
  days: { sk: 'd', en: 'd' },
};

export function LangProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      const s = localStorage.getItem('lang');
      return s === 'en' || s === 'sk' ? s : 'sk';
    } catch (e) {
      return 'sk';
    }
  });
  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = UI.title[lang];
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', UI.description[lang]);
    try {
      localStorage.setItem('lang', lang);
    } catch (e) {
      /* ignore */
    }
  }, [lang]);
  const t = useCallback((v) => (v && typeof v === 'object' ? v[lang] ?? v.sk : v), [lang]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
