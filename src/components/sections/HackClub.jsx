import { SITE } from '../../data/site';
import { UI, useLang } from '../../i18n';
import Split from '../ui/Split';

export default function HackClub() {
  const { t } = useLang();
  return (
    <section id="hackclub" data-node="6" className="sec sec--wide hackclub">
      <h2 className="mega mega--sm">
        <Split text={t(UI.hcHeading)} />
      </h2>
      <p className="statement statement--narrow">
        <Split text={t(UI.hcStatement)} delay={3} />
      </p>
      <p className="hc__text">{t(UI.hcText1)}</p>
      <p className="hc__text">{t(UI.hcText2)}</p>
      <ul className="hc__tags">
        {t(UI.hcTags).map((tag) => (
          <li key={tag}>{tag}</li>
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
