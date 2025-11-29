import { GoogleGenAI, Type } from "@google/genai";
import { AiResponse } from '../types';

// Initialize the Gemini AI client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const solveMathProblem = async (problem: string): Promise<AiResponse> => {
  try {
    const model = 'gemini-3-pro-preview';
    
    const response = await ai.models.generateContent({
      model,
      contents: problem,
      config: {
        systemInstruction: "Solve the following math problem or question. If it is a calculation, provide the numeric result. If it is a word problem, explain the steps briefly and provide the final numeric answer.",
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            answer: {
              type: Type.STRING,
              description: "The final numeric answer or short result string.",
            },
            explanation: {
              type: Type.STRING,
              description: "A brief explanation of how the solution was found.",
            },
          },
          required: ["answer", "explanation"],
        },
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("No response from AI");
    }

    return JSON.parse(text) as AiResponse;
  } catch (error) {
    console.error("Error solving math problem:", error);
    throw new Error("Failed to solve problem. Please check your connection or try again.");
  }
};