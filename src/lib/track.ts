// Analytics tracking library with pluggable providers
// Supports GA4 via gtag with consent management

type EventName = 
  | 'cta_click'
  | 'scroll_depth'
  | 'lead_submit'
  | 'pricing_view'
  | 'waitlist_confirmed'
  | 'page_view'
  | 'download_click';

type EventProperties = Record<string, string | number | boolean>;

interface AnalyticsProvider {
  track: (event: EventName, properties?: EventProperties) => void;
  page: (path: string, title: string) => void;
  identify: (userId: string, traits?: Record<string, string>) => void;
}

// Check if analytics consent was given
export const hasAnalyticsConsent = (): boolean => {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('analytics_consent') === 'accepted';
};

export const setAnalyticsConsent = (accepted: boolean): void => {
  localStorage.setItem('analytics_consent', accepted ? 'accepted' : 'declined');
  if (accepted) {
    initializeGA4();
  }
};

// GA4 Provider
const GA_ID = import.meta.env.VITE_GA_ID;

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const initializeGA4 = (): void => {
  if (!GA_ID || !hasAnalyticsConsent()) return;
  
  // Check if already initialized
  if (window.gtag) return;

  // Load gtag script
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer.push(args);
  };
  
  window.gtag('js', new Date());
  window.gtag('config', GA_ID, {
    anonymize_ip: true,
    send_page_view: false, // We'll handle page views manually
  });
};

const ga4Provider: AnalyticsProvider = {
  track: (event, properties) => {
    if (!hasAnalyticsConsent() || !window.gtag) return;
    window.gtag('event', event, properties);
  },
  page: (path, title) => {
    if (!hasAnalyticsConsent() || !window.gtag) return;
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title,
    });
  },
  identify: (userId, traits) => {
    if (!hasAnalyticsConsent() || !window.gtag) return;
    window.gtag('set', 'user_properties', { user_id: userId, ...traits });
  },
};

// Console provider for development
const consoleProvider: AnalyticsProvider = {
  track: (event, properties) => {
    if (import.meta.env.DEV) {
      console.log('[Analytics] Track:', event, properties);
    }
  },
  page: (path, title) => {
    if (import.meta.env.DEV) {
      console.log('[Analytics] Page:', path, title);
    }
  },
  identify: (userId, traits) => {
    if (import.meta.env.DEV) {
      console.log('[Analytics] Identify:', userId, traits);
    }
  },
};

// Composite provider that sends to all providers
const providers: AnalyticsProvider[] = [consoleProvider, ga4Provider];

export const track = (event: EventName, properties?: EventProperties): void => {
  providers.forEach(p => p.track(event, properties));
};

export const trackPage = (path: string, title: string): void => {
  providers.forEach(p => p.page(path, title));
};

export const identify = (userId: string, traits?: Record<string, string>): void => {
  providers.forEach(p => p.identify(userId, traits));
};

// Initialize GA4 if consent already given
if (typeof window !== 'undefined' && hasAnalyticsConsent()) {
  initializeGA4();
}

// Scroll depth tracking utility
export const trackScrollDepth = (): (() => void) => {
  let maxDepth = 0;
  const thresholds = [25, 50, 75, 100];
  
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const currentDepth = Math.round((window.scrollY / scrollHeight) * 100);
    
    thresholds.forEach(threshold => {
      if (currentDepth >= threshold && maxDepth < threshold) {
        track('scroll_depth', { depth: threshold });
      }
    });
    
    maxDepth = Math.max(maxDepth, currentDepth);
  };
  
  window.addEventListener('scroll', handleScroll, { passive: true });
  
  return () => window.removeEventListener('scroll', handleScroll);
};
