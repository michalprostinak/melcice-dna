import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { sync, setActive } from './store';
import { NODE_COUNT } from './helix';

gsap.registerPlugin(ScrollTrigger);

function measure() {
  const els = [...document.querySelectorAll('[data-node]')]
    .map((el) => ({ i: Number(el.dataset.node), el }))
    .sort((a, b) => a.i - b.i);
  const y = window.scrollY;
  const centers = els.map(({ el }) => {
    const r = el.getBoundingClientRect();
    return r.top + y + r.height / 2;
  });
  // enforce strictly increasing centers
  for (let k = 1; k < centers.length; k++) if (centers[k] <= centers[k - 1]) centers[k] = centers[k - 1] + 1;
  sync.centers = centers;
}

function computeU(scrollY) {
  const C = sync.centers;
  if (!C.length) return 0;
  const c = scrollY + window.innerHeight * 0.5;
  if (c <= C[0]) return 0;
  for (let i = 0; i < C.length - 1; i++) {
    if (c < C[i + 1]) return i + (c - C[i]) / (C[i + 1] - C[i]);
  }
  return NODE_COUNT - 1;
}

export function startLoop() {
  let lenis = null;
  if (!sync.reduced) {
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, smoothWheel: true });
    sync.lenis = lenis;
    lenis.on('scroll', ScrollTrigger.update);
  }
  let lastY = window.scrollY;
  let bar = null;
  let lastP = -1;

  const tick = (time, delta) => {
    if (lenis) lenis.raf(time * 1000);
    const dt = Math.max(delta, 1) / 1000;
    const y = window.scrollY;
    sync.vel += ((y - lastY) / dt - sync.vel) * Math.min(1, dt * 8);
    lastY = y;
    sync.u = computeU(y);
    setActive(Math.round(sync.u));

    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    sync.progress = Math.min(1, Math.max(0, y / max));
    if (!bar || !bar.isConnected) bar = document.querySelector('.nav__progress');
    if (bar && Math.abs(sync.progress - lastP) > 0.0005) {
      bar.style.transform = `scaleX(${sync.progress.toFixed(4)})`;
      lastP = sync.progress;
    }

    const k = 1 - Math.exp(-dt * 6);
    sync.px += (sync.tx - sync.px) * k;
    sync.py += (sync.ty - sync.py) * k;
    if (performance.now() - sync.lastMove > (sync.coarse ? 1400 : 3000)) {
      sync.ptrOn += (0 - sync.ptrOn) * Math.min(1, dt * 3);
    }
  };
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);

  const onMove = (e) => {
    sync.tx = (e.clientX / window.innerWidth) * 2 - 1;
    sync.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    sync.ptrOn = 1;
    sync.lastMove = performance.now();
  };
  const onResize = () => {
    const w = window.innerWidth;
    sync.isMobile = w < 820 || (sync.coarse && w < 1024);
    measure();
    ScrollTrigger.refresh();
  };
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerdown', onMove, { passive: true });
  window.addEventListener('resize', onResize);

  let raf = 0;
  const measureSoon = () => {
    cancelAnimationFrame(raf);
    raf = requestAnimationFrame(measure);
  };
  const ro = new ResizeObserver(measureSoon);
  ro.observe(document.body);
  measure();
  const t1 = setTimeout(measure, 400);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
  window.addEventListener('load', measure);

  return () => {
    gsap.ticker.remove(tick);
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerdown', onMove);
    window.removeEventListener('resize', onResize);
    window.removeEventListener('load', measure);
    clearTimeout(t1);
    ro.disconnect();
    if (lenis) lenis.destroy();
    sync.lenis = null;
  };
}
