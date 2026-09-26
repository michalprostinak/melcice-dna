import { NODES, SITE } from '../../data/site';
import { UI, useLang } from '../../i18n';
import { useActive } from '../../hooks/hooks';
import { goTo } from '../../lib/nav';

/* External, static pages — not part of the one-page scroll. */
const LINKS = [
  { key: 'navProjects', href: '/projects.html' },
  { key: 'navSchedule', href: '/schedule.html' },
];

export default function Nav() {
  const active = useActive();
  const { lang, setLang, t } = useLang();

  const go = (id) => (e) => {
    e.preventDefault();
    goTo(id);
  };

  return (
    <>
      <header className="nav">
        <a className="nav__brand" href="#top" onClick={go('top')} aria-label={`${SITE.name} — ${t(UI.backTop)}`}>
          {SITE.brand}
        </a>
        <nav className="nav__links" aria-label={t(UI.navPrimary)}>
          {LINKS.map((l) => (
            <a key={l.key} href={l.href} target="_blank" rel="noopener noreferrer">
              {t(UI[l.key])}
            </a>
          ))}
        </nav>
        <div className="lang" role="group" aria-label={t(UI.language)}>
          {['sk', 'en'].map((l) => (
            <button key={l} className={lang === l ? 'is-on' : ''} aria-pressed={lang === l} onClick={() => setLang(l)}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      {/* Desktop: the DNA rail. Each tick is a node of the helix. */}
      <nav className="rail" aria-label={t(UI.navSections)}>
        {NODES.map((n, i) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={`rail__tick ${i === active ? 'is-active' : ''}`}
            onClick={go(n.id)}
            aria-label={`${n.num} ${t(n.label)}`}
            aria-current={i === active ? 'true' : undefined}
          >
            <span className="rail__label">{i === 0 ? t(n.label) : `${n.num} ${t(n.label)}`}</span>
            <span className="rail__dot" />
          </a>
        ))}
      </nav>
    </>
  );
}
