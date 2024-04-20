import { Request, Response } from "express";
import { TripPreferences } from "../common/types";
import { generateTextResponse } from "../services/aiService";
import { generateTripPrompt, parseTextResponse } from "../services/tripService";

async function planTrip(req: Request, res: Response) {
  const userInput: TripPreferences = req.body;

  const prompt = generateTripPrompt(userInput);

  try {
    const textResponse = await generateTextResponse(prompt);
    const parsedResponse = parseTextResponse(textResponse);

    return res.json(parsedResponse);
  } catch (error) {
    console.error("Error in trip planning:", error);
    res.status(500).json({ error: "Failed to plan trip" });
  }
}

export { planTrip };
