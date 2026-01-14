import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';
import {
  Sparkles,
  Video,
  Palette,
  Layers,
  Wand2,
  Image as ImageIcon,
  Type,
  Brush,
  Scissors,
  Share2,
  Cloud,
  Zap,
} from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: 'AI Image Generation',
    description: 'Create stunning images from text descriptions using state-of-the-art AI models. Perfect for concept art, marketing visuals, and creative projects.',
    gradient: 'from-primary to-blue-500',
  },
  {
    icon: Video,
    title: 'Video Creation',
    description: 'Generate and edit videos with AI assistance. Add effects, transitions, and music to create professional-quality content.',
    gradient: 'from-blue-500 to-accent',
  },
  {
    icon: Wand2,
    title: 'Style Transfer',
    description: 'Apply artistic styles from famous artworks to your images. Transform photos into paintings, sketches, or abstract art.',
    gradient: 'from-accent to-pink-500',
  },
  {
    icon: ImageIcon,
    title: 'Background Removal',
    description: 'Instantly remove backgrounds from any image with pixel-perfect precision. Export with transparency for seamless compositions.',
    gradient: 'from-pink-500 to-primary',
  },
  {
    icon: Type,
    title: 'Text Effects',
    description: 'Create stunning typography with AI-powered text effects, 3D rendering, and animated text for videos and social media.',
    gradient: 'from-primary to-blue-500',
  },
  {
    icon: Brush,
    title: 'Inpainting & Outpainting',
    description: 'Extend images beyond their borders or replace elements within them. AI intelligently fills in new content.',
    gradient: 'from-blue-500 to-accent',
  },
  {
    icon: Palette,
    title: 'Color Grading',
    description: 'Professional color correction and grading tools. Apply cinematic looks or create your own unique color palettes.',
    gradient: 'from-accent to-pink-500',
  },
  {
    icon: Layers,
    title: 'Layer Management',
    description: 'Full layer support with blend modes, masks, and non-destructive editing. Work like a pro with familiar tools.',
    gradient: 'from-pink-500 to-primary',
  },
  {
    icon: Scissors,
    title: 'Smart Cropping',
    description: 'AI-powered cropping that automatically finds the best composition. Resize for any platform with one click.',
    gradient: 'from-primary to-blue-500',
  },
  {
    icon: Share2,
    title: 'One-Click Sharing',
    description: 'Share directly to social media platforms with optimized formats. Generate platform-specific versions automatically.',
    gradient: 'from-blue-500 to-accent',
  },
  {
    icon: Cloud,
    title: 'Cloud Storage',
    description: 'All your projects are automatically saved to the cloud. Access your work from any device, anytime.',
    gradient: 'from-accent to-pink-500',
  },
  {
    icon: Zap,
    title: 'Batch Processing',
    description: 'Process hundreds of images at once. Apply filters, resize, or generate variations in bulk with AI.',
    gradient: 'from-pink-500 to-primary',
  },
];

export default function FeaturesPage() {
  return (
    <>
      <SEO 
        title="Features"
        description="Explore all the powerful AI features in FlashFusion. From image generation to video creation, discover what you can create."
        url="/features"
      />

      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Powerful <span className="gradient-text">Features</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to bring your creative vision to life, powered by cutting-edge AI.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="glass-card p-6 hover:border-primary/50 transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-primary/20 transition-shadow`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
