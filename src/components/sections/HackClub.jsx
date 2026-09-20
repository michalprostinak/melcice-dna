import { useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { NETWORK_STEPS, NODES, SITE } from '../../data/site';
import { UI, useLang } from '../../i18n';
import { useMedia } from '../../hooks/hooks';
import { mulberry32 } from '../../lib/util';
import { sync } from '../../lib/store';
import Split from '../ui/Split';

function Ladder() {
  const { t } = useLang();
  const vertical = useMedia('(max-width: 820px)');
  const ref = useRef(null);
  const W = vertical ? 360 : 1200;
  const H = vertical ? 900 : 380;
  const pts = useMemo(() => {
    const radii = [8, 15, 24, 36];
    return NETWORK_STEPS.map((label, i) => {
      const t = i / (NETWORK_STEPS.length - 1);
      return vertical
        ? { label, r: radii[i], x: 90, y: 110 + t * 680 }
        : { label, r: radii[i], x: 120 + t * 960, y: 170 };
    });
  }, [vertical]);
  const sats = useMemo(() => {
    const r = mulberry32(3);
    const last = pts[pts.length - 1];
    return Array.from({ length: 16 }, () => {
      const a = r() * Math.PI * 2;
      const d = 60 + r() * 70;
      return { x: last.x + Math.cos(a) * d, y: last.y + Math.sin(a) * d, r: 1.6 + r() * 2.4 };
    });
  }, [pts]);

  useLayoutEffect(() => {
    if (sync.reduced) return;
    const ctx = gsap.context(() => {
      const packets = ref.current.querySelectorAll('.pkt');
      packets.forEach((p, i) => {
        const a = pts[i];
        const b = pts[i + 1];
        gsap.fromTo(p, { attr: { cx: a.x, cy: a.y }, opacity: 0 }, {
          attr: { cx: b.x, cy: b.y }, opacity: 1, duration: 2.2, ease: 'power1.inOut',
          repeat: -1, repeatDelay: 0.6, delay: i * 0.7,
        });
      });
    }, ref);
    return () => ctx.revert();
  }, [pts]);

  return (
    <svg ref={ref} className="ladder" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={NETWORK_STEPS.map((x) => t(x)).join(' → ')}>
      {sats.map((s, i) => (
        <g key={i}>
          <line className="ladder__sat-line" x1={pts[3].x} y1={pts[3].y} x2={s.x} y2={s.y} />
          <circle className="ladder__sat" cx={s.x} cy={s.y} r={s.r} />
        </g>
      ))}
      {pts.slice(0, -1).map((p, i) => (
        <line key={i} className="ladder__line" x1={p.x} y1={p.y} x2={pts[i + 1].x} y2={pts[i + 1].y} />
      ))}
      {pts.map((p, i) => (
        <g key={p.label}>
          <circle className="ladder__ring" cx={p.x} cy={p.y} r={p.r * 1.9} />
          <circle className={`ladder__node ${i === 0 ? 'is-home' : ''}`} cx={p.x} cy={p.y} r={p.r} />
          <text className="ladder__label" x={vertical ? p.x + p.r * 2.4 + 14 : p.x} y={vertical ? p.y + 8 : p.y + p.r * 1.9 + 44} textAnchor={vertical ? 'start' : 'middle'}>
            {t(p.label)}
          </text>
        </g>
      ))}
      {pts.slice(0, -1).map((p, i) => (
        <circle key={`k${i}`} className="pkt" cx={p.x} cy={p.y} r="4" />
      ))}
    </svg>
  );
}

export default function HackClub() {
  const { t } = useLang();
  const n = NODES[9];
  return (
    <section id="hackclub" data-node="9" className="sec sec--wide hackclub">
      <h2 className="mega mega--sm">
        <Split text={`${n.num} / ${t(UI.hackTitle)}`} />
      </h2>
      <p className="statement statement--narrow">{t(UI.hackLead)}</p>
      <Ladder />
      <a className="textlink" href={SITE.hackClubUrl} target="_blank" rel="noopener noreferrer">
        hackclub.com ↗
      </a>
    </section>
  );
}
