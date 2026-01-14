import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Sparkles, Wand2, Image as ImageIcon, Video, ArrowRight } from 'lucide-react';

const tools = [
  {
    icon: Sparkles,
    title: 'AI Image Generator',
    description: 'Create stunning images from text prompts',
    href: '/demo/ai-creation',
  },
  {
    icon: Video,
    title: 'Video Creator',
    description: 'Generate and edit videos with AI',
    href: '/demo/ai-creation',
  },
  {
    icon: Wand2,
    title: 'Style Transfer',
    description: 'Apply artistic styles to your images',
    href: '/demo/ai-creation',
  },
  {
    icon: ImageIcon,
    title: 'Background Remover',
    description: 'Remove backgrounds instantly',
    href: '/demo/ai-creation',
  },
];

export default function DemoPage() {
  const { user } = useAuth();

  return (
    <>
      <SEO 
        title="Demo"
        description="Try FlashFusion's AI-powered creative tools. Generate images, create videos, and more."
        url="/demo"
      />

      <div className="min-h-[calc(100vh-5rem)] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Welcome to <span className="gradient-text">FlashFusion</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {user ? (
                <>Hello, {user.email}! Choose a tool to start creating.</>
              ) : (
                <>Explore our AI-powered creative tools below.</>
              )}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link to={tool.href}>
                  <div className="glass-card p-6 h-full hover:border-primary/50 transition-all group cursor-pointer">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/20 transition-shadow shrink-0">
                        <tool.icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                          {tool.title}
                        </h3>
                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                      </div>
                      <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 glass-card p-6 max-w-2xl mx-auto"
          >
            <h2 className="font-semibold mb-4">Your Stats</h2>
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold gradient-text">0</p>
                <p className="text-sm text-muted-foreground">Projects</p>
              </div>
              <div>
                <p className="text-2xl font-bold gradient-text">0</p>
                <p className="text-sm text-muted-foreground">Images</p>
              </div>
              <div>
                <p className="text-2xl font-bold gradient-text">∞</p>
                <p className="text-sm text-muted-foreground">Credits</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
