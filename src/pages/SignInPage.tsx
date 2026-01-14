import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SEO } from '@/components/SEO';
import { useAuth } from '@/contexts/AuthContext';
import { Zap, Loader2, Mail, Lock, ArrowRight, Chrome } from 'lucide-react';

const signInSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignInFormData = z.infer<typeof signInSchema>;

export default function SignInPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn, signInWithMagicLink, signInWithGoogle } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isMagicLinkLoading, setIsMagicLinkLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const [magicLinkSent, setMagicLinkSent] = useState(false);

  const from = (location.state as { from?: { pathname: string } })?.from?.pathname || '/demo';

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<SignInFormData>({
    resolver: zodResolver(signInSchema),
  });

  const email = watch('email');

  const onSubmit = async (data: SignInFormData) => {
    setIsLoading(true);
    setError('');

    const { error } = await signIn(data.email, data.password);

    if (error) {
      setError(error.message);
      setIsLoading(false);
    } else {
      navigate(from, { replace: true });
    }
  };

  const handleMagicLink = async () => {
    if (!email || !email.includes('@')) {
      setError('Please enter a valid email first');
      return;
    }

    setIsMagicLinkLoading(true);
    setError('');

    const { error } = await signInWithMagicLink(email);

    if (error) {
      setError(error.message);
    } else {
      setMagicLinkSent(true);
    }

    setIsMagicLinkLoading(false);
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    setError('');

    const { error } = await signInWithGoogle();

    if (error) {
      setError(error.message);
      setIsGoogleLoading(false);
    }
    // Redirect happens automatically via OAuth flow
  };

  return (
    <>
      <SEO 
        title="Sign In"
        description="Sign in to your FlashFusion account to access your creative projects."
        url="/signin"
        noIndex
      />

      <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary via-blue-500 to-accent flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-2xl font-bold">FlashFusion</span>
          </Link>

          <div className="glass-card p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold mb-2">Welcome back</h1>
              <p className="text-muted-foreground">Sign in to continue to FlashFusion</p>
            </div>

            {magicLinkSent ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-success/10 flex items-center justify-center">
                  <Mail className="h-8 w-8 text-success" />
                </div>
                <h2 className="text-xl font-semibold">Check your email</h2>
                <p className="text-muted-foreground">
                  We've sent a magic link to <strong>{email}</strong>. Click the link to sign in.
                </p>
                <Button
                  variant="ghost"
                  onClick={() => setMagicLinkSent(false)}
                  className="mt-4"
                >
                  Use a different method
                </Button>
              </div>
            ) : (
              <>
                {/* Google Sign In */}
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full gap-3 mb-6"
                  onClick={handleGoogleSignIn}
                  disabled={isGoogleLoading}
                >
                  {isGoogleLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <svg className="h-5 w-5" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                  )}
                  Continue with Google
                </Button>

                <div className="relative mb-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">Or continue with email</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                  <div>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        {...register('email')}
                        type="email"
                        placeholder="Email address"
                        className="h-12 pl-10"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.email && (
                      <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <Input
                        {...register('password')}
                        type="password"
                        placeholder="Password"
                        className="h-12 pl-10"
                        disabled={isLoading}
                      />
                    </div>
                    {errors.password && (
                      <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
                    )}
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-sm text-destructive">
                      {error}
                    </div>
                  )}

                  <Button
                    type="submit"
                    size="lg"
                    variant="hero"
                    className="w-full gap-2"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In
                        <ArrowRight className="h-4 w-4" />
                      </>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="w-full gap-2"
                    onClick={handleMagicLink}
                    disabled={isMagicLinkLoading}
                  >
                    {isMagicLinkLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Mail className="h-4 w-4" />
                        Sign in with Magic Link
                      </>
                    )}
                  </Button>
                </form>
              </>
            )}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-primary hover:underline font-medium">
              Create one
            </Link>
          </p>
        </motion.div>
      </div>
    </>
  );
}
