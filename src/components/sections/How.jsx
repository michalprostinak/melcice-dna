import { NODES, STEPS } from '../../data/site';
import { UI, useLang } from '../../i18n';
import Split from '../ui/Split';

export default function How() {
  const { t } = useLang();
  const n = NODES[3];
  return (
    <section id="how" data-node="3" className="sec sec--right">
      <div className="sec__col sec__col--wide">
        <h2 className="mega mega--sm">
          <Split text={`${n.num} / ${t(n.label)}`} />
        </h2>
        <p className="statement">
          <Split text={t(UI.howStatement)} delay={3} />
        </p>
        <ol className="steps">
          {STEPS.map((s, i) => (
            <li key={s.title.sk}>
              <span className="steps__num">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3>{t(s.title)}</h3>
                <p>{t(s.text)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
