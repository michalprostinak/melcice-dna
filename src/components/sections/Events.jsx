import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { EVENTS, NODES } from '../../data/site';
import { UI, useLang } from '../../i18n';
import { eventTime, formatDate } from '../../lib/util';
import { sync } from '../../lib/store';
import Split from '../ui/Split';

gsap.registerPlugin(ScrollTrigger);

function useCountdown(target) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const s = Math.floor(Math.max(0, target - now) / 1000);
  return {
    done: target <= now,
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

export default function Events() {
  const { lang, t } = useLang();
  const sorted = useMemo(
    () => [...EVENTS].sort((a, b) => eventTime(a.date, a.time) - eventTime(b.date, b.time)),
    []
  );
  const nextEv = sorted.find((e) => eventTime(e.date, e.time) > Date.now());
  const cd = useCountdown(nextEv ? eventTime(nextEv.date, nextEv.time) : 0);
  const line = useRef(null);
  const wrap = useRef(null);

  useLayoutEffect(() => {
    if (sync.reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(line.current, { scaleY: 0 }, {
        scaleY: 1, ease: 'none', transformOrigin: 'top',
        scrollTrigger: { trigger: wrap.current, start: 'top 75%', end: 'bottom 55%', scrub: 0.6 },
      });
    }, wrap);
    return () => ctx.revert();
  }, []);

  const pad = (n) => String(n).padStart(2, '0');
  const n = NODES[5];
  return (
    <section id="events" data-node="5" className="sec sec--wide events">
      <h2 className="mega mega--sm">
        <Split text={`${n.num} / ${t(n.label)}`} />
      </h2>

      <div className="seq" ref={wrap}>
        <span className="seq__line" aria-hidden="true">
          <span ref={line} />
        </span>
        {sorted.map((ev) => {
          const past = eventTime(ev.date, ev.time) <= Date.now();
          const dt = formatDate(ev.date, lang);
          const isNext = ev === nextEv;
          return (
            <article key={ev.id} className={`seq__item ${past ? 'is-past' : 'is-next'}`}>
              <span className="seq__node" aria-hidden="true" />
              <p className="meta">{past ? t(UI.past) : t(UI.upcoming)}</p>
              <p className="seq__date">
                {dt.day} {dt.month} {dt.year}
              </p>
              <h3>{t(ev.title)}</h3>
              {ev.note && <p className="seq__note">{t(ev.note)}</p>}

              {isNext && !cd.done && (
                <p className="countdown__t tnum">
                  {pad(cd.d)}<i>d</i> {pad(cd.h)}<i>h</i> {pad(cd.m)}<i>m</i> {pad(cd.s)}<i>s</i>
                </p>
              )}

              <p className="meta seq__facts">
                {ev.time && `${t(UI.arrival)} ${ev.time}`}
                {ev.start && ` · ${t(UI.start)} ${ev.start}`}
                {!ev.time && !ev.start && `${t(UI.time)}: ${t(UI.tba)}`}
                <br />
                {t(UI.place)}: {ev.place ? t(ev.place) : t(UI.tba)}
              </p>

              {ev.agenda && ev.agenda.length > 0 && (
                <div className="agenda">
                  <p className="meta">{t(UI.whatsHappening)}</p>
                  <ul>
                    {ev.agenda.map((a) => (
                      <li key={t(a)}>{t(a)}</li>
                    ))}
                  </ul>
                </div>
              )}

              {ev.link && (
                <a className="btn btn--ghost btn--sm" href={ev.link} target="_blank" rel="noopener noreferrer">
                  <span className="btn__label">{t(UI.openEvent)}</span>
                  <span className="btn__arrow" aria-hidden="true">↗</span>
                </a>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
