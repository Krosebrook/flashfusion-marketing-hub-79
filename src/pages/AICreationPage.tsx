import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { track } from '@/lib/track';
import { 
  Sparkles, Wand2, Loader2, Download, RefreshCw, AlertCircle,
  Image, Maximize2, Paintbrush, Upload, X
} from 'lucide-react';
import { toast } from 'sonner';

const STYLE_OPTIONS = [
  'Photorealistic',
  'Anime',
  '3D Render',
  'Oil Painting',
  'Cyberpunk',
  'Watercolor',
  'Digital Art',
  'Minimalist',
];

const TRANSFER_STYLES = [
  { id: 'oil-painting', name: 'Oil Painting' },
  { id: 'watercolor', name: 'Watercolor' },
  { id: 'cyberpunk', name: 'Cyberpunk' },
  { id: 'anime', name: 'Anime' },
  { id: 'pixel-art', name: 'Pixel Art' },
  { id: 'sketch', name: 'Sketch' },
  { id: 'pop-art', name: 'Pop Art' },
  { id: 'vaporwave', name: 'Vaporwave' },
  { id: 'studio-ghibli', name: 'Studio Ghibli' },
  { id: 'van-gogh', name: 'Van Gogh' },
];

type Tool = 'generate' | 'remove-bg' | 'upscale' | 'style-transfer';

export default function AICreationPage() {
  const [activeTool, setActiveTool] = useState<Tool>('generate');
  const [prompt, setPrompt] = useState('');
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [selectedTransferStyle, setSelectedTransferStyle] = useState<string>('anime');
  const [upscaleLevel, setUpscaleLevel] = useState<2 | 4>(2);
  const [isProcessing, setIsProcessing] = useState(false);
  const [resultImage, setResultImage] = useState<string | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const clearUploadedImage = () => {
    setUploadedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      toast.error('Please enter a prompt');
      return;
    }
    
    setIsProcessing(true);
    setError(null);
    setResultImage(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('generate-image', {
        body: { 
          prompt: prompt.trim(),
          style: selectedStyle?.toLowerCase() 
        },
      });

      if (fnError) throw new Error(fnError.message);
      if (data?.error) {
        setError(data.error);
        return;
      }

      if (data?.imageUrl) {
        setResultImage(data.imageUrl);
        track('cta_click', { location: 'ai_creation', action: 'generate_success' });
      } else {
        setError('Failed to generate image. Please try a different prompt.');
      }
    } catch (err) {
      console.error('Generation error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate image');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleRemoveBackground = async () => {
    if (!uploadedImage) {
      toast.error('Please upload an image first');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResultImage(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('remove-background', {
        body: { imageBase64: uploadedImage },
      });

      if (fnError) throw new Error(fnError.message);
      if (data?.error) {
        setError(data.error);
        return;
      }

      if (data?.imageUrl) {
        setResultImage(data.imageUrl);
        track('cta_click', { location: 'ai_creation', action: 'remove_bg_success' });
      } else {
        setError('Failed to process image. Please try again.');
      }
    } catch (err) {
      console.error('Remove background error:', err);
      setError(err instanceof Error ? err.message : 'Failed to process image');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleUpscale = async () => {
    if (!uploadedImage) {
      toast.error('Please upload an image first');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResultImage(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('upscale-image', {
        body: { imageBase64: uploadedImage, scale: upscaleLevel },
      });

      if (fnError) throw new Error(fnError.message);
      if (data?.error) {
        setError(data.error);
        return;
      }

      if (data?.imageUrl) {
        setResultImage(data.imageUrl);
        track('cta_click', { location: 'ai_creation', action: 'upscale_success' });
      } else {
        setError('Failed to upscale image. Please try again.');
      }
    } catch (err) {
      console.error('Upscale error:', err);
      setError(err instanceof Error ? err.message : 'Failed to upscale image');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleStyleTransfer = async () => {
    if (!uploadedImage) {
      toast.error('Please upload an image first');
      return;
    }

    setIsProcessing(true);
    setError(null);
    setResultImage(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke('style-transfer', {
        body: { imageBase64: uploadedImage, style: selectedTransferStyle },
      });

      if (fnError) throw new Error(fnError.message);
      if (data?.error) {
        setError(data.error);
        return;
      }

      if (data?.imageUrl) {
        setResultImage(data.imageUrl);
        track('cta_click', { location: 'ai_creation', action: 'style_transfer_success' });
      } else {
        setError('Failed to apply style. Please try again.');
      }
    } catch (err) {
      console.error('Style transfer error:', err);
      setError(err instanceof Error ? err.message : 'Failed to apply style');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleProcess = () => {
    switch (activeTool) {
      case 'generate':
        handleGenerate();
        break;
      case 'remove-bg':
        handleRemoveBackground();
        break;
      case 'upscale':
        handleUpscale();
        break;
      case 'style-transfer':
        handleStyleTransfer();
        break;
    }
  };

  const handleDownload = async () => {
    if (!resultImage) return;

    try {
      if (resultImage.startsWith('data:')) {
        const response = await fetch(resultImage);
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `flashfusion-${activeTool}-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      } else {
        window.open(resultImage, '_blank');
      }
      toast.success('Image downloaded!');
    } catch (err) {
      toast.error('Failed to download image');
    }
  };

  const handleNewCreation = () => {
    setResultImage(null);
    setPrompt('');
    setSelectedStyle(null);
    setError(null);
    setUploadedImage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const tools = [
    { id: 'generate' as Tool, name: 'Generate', icon: Wand2, description: 'Create from text' },
    { id: 'remove-bg' as Tool, name: 'Remove BG', icon: Image, description: 'Remove background' },
    { id: 'upscale' as Tool, name: 'Upscale', icon: Maximize2, description: 'Enhance quality' },
    { id: 'style-transfer' as Tool, name: 'Style Transfer', icon: Paintbrush, description: 'Apply art styles' },
  ];

  const needsUpload = activeTool !== 'generate';
  const canProcess = activeTool === 'generate' ? prompt.trim() : uploadedImage;

  return (
    <>
      <SEO 
        title="AI Creation Studio"
        description="Create stunning AI-generated images and content with FlashFusion's creative studio."
        url="/demo/ai-creation"
      />

      <div className="min-h-[calc(100vh-5rem)] py-12">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
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
              Generate, edit, and transform images with our powerful AI tools.
            </p>
          </motion.div>

          {/* Tool Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6"
          >
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <button
                  key={tool.id}
                  onClick={() => {
                    setActiveTool(tool.id);
                    setError(null);
                    setResultImage(null);
                  }}
                  disabled={isProcessing}
                  className={`p-4 rounded-xl border transition-all ${
                    activeTool === tool.id
                      ? 'border-primary bg-primary/10 shadow-lg'
                      : 'border-border hover:border-primary/50 bg-card/50'
                  }`}
                >
                  <Icon className={`h-6 w-6 mx-auto mb-2 ${
                    activeTool === tool.id ? 'text-primary' : 'text-muted-foreground'
                  }`} />
                  <h3 className="font-medium text-sm">{tool.name}</h3>
                  <p className="text-xs text-muted-foreground">{tool.description}</p>
                </button>
              );
            })}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 md:p-8"
          >
            {/* Input Area */}
            <div className="space-y-4 mb-8">
              {/* Generate Tool */}
              {activeTool === 'generate' && (
                <>
                  <label className="block text-sm font-medium">Describe your image</label>
                  <div className="relative">
                    <Input
                      value={prompt}
                      onChange={(e) => setPrompt(e.target.value)}
                      placeholder="A futuristic city at sunset with flying cars..."
                      className="h-14 pr-32 text-base"
                      disabled={isProcessing}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !isProcessing) handleProcess();
                      }}
                    />
                    <div className="absolute right-2 top-1/2 -translate-y-1/2">
                      <Button onClick={handleProcess} disabled={isProcessing || !prompt.trim()} className="gap-2">
                        {isProcessing ? (
                          <><Loader2 className="h-4 w-4 animate-spin" /> Generating</>
                        ) : (
                          <><Wand2 className="h-4 w-4" /> Generate</>
                        )}
                      </Button>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Style (optional)</p>
                    <div className="flex flex-wrap gap-2">
                      {STYLE_OPTIONS.map((style) => (
                        <button
                          key={style}
                          onClick={() => setSelectedStyle(selectedStyle === style ? null : style)}
                          className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                            selectedStyle === style
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted hover:bg-muted/80'
                          }`}
                          disabled={isProcessing}
                        >
                          {style}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {/* Image Upload for other tools */}
              {needsUpload && (
                <>
                  <label className="block text-sm font-medium">Upload an image</label>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  
                  {uploadedImage ? (
                    <div className="relative inline-block">
                      <img
                        src={uploadedImage}
                        alt="Uploaded"
                        className="max-h-48 rounded-lg border border-border"
                      />
                      <Button
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6"
                        onClick={clearUploadedImage}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ) : (
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full h-32 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 hover:border-primary/50 transition-colors"
                    >
                      <Upload className="h-8 w-8 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">Click to upload or drag and drop</span>
                    </button>
                  )}

                  {/* Tool-specific options */}
                  {activeTool === 'upscale' && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Upscale Level</p>
                      <div className="flex gap-2">
                        {([2, 4] as const).map((level) => (
                          <button
                            key={level}
                            onClick={() => setUpscaleLevel(level)}
                            className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                              upscaleLevel === level
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted hover:bg-muted/80'
                            }`}
                            disabled={isProcessing}
                          >
                            {level}x
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeTool === 'style-transfer' && (
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Choose a style</p>
                      <div className="flex flex-wrap gap-2">
                        {TRANSFER_STYLES.map((style) => (
                          <button
                            key={style.id}
                            onClick={() => setSelectedTransferStyle(style.id)}
                            className={`px-3 py-1.5 text-xs rounded-full transition-colors ${
                              selectedTransferStyle === style.id
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted hover:bg-muted/80'
                            }`}
                            disabled={isProcessing}
                          >
                            {style.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {uploadedImage && (
                    <Button onClick={handleProcess} disabled={isProcessing} className="gap-2">
                      {isProcessing ? (
                        <><Loader2 className="h-4 w-4 animate-spin" /> Processing...</>
                      ) : (
                        <>
                          {activeTool === 'remove-bg' && <><Image className="h-4 w-4" /> Remove Background</>}
                          {activeTool === 'upscale' && <><Maximize2 className="h-4 w-4" /> Upscale {upscaleLevel}x</>}
                          {activeTool === 'style-transfer' && <><Paintbrush className="h-4 w-4" /> Apply Style</>}
                        </>
                      )}
                    </Button>
                  )}
                </>
              )}
            </div>

            {/* Result Area */}
            <div className="border-t border-border pt-8">
              {error ? (
                <div className="aspect-video bg-destructive/10 rounded-xl flex items-center justify-center border border-destructive/20">
                  <div className="text-center space-y-4 p-8">
                    <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
                      <AlertCircle className="h-8 w-8 text-destructive" />
                    </div>
                    <p className="text-destructive">{error}</p>
                    <Button variant="outline" onClick={handleNewCreation}>Try Again</Button>
                  </div>
                </div>
              ) : isProcessing ? (
                <div className="aspect-video bg-muted rounded-xl flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/10 flex items-center justify-center">
                      <Loader2 className="h-8 w-8 text-primary animate-spin" />
                    </div>
                    <div>
                      <p className="font-medium">Processing your image...</p>
                      <p className="text-sm text-muted-foreground">This may take a few seconds</p>
                    </div>
                  </div>
                </div>
              ) : resultImage ? (
                <div className="space-y-4">
                  <div className="aspect-video bg-muted rounded-xl overflow-hidden">
                    <img src={resultImage} alt="AI Result" className="w-full h-full object-contain" />
                  </div>
                  <div className="flex justify-center gap-3">
                    <Button variant="outline" className="gap-2" onClick={handleDownload}>
                      <Download className="h-4 w-4" /> Download
                    </Button>
                    <Button variant="outline" className="gap-2" onClick={handleNewCreation}>
                      <RefreshCw className="h-4 w-4" /> New Creation
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
                        {activeTool === 'generate' 
                          ? 'Enter a prompt above to generate an image'
                          : 'Upload an image above to get started'
                        }
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
