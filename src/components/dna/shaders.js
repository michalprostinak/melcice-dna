/* GLSL for the DNA (light theme: normal blending, dark-blue ink on pale blue).
   `strandPos` is mirrored in lib/helix.js for the label sprites. */

const COMMON = /* glsl */ `
uniform float uTime, uTwist, uR, uWave, uBend, uPxPerUnit, uDpr, uActiveY, uDim;
uniform float uSizeK, uEndY, uIntro, uCenterY, uAspect, uPointerOn, uBurst;
uniform vec2 uPointer;
const float PI = 3.14159265359;
const vec3 ACCENT = vec3(0.102, 0.435, 0.816); // #1A6FD0
const vec3 NAVY = vec3(0.043, 0.133, 0.220);   // #0B2238

vec3 strandPos(float y, float side) {
  float th = y * uTwist + side * PI + uWave * sin(y * 0.23 + uTime * 0.3);
  vec3 p = vec3(uR * cos(th), y, uR * sin(th));
  p.x += uBend * sin(y * 0.31 + uTime * 0.45);
  return p;
}
float depthFade(float depth) {
  return smoothstep(1.2, 3.6, depth) * exp(-depth * 0.026);
}
float pointerExcite(vec4 clip) {
  vec2 ndc = clip.xy / clip.w;
  vec2 d = (ndc - uPointer) * vec2(uAspect, 1.0);
  return (1.0 - smoothstep(0.0, 0.3, length(d))) * uPointerOn;
}
`;

export const VS_HELIX = /* glsl */ `
${COMMON}
attribute vec4 aData;   // y, kind, t, rung
attribute vec2 aMeta;   // major
varying vec3 vCol;
varying float vAlpha;
varying float vKind;
varying float vGlow;

void main() {
  float y = aData.x;
  float kind = aData.y;
  float t = aData.z;
  float major = aMeta.x;

  vec3 pA = strandPos(y, 0.0);
  vec3 pB = strandPos(y, 1.0);
  vec3 p = pA;
  float size = 0.05;
  float alpha = 0.5;
  vec3 base = vec3(0.30, 0.46, 0.64);
  float endFade = 1.0 - smoothstep(uEndY + 0.2, uEndY + 2.4, y);

  if (kind < 0.5) {
    p = pA; size = 0.085; alpha = 0.8 * endFade;
  } else if (kind < 1.5) {
    p = pB; size = 0.085; alpha = 0.8 * endFade;
  } else if (kind < 2.5) {
    p = mix(pA, pB, t); size = 0.05; alpha = 0.55; base = vec3(0.42, 0.58, 0.74);
  } else {
    p = kind > 3.5 ? pB : pA;
    size = 0.27 + 0.3 * major;
    alpha = 0.95;
    base = vec3(0.16, 0.30, 0.48);
  }

  size *= uSizeK;
  float dy = y - uActiveY;
  float g = exp(-dy * dy * 0.22);
  vGlow = g;
  vec3 col = mix(base, ACCENT, g * (kind > 2.5 ? 1.0 : 0.85));
  size *= 1.0 + g * (kind > 2.5 ? 0.7 : 0.3);
  size *= 1.0 + major * (0.8 + uBurst * 1.4) * exp(-dy * dy * 5.0);

  alpha *= mix(uDim, mix(uDim, 1.0, 0.75), g);
  alpha *= smoothstep(-4.0, -1.5, y);
  alpha *= clamp((uIntro * 84.0 - abs(y - uCenterY)) / 5.0, 0.0, 1.0);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float depth = max(-mv.z, 0.05);
  gl_Position = projectionMatrix * mv;
  alpha *= depthFade(depth);

  float ex = pointerExcite(gl_Position);
  col = mix(col, NAVY, ex * 0.8);
  size *= 1.0 + ex * 1.5;
  alpha = min(1.0, alpha + ex * 0.3 * uPointerOn);

  gl_PointSize = clamp(size * uPxPerUnit / depth, 1.6 * uDpr, 30.0 * uDpr);
  vCol = col;
  vAlpha = alpha;
  vKind = kind;
}
`;

export const FS_HELIX = /* glsl */ `
precision highp float;
varying vec3 vCol;
varying float vAlpha;
varying float vKind;
varying float vGlow;
const vec3 NAVY = vec3(0.043, 0.133, 0.220);

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c) * 2.0;
  if (d > 1.0) discard;
  float a;
  vec3 col = vCol;
  if (vKind < 2.5) {
    a = 1.0 - smoothstep(0.25, 1.0, d);
    a *= a;
  } else {
    float core = 1.0 - smoothstep(0.14, 0.22, d);
    float halo = pow(1.0 - d, 2.4) * 0.45;
    a = clamp(core + halo, 0.0, 1.0);
    col = mix(col, NAVY, core * (0.5 + 0.4 * vGlow));
  }
  gl_FragColor = vec4(col, a * vAlpha);
}
`;

export const VS_AMBIENT = /* glsl */ `
${COMMON}
attribute vec4 aS; // angle, radius, ySeed, speed
varying vec3 vCol;
varying float vAlpha;

void main() {
  const float W = 34.0;
  float drift = uTime * (0.02 + aS.w * 0.06);
  float yy = mod(aS.z * W + drift - uActiveY + W * 0.5, W) - W * 0.5;
  float y = uActiveY + yy;
  float ang = aS.x + uTime * (aS.w - 0.5) * 0.12;
  float r = uR * (1.25 + aS.y * 2.6);
  vec3 p = vec3(r * cos(ang), y, r * sin(ang));
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float depth = max(-mv.z, 0.05);
  float tw = 0.55 + 0.45 * sin(uTime * (1.0 + aS.w * 2.0) + aS.x * 9.0);
  float edge = 1.0 - smoothstep(0.55, 1.0, abs(yy) / (W * 0.5));
  vAlpha = edge * tw * 0.55 * mix(uDim, 1.0, 0.5) * depthFade(depth) * clamp(uIntro * 2.0 - 0.6, 0.0, 1.0);
  vCol = mix(vec3(0.42, 0.58, 0.74), ACCENT, step(0.86, aS.y));
  gl_PointSize = clamp((0.035 + aS.w * 0.05) * uPxPerUnit / depth, 1.0 * uDpr, 14.0 * uDpr);
  gl_Position = projectionMatrix * mv;
}
`;

export const VS_FLOW = /* glsl */ `
${COMMON}
attribute vec4 aF; // phase, side, speed, jitter
varying vec3 vCol;
varying float vAlpha;

void main() {
  const float SPAN = 10.0;
  float ph = fract(aF.x + uTime * aF.z * (1.0 + uBurst * 3.0));
  float y = uActiveY + (ph - 0.5) * SPAN;
  vec3 p = strandPos(y, aF.y);
  float k = 1.0 + 0.09 * sin(aF.w * 6.2831 + uTime * 1.3);
  float bend = uBend * sin(y * 0.31 + uTime * 0.45);
  p.x = (p.x - bend) * k + bend;
  p.z *= k;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  float depth = max(-mv.z, 0.05);
  float win = sin(ph * PI);
  vAlpha = win * win * 0.9 * mix(0.6, 1.0, uDim) * depthFade(depth) * clamp(uIntro * 2.0 - 0.8, 0.0, 1.0);
  vCol = mix(ACCENT, NAVY, 0.25 * win);
  gl_PointSize = clamp((0.1 + aF.w * 0.06) * uPxPerUnit / depth, 1.5 * uDpr, 34.0 * uDpr);
  gl_Position = projectionMatrix * mv;
}
`;

export const FS_SOFT = /* glsl */ `
precision highp float;
varying vec3 vCol;
varying float vAlpha;
void main() {
  vec2 c = gl_PointCoord - 0.5;
  float d = length(c) * 2.0;
  if (d > 1.0) discard;
  float a = pow(1.0 - d, 1.7);
  gl_FragColor = vec4(vCol, a * vAlpha);
}
`;
