import express from "express";
import {
  createRestaurant,
  getRestaurants,
  getRestaurantById,
  updateRestaurant,
  deleteRestaurant,
} from "../controllers/restaurantController.js";
import { getMenusByRestaurant } from "../controllers/menuController.js";
import { protect, adminOnly, restaurantOnly } from "../middleware/authMiddleware.js";
import Restaurant from "../models/restaurant.js";
import MenuItem from "../models/menuModel.js"; // ✅ import Menu model

const router = express.Router();

router.get("/search", async (req, res) => {
  try {
    const { location, cuisine, page = 1, limit = 10, sortBy = "rating", order = "desc" } = req.query;

    if (!location) {
      return res.json({
        total: 0,
        page: 1,
        pages: 0,
        restaurants: [],
      });
    }

    const filters = {
      location: location.trim(), // ✅ EXACT match only
    };

    if (cuisine) {
      filters.cuisine = { $regex: cuisine.trim(), $options: "i" };
    }

    const skip = (page - 1) * limit;
    const sortOrder = order === "asc" ? 1 : -1;

    const restaurants = await Restaurant.find(filters)
      .sort({ [sortBy]: sortOrder })
      .skip(skip)
      .limit(Number(limit));

    const total = await Restaurant.countDocuments(filters);

    res.json({
      total,
      page: Number(page),
      pages: Math.ceil(total / limit),
      restaurants,
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

// ✅ New route: Get menus for a restaurant
router.get("/:restaurantId/menus", async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const menus = await MenuItem.find({ restaurant: restaurantId });

    res.json(menus);
  } catch (error) {
    console.error("Error fetching menus:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
