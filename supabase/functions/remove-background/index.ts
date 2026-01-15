import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { imageUrl, imageBase64 } = await req.json();

    if (!imageUrl && !imageBase64) {
      return new Response(
        JSON.stringify({ error: "Image URL or base64 data is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Create prompt for background removal using vision model
    const content = [
      {
        type: "text",
        text: "Remove the background from this image completely. Make the background fully transparent or white. Keep only the main subject with clean, precise edges. Return only the processed image."
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

    console.log("Processing background removal...");

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
        JSON.stringify({ error: "Failed to process image. Please try again." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ imageUrl: resultImage, tool: "remove-background" }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (error) {
    console.error("Error in remove-background function:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error occurred" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
