import mongoose from "mongoose";
import Restaurant from "./models/restaurant.js";
import MenuItem from "./models/menuModel.js";

// The city you want to search menus for
const CITY = "Umuahia";

async function main() {
    try {
        // Connect to MongoDB
        await mongoose.connect(
            "mongodb+srv://testimonyokochac:zqZ3Kr5v9qBdX8in@cluster0.vcxwqw9.mongodb.net/?retryWrites=true&w=majority",
            { useNewUrlParser: true, useUnifiedTopology: true }
        );
        console.log("✅ Connected to MongoDB");

        // Step 1: Find all restaurants in the city
        const restaurants = await Restaurant.find({
            location: { $regex: CITY, $options: "i" } // case-insensitive match
        });

        if (restaurants.length === 0) {
            console.log(`No restaurants found in ${CITY}`);
            return process.exit(0);
        }

        const restaurantIds = restaurants.map(r => r._id);

        const menus = await MenuItem.find({ restaurant: { $in: restaurantIds } })
            .populate("restaurant")
            .lean();

        const uniqueMenus = [];
        const seen = new Set();

        menus.forEach(menu => {
            const key = menu.name + "-" + menu.restaurant._id; // unique key
            if (!seen.has(key)) {
                seen.add(key);
                uniqueMenus.push(menu);
            }
        });

        console.log("Menus in Umuahia (unique):");
        uniqueMenus.forEach(menu => {
            console.log(`- ${menu.name} (${menu.restaurant.name}) - ₦${menu.price}`);
        });


        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}

main();
