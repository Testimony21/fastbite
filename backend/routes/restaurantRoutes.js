import express from "express";
import {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurantController.js";
import { protect, adminOnly, restaurantOnly } from "../middleware/authMiddleware.js";
import Restaurant from "../models/restaurant.js";

const router = express.Router();

// 🔎 Search + Filter + Pagination + Sorting
router.get("/search", async (req, res) => {
  try {
    const { location, cuisine, page = 1, limit = 10, sortBy = "rating", order = "desc" } = req.query;

    const filters = {};
    if (location) filters.location = { $regex: location.trim(), $options: "i" }; // exact, case-insensitive
    if (cuisine) filters.cuisine = { $regex: cuisine, $options: "i" };

    const skip = (page - 1) * limit;
    const sortOrder = order === "asc" ? 1 : -1;

    const restaurants = await Restaurant.find(filters)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Restaurant.countDocuments(filters);

    // Remove the 404: always return an array
    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      restaurants, // could be empty []
    });
  } catch (error) {
    console.error("Error fetching restaurants:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// 🍴 CRUD routes
router.route("/")
  .post(protect, restaurantOnly, createRestaurant)
  .get(getRestaurants);

router.route("/:id")
  .get(getRestaurantById)
  .put(protect, restaurantOnly, updateRestaurant)
  .delete(protect, adminOnly, deleteRestaurant);

export default router;
