import Restaurant from "../models/restaurant.js";

export const getRestaurants = async (req, res) => {
  try {
    const { location } = req.query;

    const restaurants = await Restaurant.find(
      location ? { location: { $regex: location, $options: "i" } } : {}
    );

    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch restaurants" });
  }
};
