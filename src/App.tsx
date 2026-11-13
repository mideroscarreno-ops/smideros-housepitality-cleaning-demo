import { useEffect, useState } from 'react';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HomePage } from './components/HomePage';
import {
  ContactPage,
  OurStoryPage,
  OurWorkPage,
  QuotePage,
  ServiceAreasPage,
} from './components/SecondaryPages';
import { ServiceDetailPage } from './components/ServiceDetailPage';
import { PageRoute, QuotePrefill } from './types';

const VALID_ROUTES: PageRoute[] = [
  'home',
  'residential',
  'commercial',
  'medical-dental',
  'additional-services',
  'our-story',
  'our-work',
  'service-areas',
  'quote',
  'contact',
];

function getInitialRoute(): PageRoute {
  const hash = window.location.hash.replace('#', '') as PageRoute;
  return VALID_ROUTES.includes(hash) ? hash : 'home';
}

export default function App() {
  const [activeRoute, setActiveRoute] = useState<PageRoute>(getInitialRoute);
  const [quotePrefill, setQuotePrefill] = useState<QuotePrefill | undefined>(undefined);

  useEffect(() => {
    const onHashChange = () => {
      const next = getInitialRoute();
      setActiveRoute(next);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const handleNavigate = (route: PageRoute, prefill?: QuotePrefill) => {
    if (prefill) {
      setQuotePrefill(prefill);
    } else if (route !== 'quote') {
      setQuotePrefill(undefined);
    }
    setActiveRoute(route);
    window.location.hash = route;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FCF9F3] text-[#29342F]">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#23483F] focus:text-[#FCF9F3] focus:rounded-md"
      >
        Skip to main content
      </a>

      <Header activeRoute={activeRoute} onNavigate={handleNavigate} />

      <main id="main-content" className="flex-1">
        {activeRoute === 'home' && <HomePage onNavigate={handleNavigate} />}

        {(activeRoute === 'residential' ||
          activeRoute === 'commercial' ||
          activeRoute === 'medical-dental' ||
          activeRoute === 'additional-services') && (
          <ServiceDetailPage route={activeRoute} onNavigate={handleNavigate} />
        )}

        {activeRoute === 'our-story' && <OurStoryPage onNavigate={handleNavigate} />}

        {activeRoute === 'our-work' && <OurWorkPage onNavigate={handleNavigate} />}

        {activeRoute === 'service-areas' && (
          <ServiceAreasPage onNavigate={handleNavigate} />
        )}

        {activeRoute === 'quote' && (
          <QuotePage prefill={quotePrefill} onNavigate={handleNavigate} />
        )}

        {activeRoute === 'contact' && <ContactPage onNavigate={handleNavigate} />}
      </main>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
