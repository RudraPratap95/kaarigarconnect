import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

// Standard fallback mock response if API fails or key is missing
const fallbackListing = {
  title: "Handpainted Blue Pottery Vase",
  description: "This exquisite blue pottery vase features intricate floral motifs meticulously hand-painted by master artisans. Crafted with traditional techniques, its vibrant hues and elegant design make it a stunning centerpiece for any home. Perfect for both traditional and contemporary interiors.",
  artisan_story: "Crafted by skilled artisans in Jaipur who have preserved this heritage art form for generations.",
  craft_type: "Pottery",
  suggested_keywords: ["Blue Pottery", "Jaipur Art", "Home Decor"]
};

export async function POST(req: Request) {
  try {
    const { description, language } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      console.warn("GEMINI_API_KEY not found. Using mock fallback data.");
      // Small delay to simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      return NextResponse.json({ listing: fallbackListing });
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are an AI helping Indian artisans sell crafts. 
Artisan description: ${description || "Artisan craft"}
Language context: ${language}

Generate JSON matching this exact structure:
{
  "title": "(max 8 words string)",
  "description": "(3 sentences highlighting craftsmanship string)",
  "artisan_story": "(1-2 sentences about heritage string)",
  "craft_type": "(Pottery/Weaving/Embroidery/Painting/Carving/Jewellery string)",
  "suggested_keywords": ["tag1", "tag2", "tag3"]
}

Tone: warm, authentic, highlight Indian heritage. Ensure response is valid JSON only.`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    const text = response.text;
    let result = fallbackListing;
    
    if (text) {
      try {
        result = JSON.parse(text);
      } catch (e) {
        console.error("Failed to parse Gemini output as JSON", text);
      }
    }

    return NextResponse.json({ listing: result });
  } catch (error) {
    console.error("Error in generate-listing API:", error);
    // If anything goes wrong, return the standard fallback so the prototype keeps working
    return NextResponse.json({ listing: fallbackListing });
  }
}
