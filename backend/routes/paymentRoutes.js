import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import Cart from "../models/cart.js";
import Order from "../models/order.js";

const router = express.Router();

// Fake payment endpoint 
router.post("/fake", protect, async (req, res) => {
  try {
    const userId = req.user._id;

    // Fetch user's cart
    const cart = await Cart.findOne({ user: userId });
    if (!cart || cart.products.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const { amount } = req.body;

    // Create a fake order
    const order = await Order.create({
      user: userId,
      items: cart.products,
      totalAmount: amount,
      paymentStatus: "paid",
      paymentMethod: "fake",
    });

    // Clear cart
    cart.products = [];
    await cart.save();

    res.json({ message: "Payment successful", order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Payment failed", error: err.message });
  }
});

export default router;
