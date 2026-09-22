import { SITE } from './data/site';
import { sync } from './lib/store';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const Ctx = createContext({ lang: 'sk', setLang: () => {}, t: (v) => v });
export const useLang = () => useContext(Ctx);

/* All fixed UI copy. Content copy (people, events…) lives in data/site.js. */
export const UI = {
  title: { sk: SITE.name, en: SITE.name },
  description: {
    sk: 'Hack Club Melčice: študentský technologický klub, ktorý tvorí weby, softvér, hardvér a všetko medzi tým. Melčice-Lieskové, Slovensko.',
    en: 'Hack Club Melčice: a student-led technology club building websites, software, hardware and everything in between. Melčice-Lieskové, Slovakia.',
  },
  skip: { sk: 'Preskočiť na obsah', en: 'Skip to content' },
  navHome: { sk: 'Domov', en: 'Home' },
  navPeople: { sk: 'Ľudia', en: 'People' },
  navEvents: { sk: 'Udalosti', en: 'Events' },
  navHack: { sk: 'Hack Club', en: 'Hack Club' },
  menu: { sk: 'MENU', en: 'MENU' },
  close: { sk: 'ZAVRIEŤ', en: 'CLOSE' },
  language: { sk: 'Jazyk', en: 'Language' },
  navPrimary: { sk: 'Hlavná navigácia', en: 'Main navigation' },
  navSections: { sk: 'Sekcie stránky', en: 'Page sections' },
  menuPanel: { sk: 'Menu so sekciami', en: 'Section menu' },
  backTop: { sk: 'späť hore', en: 'back to top' },

  // hero
  heroTag: { sk: 'Tvoríme veci.', en: 'We make things.' },
  heroLead: {
    sk: 'Študentský technologický klub, ktorý tvorí weby, softvér, hardvér a všetko medzi tým.',
    en: 'A student-led technology club building websites, software, hardware and everything in between.',
  },
  exploreClub: { sk: 'PRESKÚMAJ KLUB', en: 'EXPLORE THE CLUB' },
  nextMeeting: { sk: 'NAJBLIŽŠIE STRETNUTIE', en: 'NEXT MEETING' },

  // 01 origin
  originStatement: { sk: 'Malá škola.\nVeľa nápadov.', en: 'A small school.\nA lot of ideas.' },
  originText: {
    sk: 'Hack Club Melčice vznikol v {school} s jedným cieľom: dať študentom miesto, kde môžu spoločne tvoriť, experimentovať a učiť sa technológie.',
    en: 'Hack Club Melčice started at {school} with one goal: to give students a place to build, experiment and learn technology together.',
  },
  originPlace: { sk: 'Vytvorené v Melčiciach-Lieskovom, Slovensko.', en: 'Built in Melčice-Lieskové, Slovakia.' },

  // 02 build
  buildStatement: {
    sk: 'Od prvého riadku kódu\npo niečo, čo naozaj používaš.',
    en: 'From the first line of code\nto something you can actually use.',
  },
  buildText: {
    sk: 'Technológie skúmame cez projekty, experimenty a spoluprácu. Niekedy to funguje na prvý raz. Zvyčajne nie. Aj to patrí k procesu.',
    en: "We explore technology through projects, experiments and collaboration. Sometimes it works on the first try. Usually it doesn't. That's part of the process.",
  },

  // 03 how
  howStatement: { sk: 'Nemusíš písať\ndokonalý kód.', en: 'No perfect\ncode required.' },

  // 04 people
  peopleStatement: { sk: 'Rôzne záujmy.\nJedna komunita.', en: 'Different interests.\nOne community.' },
  peopleText: {
    sk: 'Sme študenti, tvorcovia, programátori a zvedaví ľudia, ktorí spolu na škole budujú niečo nové.',
    en: 'We are students, makers, programmers and curious people building something together at school.',
  },

  // 05 events
  countdownLabel: { sk: 'Do začiatku', en: 'Starts in' },
  upcoming: { sk: 'NADCHÁDZAJÚCA UDALOSŤ', en: 'UPCOMING' },
  past: { sk: 'MINULÁ UDALOSŤ', en: 'PAST EVENT' },
  arrival: { sk: 'PRÍCHOD', en: 'ARRIVAL' },
  start: { sk: 'ZAČIATOK', en: 'START' },
  place: { sk: 'MIESTO', en: 'PLACE' },
  tba: { sk: 'bude upresnené', en: 'TBA' },
  whatsHappening: { sk: 'ČO SA BUDE DIAŤ?', en: "WHAT'S HAPPENING?" },
  openEvent: { sk: 'UDALOSŤ V KALENDÁRI', en: 'EVENT IN CALENDAR' },

  // 06 hack club
  hcHeading: { sk: '06 / SÚČASŤ\nVÄČŠIEHO CELKU', en: '06 / PART OF\nSOMETHING BIGGER' },
  hcStatement: {
    sk: 'Komunita mladých ľudí, ktorí tvoria s technológiami.',
    en: 'A community of young people building with technology.',
  },
  hcText1: {
    sk: 'Hack Club spája študentmi vedené programátorské kluby, podujatia a tvorcov z celého sveta.',
    en: 'Hack Club connects student-led programming clubs, events and makers from around the world.',
  },
  hcText2: {
    sk: 'Cez komunitu sa študenti môžu učiť jeden od druhého, zdieľať projekty a nachádzať nové spôsoby, ako tvoriť.',
    en: 'Through the community, students can learn from each other, share projects and find new ways to build.',
  },
  hcTags: { sk: ['Vedené študentmi', 'Projekty', 'Komunita'], en: ['Student-led', 'Projects', 'Community'] },
  hcMelcice: { sk: 'Hack Club Melčice je súčasťou tejto komunity.', en: 'Hack Club Melčice is part of this community.' },
  hcLink: { sk: 'PRESKÚMAJ HACK CLUB', en: 'EXPLORE HACK CLUB' },

  // footer
  footerTitle: { sk: 'VYROBENÉ\nV MELČICIACH.', en: 'MADE IN\nMELČICE.' },
  footerText: {
    sk: 'Technologická komunita vedená študentmi na {school}.',
    en: 'A student-led technology community at {school}.',
  },
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
  const [lang, setLangState] = useState(() => readSaved() || 'sk');

  useEffect(() => {
    // No language screen: the page is ready to animate immediately.
    sync.entered = true;
    document.documentElement.classList.add('entered');
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = UI.title[lang];
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute('content', UI.description[lang]);
  }, [lang]);

  const setLang = useCallback((l) => {
    setLangState(l);
    try {
      localStorage.setItem('lang', l);
    } catch (e) {
      /* ignore */
    }
  }, []);

  const t = useCallback((v) => (v && typeof v === 'object' ? v[lang] ?? v.sk : v), [lang]);
  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}
