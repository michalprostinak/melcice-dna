import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/archivo/wdth.css';
import '@fontsource/ibm-plex-mono/latin-400.css';
import '@fontsource/ibm-plex-mono/latin-ext-400.css';
import '@fontsource/ibm-plex-mono/latin-500.css';
import '@fontsource/ibm-plex-mono/latin-ext-500.css';
import './styles/global.css';
import App from './App';
import { LangProvider } from './i18n';
import { EVENTS, MEMBERS } from './data/site';
import { validateContent } from './data/validate';

if (import.meta.env.DEV) validateContent({ EVENTS, MEMBERS }).forEach((p) => console.warn('[site.js]', p));

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>
);
