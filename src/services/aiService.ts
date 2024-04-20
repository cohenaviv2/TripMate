import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const aiModel = process.env.GEMINI_MODEL;

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: aiModel });

async function generateTextResponse(prompt: string) {
  const result = await model.generateContent(prompt);
  const response = result.response;
  const generatedText = response.text();
  return generatedText;
}

export { generateTextResponse };
