import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { CookieConsent } from '@/components/CookieConsent';
import { trackPage, trackScrollDepth } from '@/lib/track';

export function AppShell() {
  const location = useLocation();

  useEffect(() => {
    // Track page views
    trackPage(location.pathname, document.title);
    
    // Track scroll depth
    const cleanup = trackScrollDepth();
    return cleanup;
  }, [location.pathname]);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1 pt-16 md:pt-20">
        <Outlet />
      </main>
      <Footer />
      <CookieConsent />
    </div>
  );
}
