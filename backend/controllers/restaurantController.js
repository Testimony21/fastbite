import Restaurant from "../models/restaurant.js";

// @desc Create a restaurant
// @route POST /api/restaurants
// @access Private (Owner)
export const createRestaurant = async (req, res) => {
  try {
    if (req.user.role !== "restaurant") {
      return res.status(403).json({ message: "Only restaurant owners can add restaurants" });
    }

    const { name, description, address, phone, image } = req.body;

    const restaurant = new Restaurant({
      name,
      description,
      address,
      phone,
      image,
      owner: req.user.id, // from authMiddleware
    });

    const savedRestaurant = await restaurant.save();
    res.status(201).json(savedRestaurant);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc Get all restaurants
// @route GET /api/restaurants
// @access Public
export const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find().populate("owner", "name email");
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc Update restaurant
// @route PUT /api/restaurants/:id
// @access Private (Owner only)
export const updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    if (restaurant.owner.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    Object.assign(restaurant, req.body);
    const updated = await restaurant.save();

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// @desc Delete restaurant
// @route DELETE /api/restaurants/:id
// @access Private (Admin only)
export const deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({ message: "Restaurant not found" });
    }

    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Only admins can delete restaurants" });
    }

    await restaurant.deleteOne();
    res.json({ message: "Restaurant deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
