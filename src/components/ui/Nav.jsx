import { useEffect, useRef, useState } from 'react';
import { NODES, SITE } from '../../data/site';
import { UI, useLang } from '../../i18n';
import { useActive } from '../../hooks/hooks';
import { goTo } from '../../lib/nav';
import { sync } from '../../lib/store';

const LINKS = [
  { key: 'navPeople', id: 'people' },
  { key: 'navEvents', id: 'events' },
  { key: 'navHack', id: 'hackclub' },
];

export default function Nav() {
  const active = useActive();
  const { lang, setLang, t } = useLang();
  const [open, setOpen] = useState(false);
  const btnRef = useRef(null);
  const panelRef = useRef(null);
  const wasOpen = useRef(false);
  const keepFocus = useRef(false); // true when the menu closed because a link was chosen

  useEffect(() => {
    if (sync.lenis) open ? sync.lenis.stop() : sync.lenis.start();
    document.documentElement.classList.toggle('menu-open', open);
    // Everything behind the open menu becomes non-interactive (focus + AT).
    document.querySelectorAll('main, footer.footer, .rail, .skip').forEach((el) => {
      if (open) el.setAttribute('inert', '');
      else el.removeAttribute('inert');
    });
    if (open) {
      const first = panelRef.current && panelRef.current.querySelector('a');
      if (first) first.focus();
    } else if (wasOpen.current && !keepFocus.current && btnRef.current) {
      btnRef.current.focus(); // return focus to the menu button
    }
    wasOpen.current = open;
    keepFocus.current = false;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const go = (id) => (e) => {
    e.preventDefault();
    keepFocus.current = true;
    setOpen(false);
    setTimeout(() => goTo(id), open ? 60 : 0);
  };

  return (
    <>
      <header className="nav">
        <a className="nav__brand" href="#top" onClick={go('top')} aria-label={`${SITE.name} — ${t(UI.backTop)}`}>
          {SITE.brand}
        </a>
        <nav className="nav__links" aria-label={t(UI.navPrimary)}>
          {LINKS.map((l) => (
            <a key={l.id} href={`#${l.id}`} onClick={go(l.id)}>
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
        <button ref={btnRef} className="nav__index" aria-expanded={open} aria-controls="index-panel" onClick={() => setOpen((o) => !o)}>
          {open ? t(UI.close) : t(UI.menu)}
        </button>
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

      <div id="index-panel" ref={panelRef} className={`index ${open ? 'is-open' : ''}`} inert={!open} role="dialog" aria-label={t(UI.menuPanel)}>
        <ol>
          {NODES.map((n, i) => (
            <li key={n.id}>
              <a href={`#${n.id}`} onClick={go(n.id)} className={i === active ? 'is-active' : ''}>
                <span className="tnum">{n.num}</span>
                {t(n.label)}
              </a>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}
