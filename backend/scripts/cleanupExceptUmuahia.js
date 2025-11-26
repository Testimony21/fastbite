// scripts/cleanupExceptUmuahia.js
import mongoose from "mongoose";
import Restaurant from "../models/restaurant.js";
import MenuItem from "../models/menuModel.js";

const KEEP_CITY = "Umuahia"; // the city to keep

async function main() {
  try {
    await mongoose.connect("mongodb+srv://testimonyokochac:zqZ3Kr5v9qBdX8in@cluster0.vcxwqw9.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Step 1: Find all restaurants NOT in Umuahia
    const restaurantsToDelete = await Restaurant.find({ location: { $ne: KEEP_CITY } });
    const idsToDelete = restaurantsToDelete.map(r => r._id);

    if (idsToDelete.length === 0) {
      console.log("No restaurants to delete. Only Umuahia exists.");
    } else {
      // Step 2: Delete restaurants not in Umuahia
      await Restaurant.deleteMany({ _id: { $in: idsToDelete } });
      console.log(`✅ Deleted ${idsToDelete.length} restaurants outside Umuahia`);

      // Step 3: Delete their menus
      const deletedMenus = await MenuItem.deleteMany({ restaurant: { $in: idsToDelete } });
      console.log(`✅ Deleted ${deletedMenus.deletedCount} menu items associated`);
    }

    console.log("🎉 Cleanup complete. Only Umuahia remains.");
    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

main();
