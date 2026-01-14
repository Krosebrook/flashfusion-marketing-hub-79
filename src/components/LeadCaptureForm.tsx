import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { supabase } from '@/integrations/supabase/client';
import { track } from '@/lib/track';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';

const leadSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
});

type LeadFormData = z.infer<typeof leadSchema>;

interface LeadCaptureFormProps {
  source: string;
  buttonText?: string;
  showName?: boolean;
  className?: string;
  onSuccess?: () => void;
}

// Simple client-side rate limiting
const RATE_LIMIT_KEY = 'lead_submit_timestamps';
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 3; // Max 3 submissions per minute

function checkRateLimit(): boolean {
  const now = Date.now();
  const stored = localStorage.getItem(RATE_LIMIT_KEY);
  const timestamps: number[] = stored ? JSON.parse(stored) : [];
  
  // Filter to only recent timestamps
  const recent = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
  
  if (recent.length >= RATE_LIMIT_MAX) {
    return false;
  }
  
  // Add new timestamp
  recent.push(now);
  localStorage.setItem(RATE_LIMIT_KEY, JSON.stringify(recent));
  return true;
}

export function LeadCaptureForm({
  source,
  buttonText = 'Get Started',
  showName = true,
  className = '',
  onSuccess,
}: LeadCaptureFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    defaultValues: {
      email: '',
      name: '',
    },
  });

  const onSubmit = async (data: LeadFormData) => {
    // Check rate limit
    if (!checkRateLimit()) {
      setStatus('error');
      setErrorMessage('Too many requests. Please try again later.');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      const { error } = await supabase.from('leads').insert({
        email: data.email,
        name: showName ? data.name : null,
        source,
      });

      if (error) {
        if (error.code === '23505') {
          // Duplicate email
          setStatus('success'); // Still show success to avoid leaking info
          track('lead_submit', { source, status: 'duplicate' });
        } else {
          throw error;
        }
      } else {
        setStatus('success');
        track('lead_submit', { source, status: 'new' });
      }

      reset();
      onSuccess?.();
    } catch (err) {
      console.error('Lead submission error:', err);
      setStatus('error');
      setErrorMessage('Something went wrong. Please try again.');
    }
  };

  if (status === 'success') {
    return (
      <div className={`flex items-center gap-3 p-4 rounded-xl bg-success/10 border border-success/20 ${className}`}>
        <CheckCircle className="h-5 w-5 text-success shrink-0" />
        <p className="text-sm">Thanks! We'll be in touch soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={`space-y-4 ${className}`}>
      {showName && (
        <div>
          <Input
            {...register('name')}
            placeholder="Your name"
            className="h-12"
            disabled={status === 'loading'}
          />
          {errors.name && (
            <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>
      )}
      
      <div>
        <Input
          {...register('email')}
          type="email"
          placeholder="your@email.com"
          className="h-12"
          disabled={status === 'loading'}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      {status === 'error' && (
        <div className="flex items-center gap-2 text-sm text-destructive">
          <AlertCircle className="h-4 w-4" />
          {errorMessage}
        </div>
      )}

      <Button
        type="submit"
        size="lg"
        variant="hero"
        className="w-full"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Submitting...
          </>
        ) : (
          buttonText
        )}
      </Button>
    </form>
  );
}
