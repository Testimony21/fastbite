// scripts/duplicateRestaurantsAndMenus.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Restaurant from "../models/restaurant.js";
import MenuItem from "../models/menuModel.js";

dotenv.config();

const cities = [
  "Yola", "Uyo", "Awka", "Bauchi", "Yenegua", "Makurdi", "Maiduguri",
  "Calabar", "Asaba", "Abakiliki", "Benin City", "Ado Ekiti", "Enugu", "Gombe",
  "Owerri", "Dutse", "Kaduna", "Kano", "Katsina", "Birnin Kebbi", "Lokoja",
  "Ilorin", "Ikeja", "Lafia", "Minna", "Abeokuta", "Akure", "Osogbo", "Ibadan",
  "Jos", "Port Harcourt", "Sokoto", "Jalingo", "Damaturu", "Abuja"
];

const SOURCE_CITY = "Umuahia";

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB");

    const baseRestaurants = await Restaurant.find({ location: SOURCE_CITY });
    if (!baseRestaurants.length) {
      console.log(`❌ No restaurants found in ${SOURCE_CITY}`);
      process.exit(1);
    }

    console.log(`📌 Found ${baseRestaurants.length} base restaurants`);

    for (const city of cities) {
      const exists = await Restaurant.countDocuments({ location: city });
      if (exists > 0) {
        console.log(`⏭️ Skipping ${city}`);
        continue;
      }

      for (const base of baseRestaurants) {
        const newRestaurant = await Restaurant.create({
          name: base.name,
          image: base.image,
          cuisine: base.cuisine,
          rating: base.rating,
          location: city, // ONLY source of truth
        });

        const menus = await MenuItem.find({ restaurant: base._id });

        const newMenus = menus.map(menu => ({
          name: menu.name,
          description: menu.description,
          price: menu.price,
          image: menu.image,
          restaurant: newRestaurant._id,
        }));

        if (newMenus.length) {
          await MenuItem.insertMany(newMenus);
        }
      }

      console.log(`✅ ${city} duplicated correctly`);
    }

    console.log("🎉 DONE — clean data only");
    await mongoose.disconnect();
    process.exit(0);

  } catch (err) {
    console.error("❌ Error:", err);
    process.exit(1);
  }
}

main();
