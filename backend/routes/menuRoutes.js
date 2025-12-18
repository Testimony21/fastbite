import express from "express";
import { getMenusByRestaurant, createMenu } from "../controllers/menuController.js";

const router = express.Router({ mergeParams: true }); // important for req.params.restaurantId

// ✅ Get all menus for a restaurant
router.get("/", getMenusByRestaurant);

// ✅ Create a new menu for a restaurant
router.post("/", createMenu);

// router.get("/all", getAllMenus);

export default router;
