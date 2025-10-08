import express from "express";
import { getMenusByRestaurant, createMenu } from "../controllers/menuController.js";

const router = express.Router();

// ✅ Create a new menu for a restaurant
router.post("/:restaurantId/menus", createMenu);

// ✅ Get all menus for a restaurant
router.get("/:restaurantId/menus", getMenusByRestaurant);

export default router;
