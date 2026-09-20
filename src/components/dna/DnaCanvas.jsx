import { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import gsap from 'gsap';
import { sync } from '../../lib/store';
import { NODE_COUNT, RADIUS, SPACING, TWIST, VIEWS_DESKTOP, VIEWS_MOBILE, theta } from '../../lib/helix';
import { FS_HELIX, FS_SOFT, VS_AMBIENT, VS_FLOW, VS_HELIX } from './shaders';
import { buildAmbient, buildFlow, buildHelix } from './geometry';

const KEYS = ['tilt', 'roll', 'x', 'y', 'dist', 'phi', 'dim'];

function Scene() {
  const { camera, size, gl, setDpr } = useThree();
  const root = useRef();
  const lite = sync.lite;

  const helix = useMemo(() => buildHelix(lite), [lite]);
  const ambient = useMemo(() => buildAmbient(lite), [lite]);
  const flow = useMemo(() => buildFlow(lite), [lite]);

  const U = useMemo(
    () => ({
      uTime: { value: 0 },
      uTwist: { value: TWIST },
      uR: { value: RADIUS },
      uWave: { value: 0 },
      uBend: { value: 0 },
      uPxPerUnit: { value: 800 },
      uDpr: { value: 1 },
      uSizeK: { value: lite ? 1.35 : 1 },
      uActiveY: { value: 0 },
      uDim: { value: 1 },
      uEndY: { value: (NODE_COUNT - 1) * SPACING },
      uIntro: { value: 0 },
      uCenterY: { value: 2.5 },
      uAspect: { value: 1 },
      uPointerOn: { value: 0 },
      uBurst: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
    }),
    [lite]
  );

  const st = useRef({ spinFree: 0, frames: 0, acc: 0, n: 0, degraded: false, fov: 38, v: new THREE.Vector3(), cfg: {} });

  useFrame((state, dtRaw) => {
    const dt = Math.min(dtRaw, 0.05);
    const S = sync;
    const R = st.current;

    if (!S.ready) {
      S.ready = true;
      document.documentElement.classList.add('dna-ready');
    }
    // The helix grows in once the visitor has passed the language screen.
    if (S.entered && !S.introStarted) {
      S.introStarted = true;
      if (!S.reduced) gsap.to(S, { intro: 1, duration: 3.2, ease: 'power2.out' });
    }

    // --- scroll -> node index (spring-smoothed) -------------------------
    S.us += (S.u - S.us) * (1 - Math.exp(-dt * (S.isMobile ? 7 : 5.5)));
    const us = THREE.MathUtils.clamp(S.us, 0, NODE_COUNT - 1);
    const i0 = Math.min(Math.floor(us), NODE_COUNT - 2);
    const f = us - i0;
    const e = f * f * (3 - 2 * f);
    const views = S.isMobile ? VIEWS_MOBILE : VIEWS_DESKTOP;
    const a = views[i0];
    const b = views[i0 + 1];
    const cfg = R.cfg;
    for (const k of KEYS) cfg[k] = a[k] + (b[k] - a[k]) * e;
    const yf = us * SPACING;

    // --- physics: wave from scroll velocity, bend from pointer ------------
    const waveTarget = THREE.MathUtils.clamp(S.vel / 2200, -1, 1) * 0.85;
    S.wave += (waveTarget - S.wave) * (1 - Math.exp(-dt * 4));
    S.bend += (S.px * 0.45 - S.bend) * (1 - Math.exp(-dt * 3));
    S.burst *= Math.exp(-dt * 2.4);
    S.dragVel *= Math.exp(-dt * 2.2);
    R.spinFree += ((S.reduced ? 0.02 : 0.1) + S.px * 0.16 + S.dragVel) * dt;

    // --- orient the helix: spin is locked to the twist so the active node
    //     always sits at screen angle `phi` while the helix "slides" along ---
    const time = state.clock.elapsedTime;
    const spin = theta(yf, time, S.wave) - cfg.phi + R.spinFree * 0.6;
    S.spin = spin;
    S.view.dist = cfg.dist;
    S.view.tilt = cfg.tilt;

    const g = root.current;
    g.rotation.set(-cfg.tilt * Math.PI * 0.5, spin, cfg.roll);
    R.v.set(0, yf, 0).applyEuler(g.rotation);
    g.position.set(cfg.x, cfg.y, -cfg.dist).sub(R.v);

    // --- camera --------------------------------------------------------------
    const fovTarget = 38 + Math.min(Math.abs(S.vel) / 2600, 1) * 6;
    R.fov += (fovTarget - R.fov) * (1 - Math.exp(-dt * 5));
    if (Math.abs(camera.fov - R.fov) > 0.01) {
      camera.fov = R.fov;
      camera.updateProjectionMatrix();
    }
    camera.position.set(S.px * 0.25, S.py * 0.15, 0);
    camera.lookAt(0, 0, -10);

    // --- uniforms ------------------------------------------------------------
    U.uTime.value = time;
    U.uWave.value = S.wave;
    U.uBend.value = S.bend;
    U.uActiveY.value = yf;
    U.uDim.value = cfg.dim;
    U.uIntro.value = S.intro;
    U.uPointer.value.set(S.px, S.py);
    U.uPointerOn.value = S.ptrOn;
    U.uBurst.value = S.burst;
    U.uAspect.value = size.width / size.height;
    const dpr = gl.getPixelRatio();
    U.uDpr.value = dpr;
    U.uPxPerUnit.value = (size.height * dpr) / (2 * Math.tan((camera.fov * Math.PI) / 360));

    // --- adaptive quality: only ever steps DOWN (no oscillation) ---------------
    // Averages frame time over ~90 frames; if the GPU cannot hold ~40 fps it
    // lowers the render resolution, and as a last resort halves the particles.
    if (dtRaw < 0.25) {
      R.frames++;
      if (R.frames > 45) {
        R.acc += dtRaw;
        R.n++;
        if (R.n >= 90) {
          const avg = R.acc / R.n;
          R.acc = 0;
          R.n = 0;
          if (avg > 0.026) {
            const cur = gl.getPixelRatio();
            if (cur > 1.01) {
              setDpr(Math.max(1, cur - 0.25));
            } else if (!R.degraded) {
              R.degraded = true;
              ambient.geometry.setDrawRange(0, Math.floor(ambient.count / 2));
              flow.geometry.setDrawRange(0, Math.floor(flow.count / 2));
            }
          }
        }
      }
    }
  });

  // Materials share ONE uniforms object so a single write updates all layers.
  const mats = useMemo(() => {
    const make = (vertexShader, fragmentShader) => {
      const m = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        transparent: true,
        depthTest: false,
        depthWrite: false,
        blending: THREE.NormalBlending,
      });
      m.uniforms = U;
      return m;
    };
    return {
      ambient: make(VS_AMBIENT, FS_SOFT),
      helix: make(VS_HELIX, FS_HELIX),
      flow: make(VS_FLOW, FS_SOFT),
    };
  }, [U]);

  return (
    <group ref={root} rotation={[0, 0, 0, 'ZXY']}>
      <points geometry={ambient.geometry} material={mats.ambient} frustumCulled={false} />
      <points geometry={helix.geometry} material={mats.helix} frustumCulled={false} />
      <points geometry={flow.geometry} material={mats.flow} frustumCulled={false} />
    </group>
  );
}

export default function DnaCanvas() {
  return (
    <Canvas
      dpr={[1, sync.lite ? 1.5 : 1.75]}
      camera={{ fov: 38, near: 0.1, far: 220, position: [0, 0, 0] }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance' }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <Scene />
    </Canvas>
  );
}
