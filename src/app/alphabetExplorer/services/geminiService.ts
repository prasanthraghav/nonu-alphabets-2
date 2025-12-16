import { GoogleGenAI } from "@google/genai";
import { GeneratedContent } from "../types";

// Initialize Gemini Client
// IMPORTANT: The API key must be available in process.env.API_KEY
const apiKey = process.env.API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey || '' }); // Fallback empty string to avoid crash during init, but will fail call.

/**
 * Generates a word and a matching illustration for a given letter.
 * It uses the 'gemini-2.5-flash-image' model which is efficient for this task.
 */
export const generateAlphaContent = async (letter: string): Promise<GeneratedContent> => {
  if (!apiKey) {
    throw new Error("API Key is missing. Please check your environment configuration.");
  }

  const model = 'gemini-2.5-flash-image';

  // We ask for both an image and a text label in one go.
  const prompt = `
    Generate a cute, vibrant, 3D-style isometric icon of a single object that starts with the letter '${letter}'. 
    .
  `;

/*

The object should be distinct, colorful, and suitable for a children's educational app. 
    The background should be a clean, soft solid color (like cream or very light pastel).
    IMPORTANT: In your text response, provide ONLY the name of the object depicted (e.g., if you draw an Apple, output "Apple")

*/
  try {
    const response = await ai.models.generateContent({
      model,
      contents: {
        parts: [
          { text: prompt }
        ]
      }
    });

    let imageUrl = '';
    let word = '';

    // Parse the multipart response
    if (response.candidates && response.candidates[0].content && response.candidates[0].content.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.data) {
          imageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
        } else if (part.text) {
          word = part.text.trim();
        }
      }
    }

    if (!imageUrl) {
      throw new Error("Failed to generate image.");
    }

    // Fallback if the model forgets to return text (rare, but possible)
    if (!word) {
      word = `${letter} is for...?`;
    }

    return {
      letter,
      word,
      imageUrl
    };

  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};
