import MenuItem from "../models/menuModel.js";
import Restaurant from "../models/restaurant.js";

export const createMenu = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;

    const restaurant = await Restaurant.findOne({ owner: req.user._id });
    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    const menu = new MenuItem({
      restaurant: restaurant._id,
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
  try {
    const menus = await MenuItem.find({ restaurant: req.params.restaurantId });
    if (menus.length === 0) return res.status(404).json({ message: "Menus not found" });
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
