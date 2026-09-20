import { useEffect, useRef, useState } from 'react';
import { SITE } from '../../data/site';
import { UI, useLang } from '../../i18n';
import { sync } from '../../lib/store';

const OPTIONS = [
  { code: 'sk', label: 'Slovenčina' },
  { code: 'en', label: 'English' },
];

/* Shown once, on the very first visit, before the site is revealed. */
export default function LangGate() {
  const { needsChoice, chooseLang } = useLang();
  const [phase, setPhase] = useState(needsChoice ? 'open' : 'gone');
  const firstBtn = useRef(null);

  useEffect(() => {
    if (phase !== 'open') return;
    const root = document.documentElement;
    root.classList.add('gate-open');
    if (sync.lenis) sync.lenis.stop();
    const behind = document.querySelectorAll('main, footer.footer, .nav, .rail, .skip');
    behind.forEach((el) => el.setAttribute('inert', ''));
    if (firstBtn.current) firstBtn.current.focus();
    return () => {
      root.classList.remove('gate-open');
      behind.forEach((el) => el.removeAttribute('inert'));
      if (sync.lenis) sync.lenis.start();
    };
  }, [phase]);

  if (phase === 'gone') return null;

  const pick = (code) => {
    window.scrollTo(0, 0);
    setPhase('leaving');
    chooseLang(code);
    setTimeout(() => setPhase('gone'), 750);
  };

  return (
    <div className={`gate ${phase === 'leaving' ? 'is-leaving' : ''}`} role="dialog" aria-modal="true" aria-labelledby="gate-title">
      <div className="gate__inner">
        <p className="gate__brand">{SITE.brand}</p>
        <h2 id="gate-title" className="gate__title">
          {UI.gateTitle.sk}
          <span>{UI.gateTitle.en}</span>
        </h2>
        <div className="gate__choices">
          {OPTIONS.map((o, i) => (
            <button
              key={o.code}
              ref={i === 0 ? firstBtn : null}
              lang={o.code}
              type="button"
              className={`btn ${i === 0 ? 'btn--solid' : 'btn--ghost'} btn--lg`}
              onClick={() => pick(o.code)}
            >
              <span className="btn__label">{o.label}</span>
              <span className="btn__arrow" aria-hidden="true">→</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
