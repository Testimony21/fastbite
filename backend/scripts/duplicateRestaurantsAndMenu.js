// scripts/duplicateRestaurantsAndMenus.js
import mongoose from "mongoose";
import Restaurant from "../models/restaurant.js";
import MenuItem from "../models/menuModel.js";

// List of all target cities
const cities = [
  "Umuahia", "Yola", "Uyo", "Awka", "Bauchi", "Yenegua", "Makurdi", "Maiduguri",
  "Calabar", "Asaba", "Abakiliki", "Benin City", "Ado Ekiti", "Enugu", "Gombe",
  "Owerri", "Dutse", "Kaduna", "Kano", "Katsina", "Birnin Kebbi", "Lokoja",
  "Ilorin", "Ikeja", "Lafia", "Minna", "Abeokuta", "Akure", "Osogbo", "Ibadan",
  "Jos", "Port Harcourt", "Sokoto", "Jalingo", "Damaturu", "Dutse", "Abuja"
];

// Source city
const SOURCE_CITY = "Umuahia";

async function main() {
  try {
    await mongoose.connect(
      "mongodb+srv://testimonyokochac:zqZ3Kr5v9qBdX8in@cluster0.vcxwqw9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    );
    console.log("✅ Connected to MongoDB");

    // Step 1: Get all restaurants from Umuahia
    const baseRestaurants = await Restaurant.find({ location: SOURCE_CITY }).lean();
    if (!baseRestaurants.length) {
      console.log(`❌ No restaurants found in ${SOURCE_CITY}`);
      process.exit(1);
    }
    console.log(`📌 Found ${baseRestaurants.length} restaurants in ${SOURCE_CITY}`);

    // Step 2: Duplicate to other cities
    for (const city of cities) {
      if (city === SOURCE_CITY) continue; // skip Umuahia itself

      // Skip city if it already has restaurants
      const existingCount = await Restaurant.countDocuments({ location: city });
      if (existingCount > 0) {
        console.log(`⏭️  Skipping ${city} (already has ${existingCount} restaurants)`);
        continue;
      }

      for (const rest of baseRestaurants) {
        const newRest = await Restaurant.create({
          ...rest,
          _id: undefined,      // new MongoDB ID
          location: city,      // assign new city
          name: rest.name,     // keep original name
          createdAt: new Date(),
          updatedAt: new Date(),
        });

        // Duplicate menus for the new restaurant
        const menus = await MenuItem.find({ restaurant: rest._id }).lean();
        const newMenus = menus.map(menu => ({
          ...menu,
          _id: undefined,
          restaurant: newRest._id,
          createdAt: new Date(),
          updatedAt: new Date(),
        }));

        if (newMenus.length) await MenuItem.insertMany(newMenus);
      }

      console.log(`✅ Duplicated restaurants + menus for ${city}`);
    }

    console.log("🎉 DONE!");
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main();
