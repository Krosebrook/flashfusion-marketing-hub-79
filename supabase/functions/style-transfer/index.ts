import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const STYLE_PROMPTS: Record<string, string> = {
  "oil-painting": "Transform this image into a classic oil painting style with visible brush strokes, rich colors, and the texture of canvas. Maintain the composition but apply an impressionist oil painting aesthetic.",
  "watercolor": "Convert this image into a delicate watercolor painting with soft edges, flowing colors, transparent washes, and the characteristic paper texture of watercolor art.",
  "cyberpunk": "Transform this image into a cyberpunk aesthetic with neon lights, vibrant cyan and magenta colors, futuristic elements, rain-slicked surfaces, and a dystopian tech atmosphere.",
  "anime": "Convert this image into high-quality anime style with clean lines, cel shading, large expressive eyes if there are characters, and the distinctive aesthetic of Japanese animation.",
  "pixel-art": "Transform this image into retro pixel art style with visible pixels, limited color palette, and the nostalgic aesthetic of 8-bit or 16-bit video games.",
  "sketch": "Convert this image into a detailed pencil sketch with careful shading, cross-hatching, and the appearance of hand-drawn graphite on paper.",
  "pop-art": "Transform this image into bold pop art style inspired by Andy Warhol with bright contrasting colors, Ben-Day dots, thick outlines, and comic book aesthetics.",
  "vaporwave": "Convert this image into vaporwave aesthetic with pink and blue gradients, Greek statues, 80s/90s nostalgia, glitchy effects, and surreal tropical elements.",
  "studio-ghibli": "Transform this image into Studio Ghibli animation style with soft, whimsical colors, detailed backgrounds, magical atmosphere, and Miyazaki's distinctive aesthetic.",
  "van-gogh": "Convert this image into Vincent van Gogh's post-impressionist style with swirling brush strokes, vibrant yellows and blues, and the emotional intensity of Starry Night.",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl, imageBase64, style, customStyle } = await req.json();

    if (!imageUrl && !imageBase64) {
      return new Response(
        JSON.stringify({ error: "Image URL or base64 data is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!style && !customStyle) {
      return new Response(
        JSON.stringify({ 
          error: "Style is required",
          availableStyles: Object.keys(STYLE_PROMPTS)
        }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const stylePrompt = customStyle || STYLE_PROMPTS[style] || `Transform this image into ${style} style while maintaining the original composition and subject.`;

    const content = [
      {
        type: "text",
        text: `${stylePrompt} Return only the transformed image.`
      }
    ];

    if (imageUrl) {
      content.push({
        type: "image_url",
        image_url: { url: imageUrl }
      } as any);
    } else if (imageBase64) {
      content.push({
        type: "image_url",
        image_url: { url: imageBase64 }
      } as any);
    }

    console.log(`Applying style: ${style || 'custom'}...`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-pro-image-preview",
        messages: [
          {
            role: "user",
            content,
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits depleted. Please add credits to continue." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract image from response
    const messageContent = data.choices?.[0]?.message?.content;
    let resultImage = null;
    
    if (Array.isArray(messageContent)) {
      for (const part of messageContent) {
        if (part.type === "image" && part.image_url?.url) {
          resultImage = part.image_url.url;
          break;
        }
        if (part.inline_data) {
          resultImage = `data:${part.inline_data.mime_type};base64,${part.inline_data.data}`;
          break;
        }
      }
    } else if (typeof messageContent === "string") {
      if (messageContent.startsWith("http") || messageContent.startsWith("data:")) {
        resultImage = messageContent;
      }
    }

    // Check for inline parts
    const parts = data.choices?.[0]?.message?.parts;
    if (!resultImage && Array.isArray(parts)) {
      for (const part of parts) {
        if (part.inline_data) {
          resultImage = `data:${part.inline_data.mime_type};base64,${part.inline_data.data}`;
          break;
        }
      }
    }

    if (!resultImage) {
      console.log("Full response:", JSON.stringify(data, null, 2));
      return new Response(
        JSON.stringify({ error: "Failed to apply style transfer. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ 
        imageUrl: resultImage, 
        tool: "style-transfer",
        style: style || "custom",
        availableStyles: Object.keys(STYLE_PROMPTS)
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in style-transfer function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
