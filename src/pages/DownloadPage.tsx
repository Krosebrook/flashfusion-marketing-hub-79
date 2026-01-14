import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';
import { SmartDownloadButton } from '@/components/SmartDownloadButton';
import { CheckCircle, Monitor, Smartphone, Zap } from 'lucide-react';

const requirements = {
  desktop: [
    'Windows 10 or later (64-bit)',
    'macOS 11 Big Sur or later',
    'Linux Ubuntu 20.04+ or equivalent',
    '8GB RAM (16GB recommended)',
    'GPU with 4GB VRAM for AI features',
  ],
  mobile: [
    'iOS 15.0 or later',
    'Android 10 or later',
    '4GB RAM minimum',
    'A12 Bionic or equivalent',
  ],
};

export default function DownloadPage() {
  return (
    <>
      <SEO 
        title="Download"
        description="Download FlashFusion for Windows, macOS, Linux, iOS, or Android. Create stunning AI content on any device."
        url="/download"
      />

      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Version 2.0 Now Available</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Download <span className="gradient-text">FlashFusion</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Available for all major platforms. Create stunning AI content anywhere.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="max-w-md mx-auto mb-16"
          >
            <div className="glass-card p-8">
              <SmartDownloadButton size="xl" showAllPlatforms={true} />
            </div>
          </motion.div>

          {/* System Requirements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
          >
            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Monitor className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Desktop Requirements</h2>
              </div>
              <ul className="space-y-3">
                {requirements.desktop.map((req) => (
                  <li key={req} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success shrink-0" />
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="glass-card p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <Smartphone className="h-5 w-5 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">Mobile Requirements</h2>
              </div>
              <ul className="space-y-3">
                {requirements.mobile.map((req) => (
                  <li key={req} className="flex items-center gap-2 text-sm">
                    <CheckCircle className="h-4 w-4 text-success shrink-0" />
                    <span className="text-muted-foreground">{req}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
