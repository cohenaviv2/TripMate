import { TripRecommendation, TripPreferences } from "../common/types";

function generateTripPrompt(userInput: TripPreferences): string {
  const { destPreferences, tripDuration, budgetRange, activities, accommodation, numTravelers, ageGroups, specialRequirements } = userInput;

  const activitiesStr = activities.join(", ");
  const numTravelersStr = `Number of Travelers: ${numTravelers} (Adults: ${ageGroups.adults}, Children: ${ageGroups.children})`;
  const specialRequirementsStr = specialRequirements.join(", ");

  return `I'm planning a trip with the following preferences:
  Destination: ${destPreferences}
  Trip Duration: ${tripDuration} days
  Budget Range: ${budgetRange}
  Activities: ${activitiesStr}
  Accommodation: ${accommodation}
  ${numTravelersStr}
  Special Requirements: ${specialRequirementsStr}
  
  Can you recommend a suitable vacation location based on these preferences?
  Please provide your recommendation only with the following titles - Location, Accommodation Recommendations, Destination Recommendations, Days Recommendations (Day 1, Day 2...), and Additional Tips`;
}

function parseTextResponse(textResponse: string): TripRecommendation {
  const lines = textResponse.split("\n");

  const tripRecommendation: TripRecommendation = {
    location: "",
    accommodationRecommendations: [],
    destinationRecommendations: [],
    daysRecommendations: {},
    additionalTips: [],
  };

  let currentTopic = "";
  let currentDay = ""; // Track current day for daysRecommendations

  lines.forEach((line) => {
    if (line.startsWith("**Location:**")) {
      currentTopic = "location";
      tripRecommendation.location = line.replace("**Location:**", "").trim();
    } else if (line.startsWith("**Accommodation Recommendations:**")) {
      currentTopic = "accommodationRecommendations";
    } else if (line.startsWith("**Destination Recommendations:**")) {
      currentTopic = "destinationRecommendations";
    } else if (line.startsWith("* Day")) {
      currentDay = line.match(/\* Day (\d+)/)?.[1] || ""; // Extract day number
      currentTopic = `daysRecommendations_Day${currentDay}`;
      tripRecommendation.daysRecommendations[`Day ${currentDay}`] = [];
    } else if (line.startsWith("**Additional Tips:**")) {
      currentTopic = "additionalTips";
    } else if (line.startsWith("*")) {
      const trimmedLine = line.replace("*", "").trim();
      if (currentTopic && trimmedLine !== "") {
        if (!tripRecommendation[currentTopic]) {
          tripRecommendation[currentTopic] = [];
        }
        tripRecommendation[currentTopic].push(trimmedLine);
      }
    } else if (currentTopic && line.trim() !== "") {
      tripRecommendation[currentTopic].push(line.trim());
    }
  });

  return tripRecommendation;
}

export { generateTripPrompt, parseTextResponse };
