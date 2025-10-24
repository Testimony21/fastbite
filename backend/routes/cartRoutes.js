import express from "express";
import Cart from "../models/cart.js";
import MenuItem from "../models/menuModel.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

import mongoose from "mongoose";

router.post("/", protect, async (req, res) => {
  try {
    const { productId, quantity = 1 } = req.body;

    // Always cast productId to ObjectId to ensure uniformity
    const normalizedId = new mongoose.Types.ObjectId(productId);

    const menuItem = await MenuItem.findById(normalizedId);
    if (!menuItem)
      return res.status(404).json({ message: "Menu item not found" });

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        products: [{ product: normalizedId, quantity }],
      });
    } else {
      const existingItem = cart.products.find(
        (item) => item.product.toString() === normalizedId.toString()
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.products.push({ product: normalizedId, quantity });
      }
    }

    await cart.save();
    const totalItems = cart.products.reduce((sum, p) => sum + p.quantity, 0);

    res.json({ message: "Item added to cart", totalItems });
  } catch (err) {
    console.error("❌ Error adding to cart:", err);
    res
      .status(500)
      .json({ message: "Error adding to cart", error: err.message });
  }
});

/* ------------------ GET USER CART ------------------ */
router.get("/", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id }).populate(
      "products.product",
      "name price image"
    );

    if (!cart) return res.json({ items: [], totalItems: 0 });

    const validProducts = cart.products.filter((p) => p.product !== null);

    if (validProducts.length !== cart.products.length) {
      cart.products = validProducts;
      await cart.save();
    }

    const items = validProducts.map((p) => ({
      _id: p._id,
      productId: p.product._id,
      name: p.product.name,
      price: p.product.price,
      image: p.product.image,
      quantity: p.quantity,
    }));

    const totalItems = validProducts.reduce((sum, p) => sum + p.quantity, 0);

    res.json({ items, totalItems });
  } catch (err) {
    console.error("❌ Error fetching cart:", err);
    res.status(500).json({ message: "Error fetching cart", error: err.message });
  }
});

/* ------------------ REMOVE SINGLE ITEM COMPLETELY ------------------ */
router.delete("/:productId", protect, async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = cart.products.filter(
      (p) => p.product.toString() !== productId
    );

    await cart.save();

    const totalItems = cart.products.reduce((sum, p) => sum + p.quantity, 0);

    res.json({ message: "Item removed completely", totalItems, cart });
  } catch (err) {
    console.error("❌ Error removing item:", err);
    res.status(500).json({ message: "Error removing item", error: err.message });
  }
});

/* ------------------ UPDATE ITEM QUANTITY ------------------ */
router.put("/:productId", protect, async (req, res) => {
  try {
    const { productId } = req.params;
    const { action } = req.body; // "increase" or "decrease"

    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.products.find((p) => p.product.toString() === productId);
    if (!item)
      return res.status(404).json({ message: "Item not found in cart" });

    if (action === "increase") {
      item.quantity += 1;
    } else if (action === "decrease") {
      if (item.quantity > 1) item.quantity -= 1;
      else {
        // remove if it reaches 0
        cart.products = cart.products.filter(
          (p) => p.product.toString() !== productId
        );
      }
    }

    await cart.save();

    const totalItems = cart.products.reduce((sum, p) => sum + p.quantity, 0);

    res.json({ message: "Cart updated", totalItems, cart });
  } catch (err) {
    console.error("❌ Error updating cart:", err);
    res.status(500).json({ message: "Error updating cart", error: err.message });
  }
});

/* ------------------ CLEAR ENTIRE CART ------------------ */
router.delete("/", protect, async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.products = [];
    await cart.save();

    res.json({ message: "Cart cleared successfully", cart });
  } catch (err) {
    console.error("❌ Error clearing cart:", err);
    res.status(500).json({ message: "Error clearing cart", error: err.message });
  }
});

export default router;
