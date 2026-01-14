import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Link } from 'react-router-dom';

const faqCategories = [
  {
    title: 'General',
    items: [
      {
        question: 'What is FlashFusion?',
        answer: 'FlashFusion is an AI-powered creative suite that helps you create stunning images, videos, and designs in seconds. Our tools use cutting-edge AI to simplify the creative process while maintaining professional quality.',
      },
      {
        question: 'Do I need design experience to use FlashFusion?',
        answer: 'No! FlashFusion is designed to be accessible to everyone. Our AI handles the technical complexity, so you can focus on your creative vision. Whether you\'re a beginner or a professional, you\'ll find tools that match your skill level.',
      },
      {
        question: 'What devices are supported?',
        answer: 'FlashFusion is available on Windows, macOS, Linux, iOS, and Android. We also offer a web version that works in any modern browser.',
      },
    ],
  },
  {
    title: 'Pricing & Plans',
    items: [
      {
        question: 'Is there a free plan?',
        answer: 'Yes! Our free plan includes 50 AI generations per month, basic editing tools, and standard resolution exports. It\'s perfect for trying out FlashFusion and casual use.',
      },
      {
        question: 'Can I cancel my subscription anytime?',
        answer: 'Absolutely. You can cancel your subscription at any time from your account settings. You\'ll continue to have access until the end of your billing period.',
      },
      {
        question: 'Do you offer team discounts?',
        answer: 'Yes, we offer volume discounts for teams of 10 or more. Contact our sales team for custom pricing.',
      },
    ],
  },
  {
    title: 'AI & Technology',
    items: [
      {
        question: 'What AI models does FlashFusion use?',
        answer: 'We use a combination of proprietary models and state-of-the-art open-source models, including variants of Stable Diffusion for image generation. We\'re constantly updating our models to provide the best results.',
      },
      {
        question: 'Can I use generated content commercially?',
        answer: 'Yes, all content generated with FlashFusion is yours to use commercially, subject to our terms of service. Pro and Team plans include commercial usage rights.',
      },
      {
        question: 'How long does it take to generate an image?',
        answer: 'Most images are generated in 2-5 seconds, depending on complexity and current server load. Pro users get priority processing for faster generation times.',
      },
    ],
  },
  {
    title: 'Privacy & Security',
    items: [
      {
        question: 'Is my data safe?',
        answer: 'Yes. We use industry-standard encryption for all data in transit and at rest. Your creations are stored securely and we never share your data with third parties without your consent.',
      },
      {
        question: 'Do you use my images to train AI?',
        answer: 'No, we do not use your generated images or uploaded content to train our AI models. Your creative work remains yours.',
      },
    ],
  },
];

export default function FAQPage() {
  return (
    <>
      <SEO 
        title="FAQ"
        description="Frequently asked questions about FlashFusion. Find answers about pricing, features, AI technology, and more."
        url="/faq"
      />

      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Everything you need to know about FlashFusion.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-12"
          >
            {faqCategories.map((category, categoryIndex) => (
              <div key={category.title}>
                <h2 className="text-xl font-semibold mb-4">{category.title}</h2>
                <div className="glass-card p-2">
                  <Accordion type="single" collapsible>
                    {category.items.map((item, itemIndex) => (
                      <AccordionItem
                        key={itemIndex}
                        value={`${categoryIndex}-${itemIndex}`}
                        className="border-b-0"
                      >
                        <AccordionTrigger className="px-4 py-4 hover:no-underline hover:bg-muted/50 rounded-lg">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4 text-muted-foreground">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground">
              Still have questions?{' '}
              <Link to="/contact" className="text-primary hover:underline">
                Contact our support team
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
