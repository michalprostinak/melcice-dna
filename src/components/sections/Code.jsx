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

export default function Code() {
  const { t } = useLang();
  const n = NODES[1];
  return (
    <section id="code" data-node="1" className="sec sec--left">
      <div className="sec__col">
        <h2 className="mega">
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
      </div>
    </section>
  );
}
