import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { track } from '@/lib/track';
import {
  Zap,
  Sparkles,
  Layers,
  Palette,
  Video,
  Image as ImageIcon,
  ArrowRight,
  Star,
  CheckCircle,
  Play,
} from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI Image Generation',
    description: 'Create stunning visuals from text prompts in seconds with our advanced AI models.',
  },
  {
    icon: Video,
    title: 'Video Creation',
    description: 'Generate and edit videos with AI-powered tools. No editing experience needed.',
  },
  {
    icon: Palette,
    title: 'Design Suite',
    description: 'Full-featured design tools with templates, assets, and AI assistance.',
  },
  {
    icon: Layers,
    title: 'Brand Kit',
    description: 'Maintain consistency with custom brand colors, fonts, and style guides.',
  },
];

const testimonials = [
  {
    name: 'Sarah Chen',
    role: 'Creative Director',
    company: 'Pixel Studios',
    content: 'FlashFusion has completely transformed our creative workflow. What used to take days now takes minutes.',
    avatar: 'SC',
  },
  {
    name: 'Marcus Johnson',
    role: 'Founder',
    company: 'StartupLab',
    content: 'The AI capabilities are incredible. It\'s like having a full design team at my fingertips.',
    avatar: 'MJ',
  },
  {
    name: 'Emily Rodriguez',
    role: 'Marketing Lead',
    company: 'GrowthCo',
    content: 'We\'ve 10x\'d our content output without sacrificing quality. Absolutely essential tool.',
    avatar: 'ER',
  },
];

const stats = [
  { value: '10M+', label: 'Images Created' },
  { value: '500K+', label: 'Happy Users' },
  { value: '4.9/5', label: 'User Rating' },
  { value: '99.9%', label: 'Uptime' },
];

export default function HomePage() {
  return (
    <>
      <SEO 
        title="AI-Powered Creative Studio"
        description="Create stunning visuals, videos, and designs in seconds with FlashFusion's AI-powered creative suite. Start free today."
        url="/"
      />

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px] -z-10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8"
            >
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Now with GPT-5 Integration</span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6">
              Create{' '}
              <span className="gradient-text">Stunning Visuals</span>
              <br />
              in Seconds
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
              FlashFusion's AI-powered creative suite helps you generate images, videos, and designs 
              10x faster. No design skills required.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
              <Link to="/signup" onClick={() => track('cta_click', { location: 'hero', action: 'signup' })}>
                <Button size="xl" variant="hero" className="gap-2 w-full sm:w-auto">
                  Start Creating Free
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/demo" onClick={() => track('cta_click', { location: 'hero', action: 'demo' })}>
                <Button size="xl" variant="hero-outline" className="gap-2 w-full sm:w-auto">
                  <Play className="h-5 w-5" />
                  Watch Demo
                </Button>
              </Link>
            </div>

            {/* Social proof */}
            <div className="flex items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <span>Loved by 500K+ creators worldwide</span>
            </div>
          </motion.div>

          {/* Hero Visual */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mt-16 relative"
          >
            <div className="relative mx-auto max-w-5xl">
              {/* Main preview */}
              <div className="glass-card p-2 rounded-2xl shadow-2xl shadow-primary/10">
                <div className="aspect-video bg-gradient-to-br from-muted to-card rounded-xl flex items-center justify-center overflow-hidden">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary via-blue-500 to-accent flex items-center justify-center animate-float">
                      <Sparkles className="h-10 w-10 text-primary-foreground" />
                    </div>
                    <p className="text-muted-foreground">AI Creative Studio Interface</p>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 }}
                className="absolute -left-8 top-1/4 glass-card p-4 rounded-xl hidden lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center">
                    <ImageIcon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Image Generated</p>
                    <p className="text-xs text-muted-foreground">2.3s</p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1 }}
                className="absolute -right-8 bottom-1/4 glass-card p-4 rounded-xl hidden lg:block"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-success/20 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">Export Complete</p>
                    <p className="text-xs text-muted-foreground">4K Resolution</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-y border-border bg-card/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-3xl md:text-4xl font-bold gradient-text">{stat.value}</p>
                <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Everything You Need to{' '}
              <span className="gradient-text">Create</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Powerful AI tools that work together seamlessly. From ideation to export, 
              FlashFusion handles it all.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6 hover:border-primary/50 transition-colors group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-primary/20 transition-shadow">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/features" onClick={() => track('cta_click', { location: 'features_section', action: 'view_all' })}>
              <Button variant="outline" size="lg" className="gap-2">
                View All Features
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 bg-card/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Loved by <span className="gradient-text">Creators</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              See what our community has to say about FlashFusion.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="glass-card p-6"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-foreground mb-6">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-sm font-semibold text-primary-foreground">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{testimonial.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {testimonial.role}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-card p-8 md:p-12 text-center max-w-3xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Transform Your Creative Process?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Join 500,000+ creators using FlashFusion to bring their ideas to life.
            </p>
            
            <LeadCaptureForm 
              source="homepage_cta" 
              buttonText="Get Early Access"
              showName={true}
              className="max-w-md mx-auto"
            />
          </motion.div>
        </div>
      </section>
    </>
  );
}
