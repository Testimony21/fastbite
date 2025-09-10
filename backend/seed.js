import mongoose from "mongoose";
import Restaurant from "./models/restaurant.js";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";

dotenv.config();

// MongoDB connection URI from .env
const MONGODB_URI = process.env.MONGODB_URI;

const seedRestaurants = async () => {
  await connectDB();
  await Restaurant.deleteMany();

  const sampleRestaurants = [];

  // Add at least one with Port Harcourt
  sampleRestaurants.push({
    name: "Taste of PH",
    location: "Port Harcourt",
    cuisine: "Nigerian",
    rating: 4.5
  });

  // Add some random ones too
  for (let i = 0; i < 10; i++) {
    sampleRestaurants.push({
      name: faker.company.name(),
      location: faker.helpers.arrayElement(["Port Harcourt", "Lagos", "Abuja"]), // 👈 force PH to appear
      cuisine: faker.commerce.department(),
      rating: faker.number.float({ min: 1, max: 5, precision: 0.1 })
    });
  }

  await Restaurant.insertMany(sampleRestaurants);
  console.log("Data Seeded ✅");
  process.exit();
};

seedRestaurants();