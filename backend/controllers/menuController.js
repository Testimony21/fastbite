import MenuItem from "../models/menuModel.js";
import Restaurant from "../models/restaurant.js";

export const createMenu = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const menu = new MenuItem({
      restaurant: req.params.restaurantId,
      name,
      description,
      price,
      image,
    });
    const savedMenu = await menu.save();
    res.status(201).json(savedMenu);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMenusByRestaurant = async (req, res) => {
  const { restaurantId } = req.params;
  try {
    const menus = await Menu.find({ restaurant: restaurantId });
    if (!menus) return res.status(404).json({ message: "Menus not found" });
    res.json(menus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllMenus = async (req, res) => {
  try {
    const menus = await MenuItem.find(); // gets all menus in the DB
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
