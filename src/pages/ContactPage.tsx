import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';
import { LeadCaptureForm } from '@/components/LeadCaptureForm';
import { Mail, MessageCircle, MapPin, Phone } from 'lucide-react';

const contactMethods = [
  {
    icon: Mail,
    title: 'Email',
    description: 'Our team typically responds within 24 hours',
    value: 'hello@flashfusion.ai',
    href: 'mailto:hello@flashfusion.ai',
  },
  {
    icon: MessageCircle,
    title: 'Discord',
    description: 'Join our community for real-time support',
    value: 'Join Discord',
    href: 'https://discord.gg/flashfusion',
  },
  {
    icon: MapPin,
    title: 'Office',
    description: 'Visit us at our headquarters',
    value: 'San Francisco, CA',
    href: '#',
  },
];

export default function ContactPage() {
  return (
    <>
      <SEO 
        title="Contact"
        description="Get in touch with the FlashFusion team. We're here to help with any questions about our AI creative tools."
        url="/contact"
      />

      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get in <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card p-8"
            >
              <h2 className="text-xl font-semibold mb-6">Send us a message</h2>
              <LeadCaptureForm 
                source="contact_page"
                buttonText="Send Message"
                showName={true}
              />
            </motion.div>

            {/* Contact Methods */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              {contactMethods.map((method) => (
                <a
                  key={method.title}
                  href={method.href}
                  target={method.href.startsWith('http') ? '_blank' : undefined}
                  rel={method.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="block glass-card p-6 hover:border-primary/50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <method.icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{method.title}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{method.description}</p>
                      <p className="text-primary font-medium">{method.value}</p>
                    </div>
                  </div>
                </a>
              ))}
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
