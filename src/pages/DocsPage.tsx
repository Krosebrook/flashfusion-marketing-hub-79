import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';
import { Book, Code, Play, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const sections = [
  { icon: Book, title: 'Getting Started', description: 'Learn the basics of FlashFusion', href: '#' },
  { icon: Code, title: 'API Reference', description: 'Integrate FlashFusion into your apps', href: '#' },
  { icon: Play, title: 'Video Tutorials', description: 'Watch step-by-step guides', href: '/tutorials' },
  { icon: FileText, title: 'Changelog', description: 'See what\'s new in each release', href: '#' },
];

export default function DocsPage() {
  return (
    <>
      <SEO title="Documentation" description="FlashFusion documentation and guides." url="/docs" />
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">Documentation</span>
            </h1>
            <p className="text-lg text-muted-foreground">Everything you need to master FlashFusion.</p>
          </motion.div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {sections.map((s, i) => (
              <motion.div key={s.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Link to={s.href} className="block glass-card p-6 hover:border-primary/50 transition-colors">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <s.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{s.title}</h3>
                      <p className="text-sm text-muted-foreground">{s.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
