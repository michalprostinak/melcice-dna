/* ==========================================================================
   HACK CLUB MELČICE — editable content
   Texts are { sk, en } pairs (Slovak is the default language).
   ========================================================================== */

export const SITE = {
  name: 'Hack Club Melčice',
  brand: 'HACK CLUB MELČICE', // logo text
  brandLines: ['HACK CLUB', 'MELČICE'], // logo lines (unused directly; brand text is one line)
  heroLines: { sk: ['TVORÍME', 'VECI.'], en: ['WE MAKE', 'THINGS.'] }, // hero headline lines
  domain: 'melciceclub.online',
  hackClubUrl: 'https://hackclub.com',
  owner: 'Michal Prostinák',
  school: 'ZŠ s MŠ Jána Smreka Melčice-Lieskové',
  schoolShort: 'ZŠ s MŠ Jána Smreka',
};

/* One node of the DNA per section (order = order on the page). `id` = DOM id. */
export const NODES = [
  { id: 'top', num: '00', label: { sk: 'DOMOV', en: 'HOME' } },
  { id: 'origin', num: '01', label: { sk: 'ODKIAĽ SME', en: 'ORIGIN' } },
  { id: 'build', num: '02', label: { sk: 'ČO STAVIAME', en: 'WHAT WE BUILD' } },
  { id: 'how', num: '03', label: { sk: 'AKO PRACUJEME', en: 'HOW WE WORK' } },
  { id: 'people', num: '04', label: { sk: 'ĽUDIA', en: 'THE PEOPLE' } },
  { id: 'events', num: '05', label: { sk: 'NAJBLIŽŠIE', en: 'NEXT UP' } },
  { id: 'hackclub', num: '06', label: { sk: 'HACK CLUB', en: 'HACK CLUB' } },
];

/* 02 / WHAT WE BUILD */
export const BUILD_AREAS = [
  {
    id: 'software',
    title: { sk: 'SOFTVÉR', en: 'SOFTWARE' },
    text: {
      sk: 'Weby, aplikácie, nástroje a experimenty vytvorené kódom.',
      en: 'Websites, apps, tools and experiments built with code.',
    },
    tags: { sk: ['Python', 'JavaScript', 'HTML', 'CSS', 'C#'], en: ['Python', 'JavaScript', 'HTML', 'CSS', 'C#'] },
  },
  {
    id: 'hardware',
    title: { sk: 'HARDVÉR A 3D', en: 'HARDWARE & 3D' },
    text: {
      sk: 'Fyzické projekty, 3D modely a technológie mimo obrazovky.',
      en: 'Physical projects, 3D models and technology beyond the screen.',
    },
    tags: { sk: ['3D tlač', 'Modelovanie', 'Hardvér'], en: ['3D printing', 'Modeling', 'Hardware'] },
  },
  {
    id: 'experiments',
    title: { sk: 'EXPERIMENTY', en: 'EXPERIMENTS' },
    text: {
      sk: 'Skúšaj nové nápady, kaz veci, rieš problémy a nauč sa niečo neočakávané.',
      en: 'Try new ideas, break things, solve problems and learn something unexpected.',
    },
    tags: { sk: ['Zvedavosť', 'Spolupráca', 'Učenie'], en: ['Curiosity', 'Collaboration', 'Learning'] },
  },
];

/* 03 / HOW WE WORK */
export const STEPS = [
  {
    title: { sk: 'ZAČNI NIEČÍM', en: 'START SOMEWHERE' },
    text: {
      sk: 'Každý projekt začína nápadom, otázkou alebo náhodnou myšlienkou.',
      en: 'Every project begins with an idea, a question or a random thought.',
    },
  },
  {
    title: { sk: 'PRÍDI NA TO', en: 'FIGURE IT OUT' },
    text: {
      sk: 'Nauč sa, čo potrebuješ, pýtaj sa a skúšaj veci, ktoré si ešte nerobil.',
      en: "Learn what you need, ask questions and try things you haven't done before.",
    },
  },
  {
    title: { sk: 'STAVAJTE SPOLU', en: 'BUILD TOGETHER' },
    text: {
      sk: 'Zdieľajte nápady, kontrolujte kód a pomáhajte ostatným rásť.',
      en: 'Share ideas, review code and help other members grow.',
    },
  },
  {
    title: { sk: 'UKÁŽ, ČO SI VYROBIL', en: 'SHOW YOUR WORK' },
    text: {
      sk: 'Hotový projekt stojí za to zdieľať, nech je akokoľvek malý.',
      en: 'A finished project is something worth sharing, no matter how small.',
    },
  },
];

/* 04 / THE PEOPLE — add a member = add an object. `contacts` are optional. */
export const MEMBERS = [
  {
    id: 'prostinak',
    name: 'Michal Prostinák',
    role: { sk: 'Zakladateľ a líder', en: 'Founder & Leader' },
    text: {
      sk: 'Buduje klub, pracuje na softvéri a vytvára študentom príležitosti učiť sa technológie.',
      en: 'Building the club, working on software and creating opportunities for students to learn technology.',
    },
    contacts: [{ type: 'email', value: 'leader@melciceclub.online' }],
  },
  {
    id: 'janosik',
    name: 'Michal Jánošík',
    role: { sk: 'Riaditeľ 3D tlače a modelovania', en: 'Director of 3D Printing & Modeling' },
    text: {
      sk: 'Pracuje s 3D tlačou, modelovaním a fyzickými projektmi.',
      en: 'Working with 3D printing, modeling and physical projects.',
    },
    contacts: [{ type: 'email', value: '3d@melciceclub.online' }],
  },
  {
    id: 'halackova',
    name: { sk: 'Pani učiteľka Haláčková', en: 'Ms. Haláčková' },
    role: { sk: 'Učiteľský dozor a ambasádorka klubu', en: 'Teacher supervisor & club ambassador' },
    text: {
      sk: 'Podporuje klub a pomáha vytvárať bezpečný priestor, kde sa študenti môžu učiť a tvoriť.',
      en: 'Supporting the club and helping create a safe space for students to build and learn.',
    },
    contacts: [{ type: 'email', value: 'teacher@melciceclub.online' }],
  },
];

/* 05 / NEXT UP — upcoming/past is computed from `date` + `time` (Europe/Bratislava). */
export const EVENTS = [
  {
    id: 'first-meeting',
    date: '2026-10-02',
    time: '13:20', // arrival — countdown and calendar use this
    start: '13:30', // program start
    title: { sk: 'PRVÉ STRETNUTIE', en: 'FIRST MEETING' },
    place: { sk: 'IT miestnosť', en: 'IT classroom' },
    note: { sk: 'Začiatok Hack Clubu Melčice.', en: 'The beginning of Hack Club Melčice.' },
    agenda: [
      { sk: 'Zoznámiš sa s komunitou.', en: 'Meet the community.' },
      { sk: 'Zistíš, o čom Hack Club je.', en: 'Explore what Hack Club is about.' },
      { sk: 'Začneš stavať svoj prvý projekt.', en: 'Start building your first project.' },
    ],
    link: 'https://calendar.app.google/FeU3ACHTBuSBz9fa7',
  },
];
