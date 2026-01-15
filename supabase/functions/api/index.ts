import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-api-key",
};

interface APIRequest {
  endpoint: string;
  payload: Record<string, any>;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate API key from header
    const apiKey = req.headers.get("x-api-key") || req.headers.get("authorization")?.replace("Bearer ", "");
    
    if (!apiKey) {
      return new Response(
        JSON.stringify({ 
          error: "API key required",
          message: "Please provide your API key in the x-api-key header or as a Bearer token"
        }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // For demo purposes, accept any non-empty API key
    // In production, validate against a database of API keys
    if (apiKey.length < 10) {
      return new Response(
        JSON.stringify({ error: "Invalid API key format" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("Server configuration error");
    }

    const { endpoint, ...payload } = await req.json();

    // Route to appropriate handler
    let result;
    switch (endpoint) {
      case "generate":
        result = await handleGenerate(payload, LOVABLE_API_KEY);
        break;
      case "remove-background":
        result = await handleRemoveBackground(payload, LOVABLE_API_KEY);
        break;
      case "upscale":
        result = await handleUpscale(payload, LOVABLE_API_KEY);
        break;
      case "style-transfer":
        result = await handleStyleTransfer(payload, LOVABLE_API_KEY);
        break;
      default:
        return new Response(
          JSON.stringify({ 
            error: "Unknown endpoint",
            availableEndpoints: ["generate", "remove-background", "upscale", "style-transfer"],
            documentation: "https://flash-fusion-marketing.lovable.app/docs/api"
          }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
    }

    const hasError = 'error' in result && result.error;
    return new Response(
      JSON.stringify(result),
      { status: hasError ? 500 : 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("API error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

async function handleGenerate(payload: any, apiKey: string) {
  const { prompt, style } = payload;
  
  if (!prompt) {
    return { error: "Prompt is required" };
  }

  const enhancedPrompt = style 
    ? `${prompt}, ${style} style, highly detailed, professional quality`
    : `${prompt}, highly detailed, professional quality, 4k resolution`;

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-image",
      messages: [{ role: "user", content: enhancedPrompt }],
    }),
  });

  if (!response.ok) {
    return handleAIError(response);
  }

  const data = await response.json();
  const imageUrl = extractImageUrl(data);
  
  if (!imageUrl) {
    return { error: "Failed to generate image" };
  }

  return { 
    success: true,
    imageUrl, 
    endpoint: "generate",
    prompt: enhancedPrompt 
  };
}

async function handleRemoveBackground(payload: any, apiKey: string) {
  const { imageUrl, imageBase64 } = payload;
  
  if (!imageUrl && !imageBase64) {
    return { error: "imageUrl or imageBase64 is required" };
  }

  const content: any[] = [
    {
      type: "text",
      text: "Remove the background from this image completely. Make the background fully transparent or white. Keep only the main subject with clean, precise edges. Return only the processed image."
    }
  ];

  if (imageUrl) {
    content.push({ type: "image_url", image_url: { url: imageUrl } });
  } else {
    content.push({ type: "image_url", image_url: { url: imageBase64 } });
  }

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-pro-image-preview",
      messages: [{ role: "user", content }],
    }),
  });

  if (!response.ok) {
    return handleAIError(response);
  }

  const data = await response.json();
  const resultUrl = extractImageUrl(data);
  
  if (!resultUrl) {
    return { error: "Failed to remove background" };
  }

  return { 
    success: true,
    imageUrl: resultUrl, 
    endpoint: "remove-background" 
  };
}

async function handleUpscale(payload: any, apiKey: string) {
  const { imageUrl, imageBase64, scale = 2 } = payload;
  
  if (!imageUrl && !imageBase64) {
    return { error: "imageUrl or imageBase64 is required" };
  }

  const scaleText = scale === 4 ? "4x" : "2x";
  
  const content: any[] = [
    {
      type: "text",
      text: `Upscale this image to ${scaleText} its original resolution. Enhance details, improve sharpness, and maintain high quality. Return only the upscaled image.`
    }
  ];

  if (imageUrl) {
    content.push({ type: "image_url", image_url: { url: imageUrl } });
  } else {
    content.push({ type: "image_url", image_url: { url: imageBase64 } });
  }

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-pro-image-preview",
      messages: [{ role: "user", content }],
    }),
  });

  if (!response.ok) {
    return handleAIError(response);
  }

  const data = await response.json();
  const resultUrl = extractImageUrl(data);
  
  if (!resultUrl) {
    return { error: "Failed to upscale image" };
  }

  return { 
    success: true,
    imageUrl: resultUrl, 
    endpoint: "upscale",
    scale 
  };
}

async function handleStyleTransfer(payload: any, apiKey: string) {
  const { imageUrl, imageBase64, style, customStyle } = payload;
  
  if (!imageUrl && !imageBase64) {
    return { error: "imageUrl or imageBase64 is required" };
  }

  if (!style && !customStyle) {
    return { 
      error: "style or customStyle is required",
      availableStyles: [
        "oil-painting", "watercolor", "cyberpunk", "anime", "pixel-art",
        "sketch", "pop-art", "vaporwave", "studio-ghibli", "van-gogh"
      ]
    };
  }

  const STYLE_PROMPTS: Record<string, string> = {
    "oil-painting": "Transform this image into a classic oil painting style with visible brush strokes and rich colors.",
    "watercolor": "Convert this image into a delicate watercolor painting with soft edges and flowing colors.",
    "cyberpunk": "Transform this image into a cyberpunk aesthetic with neon lights and futuristic elements.",
    "anime": "Convert this image into high-quality anime style with clean lines and cel shading.",
    "pixel-art": "Transform this image into retro pixel art style with visible pixels and limited color palette.",
    "sketch": "Convert this image into a detailed pencil sketch with careful shading.",
    "pop-art": "Transform this image into bold pop art style with bright contrasting colors.",
    "vaporwave": "Convert this image into vaporwave aesthetic with pink and blue gradients.",
    "studio-ghibli": "Transform this image into Studio Ghibli animation style with soft, whimsical colors.",
    "van-gogh": "Convert this image into Vincent van Gogh's post-impressionist style with swirling brush strokes.",
  };

  const stylePrompt = customStyle || STYLE_PROMPTS[style] || `Transform this image into ${style} style.`;

  const content: any[] = [
    { type: "text", text: `${stylePrompt} Return only the transformed image.` }
  ];

  if (imageUrl) {
    content.push({ type: "image_url", image_url: { url: imageUrl } });
  } else {
    content.push({ type: "image_url", image_url: { url: imageBase64 } });
  }

  const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "google/gemini-3-pro-image-preview",
      messages: [{ role: "user", content }],
    }),
  });

  if (!response.ok) {
    return handleAIError(response);
  }

  const data = await response.json();
  const resultUrl = extractImageUrl(data);
  
  if (!resultUrl) {
    return { error: "Failed to apply style transfer" };
  }

  return { 
    success: true,
    imageUrl: resultUrl, 
    endpoint: "style-transfer",
    style: style || "custom"
  };
}

async function handleAIError(response: Response) {
  if (response.status === 429) {
    return { error: "Rate limit exceeded. Please try again later." };
  }
  if (response.status === 402) {
    return { error: "Service temporarily unavailable." };
  }
  return { error: `AI service error: ${response.status}` };
}

function extractImageUrl(data: any): string | null {
  const content = data.choices?.[0]?.message?.content;
  
  if (Array.isArray(content)) {
    for (const part of content) {
      if (part.type === "image" && part.image_url?.url) {
        return part.image_url.url;
      }
      if (part.inline_data) {
        return `data:${part.inline_data.mime_type};base64,${part.inline_data.data}`;
      }
    }
  } else if (typeof content === "string") {
    if (content.startsWith("http") || content.startsWith("data:")) {
      return content;
    }
  }

  const parts = data.choices?.[0]?.message?.parts;
  if (Array.isArray(parts)) {
    for (const part of parts) {
      if (part.inline_data) {
        return `data:${part.inline_data.mime_type};base64,${part.inline_data.data}`;
      }
    }
  }

  return null;
}
