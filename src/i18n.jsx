import { SITE } from './data/site';
import { sync } from './lib/store';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

const Ctx = createContext({ lang: 'sk', setLang: () => {}, t: (v) => v });
export const useLang = () => useContext(Ctx);

/* All fixed UI copy. Content copy (events…) lives in data/site.js. */
export const UI = {
  title: { sk: SITE.name, en: SITE.name },
  description: {
    sk: 'Hack Club Melčice: študentská komunita, ktorá tvorí veci pomocou kódu, hardvéru a zvedavosti. Melčice-Lieskové, Slovensko.',
    en: 'Hack Club Melčice: a student-built community creating things with code, hardware, and curiosity. Melčice-Lieskové, Slovakia.',
  },
  skip: { sk: 'Preskočiť na obsah', en: 'Skip to content' },
  navHome: { sk: 'Domov', en: 'Home' },
  navProjects: { sk: 'Projekty', en: 'Projects' },
  navSchedule: { sk: 'Rozvrh', en: 'Schedule' },
  language: { sk: 'Jazyk', en: 'Language' },
  navPrimary: { sk: 'Hlavná navigácia', en: 'Main navigation' },
  navSections: { sk: 'Sekcie stránky', en: 'Page sections' },
  navFooter: { sk: 'Navigácia v pätičke', en: 'Footer navigation' },
  backTop: { sk: 'späť hore', en: 'back to top' },
  heroLead: {
    sk: 'Študentská komunita, ktorá tvorí veci pomocou kódu, hardvéru a zvedavosti.',
    en: 'A student-built community creating things with code, hardware, and curiosity.',
  },
  codeStatement: {
    sk: 'Programovanie sa nielen učíme.\nPoužívame ho na tvorbu vecí.',
    en: "We don't just learn programming.\nWe use it to make things.",
  },
  originLead: { sk: 'Malá škola. Veľa nápadov.', en: 'A small school. Endless ideas.' },
  originBody: {
    sk: 'Hack Club Melčice vznikol na ZŠ s MŠ Jána Smreka Melčice-Lieskové z jednoduchého nápadu: vytvoriť miesto, kde môžu študenti tvoriť, experimentovať a skúšať veci, ktoré ich bavia. Od webov a softvéru cez hardvér až po 3D tlač a vlastné projekty. Nie preto, že musíme. Preto, že môžeme.',
    en: 'Hack Club Melčice started at ZŠ s MŠ Jána Smreka Melčice-Lieskové from a simple idea: build a place where students can create, experiment, and try things they enjoy. From websites and software to hardware, 3D printing, and projects of their own. Not because we have to. Because we can.',
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
