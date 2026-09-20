import { SITE } from '../../data/site';

export default function Footer() {
  return (
    <footer className="footer">
      <p>
        © {new Date().getFullYear()} {SITE.owner} × Hack Club × {SITE.school.replace(' Melčice-Lieskové', '')}
      </p>
    </footer>
  );
}
