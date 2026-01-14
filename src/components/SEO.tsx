import { Helmet } from 'react-helmet-async';
import { SEO_DEFAULTS } from '@/lib/constants';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article';
  noIndex?: boolean;
}

export function SEO({
  title,
  description = SEO_DEFAULTS.description,
  image = SEO_DEFAULTS.ogImage,
  url,
  type = 'website',
  noIndex = false,
}: SEOProps) {
  const pageTitle = title
    ? SEO_DEFAULTS.titleTemplate.replace('%s', title)
    : SEO_DEFAULTS.defaultTitle;

  const fullUrl = url ? `${SEO_DEFAULTS.siteUrl}${url}` : SEO_DEFAULTS.siteUrl;
  const fullImage = image.startsWith('http') ? image : `${SEO_DEFAULTS.siteUrl}${image}`;

  return (
    <Helmet>
      {/* Basic */}
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      {noIndex && <meta name="robots" content="noindex,nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SEO_DEFAULTS.siteName} />
      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:url" content={fullUrl} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={SEO_DEFAULTS.twitterHandle} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />

      {/* Canonical */}
      <link rel="canonical" href={fullUrl} />
    </Helmet>
  );
}
