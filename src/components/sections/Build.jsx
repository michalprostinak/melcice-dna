import { useMemo, useState } from 'react';
import { PROJECTS, SITE, TECH } from '../../data/site';
import Split from '../ui/Split';

const BLOBS = [
  '46% 54% 38% 62% / 52% 40% 60% 48%',
  '58% 42% 55% 45% / 44% 56% 44% 56%',
  '40% 60% 50% 50% / 56% 44% 56% 44%',
  '52% 48% 42% 58% / 40% 58% 42% 60%',
];

function Cell({ p, i }) {
  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`);
    e.currentTarget.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`);
  };
  return (
    <article
      className="cell"
      style={{ '--b1': BLOBS[i % 4], '--b2': BLOBS[(i + 2) % 4], '--lift': i % 2 ? '28px' : '0px' }}
      onPointerMove={onMove}
    >
      <span className="cell__nucleus" aria-hidden="true" />
      <div className="cell__body">
        <p className="meta">
          {p.id}
          {p.placeholder ? ' / PLACEHOLDER' : ''}
        </p>
        <h3>{p.name}</h3>
        <p className="cell__by">by {p.creator}</p>
        <p className="cell__desc">{p.description}</p>
        <ul className="tags">
          {p.tech.map((t) => (
            <li key={t}>{`<${t} />`}</li>
          ))}
        </ul>
        <div className="cell__links">
          {p.github ? (
            <a href={p.github} target="_blank" rel="noopener noreferrer">
              GitHub ↗
            </a>
          ) : (
            <span className="is-off">GitHub</span>
          )}
          {p.demo ? (
            <a href={p.demo} target="_blank" rel="noopener noreferrer">
              Demo ↗
            </a>
          ) : (
            <span className="is-off">Demo</span>
          )}
        </div>
      </div>
    </article>
  );
}

export default function Build() {
  const [filter, setFilter] = useState('ALL');
  const tags = useMemo(() => ['ALL', ...TECH.map((t) => t.tag).filter((t) => PROJECTS.some((p) => p.tech.includes(t)))], []);
  const list = PROJECTS.filter((p) => filter === 'ALL' || p.tech.includes(filter));
  return (
    <section id="build" data-node="2" className="sec sec--wide">
      <p className="meta">SEQUENCE_002</p>
      <h2 className="mega">
        <Split text="02 / BUILD" />
      </h2>
      <p className="statement statement--narrow">
        <Split text={"Every project is a mutation of an idea."} delay={3} />
      </p>
      <div className="filters" role="group" aria-label="Filter by technology">
        {tags.map((t) => (
          <button key={t} className={t === filter ? 'is-on' : ''} onClick={() => setFilter(t)} aria-pressed={t === filter}>
            {t === 'ALL' ? 'ALL STRAINS' : `<${t} />`}
          </button>
        ))}
      </div>
      <div className="cells">
        {list.map((p, i) => (
          <Cell key={p.id} p={p} i={i} />
        ))}
        <a className="cell cell--add" href={SITE.formUrl} target="_blank" rel="noopener noreferrer">
          <span className="cell__plus" aria-hidden="true">+</span>
          <span>Your project could be the next mutation.</span>
        </a>
      </div>
    </section>
  );
}
