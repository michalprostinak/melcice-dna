import { NODES, TECH } from '../../data/site';
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

const PRINCIPLES = [
  ['pCreate', 'createLine'],
  ['pLearn', 'learnLine'],
  ['pShare', 'shareLine'],
  ['pShip', 'shipLine'],
];

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
        <ul className="genes" aria-label={t(UI.technologies)}>
          {TECH.map((x) => (
            <Gene key={x.key} tag={x.tag} />
          ))}
        </ul>
        <ul className="principles">
          {PRINCIPLES.map(([h, l]) => (
            <li key={h}>
              <h3>{t(UI[h])}</h3>
              <p>{t(UI[l])}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
