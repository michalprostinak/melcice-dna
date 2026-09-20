import { SITE } from './data/site';
import { sync } from './lib/store';
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
  heroLead: {
    sk: 'Študentská komunita, ktorá tvorí veci pomocou kódu, hardvéru a zvedavosti.',
    en: 'A student-built community creating things with code, hardware, and curiosity.',
  },
  explore: { sk: 'PRESKÚMAJ DNA', en: 'EXPLORE THE DNA' },
  codeStatement: {
    sk: 'Programovanie sa nielen učíme.\nPoužívame ho na tvorbu vecí.',
    en: "We don't just learn programming.\nWe use it to make things.",
  },
  pCreate: { sk: 'Tvoríme', en: 'Create' },
  pLearn: { sk: 'Učíme sa', en: 'Learn' },
  pShare: { sk: 'Zdieľame', en: 'Share' },
  pShip: { sk: 'Dokončujeme', en: 'Ship' },
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
  foundedWith: { sk: 'Založené v spolupráci so školou', en: 'Founded in cooperation with the school' },
  schoolNote: { sk: 'Základná škola s materskou školou', en: 'Primary school with kindergarten' },
  countdownLabel: { sk: 'Do začiatku', en: 'Starts in' },
  upcoming: { sk: 'NADCHÁDZAJÚCA UDALOSŤ', en: 'UPCOMING EVENT' },
  past: { sk: 'MINULÁ UDALOSŤ', en: 'PAST EVENT' },
  time: { sk: 'ČAS', en: 'TIME' },
  place: { sk: 'MIESTO', en: 'PLACE' },
  tba: { sk: 'bude upresnené', en: 'TBA' },
  openEvent: { sk: 'UDALOSŤ V KALENDÁRI', en: 'EVENT IN CALENDAR' },
  hcLead: {
    sk: 'Celosvetová nezisková komunita tínedžerov, ktorí sa učia programovať tvorbou skutočných projektov.',
    en: 'A worldwide nonprofit community of teenagers who learn to code by building real projects.',
  },
  hcClubsT: { sk: 'Kluby', en: 'Clubs' },
  hcClubs: {
    sk: 'Študenti po celom svete zakladajú kluby vo svojich školách a spolu tvoria.',
    en: 'Students around the world start clubs in their schools and build together.',
  },
  hcCommunityT: { sk: 'Komunita', en: 'Community' },
  hcCommunity: {
    sk: 'Online komunita mladých programátorov a tvorcov, kde si pomáhajú a ukazujú, čo vyrobili.',
    en: 'An online community of young programmers and makers who help each other and show what they built.',
  },
  hcEventsT: { sk: 'Podujatia', en: 'Events' },
  hcEvents: {
    sk: 'Hackathony a výzvy, na ktorých mladí ľudia za krátky čas postavia niečo vlastné.',
    en: 'Hackathons and challenges where young people build something of their own in a short time.',
  },
  hcMelcice: {
    sk: 'Hack Club Melčice je jedným z klubov v tejto sieti.',
    en: 'Hack Club Melčice is one of the clubs in this network.',
  },
  hcLink: { sk: 'NAVŠTÍV HACKCLUB.COM', en: 'VISIT HACKCLUB.COM' },
  gateTitle: { sk: 'Vyber si jazyk', en: 'Choose your language' },
  navHack: { sk: 'Hack Club', en: 'Hack Club' },
  days: { sk: 'd', en: 'd' },
};

function readSaved() {
  try {
    const v = localStorage.getItem('lang');
    return v === 'en' || v === 'sk' ? v : null;
  } catch (e) {
    return null;
  }
}

export function LangProvider({ children }) {
  const [saved] = useState(readSaved);
  const [lang, setLang] = useState(saved || 'sk');
  const [needsChoice, setNeedsChoice] = useState(!saved);

  useEffect(() => {
    // Returning visitors skip the language screen.
    if (saved) {
      sync.entered = true;
      document.documentElement.classList.add('entered');
    }
  }, [saved]);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = UI.title[lang];
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', UI.description[lang]);
  }, [lang]);

  const persist = (l) => {
    try {
      localStorage.setItem('lang', l);
    } catch (e) {
      /* ignore */
    }
  };
  const changeLang = useCallback((l) => {
    setLang(l);
    persist(l);
  }, []);
  const chooseLang = useCallback((l) => {
    setLang(l);
    persist(l);
    setNeedsChoice(false);
    sync.entered = true;
    document.documentElement.classList.add('entered');
  }, []);

  const t = useCallback((v) => (v && typeof v === 'object' ? v[lang] ?? v.sk : v), [lang]);
  const value = useMemo(
    () => ({ lang, setLang: changeLang, chooseLang, needsChoice, t }),
    [lang, changeLang, chooseLang, needsChoice, t]
  );
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
