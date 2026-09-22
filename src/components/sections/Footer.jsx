import { SITE } from '../../data/site';
import { UI, useLang } from '../../i18n';
import Split from '../ui/Split';

export default function Footer() {
  const { t } = useLang();
  return (
    <footer className="footer">
      <h2 className="mega mega--footer">
        <Split text={t(UI.footerTitle)} />
      </h2>
      <p className="footer__text">
        {t(UI.footerText).split('{school}')[0]}
        <strong>{SITE.school}</strong>
        {t(UI.footerText).split('{school}')[1]}
      </p>
      <div className="footer__bottom">
        <p>© {new Date().getFullYear()} {SITE.brand}</p>
        <p>Hack Club × {SITE.schoolShort} × Komunita</p>
      </div>
    </footer>
  );
}
