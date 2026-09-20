import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { sync } from '../../lib/store';

/* Button that leans toward the cursor when it gets close. */
export default function MagneticButton({ as: Tag = 'a', strength = 0.3, className = '', children, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || sync.coarse || sync.reduced) return;
    const xTo = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3.out' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3.out' });
    const move = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const reach = 70;
      const inside =
        Math.abs(dx) < r.width / 2 + reach && Math.abs(dy) < r.height / 2 + reach;
      if (inside) {
        xTo(dx * strength);
        yTo(dy * strength);
      } else {
        xTo(0);
        yTo(0);
      }
    };
    window.addEventListener('pointermove', move, { passive: true });
    return () => window.removeEventListener('pointermove', move);
  }, [strength]);
  return (
    <Tag ref={ref} className={className} {...rest}>
      <span className="btn__label">{children}</span>
    </Tag>
  );
}
