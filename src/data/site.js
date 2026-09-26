/* ==========================================================================
   HACK CLUB MELČICE — editable content
   Texts are { sk, en } pairs (Slovak is the default language).
   ========================================================================== */

export const SITE = {
  name: 'Hack Club Melčice',
  brand: 'HACK CLUB MELČICE', // logo text
  heroLines: {
    sk: ['PREČO TO', 'NEPOSTAVIŤ?'],
    en: ['WHY NOT', 'BUILD IT?'],
  }, // hero headline, split across two lines
  domain: 'melciceclub.online',
  owner: 'Michal Prostinák',
  school: 'ZŠ s MŠ Jána Smreka Melčice-Lieskové',
};

/* The DNA: one node per section (order = order on the page). `id` is the section's DOM id. */
export const NODES = [
  { id: 'top', num: '00', label: { sk: 'DOMOV', en: 'HOME' } },
  { id: 'origin', num: '01', label: { sk: 'ODKIAĽ SME', en: 'WHERE WE’RE FROM' } },
  { id: 'about', num: '02', label: { sk: 'ČO ROBÍME', en: 'WHAT WE DO' } },
];

/* WHAT WE DO — three areas we work in. `items` are tags: plain strings (language-neutral,
   e.g. tech names) or { sk, en } pairs when the word itself needs translating. */
export const CATEGORIES = [
  {
    key: 'software',
    title: { sk: 'SOFTVÉR', en: 'SOFTWARE' },
    desc: {
      sk: 'Weby, aplikácie, nástroje a experimenty vytvorené kódom.',
      en: 'Websites, apps, tools, and experiments built with code.',
    },
    items: ['Python', 'JavaScript', 'HTML', 'CSS', 'C#'],
  },
  {
    key: 'hardware',
    title: { sk: 'HARDVÉR A 3D', en: 'HARDWARE & 3D' },
    desc: {
      sk: 'Fyzické projekty, 3D modely a technológie mimo obrazovky.',
      en: 'Physical projects, 3D models, and technology beyond the screen.',
    },
    items: [
      { sk: '3D tlač', en: '3D printing' },
      { sk: 'Modelovanie', en: 'Modeling' },
      { sk: 'Hardvér', en: 'Hardware' },
    ],
  },
  {
    key: 'experiments',
    title: { sk: 'EXPERIMENTY', en: 'EXPERIMENTS' },
    desc: {
      sk: 'Skúšame nové nápady, tvoríme veci, riešime problémy a učíme sa niečo neočakávané.',
      en: 'We try new ideas, build things, solve problems, and learn something unexpected.',
    },
    items: [
      { sk: 'Zvedavosť', en: 'Curiosity' },
      { sk: 'Spolupráca', en: 'Collaboration' },
      { sk: 'Učenie', en: 'Learning' },
    ],
  },
];

/* EVENTS — kept as the source of truth for the schedule page (schedule.html) and
   validated by the test suite; date/time is Europe/Bratislava. */
export const EVENTS = [
  {
    id: 'first-meeting',
    date: '2026-10-02',
    time: '13:30',
    title: { sk: 'PRVÉ STRETNUTIE', en: 'FIRST MEETING' },
    place: { sk: 'IT miestnosť', en: 'IT classroom' },
    note: { sk: 'Prvé stretnutie klubu.', en: 'The first meeting of the club.' },
    link: 'https://calendar.app.google/FeU3ACHTBuSBz9fa7',
  },
];
