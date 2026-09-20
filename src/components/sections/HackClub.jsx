import { NODES, SITE } from '../../data/site';
import { UI, useLang } from '../../i18n';
import Split from '../ui/Split';

const ITEMS = [
  ['hcClubsT', 'hcClubs'],
  ['hcCommunityT', 'hcCommunity'],
  ['hcEventsT', 'hcEvents'],
];

export default function HackClub() {
  const { t } = useLang();
  const n = NODES[5];
  return (
    <section id="hackclub" data-node="5" className="sec sec--wide hackclub">
      <h2 className="mega mega--sm">
        <Split text={`${n.num} / ${t(n.label)}`} />
      </h2>
      <p className="statement statement--narrow">{t(UI.hcLead)}</p>
      <ul className="hc">
        {ITEMS.map(([h, p]) => (
          <li key={h}>
            <h3>{t(UI[h])}</h3>
            <p>{t(UI[p])}</p>
          </li>
        ))}
      </ul>
      <p className="hc__note">{t(UI.hcMelcice)}</p>
      <a className="btn btn--solid" href={SITE.hackClubUrl} target="_blank" rel="noopener noreferrer">
        <span className="btn__label">{t(UI.hcLink)}</span>
        <span className="btn__arrow" aria-hidden="true">↗</span>
      </a>
    </section>
  );
}
