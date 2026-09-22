import { MEMBERS, NODES } from '../../data/site';
import { UI, useLang } from '../../i18n';
import Split from '../ui/Split';

function Specimen({ m, i }) {
  const { t } = useLang();
  const tilt = (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty('--ry', `${x * 9}deg`);
    e.currentTarget.style.setProperty('--rx', `${-y * 9}deg`);
  };
  const reset = (e) => {
    e.currentTarget.style.setProperty('--ry', '0deg');
    e.currentTarget.style.setProperty('--rx', '0deg');
  };
  return (
    <article className="specimen" onPointerMove={tilt} onPointerLeave={reset}>
      <span className="specimen__scan" aria-hidden="true" />
      <span className="specimen__num meta">{String(i + 1).padStart(2, '0')}</span>
      <h3>{t(m.name)}</h3>
      <p className="specimen__role">{t(m.role)}</p>
      {m.text && <p className="specimen__text">{t(m.text)}</p>}
      {m.contacts && m.contacts.length > 0 && (
        <ul className="contacts">
          {m.contacts.map((c) => (
            <li key={c.value}>
              <a href={`mailto:${c.value}`}>{c.value}</a>
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function People() {
  const { t } = useLang();
  const n = NODES[4];
  return (
    <section id="people" data-node="4" className="sec sec--wide">
      <h2 className="mega mega--sm">
        <Split text={`${n.num} / ${t(n.label)}`} />
      </h2>
      <p className="statement statement--narrow">
        <Split text={t(UI.peopleStatement)} delay={3} />
      </p>
      <p className="people__lead">{t(UI.peopleText)}</p>
      <div className="specimens">
        {MEMBERS.map((m, i) => (
          <Specimen key={m.id} m={m} i={i} />
        ))}
      </div>
    </section>
  );
}
