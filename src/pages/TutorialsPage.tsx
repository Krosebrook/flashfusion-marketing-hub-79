import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';
import { Play } from 'lucide-react';

const tutorials = [
  { title: 'Getting Started with AI Image Generation', duration: '5 min', thumbnail: '1' },
  { title: 'Creating Your First Video', duration: '8 min', thumbnail: '2' },
  { title: 'Mastering Style Transfer', duration: '6 min', thumbnail: '3' },
  { title: 'Advanced Prompting Techniques', duration: '10 min', thumbnail: '4' },
];

export default function TutorialsPage() {
  return (
    <>
      <SEO title="Tutorials" description="Learn FlashFusion with video tutorials." url="/tutorials" />
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4"><span className="gradient-text">Tutorials</span></h1>
            <p className="text-lg text-muted-foreground">Learn FlashFusion step by step.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {tutorials.map((t, i) => (
              <motion.div key={t.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="glass-card overflow-hidden group cursor-pointer hover:border-primary/50 transition-colors">
                <div className="aspect-video bg-muted flex items-center justify-center relative">
                  <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="h-8 w-8 text-primary-foreground ml-1" />
                  </div>
                  <span className="absolute bottom-2 right-2 px-2 py-1 bg-background/80 rounded text-xs">{t.duration}</span>
                </div>
                <div className="p-4"><h3 className="font-semibold">{t.title}</h3></div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
