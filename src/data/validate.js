/* Cheap sanity checks for the content in site.js. Runs in dev (console warnings) and in `npm test`. */
const DATE = /^\d{4}-\d{2}-\d{2}$/;
const TIME = /^([01]\d|2[0-3]):[0-5]\d$/;
const text = (v) => (typeof v === 'string' ? v.trim() : v && typeof v === 'object' && v.sk && v.en);

export function validateContent({ EVENTS = [] }) {
  const problems = [];
  EVENTS.forEach((e) => {
    const id = e.id || '(bez id)';
    if (!DATE.test(e.date || '')) problems.push(`Udalosť ${id}: dátum musí byť YYYY-MM-DD`);
    if (e.time && !TIME.test(e.time)) problems.push(`Udalosť ${id}: čas musí byť HH:MM`);
    if (!text(e.title)) problems.push(`Udalosť ${id}: chýba názov (sk aj en)`);
    if (e.link && !/^https:\/\//.test(e.link)) problems.push(`Udalosť ${id}: odkaz musí začínať https://`);
  });
  return problems;
}
