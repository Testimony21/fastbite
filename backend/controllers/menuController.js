import Menu from "../models/menuModel.js";

export const createMenu = async (req, res) => {
  try {
    const { name, description, price, image } = req.body;
    const menu = new Menu({
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
  try {
    const menus = await Menu.find({ restaurant: req.params.restaurantId });
    res.json(menus);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
