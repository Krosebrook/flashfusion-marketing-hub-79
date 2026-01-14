import { useState } from 'react';
import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Sparkles, Wand2, Loader2, Download, RefreshCw } from 'lucide-react';

export default function AICreationPage() {
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    
    // Simulate generation delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo purposes, we'll show a placeholder
    setGeneratedImage(`https://picsum.photos/seed/${Date.now()}/800/600`);
    setIsGenerating(false);
  };

  const handleNewGeneration = () => {
    setGeneratedImage(null);
    setPrompt('');
  };

  return (
    <>
      <SEO 
        title="AI Creation Studio"
        description="Create stunning AI-generated images and content with FlashFusion's creative studio."
        url="/demo/ai-creation"
      />

      <div className="min-h-[calc(100vh-5rem)] py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">AI Creation Studio</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              Create with <span className="gradient-text">AI</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Describe what you want to create and let our AI bring it to life.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 md:p-8"
          >
            {/* Input Area */}
            <div className="space-y-4 mb-8">
              <label className="block text-sm font-medium">
                Describe your image
              </label>
              <div className="relative">
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="A futuristic city at sunset with flying cars..."
                  className="h-14 pr-32 text-base"
                  disabled={isGenerating}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !isGenerating) {
                      handleGenerate();
                    }
                  }}
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating || !prompt.trim()}
                    className="gap-2"
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        Generating
                      </>
                    ) : (
                      <>
                        <Wand2 className="h-4 w-4" />
                        Generate
                      </>
                    )}
                  </Button>
                </div>
              </div>

              {/* Style suggestions */}
              <div className="flex flex-wrap gap-2">
                {['Photorealistic', 'Anime', '3D Render', 'Oil Painting', 'Cyberpunk'].map((style) => (
                  <button
                    key={style}
                    onClick={() => setPrompt(prev => prev ? `${prev}, ${style.toLowerCase()} style` : `${style} style`)}
                    className="px-3 py-1.5 text-xs rounded-full bg-muted hover:bg-muted/80 transition-colors"
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Result Area */}
            <div className="border-t border-border pt-8">
              {isGenerating ? (
                <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                      <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    </div>
                    <p className="text-muted-foreground">Creating your masterpiece...</p>
                  </div>
                </div>
              ) : generatedImage ? (
                <div className="space-y-4">
                  <div className="aspect-video bg-muted rounded-xl overflow-hidden">
                    <img
                      src={generatedImage}
                      alt="AI Generated"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex justify-center gap-3">
                    <Button variant="outline" className="gap-2">
                      <Download className="h-4 w-4" />
                      Download
                    </Button>
                    <Button variant="outline" className="gap-2" onClick={handleNewGeneration}>
                      <RefreshCw className="h-4 w-4" />
                      New Generation
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium mb-1">Ready to create</p>
                      <p className="text-sm text-muted-foreground">
                        Enter a prompt above to generate an image
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
