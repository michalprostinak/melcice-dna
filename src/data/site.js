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
  owner: 'Michal Prostinák',
  school: 'ZŠ s MŠ Jána Smreka Melčice-Lieskové',
};

/* The DNA: one node per section (order = order on the page). `id` is the section's DOM id. */
export const NODES = [
  { id: 'top', num: '00', label: { sk: 'DOMOV', en: 'HOME' } },
  { id: 'origin', num: '01', label: { sk: 'MELČICE', en: 'MELČICE' } },
  { id: 'about', num: '02', label: { sk: 'ČO ROBÍME', en: 'WHAT WE DO' } },
  { id: 'people', num: '03', label: { sk: 'ĽUDIA', en: 'PEOPLE' } },
  { id: 'events', num: '04', label: { sk: 'UDALOSTI', en: 'EVENTS' } },
  { id: 'hackclub', num: '05', label: { sk: 'HACK CLUB', en: 'HACK CLUB' } },
];

/* WHAT WE DO — technologies shown as genes. */
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
