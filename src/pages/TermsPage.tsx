import { SEO } from '@/components/SEO';
export default function TermsPage() {
  return (
    <>
      <SEO title="Terms of Service" description="FlashFusion terms of service." url="/terms" />
      <section className="py-20 md:py-32"><div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
        <div className="prose prose-invert max-w-none text-muted-foreground space-y-4">
          <p>Last updated: January 2026</p>
          <p>By using FlashFusion, you agree to these terms. Please read them carefully.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">Use of Service</h2>
          <p>You may use FlashFusion for personal and commercial purposes subject to these terms and our acceptable use policy.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">Content Ownership</h2>
          <p>You retain ownership of content you create. By using our service, you grant us a license to host and display your content.</p>
          <h2 className="text-xl font-semibold text-foreground mt-8">Contact</h2>
          <p>For questions, contact legal@flashfusion.ai</p>
        </div>
      </div></section>
    </>
  );
}
