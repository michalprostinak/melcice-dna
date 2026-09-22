import { BUILD_AREAS, NODES } from '../../data/site';
import { UI, useLang } from '../../i18n';
import Split from '../ui/Split';

export default function Build() {
  const { t } = useLang();
  const n = NODES[2];
  return (
    <section id="build" data-node="2" className="sec sec--left">
      <div className="sec__col sec__col--wide">
        <h2 className="mega mega--sm">
          <Split text={`${n.num} / ${t(n.label)}`} />
        </h2>
        <p className="statement">
          <Split text={t(UI.buildStatement)} delay={3} />
        </p>
        <p className="build__lead">{t(UI.buildText)}</p>
        <ul className="areas">
          {BUILD_AREAS.map((a) => (
            <li key={a.id}>
              <h3>{t(a.title)}</h3>
              <p>{t(a.text)}</p>
              <ul className="areas__tags">
                {t(a.tags).map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
