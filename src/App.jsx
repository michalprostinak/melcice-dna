import { lazy, Suspense, useEffect, useState } from 'react';
import { hasWebGL } from './lib/store';
import { UI, useLang } from './i18n';
import { startLoop } from './lib/loop';
import DnaFallback from './components/dna/DnaFallback';
import Nav from './components/ui/Nav';
import Hero from './components/sections/Hero';
import Origin from './components/sections/Origin';
import About from './components/sections/About';
import Footer from './components/sections/Footer';

const DnaCanvas = lazy(() => import('./components/dna/DnaCanvas'));

export default function App() {
  const [webgl] = useState(() => hasWebGL());
  const { t } = useLang();

  useEffect(() => {
    const stop = startLoop();
    // Never leave the hero text hidden if the 3D layer is slow or missing.
    const t = setTimeout(() => document.documentElement.classList.add('dna-ready'), webgl ? 3500 : 300);
    return () => {
      stop();
      clearTimeout(t);
    };
  }, [webgl]);

  return (
    <>
      <a className="skip" href="#main">
        {t(UI.skip)}
      </a>
      <div className="dna-layer" aria-hidden="true">
        {webgl ? (
          <Suspense fallback={null}>
            <DnaCanvas />
          </Suspense>
        ) : (
          <DnaFallback />
        )}
      </div>
      <Nav />
      <main id="main" tabIndex={-1}>
        <Hero />
        <Origin />
        <About />
      </main>
      <Footer />
    </>
  );
}
