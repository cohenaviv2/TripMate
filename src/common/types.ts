type DestPreferences =
  | "Beach"
  | "City"
  | "Mountains"
  | "Countryside"
  | "Festival";

type BudgetRange = "Low" | "Medium" | "High";

type Activity =
  | "Shopping"
  | "Wellness"
  | "Culture"
  | "Culinary"
  | "Festival"
  | "Family"
  | "Sports";

type Accommodation = "Hotel" | "Resort" | "Airbnb" | "Camping" | "Guesthouse";

export interface TripPreferences {
  destPreferences: DestPreferences;
  tripDuration: number; // Number of days
  budgetRange: BudgetRange;
  activities: Activity[];
  accommodation: Accommodation;
  numTravelers: number;
  ageGroups: {
    adults: number;
    children: number;
  };
  specialRequirements: string[]; // Special requirements or preferences
}

export interface TripRecommendation {
  location: string;
  accommodationRecommendations: string[];
  destinationRecommendations: string[];
  daysRecommendations: { [day: string]: string[] }; // Object with day-wise recommendations
  additionalTips: string[];
}