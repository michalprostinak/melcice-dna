/* Cheap sanity checks for the content in site.js. Runs in dev (console warnings) and in `npm test`. */
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const text = (v) => (typeof v === 'string' ? v.trim() : v && typeof v === 'object' && v.sk && v.en);

export function validateContent({ EVENTS = [], MEMBERS = [] }) {
  const problems = [];
  EVENTS.forEach((e) => {
    const id = e.id || '(bez id)';
    if (!DATE.test(e.date || '')) problems.push(`Udalosť ${id}: dátum musí byť YYYY-MM-DD`);
    if (e.time && !TIME.test(e.time)) problems.push(`Udalosť ${id}: čas musí byť HH:MM`);
    if (!text(e.title)) problems.push(`Udalosť ${id}: chýba názov (sk aj en)`);
    if (e.link && !/^https:\/\//.test(e.link)) problems.push(`Udalosť ${id}: odkaz musí začínať https://`);
  });
  MEMBERS.forEach((m) => {
    const id = m.id || '(bez id)';
    if (!text(m.name)) problems.push(`Člen ${id}: chýba meno`);
    if (!text(m.role)) problems.push(`Člen ${id}: chýba rola (sk aj en)`);
    (m.contacts || []).forEach((c) => {
      if (c.type === 'email' && !EMAIL.test(c.value)) problems.push(`Člen ${id}: neplatný e-mail ${c.value}`);
      if (c.type === 'github' && !/^https:\/\//.test(c.href || '')) problems.push(`Člen ${id}: GitHub potrebuje href s https://`);
    });
  });
  return problems;
}
