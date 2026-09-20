/* ==========================================================================
   HACK CLUB MELČICE — editable content
   Texts are { sk, en } pairs (Slovak is the default language).
   ========================================================================== */

export const SITE = {
  name: 'Hack Club Melčice',
  brand: 'HACK CLUB MELČICE', // logo text
  brandLines: ['HACK CLUB', 'MELČICE'], // hero headline lines
  domain: 'melciceclub.online',
  hackClubUrl: 'https://hackclub.com',
  githubUrl: 'https://github.com/michalprostinak',
};

/* The DNA: one node per section. `id` is the section's DOM id. */
export const NODES = [
  { id: 'top', num: '00', label: { sk: 'DOMOV', en: 'HOME' } },
  { id: 'code', num: '01', label: { sk: 'KÓD', en: 'CODE' } },
  { id: 'create', num: '02', label: { sk: 'TVORBA', en: 'CREATE' } },
  { id: 'learn', num: '03', label: { sk: 'UČENIE', en: 'LEARN' } },
  { id: 'share', num: '04', label: { sk: 'ZDIEĽANIE', en: 'SHARE' } },
  { id: 'ship', num: '05', label: { sk: 'VYDANIE', en: 'SHIP' } },
  { id: 'people', num: '06', label: { sk: 'ĽUDIA', en: 'PEOPLE' } },
  { id: 'origin', num: '07', label: { sk: 'MELČICE', en: 'MELČICE' } },
  { id: 'events', num: '08', label: { sk: 'UDALOSTI', en: 'EVENTS' } },
  { id: 'hackclub', num: '09', label: { sk: 'HACK CLUB', en: 'HACK CLUB' } },
];

/* CODE — technologies shown as genes. */
export const TECH = [
  { key: 'python', tag: 'PYTHON' },
  { key: 'html', tag: 'HTML' },
  { key: 'css', tag: 'CSS' },
  { key: 'js', tag: 'JS' },
  { key: 'csharp', tag: 'C#' },
  { key: 'git', tag: 'GIT' },
  { key: 'hardware', tag: 'HARDWARE' },
];

/* PEOPLE — add a member = add an object. `contacts` are optional. */
export const MEMBERS = [
  {
    id: 'prostinak',
    name: 'Michal Prostinák',
    role: { sk: 'Zakladateľ a líder', en: 'Founder & Leader' },
    contacts: [
      { type: 'email', value: 'leader@melciceclub.online' },
      { type: 'github', value: 'michalprostinak', href: 'https://github.com/michalprostinak' },
    ],
  },
  {
    id: 'janosik',
    name: 'Michal Jánošík',
    role: { sk: 'Riaditeľ 3D tlače a modelovania', en: 'Director of 3D Printing & Modeling' },
    contacts: [{ type: 'email', value: '3d@melciceclub.online' }],
  },
  {
    id: 'halackova',
    name: { sk: 'Pani učiteľka Haláčková', en: 'Ms. Haláčková' },
    role: { sk: 'Učiteľský dozor a ambasádorka klubu', en: 'Teacher supervisor & club ambassador' },
    contacts: [{ type: 'email', value: 'teacher@melciceclub.online' }],
  },
];

/* EVENTS — upcoming/past is computed from `date` + `time` (Europe/Bratislava). */
export const EVENTS = [
  {
    id: 'first-meeting',
    date: '2026-10-02',
    time: '13:20',
    title: { sk: 'PRVÉ STRETNUTIE', en: 'FIRST MEETING' },
    place: { sk: 'IT miestnosť', en: 'IT classroom' },
    note: { sk: 'Prvé stretnutie klubu.', en: 'The first meeting of the club.' },
    link: 'https://calendar.app.google/FeU3ACHTBuSBz9fa7',
  },
];

/* HACK CLUB — the ladder from local to global. */
export const NETWORK_STEPS = [
  { sk: 'MELČICE', en: 'MELČICE' },
  { sk: 'SLOVENSKO', en: 'SLOVAKIA' },
  { sk: 'EURÓPA', en: 'EUROPE' },
  { sk: 'SVET', en: 'WORLD' },
];
