import { NODES } from '../data/site';

export const NODE_COUNT = NODES.length; // hero + 2 sections
export const SPACING = 5; // world units between two neighbouring nodes
export const TWIST = 0.86; // radians per world unit
export const RADIUS = 1.9;

/* JS twin of `strandPos` in shaders.js — keep the two in sync. */
export function theta(y, time, wave) {
  return y * TWIST + wave * Math.sin(y * 0.23 + time * 0.3);
}
export function strandPoint(out, y, side, time, wave, bend) {
  const th = theta(y, time, wave) + side * Math.PI;
  out.set(RADIUS * Math.cos(th) + bend * Math.sin(y * 0.31 + time * 0.45), y, RADIUS * Math.sin(th));
  return out;
}

/* Camera views per node.
   tilt 0 = helix seen from the side (vertical); tilt 1 = camera travels down
   the axis (tunnel). phi = screen angle of the active node (0 = right side,
   PI = left side). The DOM text sits on the opposite side. */
const P = Math.PI;
const base = { tilt: 1, roll: 0, x: 0, y: 0, dist: 7, phi: 0.15, dim: 1 };
const v = (o) => ({ ...base, ...o });

export const VIEWS_DESKTOP = [
  v({ tilt: 0, roll: -0.3, y: 0.9, dist: 10.5, phi: 0.5, dim: 1 }), // 00 hero
  v({ dist: 10, phi: -P / 2, dim: 0.32 }), // 01 where we're from
  v({ x: 0.6, dist: 7.5, phi: 0.15, dim: 0.7 }), // 02 what we do (text left)
];

const mBase = { tilt: 0, roll: 0, x: 2.6, y: 2.1, dist: 15, phi: P, dim: 0.5 };
const m = (o) => ({ ...mBase, ...o });
export const VIEWS_MOBILE = [
  m({ roll: -0.22, x: 0, y: 1.6, dist: 10.5, phi: 0.5, dim: 1 }),
  ...Array.from({ length: NODE_COUNT - 1 }, () => m({})),
];
