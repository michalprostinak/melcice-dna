import { useLayoutEffect, useMemo, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { mulberry32 } from '../../lib/util';
import { sync } from '../../lib/store';
import { NODES, SITE } from '../../data/site';
import { UI, useLang } from '../../i18n';
import Split from '../ui/Split';

gsap.registerPlugin(ScrollTrigger);

function makeNet() {
  const r = mulberry32(5);
  const rings = [
    { rad: 120, n: 5 },
    { rad: 235, n: 8 },
    { rad: 350, n: 11 },
    { rad: 460, n: 14 },
  ];
  const nodes = [{ x: 500, y: 500, ring: -1 }];
  const edges = [];
  let prev = [0];
  rings.forEach((rg, ri) => {
    const cur = [];
    const off = r() * Math.PI;
    for (let k = 0; k < rg.n; k++) {
      const a = off + (k / rg.n) * Math.PI * 2 + (r() - 0.5) * 0.35;
      const rad = rg.rad + (r() - 0.5) * 50;
      const n = { x: 500 + Math.cos(a) * rad, y: 500 + Math.sin(a) * rad, ring: ri };
      nodes.push(n);
      const id = nodes.length - 1;
      cur.push(id);
      let best = prev[0];
      let bd = 1e9;
      prev.forEach((pid) => {
        const d = Math.hypot(nodes[pid].x - n.x, nodes[pid].y - n.y);
        if (d < bd) {
          bd = d;
          best = pid;
        }
      });
      edges.push([best, id, ri]);
    }
    for (let k = 0; k < cur.length; k++) if (r() > 0.55) edges.push([cur[k], cur[(k + 1) % cur.length], ri]);
    prev = cur;
  });
  return { nodes, edges };
}

function OriginNet() {
  const ref = useRef(null);
  const { nodes, edges } = useMemo(makeNet, []);
  useLayoutEffect(() => {
    const root = ref.current;
    const ctx = gsap.context(() => {
      const lines = root.querySelectorAll('.net-edge');
      lines.forEach((l) => {
        const len = l.getTotalLength();
        l.style.strokeDasharray = len;
        l.style.strokeDashoffset = sync.reduced ? 0 : len;
      });
      if (sync.reduced) return;
      const tl = gsap.timeline({
        scrollTrigger: { trigger: root, start: 'top 85%', end: 'bottom 35%', scrub: 0.7 },
      });
      tl.from('.net-core', { scale: 0.2, opacity: 0, duration: 0.5, transformOrigin: '50% 50%' });
      for (let ri = 0; ri < 4; ri++) {
        tl.to(root.querySelectorAll(`.net-edge[data-r="${ri}"]`), { strokeDashoffset: 0, duration: 0.6, stagger: 0.03 }, '>-0.1');
        tl.fromTo(
          root.querySelectorAll(`.net-node[data-r="${ri}"]`),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.4, stagger: 0.03, transformOrigin: '50% 50%' },
          '<0.15'
        );
        tl.fromTo(root.querySelector(`.net-ring[data-r="${ri}"]`), { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.5, transformOrigin: '50% 50%' }, '<');
      }
    }, root);
    return () => ctx.revert();
  }, []);
  return (
    <svg ref={ref} className="origin__net" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
      {[120, 235, 350, 460].map((rad, i) => (
        <circle key={rad} className="net-ring" data-r={i} cx="500" cy="500" r={rad} />
      ))}
      {edges.map(([a, b, ri], i) => (
        <line key={i} className="net-edge" data-r={ri} x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y} />
      ))}
      {nodes.slice(1).map((n, i) => (
        <circle key={i} className="net-node" data-r={n.ring} cx={n.x} cy={n.y} r={n.ring === 3 ? 3.5 : 5} />
      ))}
      <circle className="net-pulse" cx="500" cy="500" r="9" />
      <circle className="net-core" cx="500" cy="500" r="9" />
    </svg>
  );
}

export default function Origin() {
  const { t } = useLang();
  const n = NODES[1];
  return (
    <section id="origin" data-node="1" className="origin">
      <OriginNet />
      <div className="origin__text">
        <h2 className="mega mega--sm">
          <Split text={`${n.num} / ${t(n.label)}`} />
        </h2>
        <p className="statement statement--narrow origin__lead">
          <Split text={t(UI.originStatement)} delay={3} />
        </p>
        <p className="origin__body">
          {t(UI.originText).split('{school}')[0]}
          <strong>{SITE.school}</strong>
          {t(UI.originText).split('{school}')[1]}
        </p>
        <p className="origin__place meta">{t(UI.originPlace)}</p>
      </div>
    </section>
  );
}
