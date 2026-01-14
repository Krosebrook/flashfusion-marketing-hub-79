import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { DOWNLOAD_URLS } from '@/lib/constants';
import { track } from '@/lib/track';
import { Download, Apple, Monitor, Smartphone, ExternalLink } from 'lucide-react';

type Platform = 'windows' | 'macos' | 'macosArm' | 'linux' | 'ios' | 'android' | 'unknown';

interface PlatformInfo {
  platform: Platform;
  label: string;
  icon: typeof Download;
  url: string;
  secondary?: {
    label: string;
    platform: Platform;
    url: string;
  };
}

function detectPlatform(): Platform {
  if (typeof window === 'undefined') return 'unknown';
  
  const userAgent = navigator.userAgent.toLowerCase();
  const platform = navigator.platform?.toLowerCase() || '';
  
  // Check for mobile first
  if (/iphone|ipad|ipod/.test(userAgent)) return 'ios';
  if (/android/.test(userAgent)) return 'android';
  
  // Desktop platforms
  if (/mac/.test(platform)) {
    // Check for Apple Silicon (M1/M2/M3)
    // This is a rough heuristic - proper detection requires more complex checks
    return 'macos';
  }
  if (/win/.test(platform)) return 'windows';
  if (/linux/.test(platform)) return 'linux';
  
  return 'unknown';
}

const PLATFORM_CONFIG: Record<Platform, PlatformInfo> = {
  windows: {
    platform: 'windows',
    label: 'Download for Windows',
    icon: Monitor,
    url: DOWNLOAD_URLS.windows,
  },
  macos: {
    platform: 'macos',
    label: 'Download for Mac',
    icon: Apple,
    url: DOWNLOAD_URLS.macos,
    secondary: {
      label: 'Apple Silicon (M1/M2/M3)',
      platform: 'macosArm',
      url: DOWNLOAD_URLS.macosArm,
    },
  },
  macosArm: {
    platform: 'macosArm',
    label: 'Download for Mac (Apple Silicon)',
    icon: Apple,
    url: DOWNLOAD_URLS.macosArm,
    secondary: {
      label: 'Intel Mac',
      platform: 'macos',
      url: DOWNLOAD_URLS.macos,
    },
  },
  linux: {
    platform: 'linux',
    label: 'Download for Linux',
    icon: Monitor,
    url: DOWNLOAD_URLS.linux,
  },
  ios: {
    platform: 'ios',
    label: 'Download on App Store',
    icon: Apple,
    url: DOWNLOAD_URLS.ios,
  },
  android: {
    platform: 'android',
    label: 'Get on Google Play',
    icon: Smartphone,
    url: DOWNLOAD_URLS.android,
  },
  unknown: {
    platform: 'unknown',
    label: 'Try Web App',
    icon: ExternalLink,
    url: DOWNLOAD_URLS.webApp,
  },
};

interface SmartDownloadButtonProps {
  className?: string;
  size?: 'default' | 'lg' | 'xl';
  showAllPlatforms?: boolean;
}

export function SmartDownloadButton({
  className = '',
  size = 'lg',
  showAllPlatforms = true,
}: SmartDownloadButtonProps) {
  const [platform, setPlatform] = useState<Platform>('unknown');

  useEffect(() => {
    setPlatform(detectPlatform());
  }, []);

  const config = PLATFORM_CONFIG[platform];
  const Icon = config.icon;

  const handleDownload = (targetPlatform: Platform, url: string) => {
    track('download_click', { platform: targetPlatform });
    window.open(url, '_blank');
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Primary Download Button */}
      <Button
        size={size}
        variant="hero"
        className="w-full gap-3"
        onClick={() => handleDownload(config.platform, config.url)}
      >
        <Icon className="h-5 w-5" />
        {config.label}
      </Button>

      {/* Secondary option for Mac */}
      {config.secondary && (
        <button
          onClick={() => handleDownload(config.secondary!.platform, config.secondary!.url)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4"
        >
          Or download for {config.secondary.label}
        </button>
      )}

      {/* All Platforms */}
      {showAllPlatforms && platform !== 'unknown' && (
        <div className="pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground mb-3">Also available for:</p>
          <div className="flex flex-wrap gap-2">
            {(['windows', 'macos', 'linux', 'ios', 'android'] as Platform[])
              .filter((p) => p !== platform && p !== 'macosArm')
              .map((p) => {
                const pConfig = PLATFORM_CONFIG[p];
                const PIcon = pConfig.icon;
                return (
                  <Button
                    key={p}
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(p, pConfig.url)}
                    className="gap-2"
                  >
                    <PIcon className="h-4 w-4" />
                    {p === 'macos' ? 'Mac' : p.charAt(0).toUpperCase() + p.slice(1)}
                  </Button>
                );
              })}
          </div>
        </div>
      )}

      {/* Web App fallback */}
      <p className="text-center text-sm text-muted-foreground">
        Or{' '}
        <a href={DOWNLOAD_URLS.webApp} className="text-primary hover:underline">
          try the web app
        </a>{' '}
        — no download required
      </p>
    </div>
  );
}
