import { SEO } from '@/components/SEO';
export default function PrivacyPage() {
  return (
    <>
      <SEO title="Privacy Policy" description="FlashFusion privacy policy." url="/privacy" />
      <section className="py-20 md:py-32"><div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
          <p>Last updated: January 2026</p>
          <p>FlashFusion ("we", "our", "us") is committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">Information We Collect</h2>
          <p>We collect information you provide directly, such as account details and content you create. We also collect usage data to improve our services.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">How We Use Information</h2>
          <p>We use your information to provide and improve our services, communicate with you, and ensure platform security.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">Contact</h2>
          <p>For privacy questions, contact us at privacy@flashfusion.ai</p>
        </div>
      </div></section>
    </>
  );
}
