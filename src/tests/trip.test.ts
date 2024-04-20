import request from "supertest";
import initServer from "../server";
import { Express } from "express";
import { TripPreferences, TripRecommendation } from "../common/types";

let app: Express;

const userInput: TripPreferences = {
  destPreferences: "Beach",
  tripDuration: 5,
  budgetRange: "Medium",
  activities: ["Shopping", "Sports"],
  accommodation: "Hotel",
  numTravelers: 4,
  ageGroups: {
    adults: 4,
    children: 0,
  },
  specialRequirements: ["parties"],
};

beforeAll(async () => {
  app = await initServer();
});

describe("Trip API tests", () => {
  test("Test plan a trip", async () => {
    const response = await request(app).post(`/trip/plan`).send(userInput).expect(200);
    const tripRecommendation: TripRecommendation = response.body;
    expect(tripRecommendation.location).toBeDefined();
  });
});
