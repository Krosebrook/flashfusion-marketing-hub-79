-- Create leads table for capturing marketing leads
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  name TEXT,
  source TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert leads (for lead capture forms)
CREATE POLICY "Allow anonymous insert leads"
ON public.leads
FOR INSERT
TO anon
WITH CHECK (true);

-- Deny all read/update/delete for anonymous users
-- (No SELECT/UPDATE/DELETE policies for anon means they can't do these operations)

-- Allow authenticated users to view only leads (for admin purposes if needed)
CREATE POLICY "Allow authenticated to view leads"
ON public.leads
FOR SELECT
TO authenticated
USING (true);

-- Create index on email for faster lookups
CREATE INDEX idx_leads_email ON public.leads(email);

-- Create index on created_at for time-based queries
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);