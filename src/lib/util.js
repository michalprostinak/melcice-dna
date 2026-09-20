export function hash(str) {
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

export function mulberry32(seed) {
  let a = seed >>> 0;
  return function () {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Deterministic "codon" for any string, e.g. PYTHON -> "GCA TTA CGA". */
export function codonOf(str) {
  const h = hash(str);
  const L = 'ATGC';
  const out = [];
  for (let i = 0; i < 9; i++) out.push(L[(h >>> (i * 2)) & 3]);
  return [out.slice(0, 3).join(''), out.slice(3, 6).join(''), out.slice(6, 9).join('')].join(' ');
}

const MONTHS = {
  sk: ['JAN', 'FEB', 'MAR', 'APR', 'MÁJ', 'JÚN', 'JÚL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEC'],
  en: ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'],
};
export function formatDate(iso, lang = 'sk') {
  const [y, m, d] = iso.split('-').map(Number);
  return { day: String(d).padStart(2, '0'), month: MONTHS[lang][m - 1], year: String(y) };
}
const TZ = 'Europe/Bratislava';

/* UTC offset (ms) of Europe/Bratislava at a given instant, DST-aware via Intl. */
function tzOffsetMs(ts) {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat('en-US', {
      timeZone: TZ, hourCycle: 'h23', year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit', second: '2-digit',
    })
      .formatToParts(new Date(ts))
      .map((p) => [p.type, p.value])
  );
  const asUtc = Date.UTC(+parts.year, +parts.month - 1, +parts.day, +parts.hour, +parts.minute, +parts.second);
  return asUtc - Math.floor(ts / 1000) * 1000;
}

/* Wall-clock time in Europe/Bratislava -> UTC milliseconds (correct in summer and winter time). */
export function eventTime(iso, time = '00:00') {
  const [y, m, d] = iso.split('-').map(Number);
  const [hh, mm] = time.split(':').map(Number);
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  const first = guess - tzOffsetMs(guess);
  return guess - tzOffsetMs(first);
}
