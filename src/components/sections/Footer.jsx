import { SITE } from '../../data/site';
import { UI, useLang } from '../../i18n';
import { goTo } from '../../lib/nav';

const LINKS = [
  ['navHome', 'top'],
  ['navPeople', 'people'],
  ['navEvents', 'events'],
];

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <a className="footer__logo" href="#top" onClick={(e) => (e.preventDefault(), goTo('top'))}>
        <span className="nav__mark" aria-hidden="true" /> {SITE.name}
      </a>
      <nav aria-label={t(UI.navFooter)}>
        {LINKS.map(([k, id]) => (
          <a key={id} href={`#${id}`} onClick={(e) => (e.preventDefault(), goTo(id))}>
            {t(UI[k])}
          </a>
        ))}
        <a href={SITE.githubUrl} target="_blank" rel="noopener noreferrer">
          GitHub
        </a>
      </nav>
      <p className="meta">{t(UI.footerTag)}</p>
    </footer>
  );
}
