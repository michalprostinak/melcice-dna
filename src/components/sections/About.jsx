import { CATEGORIES, NODES } from '../../data/site';
import { UI, useLang } from '../../i18n';
import { codonOf } from '../../lib/util';
import { useScramble } from '../../hooks/hooks';
import Split from '../ui/Split';

function Gene({ tag }) {
  const label = `<${tag} />`;
  const [text, run] = useScramble(label);
  return (
    <li className="gene" tabIndex={0} onPointerEnter={run} onFocus={run}>
      <span className="gene__tag">{text}</span>
      <span className="gene__codon">{codonOf(tag)}</span>
    </li>
  );
}

export default function About() {
  const { t } = useLang();
  const n = NODES[2];
  return (
    <section id="about" data-node="2" className="sec sec--left">
      <div className="sec__col sec__col--wide">
        <h2 className="mega mega--sm">
          <Split text={`${n.num} / ${t(n.label)}`} />
        </h2>
        <p className="statement">
          <Split text={t(UI.codeStatement)} delay={3} />
        </p>
        <div className="about-categories">
          {CATEGORIES.map((c, i) => (
            <div className="about-category" key={c.key}>
              <h3>
                <span>{i + 1}.</span>
                {t(c.title)}
              </h3>
              <p>{t(c.desc)}</p>
              <ul className="genes" aria-label={t(c.title)}>
                {c.items.map((item) => (
                  <Gene key={typeof item === 'string' ? item : item.sk} tag={t(item).toUpperCase()} />
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
