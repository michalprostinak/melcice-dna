import { MEMBERS, NODES } from '../../data/site';
import { UI, useLang } from '../../i18n';
import Split from '../ui/Split';

function Specimen({ m }) {
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
      <h3>{t(m.name)}</h3>
      <p className="specimen__role">{t(m.role)}</p>
      {m.contacts && m.contacts.length > 0 && (
        <ul className="contacts">
          {m.contacts.map((c) => (
            <li key={c.value}>
              {c.type === 'email' ? (
                <a href={`mailto:${c.value}`}>{c.value}</a>
              ) : (
                <a href={c.href} target="_blank" rel="noopener noreferrer">
                  GitHub: {c.value} ↗
                </a>
              )}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

export default function People() {
  const { t } = useLang();
  return (
    <section id="people" data-node="6" className="sec sec--wide">
      <p className="meta">
        {NODES[6].num} / {t(NODES[6].label)}
      </p>
      <h2 className="mega mega--people">
        <Split text={t(UI.peopleTitle)} />
      </h2>
      <div className="specimens">
        {MEMBERS.map((m) => (
          <Specimen key={m.id} m={m} />
        ))}
      </div>
    </section>
  );
}
