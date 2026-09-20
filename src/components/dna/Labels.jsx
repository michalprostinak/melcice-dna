import { useEffect, useMemo, useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { NODES } from '../../data/site';
import { useLang } from '../../i18n';
import { NODE_COUNT, SPACING, strandPoint, theta } from '../../lib/helix';
import { mulberry32 } from '../../lib/util';
import { sync } from '../../lib/store';

const FONT = '"IBM Plex Mono", ui-monospace, Menlo, monospace';
const DATA_TEXT = [
  'ATGC-CGTA', '0x1F4A', 'dG -3.1', 'git a3f9c1e', 'GCTA-7', 'n = 128', 'fn(x)',
  '#1A6FD0', 'LOAD 87%', 'T+00:13', '</>', 'TTAGGC', 'v1.0.2', '0b1011', 'ORF_09',
];

function makeLabel(text, { color = '#0B2238', accent = false, h = 0.3 } = {}) {
  const px = 44;
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');
  ctx.font = `500 ${px}px ${FONT}`;
  const pad = 14;
  const box = accent ? px * 0.42 : 0;
  const w = Math.ceil(ctx.measureText(text).width) + pad * 2 + (accent ? box + 14 : 0);
  const hh = px + pad * 2;
  c.width = w;
  c.height = hh;
  ctx.font = `500 ${px}px ${FONT}`;
  ctx.textBaseline = 'middle';
  let x = pad;
  if (accent) {
    ctx.fillStyle = '#1A6FD0';
    ctx.fillRect(x, hh / 2 - box / 2, box, box);
    x += box + 14;
  }
  ctx.fillStyle = color;
  ctx.fillText(text, x, hh / 2 + 2);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 2;
  return { tex, w: (w / hh) * h, h };
}

export default function Labels() {
  const { lang, t } = useLang();
  const [ready, setReady] = useState(false);
  useEffect(() => {
    let alive = true;
    const done = () => alive && setReady(true);
    if (document.fonts && document.fonts.load) document.fonts.load(`500 40px ${FONT}`).then(done, done);
    else done();
    return () => {
      alive = false;
    };
  }, []);

  const items = useMemo(() => {
    if (!ready) return [];
    const list = [];
    NODES.forEach((n, i) => {
      if (i === 0) return;
      const text = `${n.num} / ${t(n.label)}`;
      list.push({ kind: 'node', i, y: i * SPACING, ...makeLabel(text, { accent: true, h: 0.27 }) });
    });
    const r = mulberry32(99);
    const count = sync.lite ? 9 : 18;
    for (let k = 0; k < count; k++) {
      const y = 0.6 + r() * (NODE_COUNT - 1) * SPACING;
      const text = DATA_TEXT[k % DATA_TEXT.length];
      list.push({ kind: 'data', y, side: r() < 0.5 ? 0 : 1, ...makeLabel(text, { color: '#5f7d99', h: 0.18 }) });
    }
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, lang]);

  const refs = useRef([]);
  const P = useMemo(() => new THREE.Vector3(), []);

  useFrame((st) => {
    const t = st.clock.elapsedTime;
    const { us, wave, bend, spin, view } = sync;
    const yf = us * SPACING;
    for (let k = 0; k < items.length; k++) {
      const s = refs.current[k];
      if (!s) continue;
      const it = items[k];
      const depthApprox = view.dist + (it.y - yf) * view.tilt;
      const near = THREE.MathUtils.smoothstep(depthApprox, 3.2, 6.5);
      let o;
      if (it.kind === 'node') {
        const d = us - it.i;
        o = 0.2 + 0.8 * Math.exp(-d * d * 2.4);
      } else {
        const d = it.y - yf;
        o = 0.5 * Math.exp(-(d * d) / 36);
      }
      const op = o * near * sync.intro;
      if (op < 0.015) {
        s.visible = false;
        continue;
      }
      s.visible = true;
      const side = it.kind === 'node' ? 0 : it.side;
      strandPoint(P, it.y, side, t, wave, bend);
      const len = Math.hypot(P.x, P.z) || 1;
      const off = it.kind === 'node' ? 0.34 : 0.26;
      s.position.set(P.x + (P.x / len) * off, it.y, P.z + (P.z / len) * off);
      const th = theta(it.y, t, wave) + side * Math.PI - spin;
      s.center.set(Math.cos(th) > 0 ? 1 : 0, 0.5);
      s.material.opacity = op;
    }
  });


  return (
    <group>
      {items.map((it, k) => (
        <sprite key={k} ref={(el) => (refs.current[k] = el)} scale={[it.w, it.h, 1]} renderOrder={2}>
          <spriteMaterial map={it.tex} transparent depthTest={false} depthWrite={false} opacity={0} />
        </sprite>
      ))}
    </group>
  );
}
