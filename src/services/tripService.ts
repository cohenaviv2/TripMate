import { TripRecommendation, TripPreferences } from "../common/types";

// function generateTripPrompt(userInput: TripPreferences): string {
//   const { destPreferences, tripDuration, budgetRange, activities, accommodation, numTravelers, ageGroups, specialRequirements } = userInput;

//   const activitiesStr = activities.join(", ");
//   const numTravelersStr = `Number of Travelers: ${numTravelers} (Adults: ${ageGroups.adults}, Children: ${ageGroups.children})`;
//   const specialRequirementsStr = specialRequirements.join(", ");

//   return `I'm planning a trip with the following preferences:
//   Destination: ${destPreferences}
//   Trip Duration: ${tripDuration} days
//   Budget Range: ${budgetRange}
//   Activities: ${activitiesStr}
//   Accommodation: ${accommodation}
//   ${numTravelersStr}
//   Special Requirements: ${specialRequirementsStr}

//   Can you recommend a suitable vacation location based on these preferences?
//   Please provide your recommendation only with the following titles - Location, Accommodation Recommendations, Destination Recommendations, Days Recommendations (Day 1, Day 2...), and Additional Tips`;
// }

function generateAIPrompt(tripPrefs: TripPreferences): string {
  let prompt = `Plan a ${tripPrefs.tripDuration}-day vacation for ${tripPrefs.numTravelers} people (${tripPrefs.ageGroups.adults} adults and ${tripPrefs.ageGroups.children} children) `;
  prompt += `with an interest in ${tripPrefs.destPreferences.toLowerCase()} destinations. `;
  prompt += `They are looking for ${tripPrefs.accommodation.toLowerCase()} accommodations and their budget is ${tripPrefs.budgetRange.toLowerCase()}. `;
  prompt += `Activities should include: ${tripPrefs.activities.join(", ").toLowerCase()}. `;

  if (tripPrefs.specialRequirements.length > 0) {
    prompt += `Special requirements: ${tripPrefs.specialRequirements.join(", ")}. `;
  }

  prompt += `Please provide the answer in this json format without any redundant characters - 
  { location: string,
    accommodationRecommendations: string[],
    destinationRecommendations: string[],
    daysRecommendations: { [day: string]: string[] },
    additionalTips: string[]
  }`;

  return prompt;
}

function parseTextResponse(aiResponse: string) {
  return JSON.parse(aiResponse);
}

export { generateAIPrompt, parseTextResponse };
