import { sync } from './store';

export function goTo(id) {
  const el = id === 'top' ? null : document.getElementById(id);
  if (id !== 'top' && !el) return;
  if (sync.lenis) {
    sync.lenis.scrollTo(id === 'top' ? 0 : el, {
      duration: 1.9,
      easing: (t) => 1 - Math.pow(1 - t, 4),
    });
  } else {
    const top = id === 'top' ? 0 : el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top, behavior: sync.reduced ? 'auto' : 'smooth' });
  }
}
