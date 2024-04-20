type DestPreferences =
  | "Beach"
  | "Mountains"
  | "City"
  | "Countryside"
  | "Festival";

type BudgetRange = "Low" | "Medium" | "High";

type Activities =
  | "Shopping"
  | "Wellness"
  | "Culture"
  | "Culinary"
  | "Festival"
  | "Family"
  | "Sports";

type Accommodation = "Hotel" | "Airbnb" | "Camping" | "Resort" | "Guesthouse";

export interface TripPreferences {
  destPreferences: DestPreferences;
  tripDuration: number; // Number of days
  budgetRange: BudgetRange;
  activities: Activities[];
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
