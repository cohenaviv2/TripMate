import { Request, Response } from "express";
import { TripPreferences, TripRecommendation } from "../common/types";
import { generateAIPrompt, parseTextResponse } from "../services/tripService";
import { generateTextResponse } from "../services/AIService";

async function planTrip(req: Request, res: Response) {
  const userInput: TripPreferences = req.body;
  const prompt = generateAIPrompt(userInput);
  try {
    const aiResponse = await generateTextResponse(prompt);
    const tripRecommendation: TripRecommendation = parseTextResponse(aiResponse);

    return res.json(tripRecommendation);
  } catch (error) {
    console.error("Error in trip planning:", error);
    res.status(500).json({ error: "Failed to plan trip" });
  }
}

export { planTrip };
