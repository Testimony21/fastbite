import mongoose from "mongoose";
import dotenv from "dotenv";
import Restaurant from "../models/restaurant.js";
import MenuItem from "../models/menuModel.js";

dotenv.config();

const SOURCE_CITY = "Umuahia";

const TARGET_CITIES = [
    "Awka",
    "Uyo",
    "Enugu",
    "Abuja",
    "Owerri",
    "Calabar",
    "Asaba",
    "Ibadan",
    "Akure",
    "Port Harcourt"
];

async function main() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("✅ Connected to MongoDB");

        const baseRestaurants = await Restaurant.find({ location: SOURCE_CITY }).lean();
        if (!baseRestaurants.length) {
            console.log("❌ No base restaurants found in Umuahia");
            process.exit(1);
        }

        console.log(`📌 Using ${baseRestaurants.length} Umuahia restaurants as templates`);

        for (const city of TARGET_CITIES) {
            const alreadyExists = await Restaurant.countDocuments({ location: city });
            if (alreadyExists > 0) {
                console.log(`⏭️ ${city} already exists, skipping`);
                continue;
            }

            for (const base of baseRestaurants) {
                // Remove any city suffix from name
                const cleanedName = base.name.replace(/\s*—\s*Umuahia$/i, "");

                const newRestaurant = await Restaurant.create({
                    name: cleanedName,
                    image: base.image,
                    cuisine: base.cuisine,
                    rating: base.rating,
                    location: city,
                    phone: base.phone || "000-000-0000",
                    address: base.address ? base.address.replace(/Umuahia/i, city) : `${city} address placeholder`
                });



                const menus = await MenuItem.find({ restaurant: base._id }).lean();

                if (menus.length) {
                    const newMenus = menus.map(m => ({
                        name: m.name,
                        description: m.description,
                        price: m.price,
                        image: m.image,
                        restaurant: newRestaurant._id
                    }));

                    await MenuItem.insertMany(newMenus);
                }
            }

            console.log(`✅ ${city} seeded correctly`);
        }

        console.log("🎉 RESEED COMPLETE");
        await mongoose.disconnect();
        process.exit(0);

    } catch (err) {
        console.error("❌ Error:", err);
        process.exit(1);
    }
}

main();
