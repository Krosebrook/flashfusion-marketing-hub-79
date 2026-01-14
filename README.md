# FlashFusion Marketing Site

AI-powered creative studio marketing website built with React + Vite + TypeScript.

## Features

- 17 routes with React Router v6
- Auth (email/password + magic link) with protected routes
- Lead capture form with rate limiting
- Analytics with GA4 support + consent banner
- Platform-aware download button
- SEO with react-helmet-async (OpenGraph + Twitter)
- Global error boundary + 404 page

## Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_anon_key
VITE_GA_ID=G-XXXXXXXXXX  # Optional: Google Analytics 4
```

## Database Schema

The `leads` table stores captured leads with RLS policies allowing anonymous insert only.

## Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run test      # Run tests
```
