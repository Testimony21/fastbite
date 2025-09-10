import Menu from "../models/menu.js";

// Add new menu item
export const addMenuItem = async (req, res) => {
  try {
    const menu = new Menu(req.body);
    await menu.save();
    res.status(201).json(menu);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get menu items for a restaurant
export const getMenuByRestaurant = async (req, res) => {
  try {
    const menu = await Menu.find({ restaurant: req.params.restaurantId });
    res.json(menu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
