import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';
import { Users, Target, Sparkles, Heart } from 'lucide-react';

const team = [
  { name: 'Alex Chen', role: 'CEO & Co-founder', avatar: 'AC' },
  { name: 'Sarah Kim', role: 'CTO & Co-founder', avatar: 'SK' },
  { name: 'Marcus Johnson', role: 'Head of AI', avatar: 'MJ' },
  { name: 'Emily Rodriguez', role: 'Head of Design', avatar: 'ER' },
];

const values = [
  {
    icon: Sparkles,
    title: 'Innovation First',
    description: 'We push the boundaries of what\'s possible with AI and creative tools.',
  },
  {
    icon: Users,
    title: 'User-Centric',
    description: 'Everything we build starts with understanding our users\' needs.',
  },
  {
    icon: Target,
    title: 'Excellence',
    description: 'We strive for the highest quality in everything we create.',
  },
  {
    icon: Heart,
    title: 'Community',
    description: 'We believe in the power of creative communities to change the world.',
  },
];

export default function AboutPage() {
  return (
    <>
      <SEO 
        title="About Us"
        description="Learn about FlashFusion's mission to democratize creative tools with AI. Meet our team and discover our story."
        url="/about"
      />

      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Hero */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-20"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Democratizing <span className="gradient-text">Creativity</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              We believe everyone has creative potential. FlashFusion was built to unlock it, 
              using AI to remove technical barriers and let ideas flow freely.
            </p>
          </motion.div>

          {/* Story */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-8 md:p-12 max-w-4xl mx-auto mb-20"
          >
            <h2 className="text-2xl font-bold mb-6">Our Story</h2>
            <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
              <p>
                FlashFusion started in 2023 when our founders—designers and AI researchers—realized 
                that the creative tools available were either too complex for beginners or too limited 
                for professionals.
              </p>
              <p>
                We set out to build something different: a platform that combines the power of 
                cutting-edge AI with an intuitive interface that anyone can use. The result is 
                FlashFusion—a creative suite that helps you go from idea to finished work in seconds.
              </p>
              <p>
                Today, over 500,000 creators use FlashFusion to bring their ideas to life. From 
                social media content to professional marketing materials, our community creates 
                millions of images and videos every month.
              </p>
            </div>
          </motion.div>

          {/* Values */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-20"
          >
            <h2 className="text-2xl font-bold text-center mb-10">Our Values</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => (
                <div key={value.title} className="glass-card p-6 text-center">
                  <div className="w-12 h-12 mx-auto rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4">
                    <value.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold mb-2">{value.title}</h3>
                  <p className="text-sm text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Team */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2 className="text-2xl font-bold text-center mb-10">Our Team</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {team.map((member) => (
                <div key={member.name} className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xl font-bold text-primary-foreground">
                    {member.avatar}
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
