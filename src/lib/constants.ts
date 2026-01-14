// Download URLs - configure these based on your distribution
export const DOWNLOAD_URLS = {
  windows: 'https://github.com/flashfusion/releases/latest/download/FlashFusion-Setup.exe',
  macos: 'https://github.com/flashfusion/releases/latest/download/FlashFusion.dmg',
  macosArm: 'https://github.com/flashfusion/releases/latest/download/FlashFusion-arm64.dmg',
  linux: 'https://github.com/flashfusion/releases/latest/download/FlashFusion.AppImage',
  ios: 'https://apps.apple.com/app/flashfusion/id123456789',
  android: 'https://play.google.com/store/apps/details?id=com.flashfusion.app',
  webApp: '/demo',
} as const;

// Social links
export const SOCIAL_LINKS = {
  twitter: 'https://twitter.com/flashfusion',
  github: 'https://github.com/flashfusion',
  discord: 'https://discord.gg/flashfusion',
  linkedin: 'https://linkedin.com/company/flashfusion',
} as const;

// Navigation links
export const NAV_LINKS = [
  { label: 'Features', href: '/features' },
  { label: 'Pricing', href: '/pricing' },
  { label: 'Docs', href: '/docs' },
  { label: 'Blog', href: '/blog' },
] as const;

// Footer links organized by section
export const FOOTER_LINKS = {
  product: [
    { label: 'Features', href: '/features' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Demo', href: '/demo' },
    { label: 'Download', href: '/download' },
  ],
  resources: [
    { label: 'Documentation', href: '/docs' },
    { label: 'Tutorials', href: '/tutorials' },
    { label: 'Blog', href: '/blog' },
    { label: 'FAQ', href: '/faq' },
  ],
  company: [
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Security', href: '/security' },
  ],
} as const;

// SEO defaults
export const SEO_DEFAULTS = {
  siteName: 'FlashFusion',
  titleTemplate: '%s | FlashFusion',
  defaultTitle: 'FlashFusion - AI-Powered Creative Studio',
  description: 'Create stunning visuals, videos, and designs in seconds with FlashFusion\'s AI-powered creative suite.',
  siteUrl: 'https://flashfusion.ai',
  twitterHandle: '@flashfusion',
  ogImage: '/og-image.png',
} as const;
