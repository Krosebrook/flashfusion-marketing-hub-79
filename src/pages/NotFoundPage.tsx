import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { Home } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <>
      <SEO title="404 - Page Not Found" noIndex />
      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-8xl font-bold gradient-text mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page not found</h2>
          <p className="text-muted-foreground mb-8">The page you're looking for doesn't exist or has been moved.</p>
          <Link to="/"><Button size="lg" variant="hero" className="gap-2"><Home className="h-4 w-4" />Go Home</Button></Link>
        </div>
      </div>
    </>
  );
}
