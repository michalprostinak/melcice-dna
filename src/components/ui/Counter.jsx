import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { sync } from '../../lib/store';

export default function Counter({ to, pad = 2, duration = 1.6 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const fmt = (n) => String(Math.round(n)).padStart(pad, '0');
    if (sync.reduced || typeof IntersectionObserver === 'undefined') {
      el.textContent = fmt(to);
      return;
    }
    const obj = { v: 0 };
    let tween;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      tween = gsap.to(obj, { v: to, duration, ease: 'power2.out', onUpdate: () => (el.textContent = fmt(obj.v)) });
      io.disconnect();
    });
    io.observe(el);
    return () => {
      io.disconnect();
      if (tween) tween.kill();
    };
  }, [to, pad, duration]);
  return (
    <span ref={ref} className="tnum">
      {String(0).padStart(pad, '0')}
    </span>
  );
}
