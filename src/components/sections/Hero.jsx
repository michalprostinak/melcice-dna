import { useEffect, useRef } from 'react';
import { SITE } from '../../data/site';
import { UI, useLang } from '../../i18n';
import { goTo } from '../../lib/nav';
import { sync } from '../../lib/store';

export default function Hero() {
  const ref = useRef(null);
  const { t } = useLang();

  // Touch: drag anywhere on the hero to spin the helix with inertia.
  useEffect(() => {
    const el = ref.current;
    let down = false;
    let lx = 0;
    const pd = (e) => {
      if (e.pointerType === 'mouse') return;
      down = true;
      lx = e.clientX;
    };
    const pm = (e) => {
      if (!down) return;
      sync.dragVel += (e.clientX - lx) * 0.03;
      lx = e.clientX;
    };
    const pu = () => (down = false);
    el.addEventListener('pointerdown', pd);
    el.addEventListener('pointermove', pm);
    window.addEventListener('pointerup', pu);
    window.addEventListener('pointercancel', pu);
    return () => {
      el.removeEventListener('pointerdown', pd);
      el.removeEventListener('pointermove', pm);
      window.removeEventListener('pointerup', pu);
      window.removeEventListener('pointercancel', pu);
    };
  }, []);

  return (
    <section id="top" data-node="0" className="hero" ref={ref}>
      <div className="hero__top">
        <span className="meta">{t(UI.heroPlace)}</span>
        <span className="meta">{SITE.domain}</span>
      </div>

      <div className="hero__body">
        <h1 className="hero__title" aria-label={SITE.name}>
          {SITE.brandLines.map((line) => (
            <span className="hero__mask" aria-hidden="true" key={line}>
              <span>{line}</span>
            </span>
          ))}
        </h1>
        <p className="hero__lead">{t(UI.heroLead)}</p>
        <div className="hero__cta">
          <button type="button" className="btn btn--solid" onClick={() => goTo('code')}>
            <span className="btn__label">{t(UI.explore)}</span>
            <span className="btn__arrow" aria-hidden="true">→</span>
          </button>
        </div>
      </div>

      <div className="hero__foot meta">
        <span className="hero__scroll">
          <i aria-hidden="true" />
          {sync.coarse ? t(UI.dragHint) : t(UI.scrollHint)}
        </span>
        <span>{t(UI.madeInShort)}</span>
      </div>
    </section>
  );
}
