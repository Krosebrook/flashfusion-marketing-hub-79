import { SEO } from '@/components/SEO';
import { Shield, Lock, Eye, Server } from 'lucide-react';
export default function SecurityPage() {
  const items = [
    { icon: Lock, title: 'Encryption', desc: 'All data encrypted in transit (TLS 1.3) and at rest (AES-256).' },
    { icon: Shield, title: 'SOC 2 Compliant', desc: 'We maintain SOC 2 Type II compliance for enterprise security.' },
    { icon: Eye, title: 'Privacy First', desc: 'We never use your content to train AI models.' },
    { icon: Server, title: 'Secure Infrastructure', desc: 'Hosted on enterprise-grade cloud infrastructure.' },
  ];
  return (
    <>
      <SEO title="Security" description="FlashFusion security practices." url="/security" />
      <section className="py-20 md:py-32"><div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4"><span className="gradient-text">Security</span></h1>
          <p className="text-lg text-muted-foreground">Your security is our top priority.</p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          {items.map(i => (
            <div key={i.title} className="glass-card p-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4"><i.icon className="h-6 w-6 text-primary" /></div>
              <h3 className="font-semibold mb-2">{i.title}</h3>
              <p className="text-sm text-muted-foreground">{i.desc}</p>
            </div>
          ))}
        </div>
      </div></section>
    </>
  );
}
