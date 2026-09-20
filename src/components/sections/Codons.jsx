import { NODES } from '../../data/site';
import { UI, useLang } from '../../i18n';
import Split from '../ui/Split';

const PANELS = [
  { node: 2, side: 'right', line: 'createLine' },
  { node: 3, side: 'left', line: 'learnLine' },
  { node: 4, side: 'right', line: 'shareLine' },
  { node: 5, side: 'left', line: 'shipLine' },
];

export default function Codons() {
  const { t } = useLang();
  return (
    <>
      {PANELS.map((p) => {
        const n = NODES[p.node];
        return (
          <section key={n.id} id={n.id} data-node={p.node} className={`panel panel--${p.side}`}>
            <div className="panel__col">
              <h2 className="mega mega--panel">
                <Split text={`${n.num} / ${t(n.label)}`} />
              </h2>
              <p className="statement">
                <Split text={t(UI[p.line])} delay={3} />
              </p>
            </div>
          </section>
        );
      })}
    </>
  );
}
