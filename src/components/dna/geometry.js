import * as THREE from 'three';
import { NODE_COUNT, SPACING } from '../../lib/helix';
import { mulberry32 } from '../../lib/util';

function finish(count, attrs) {
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(count * 3), 3));
  Object.entries(attrs).forEach(([name, [arr, size]]) =>
    g.setAttribute(name, new THREE.BufferAttribute(new Float32Array(arr), size))
  );
  g.setDrawRange(0, count);
  return g;
}

export function buildHelix(lite) {
  const perNode = lite ? 8 : 12; // rungs between two section nodes
  const dy = SPACING / perNode;
  const kMin = -Math.round(4 / dy);
  const kMax = (NODE_COUNT - 1) * perNode; // the JOIN rung (missing base pair)
  const bStep = lite ? 0.11 : 0.085;
  const yMin = kMin * dy;
  const yMax = kMax * dy + 2.6;
  const nDots = lite ? 6 : 9;

  const data = [];
  const meta = [];
  const push = (y, kind, t, rung, major) => {
    data.push(y, kind, t, rung);
    meta.push(major, 0);
  };
  for (let y = yMin; y <= yMax; y += bStep) {
    push(y, 0, 0, -999, 0);
    push(y, 1, 0, -999, 0);
  }
  for (let k = kMin; k <= kMax; k++) {
    const y = k * dy;
    const major = k >= 0 && k % perNode === 0 ? 1 : 0;
    for (let j = 1; j <= nDots; j++) push(y, 2, j / (nDots + 1), k, major);
    push(y, 3, 0, k, major);
    push(y, 4, 0, k, major);
  }
  const count = data.length / 4;
  return { geometry: finish(count, { aData: [data, 4], aMeta: [meta, 2] }), joinRung: kMax, count };
}

export function buildAmbient(lite) {
  const count = lite ? 140 : 420;
  const r = mulberry32(7);
  const a = [];
  for (let i = 0; i < count; i++) a.push(r() * Math.PI * 2, r(), r(), r());
  return { geometry: finish(count, { aS: [a, 4] }), count };
}

export function buildFlow(lite) {
  const count = lite ? 36 : 90;
  const r = mulberry32(21);
  const a = [];
  for (let i = 0; i < count; i++) a.push(r(), r() < 0.5 ? 0 : 1, 0.05 + r() * 0.1, r());
  return { geometry: finish(count, { aF: [a, 4] }), count };
}
