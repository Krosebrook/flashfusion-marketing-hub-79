import { useState } from 'react';
import { motion } from 'framer-motion';
import { SEO } from '@/components/SEO';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Code, Copy, CheckCircle, Zap, Image, Paintbrush, 
  ArrowUpRight, Maximize2, Key, BookOpen, Terminal
} from 'lucide-react';
import { toast } from 'sonner';

const API_BASE_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/api`;

const ENDPOINTS = [
  {
    id: 'generate',
    name: 'Generate Image',
    method: 'POST',
    description: 'Generate an AI image from a text prompt',
    icon: Zap,
    parameters: [
      { name: 'endpoint', type: 'string', required: true, value: '"generate"' },
      { name: 'prompt', type: 'string', required: true, description: 'Text description of the image to generate' },
      { name: 'style', type: 'string', required: false, description: 'Art style (e.g., "photorealistic", "anime", "oil painting")' },
    ],
    example: {
      request: `{
  "endpoint": "generate",
  "prompt": "A futuristic city at sunset with flying cars",
  "style": "cyberpunk"
}`,
      response: `{
  "success": true,
  "imageUrl": "data:image/png;base64,...",
  "endpoint": "generate",
  "prompt": "A futuristic city at sunset with flying cars, cyberpunk style..."
}`
    }
  },
  {
    id: 'remove-background',
    name: 'Remove Background',
    method: 'POST',
    description: 'Remove the background from an image, keeping only the subject',
    icon: Image,
    parameters: [
      { name: 'endpoint', type: 'string', required: true, value: '"remove-background"' },
      { name: 'imageUrl', type: 'string', required: false, description: 'URL of the image to process' },
      { name: 'imageBase64', type: 'string', required: false, description: 'Base64-encoded image data' },
    ],
    example: {
      request: `{
  "endpoint": "remove-background",
  "imageUrl": "https://example.com/photo.jpg"
}`,
      response: `{
  "success": true,
  "imageUrl": "data:image/png;base64,...",
  "endpoint": "remove-background"
}`
    }
  },
  {
    id: 'upscale',
    name: 'Upscale Image',
    method: 'POST',
    description: 'Upscale an image to higher resolution with AI enhancement',
    icon: Maximize2,
    parameters: [
      { name: 'endpoint', type: 'string', required: true, value: '"upscale"' },
      { name: 'imageUrl', type: 'string', required: false, description: 'URL of the image to upscale' },
      { name: 'imageBase64', type: 'string', required: false, description: 'Base64-encoded image data' },
      { name: 'scale', type: 'number', required: false, description: 'Upscale factor: 2 or 4 (default: 2)' },
    ],
    example: {
      request: `{
  "endpoint": "upscale",
  "imageUrl": "https://example.com/photo.jpg",
  "scale": 4
}`,
      response: `{
  "success": true,
  "imageUrl": "data:image/png;base64,...",
  "endpoint": "upscale",
  "scale": 4
}`
    }
  },
  {
    id: 'style-transfer',
    name: 'Style Transfer',
    method: 'POST',
    description: 'Transform an image into different artistic styles',
    icon: Paintbrush,
    parameters: [
      { name: 'endpoint', type: 'string', required: true, value: '"style-transfer"' },
      { name: 'imageUrl', type: 'string', required: false, description: 'URL of the image to transform' },
      { name: 'imageBase64', type: 'string', required: false, description: 'Base64-encoded image data' },
      { name: 'style', type: 'string', required: false, description: 'Preset style name' },
      { name: 'customStyle', type: 'string', required: false, description: 'Custom style description' },
    ],
    styles: [
      'oil-painting', 'watercolor', 'cyberpunk', 'anime', 'pixel-art',
      'sketch', 'pop-art', 'vaporwave', 'studio-ghibli', 'van-gogh'
    ],
    example: {
      request: `{
  "endpoint": "style-transfer",
  "imageUrl": "https://example.com/photo.jpg",
  "style": "anime"
}`,
      response: `{
  "success": true,
  "imageUrl": "data:image/png;base64,...",
  "endpoint": "style-transfer",
  "style": "anime"
}`
    }
  }
];

const CODE_EXAMPLES = {
  curl: (apiKey: string) => `curl -X POST "${API_BASE_URL}" \\
  -H "Content-Type: application/json" \\
  -H "x-api-key: ${apiKey || 'YOUR_API_KEY'}" \\
  -d '{
    "endpoint": "generate",
    "prompt": "A serene mountain landscape at dawn",
    "style": "photorealistic"
  }'`,
  
  javascript: (apiKey: string) => `const response = await fetch("${API_BASE_URL}", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": "${apiKey || 'YOUR_API_KEY'}"
  },
  body: JSON.stringify({
    endpoint: "generate",
    prompt: "A serene mountain landscape at dawn",
    style: "photorealistic"
  })
});

const data = await response.json();
console.log(data.imageUrl);`,

  python: (apiKey: string) => `import requests

response = requests.post(
    "${API_BASE_URL}",
    headers={
        "Content-Type": "application/json",
        "x-api-key": "${apiKey || 'YOUR_API_KEY'}"
    },
    json={
        "endpoint": "generate",
        "prompt": "A serene mountain landscape at dawn",
        "style": "photorealistic"
    }
)

data = response.json()
print(data["imageUrl"])`,
};

export default function APIDocsPage() {
  const [apiKey, setApiKey] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [activeEndpoint, setActiveEndpoint] = useState('generate');

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedId(null), 2000);
  };

  const selectedEndpoint = ENDPOINTS.find(e => e.id === activeEndpoint)!;

  return (
    <>
      <SEO 
        title="API Documentation"
        description="Integrate FlashFusion's AI image capabilities into your own applications with our REST API."
        url="/docs/api"
      />

      <div className="min-h-[calc(100vh-5rem)] py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
              <Code className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Developer API</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              <span className="gradient-text">FlashFusion</span> API
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
              Integrate powerful AI image generation, editing, and transformation capabilities into your applications.
            </p>
          </motion.div>

          {/* Quick Start */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card p-6 md:p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-primary/10">
                <Key className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Quick Start</h2>
                <p className="text-sm text-muted-foreground">Enter your API key to see personalized examples</p>
              </div>
            </div>
            
            <div className="flex gap-4 mb-6">
              <Input
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your API key (or use any key for demo)"
                className="flex-1"
              />
              <Button variant="secondary">
                <a href="/pricing" className="flex items-center gap-2">
                  Get API Key <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Base URL</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(API_BASE_URL, 'base-url')}
                >
                  {copiedId === 'base-url' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
              <code className="text-sm text-primary font-mono">{API_BASE_URL}</code>
            </div>
          </motion.div>

          {/* Code Examples */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card p-6 md:p-8 mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-accent/10">
                <Terminal className="h-5 w-5 text-accent" />
              </div>
              <h2 className="text-xl font-semibold">Code Examples</h2>
            </div>

            <Tabs defaultValue="javascript" className="w-full">
              <TabsList className="mb-4">
                <TabsTrigger value="curl">cURL</TabsTrigger>
                <TabsTrigger value="javascript">JavaScript</TabsTrigger>
                <TabsTrigger value="python">Python</TabsTrigger>
              </TabsList>

              {Object.entries(CODE_EXAMPLES).map(([lang, getCode]) => (
                <TabsContent key={lang} value={lang}>
                  <div className="relative">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => copyToClipboard(getCode(apiKey), `code-${lang}`)}
                    >
                      {copiedId === `code-${lang}` ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <pre className="bg-muted/50 rounded-lg p-4 overflow-x-auto">
                      <code className="text-sm font-mono">{getCode(apiKey)}</code>
                    </pre>
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </motion.div>

          {/* Endpoints */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="glass-card p-6 md:p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-success/10">
                <BookOpen className="h-5 w-5 text-success" />
              </div>
              <h2 className="text-xl font-semibold">API Endpoints</h2>
            </div>

            <div className="grid md:grid-cols-4 gap-4 mb-8">
              {ENDPOINTS.map((endpoint) => {
                const Icon = endpoint.icon;
                return (
                  <button
                    key={endpoint.id}
                    onClick={() => setActiveEndpoint(endpoint.id)}
                    className={`p-4 rounded-lg border transition-all text-left ${
                      activeEndpoint === endpoint.id
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <Icon className={`h-5 w-5 mb-2 ${activeEndpoint === endpoint.id ? 'text-primary' : 'text-muted-foreground'}`} />
                    <h3 className="font-medium text-sm">{endpoint.name}</h3>
                  </button>
                );
              })}
            </div>

            {/* Selected Endpoint Details */}
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <span className="px-3 py-1 bg-success/20 text-success text-xs font-bold rounded">
                  {selectedEndpoint.method}
                </span>
                <code className="text-sm font-mono text-muted-foreground">/api</code>
              </div>

              <p className="text-muted-foreground">{selectedEndpoint.description}</p>

              {/* Parameters */}
              <div>
                <h4 className="font-medium mb-3">Parameters</h4>
                <div className="bg-muted/30 rounded-lg overflow-hidden">
                  <table className="w-full text-sm">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="text-left p-3 font-medium">Name</th>
                        <th className="text-left p-3 font-medium">Type</th>
                        <th className="text-left p-3 font-medium">Required</th>
                        <th className="text-left p-3 font-medium">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedEndpoint.parameters.map((param) => (
                        <tr key={param.name} className="border-t border-border/50">
                          <td className="p-3 font-mono text-primary">{param.name}</td>
                          <td className="p-3 text-muted-foreground">{param.type}</td>
                          <td className="p-3">
                            <span className={`px-2 py-0.5 rounded text-xs ${
                              param.required ? 'bg-destructive/20 text-destructive' : 'bg-muted text-muted-foreground'
                            }`}>
                              {param.required ? 'Required' : 'Optional'}
                            </span>
                          </td>
                          <td className="p-3 text-muted-foreground">
                            {param.value || param.description}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Available Styles for Style Transfer */}
              {'styles' in selectedEndpoint && (
                <div>
                  <h4 className="font-medium mb-3">Available Styles</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEndpoint.styles.map((style) => (
                      <span key={style} className="px-3 py-1 bg-accent/10 text-accent text-sm rounded-full">
                        {style}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Example Request/Response */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Request Body</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(selectedEndpoint.example.request, 'request')}
                    >
                      {copiedId === 'request' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <pre className="bg-muted/50 rounded-lg p-4 overflow-x-auto text-sm">
                    <code className="font-mono">{selectedEndpoint.example.request}</code>
                  </pre>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Response</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => copyToClipboard(selectedEndpoint.example.response, 'response')}
                    >
                      {copiedId === 'response' ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </Button>
                  </div>
                  <pre className="bg-muted/50 rounded-lg p-4 overflow-x-auto text-sm">
                    <code className="font-mono">{selectedEndpoint.example.response}</code>
                  </pre>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Rate Limits & Errors */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-8 grid md:grid-cols-2 gap-8"
          >
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">Rate Limits</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Free tier: 10 requests/minute</li>
                <li>• Pro tier: 60 requests/minute</li>
                <li>• Enterprise: Custom limits</li>
              </ul>
            </div>
            <div className="glass-card p-6">
              <h3 className="font-semibold mb-4">Error Codes</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><code className="text-destructive">401</code> - Invalid or missing API key</li>
                <li><code className="text-destructive">429</code> - Rate limit exceeded</li>
                <li><code className="text-destructive">500</code> - Server error</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
