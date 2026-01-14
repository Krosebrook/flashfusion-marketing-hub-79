import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const posts = [
  { title: 'Introducing FlashFusion 2.0', excerpt: 'Our biggest update yet with new AI models and features.', date: 'Jan 10, 2026', slug: '#' },
  { title: 'The Future of AI-Powered Design', excerpt: 'How AI is transforming the creative industry.', date: 'Jan 5, 2026', slug: '#' },
  { title: '10 Tips for Better AI Prompts', excerpt: 'Master the art of prompt engineering.', date: 'Dec 28, 2025', slug: '#' },
];

export default function BlogPage() {
  return (
    <>
      <SEO title="Blog" description="FlashFusion blog - news, tips, and insights." url="/blog" />
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4"><span className="gradient-text">Blog</span></h1>
            <p className="text-lg text-muted-foreground">News, tips, and insights from FlashFusion.</p>
          </motion.div>
          <div className="space-y-6">
            {posts.map((p, i) => (
              <motion.article key={p.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
                <Link to={p.slug} className="block glass-card p-6 hover:border-primary/50 transition-colors group">
                  <p className="text-sm text-muted-foreground mb-2">{p.date}</p>
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{p.title}</h2>
                  <p className="text-muted-foreground mb-4">{p.excerpt}</p>
                  <span className="text-primary text-sm font-medium inline-flex items-center gap-1">Read more <ArrowRight className="h-4 w-4" /></span>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
