import express from "express";
import Cart from "../models/cart.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Add product to cart
router.post("/", protect, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        products: [{ product: productId, quantity }],
      });
    } else {
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );

      if (productIndex > -1) {
        cart.products[productIndex].quantity += quantity;
      } else {
        cart.products.push({ product: productId, quantity });
      }
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error adding to cart", error: err.message });
  }
});

// Get user cart
router.get("/", protect, async (req, res) => {
  const cart = await Cart.findOne({ user: req.user._id }).populate(
    "products.product"
  );
  res.json(cart);
});

export default router;