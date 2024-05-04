import "dotenv/config";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const aiModel = process.env.GEMINI_MODEL;

const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: aiModel });

async function generateTextResponse(prompt: string) {
  try{
    const result = await model.generateContent(prompt)
    const generatedText = result.response.text();
    return generatedText;
  } catch(error) {
    console.log(error)
  }
}

export { generateTextResponse };
