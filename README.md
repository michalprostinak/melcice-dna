# MELČICE.DNA — Hack Club Melčice

React + Vite + Three.js (react-three-fiber) + GSAP + Lenis. Doména: `melciceclub.online`.

```bash
npm install --legacy-peer-deps
npm run dev      # vývoj
npm run build    # produkcia -> dist/
```

## Obsah upravuješ v jednom súbore
`src/data/site.js` — projekty (placeholdery), členovia, udalosti, technológie, odkazy
(registračný formulár, GitHub). Nový projekt / člen / udalosť = pridať objekt do poľa.

## Ako to funguje
- Scroll -> `sync.u` (lib/loop.js) -> scéna (components/dna/DnaCanvas.jsx) vyberie pohľad
  z `lib/helix.js` (VIEWS_DESKTOP / VIEWS_MOBILE). Každá sekcia = uzol DNA (`data-node`).
- Špirála je vykreslená v GPU (shaders.js): 1 draw call pre špirálu, 1 pre častice, 1 pre „energiu“.
- Mobil: špirála zostáva zvislá „chrbtica“ pri okraji, ťahanie prstom v hero ju točí.
- Slabé zariadenia: `sync.lite` (menej bodov), adaptívne zníženie DPR, bez WebGL -> SVG fallback.
- `prefers-reduced-motion`: vypnutý plynulý scroll a väčšina animácií.

## Nasadenie
Statický `dist/` funguje kdekoľvek (Vercel, Netlify, Cloudflare Pages, GitHub Pages — `public/CNAME` je pripravený).
