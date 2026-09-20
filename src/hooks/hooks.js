import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { subscribeActive, getActive } from '../lib/store';

export const useActive = () => useSyncExternalStore(subscribeActive, getActive, () => 0);

export function useMedia(query) {
  const [m, setM] = useState(() => (typeof window === 'undefined' ? false : window.matchMedia(query).matches));
  useEffect(() => {
    const mq = window.matchMedia(query);
    const fn = () => setM(mq.matches);
    fn();
    mq.addEventListener('change', fn);
    return () => mq.removeEventListener('change', fn);
  }, [query]);
  return m;
}

export function useInView(threshold = 0.25) {
  const ref = useRef(null);
  const [inView, setIn] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setIn(true);
      return;
    }
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setIn(true);
          io.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -8% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView];
}

/* Text that scrambles through A/T/G/C before resolving. */
export function useScramble(text) {
  const [out, setOut] = useState(text);
  const raf = useRef(0);
  const run = useCallback(() => {
    cancelAnimationFrame(raf.current);
    const L = 'ATGC';
    const start = performance.now();
    const dur = 520;
    const step = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const n = Math.floor(p * text.length);
      setOut(
        text
          .split('')
          .map((c, i) => (i < n || /[<>/\s]/.test(c) ? c : L[(Math.random() * 4) | 0]))
          .join('')
      );
      if (p < 1) raf.current = requestAnimationFrame(step);
      else setOut(text);
    };
    raf.current = requestAnimationFrame(step);
  }, [text]);
  useEffect(() => () => cancelAnimationFrame(raf.current), []);
  return [out, run];
}
