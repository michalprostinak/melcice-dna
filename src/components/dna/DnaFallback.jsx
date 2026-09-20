/* Used when WebGL is unavailable: a light SVG helix with CSS motion. */
export default function DnaFallback() {
  const rungs = Array.from({ length: 30 }, (_, i) => i);
  return (
    <svg className="dna-fallback" viewBox="0 0 200 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      {rungs.map((i) => {
        const y = 12 + i * 19.5;
        return (
          <g key={i} className="dna-fallback__rung" style={{ animationDelay: `${-i * 0.22}s` }}>
            <line x1="40" x2="160" y1={y} y2={y} />
            <circle cx="40" cy={y} r="3.2" />
            <circle cx="160" cy={y} r="3.2" className="b" />
          </g>
        );
      })}
    </svg>
  );
}
