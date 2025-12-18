import mongoose from "mongoose";
import dotenv from "dotenv";
import Menu from "../models/menuModel.js";
import Restaurant from "../models/restaurant.js";

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to deployed MongoDB");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    process.exit(1);
  }
};

const duplicateMenus = async () => {
  try {
    const restaurants = await Restaurant.find();
    if (restaurants.length === 0) {
      console.log("❌ No restaurants found in deployed DB");
      return;
    }

    // Sample menu templates
    const sampleMenus = [
      { name: "Burger", description: "Juicy beef burger", price: 1200, image: "" },
      { name: "Pizza", description: "Cheesy pepperoni pizza", price: 2500, image: "" },
      { name: "Fries", description: "Crispy golden fries", price: 800, image: "" },
    ];

    for (const restaurant of restaurants) {
      for (const m of sampleMenus) {
        // Avoid duplicates: check if a menu with same name exists
        const exists = await Menu.findOne({ name: m.name, restaurant: restaurant._id });
        if (!exists) {
          await Menu.create({
            ...m,
            restaurant: restaurant._id,
          });
        }
      }
    }

    console.log("✅ Menus created for all restaurants on deployed DB");
  } catch (error) {
    console.error("❌ Error duplicating menus:", error.message);
  } finally {
    mongoose.connection.close();
  }
};

const run = async () => {
  await connectDB();
  await duplicateMenus();
};

run();
