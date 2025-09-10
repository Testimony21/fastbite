import express from "express";
import {
  createRestaurant,
  getRestaurants,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurantController.js";
import { protect, adminOnly, restaurantOnly } from "../middleware/authMiddleware.js";
import Restaurant from "../models/restaurant.js";

const router = express.Router();

// 🔎 Search route
router.get("/search", async (req, res) => {
  try {
    const { location } = req.query;

    if (!location) {
      return res.status(400).json({ message: "Location is required" });
    }

    const restaurants = await Restaurant.find({
      location: { $regex: location, $options: "i" },
    });

    res.json(restaurants);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// 🍴 Other routes
router.route("/")
  .post(protect, restaurantOnly, createRestaurant)
  .get(getRestaurants);

router.route("/:id")
  .put(protect, restaurantOnly, updateRestaurant)
  .delete(protect, adminOnly, deleteRestaurant);

export default router;
