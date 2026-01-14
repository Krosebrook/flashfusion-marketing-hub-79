import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { track } from '@/lib/track';
import { Check, ArrowRight, Zap, Star } from 'lucide-react';
import { useEffect } from 'react';

const plans = [
  {
    name: 'Free',
    price: '$0',
    period: 'forever',
    description: 'Perfect for trying out FlashFusion',
    features: [
      '50 AI generations/month',
      'Basic editing tools',
      'Standard resolution export',
      'Community support',
    ],
    cta: 'Get Started',
    href: '/signup',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$19',
    period: '/month',
    description: 'For creators who need more power',
    features: [
      'Unlimited AI generations',
      'Advanced editing suite',
      '4K resolution export',
      'Priority support',
      'Custom brand kit',
      'API access',
    ],
    cta: 'Start Pro Trial',
    href: '/signup',
    popular: true,
  },
  {
    name: 'Team',
    price: '$49',
    period: '/user/month',
    description: 'For teams and agencies',
    features: [
      'Everything in Pro',
      'Unlimited team members',
      'Shared asset library',
      'Admin controls',
      'SSO integration',
      'Dedicated support',
    ],
    cta: 'Contact Sales',
    href: '/contact',
    popular: false,
  },
];

export default function PricingPage() {
  useEffect(() => {
    track('pricing_view', { location: 'pricing_page' });
  }, []);

  return (
    <>
      <SEO 
        title="Pricing"
        description="Simple, transparent pricing for FlashFusion. Start free and scale as you grow."
        url="/pricing"
      />

      <section className="py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </h1>
            <p className="text-lg text-muted-foreground">
              Start free and scale as you grow. No hidden fees, cancel anytime.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative glass-card p-8 ${
                  plan.popular ? 'border-primary ring-2 ring-primary/20' : ''
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                      <Star className="h-3 w-3" />
                      Most Popular
                    </div>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">{plan.description}</p>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm">
                      <Check className="h-4 w-4 text-success shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Link 
                  to={plan.href}
                  onClick={() => track('cta_click', { location: 'pricing', plan: plan.name })}
                >
                  <Button
                    variant={plan.popular ? 'hero' : 'outline'}
                    size="lg"
                    className="w-full gap-2"
                  >
                    {plan.cta}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </motion.div>
            ))}
          </div>

          {/* FAQ teaser */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-16"
          >
            <p className="text-muted-foreground">
              Have questions?{' '}
              <Link to="/faq" className="text-primary hover:underline">
                Check our FAQ
              </Link>{' '}
              or{' '}
              <Link to="/contact" className="text-primary hover:underline">
                contact us
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
