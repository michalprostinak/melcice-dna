# HACK CLUB MELČICE — web

React + Vite + Three.js (react-three-fiber) + GSAP. Doména: `melciceclub.online`.

```bash
npm install --legacy-peer-deps
npm run dev      # vývoj
npm run build    # produkcia -> dist/
npm test         # časové pásmo + kontrola obsahu v site.js
```

## Obsah upravuješ v jednom súbore
`src/data/site.js` — členovia klubu, udalosti, oblasti "čo staviame", kroky "ako
pracujeme". Nový člen / udalosť = pridať objekt do poľa. Texty, ktoré nie sú dáta
(nadpisy, vety okolo sekcií), sú v `src/i18n.jsx` ako `{ sk, en }` páry.

Pri úprave `site.js` beží pri `npm run dev` automatická kontrola (dátumy, e-maily,
odkazy) — chyby sa vypíšu do konzoly prehliadača. `npm test` tú istú kontrolu spustí
mimo prehliadača spolu s testami časového pásma.

## Štruktúra stránky
00 Hero · 01 Odkiaľ sme (Melčice-Lieskové) · 02 Čo staviame · 03 Ako pracujeme ·
04 Ľudia · 05 Najbližšie (udalosti) · 06 Hack Club · pätička.

## Ako to funguje
- Scroll -> `sync.u` (lib/loop.js) -> scéna (components/dna/DnaCanvas.jsx) vyberie pohľad
  z `lib/helix.js` (VIEWS_DESKTOP / VIEWS_MOBILE). Každá sekcia = uzol DNA (`data-node`).
- Špirála je vykreslená v GPU (shaders.js): 1 draw call pre špirálu, 1 pre častice, 1 pre „energiu“.
  Žiadne textové popisky na špirále — DNA je len vizuálny motív, nie nosič informácií.
- Mobil: špirála zostáva zvislá „chrbtica“ pri okraji, ťahanie prstom v hero ju točí.
- Slabé zariadenia: `sync.lite` (menej bodov), adaptívne zníženie DPR, bez WebGL -> SVG fallback.
- `prefers-reduced-motion`: vypnutý plynulý scroll a väčšina animácií.
- Jazyk (SK/EN) sa pamätá v `localStorage`, prepínač je v hlavičke.

## Nasadenie
Statický `dist/` funguje kdekoľvek (Vercel, Netlify, Cloudflare Pages). Doména sa
nastavuje v konfigurácii hostingu (napr. Vercel → Settings → Domains), nie súborom
v repozitári.
