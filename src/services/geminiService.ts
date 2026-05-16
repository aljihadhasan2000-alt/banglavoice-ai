import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY || "";

export const generateWithAI = async (prompt: string, systemInstruction?: string) => {
  if (!apiKey) {
    throw new Error("Gemini API key is not configured. Please check your environment variables.");
  }

  const ai = new GoogleGenAI({ apiKey });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction || "You are a helpful assistant for content creators.",
        temperature: 0.8,
      }
    });

    return response.text;
  } catch (error: any) {
    console.error("Gemini Error:", error);
    throw new Error(error.message || "Failed to generate content");
  }
};

export const prompts = {
  titles: (topic: string, category: string) => `
    Generate 5 viral YouTube titles for a video about "${topic}" in the category of "${category}".
    Include:
    1. Clickbait but honest title
    2. SEO-rich title
    3. Short & Punchy title
    4. Question-based title
    5. Emotional/Story-driven title
    
    Also provide 10 trending tags and a short viral description hook (first 2 lines).
    Format the output in clean Markdown.
  `,
  hooks: (topic: string) => `
    Generate 5 viral opening hooks (first 3 seconds) for a Short/Reel about "${topic}".
    Types of hooks:
    1. Suspense/Mystery
    2. Controversial Start
    3. Value Promise
    4. Negative Hook (What they are doing wrong)
    5. Curiosity Gap
    
    Keep them short, energetic, and engaging.
  `,
  captions: (description: string, platform: string, mode: string) => `
    Generate a ${mode} caption for a ${platform} post about: "${description}".
    The tone should be ${mode}.
    Include relevant emojis and 3-5 hashtags.
    Professional but engaging.
  `,
  scripts: (topic: string, type: string) => `
    Write a complete script for a ${type} about "${topic}".
    Structure:
    1. Strong Hook (3s)
    2. The Problem/Gap
    3. The Solution/Story
    4. Value Points
    5. Call to Action (CTA)
    
    Make it energetic and cinematic. 
    Estimated duration: 60 seconds.
    If it's a Movie Explanation, focus on plot highlights and emotional hooks.
    Format clearly in Markdown.
  `,
  hashtags: (topic: string) => `
    Provide 30 trending hashtags for "${topic}".
    Categorize them into:
    - High Volume (Big)
    - Medium Volume (Targeted)
    - Niche/Specific
    - Bangla specific (if applicable)
  `
};
