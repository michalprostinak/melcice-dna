/* Shared, mutable state. The DNA scene reads this every frame, so it lives
   outside React. UI components subscribe only to the active node index. */

function detect() {
  if (typeof window === 'undefined') {
    return { isMobile: false, coarse: false, lite: false, reduced: false };
  }
  const w = window.innerWidth;
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const isMobile = w < 820 || (coarse && w < 1024);
  const mem = navigator.deviceMemory || 4;
  const saveData = !!(navigator.connection && navigator.connection.saveData);
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  return { isMobile, coarse, lite: isMobile || mem <= 2 || saveData, reduced };
}

const d = detect();

export const sync = {
  // scroll -> DNA
  u: 0, // target fractional node index
  us: 0, // smoothed (written by the scene)
  vel: 0, // scroll velocity px/s (smoothed)
  wave: 0,
  bend: 0,
  spin: 0,
  progress: 0,
  centers: [],
  active: 0,
  // pointer
  tx: 0,
  ty: 0,
  px: 0,
  py: 0,
  ptrOn: 0,
  lastMove: 0,
  dragVel: 0,
  // scene state
  fill: 0,
  intro: d.reduced ? 1 : 0,
  burst: 0,
  ready: false,
  view: { dist: 13, tilt: 0 },
  // device
  isMobile: d.isMobile,
  coarse: d.coarse,
  lite: d.lite,
  reduced: d.reduced,
  lenis: null,
};

const listeners = new Set();
export function setActive(i) {
  if (sync.active !== i) {
    sync.active = i;
    sync.burst = 1;
    listeners.forEach((l) => l());
  }
}
export const subscribeActive = (cb) => {
  listeners.add(cb);
  return () => listeners.delete(cb);
};
export const getActive = () => sync.active;

export function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    const gl = c.getContext('webgl2') || c.getContext('webgl');
    if (!gl) return false;
    const ext = gl.getExtension('WEBGL_lose_context');
    if (ext) ext.loseContext();
    return true;
  } catch (e) {
    return false;
  }
}
